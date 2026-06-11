#!/usr/bin/env node
/**
 * Brand image generation via Nano Banana Pro (Gemini 3 Pro Image) for Dockwize.
 *
 * Usage:
 *   npm run generate:images                          # all missing
 *   npm run generate:images -- --force               # regenerate everything
 *   npm run generate:images -- --only=hero --force   # one specific image
 *
 * Requires GEMINI_API_KEY (shell-env in ~/.zshrc or local .env).
 */

import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(PROJECT_ROOT, "public", "images");

if (!process.env.GEMINI_API_KEY) {
  console.error("\x1b[31mGEMINI_API_KEY is not set.\x1b[0m  Add to ~/.zshrc: export GEMINI_API_KEY=AIza...");
  process.exit(1);
}

const args = process.argv.slice(2);
const FORCE = args.includes("--force");
const ONLY = args.find((a) => a.startsWith("--only="))?.split("=")[1];

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const BRAND = [
  "Photorealistic editorial photography for Dockwize, an innovation and business-growth hub for entrepreneurs, startups and scale-ups in Zeeland, the Netherlands.",
  "Visual language: candid, warm, premium, cinematic, shallow depth of field, natural daylight, magazine-quality finish (think Monocle, Courier, Kinfolk).",
  "Warm neutral palette of wood, concrete and soft amber daylight that complements a black and yellow brand identity.",
  "Absolutely no green: no plants, no foliage, no leaves, no lettuce, no green color cast anywhere.",
  "No text, no logos, no watermarks, no captions, no signage.",
  "Shot on a medium-format camera, 35mm equivalent. Aspect ratio 16:9, wide landscape.",
].join(" ");

const IMAGES = [
  {
    name: "fuckupnight",
    prompt:
      "An evening business networking event in an industrial brick venue, a speaker on a small stage with warm and subtle purple stage lighting, a seated audience in the foreground silhouetted, lively after-work atmosphere, candid documentary photo, shallow depth of field.",
  },
  {
    name: "eatmeet",
    prompt:
      "People enjoying food and drinks together at long communal wooden tables on an outdoor terrace at golden hour, social warm gathering, string lights overhead, candid editorial photo, shallow depth of field.",
  },
];

const filtered = ONLY ? IMAGES.filter((i) => i.name === ONLY) : IMAGES;
if (ONLY && filtered.length === 0) {
  console.error(`No image named "${ONLY}". Available: ${IMAGES.map((i) => i.name).join(", ")}`);
  process.exit(1);
}

// Nano Banana Pro first (best quality); fall back to standard Nano Banana when Pro is overloaded.
const MODELS = (process.env.IMG_MODEL ? [process.env.IMG_MODEL] : [
  "gemini-3-pro-image-preview",
  "gemini-2.5-flash-image-preview",
  "gemini-2.5-flash-image",
]);
const RETRIES_PER_MODEL = 3;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function generateOne({ name, prompt }) {
  const outPath = path.join(OUTPUT_DIR, `${name}.png`);
  if (fs.existsSync(outPath) && !FORCE) {
    console.log(`skip (exists): ${name}.png`);
    return { name, status: "skip" };
  }
  console.log(`generating: ${name}`);
  const t0 = Date.now();
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= RETRIES_PER_MODEL; attempt++) {
      try {
        const response = await ai.models.generateContent({ model, contents: `${BRAND}\n\n${prompt}` });
        const part = response.candidates?.[0]?.content?.parts?.find((p) => p.inlineData);
        if (!part) { console.warn(`  no image data from ${model}`); break; }
        const buffer = Buffer.from(part.inlineData.data, "base64");
        fs.writeFileSync(outPath, buffer);
        console.log(`saved: ${name}.png via ${model}  (${(buffer.length / 1024).toFixed(0)} KB, ${((Date.now() - t0) / 1000).toFixed(1)}s)`);
        return { name, status: "ok" };
      } catch (err) {
        const overloaded = /503|UNAVAILABLE|high demand|overloaded/i.test(err.message || "");
        console.error(`  ${model} attempt ${attempt} failed${overloaded ? " (overloaded)" : ""}: ${(err.message || "").slice(0, 120)}`);
        if (overloaded && attempt < RETRIES_PER_MODEL) { await sleep(8000); continue; }
        break; // try next model
      }
    }
  }
  return { name, status: "error" };
}

async function main() {
  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  const results = [];
  for (const img of filtered) results.push(await generateOne(img));
  const ok = results.filter((r) => r.status === "ok").length;
  console.log(`\nDone: ${ok} generated, ${results.length - ok} other.`);
  if (results.some((r) => r.status === "error" || r.status === "empty")) process.exit(1);
}

main();

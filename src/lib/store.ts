import type { NeedsAnswers, NeedsResult } from './analysis';

/**
 * Inzendingen-opslag. Nu een localStorage-laag zodat de demo direct werkt en
 * Dockwize de inzendingen op /beheer ziet. Eén plek om later te vervangen door
 * een echte backend: laat submitSubmission() POST'en naar je eigen endpoint
 * (bijv. een serverless function, CRM of e-mailservice).
 */

const KEY = 'dockwize_groeiscan_submissions_v1';

export interface Contact {
  name: string;
  email: string;
  company: string;
  phone?: string;
  consent: boolean;
}

export interface Submission {
  id: string;
  createdAt: string; // ISO
  contact: Contact;
  situation: number | null;
  team: string;           // teamgrootte (label)
  traction: string;       // omzet/tractie (label)
  needs: string[];        // need-ids
  needLabels: string[];   // leesbare behoeften
  selfChecks: Record<string, number>; // zelfcheck-id -> 0/0.5/1
  challenge: string;      // vrije tekst: grootste uitdaging
  result: {
    focusPhase: number;
    focusPhaseName: string;
    recommendedPackage: string;
    recommendedModules: string[];
    strengths: string[];  // wat al op orde is
    gaps: string[];       // aandachtspunten
    mismatch: boolean;
    headline: string;
    summary: string;
    coachNote: string;
  };
}

function read(): Submission[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Submission[]) : [];
  } catch {
    return [];
  }
}

function write(list: Submission[]): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(KEY, JSON.stringify(list));
}

function uid(): string {
  return 'sub_' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

export function buildSubmission(contact: Contact, answers: NeedsAnswers, result: NeedsResult): Submission {
  return {
    id: uid(),
    createdAt: new Date().toISOString(),
    contact,
    situation: answers.situation,
    team: result.teamLabel,
    traction: result.tractionLabel,
    needs: answers.needs,
    needLabels: result.selectedNeeds.map((n) => n.label),
    selfChecks: answers.selfChecks,
    challenge: answers.challenge,
    result: {
      focusPhase: result.focusPhase,
      focusPhaseName: result.focusPhaseInfo.name,
      recommendedPackage: result.recommendedPackage.label,
      recommendedModules: result.recommendedModules,
      strengths: result.strengths.map((s) => s.focus),
      gaps: result.gaps.map((g) => g.focus),
      mismatch: result.mismatch,
      headline: result.headline,
      summary: result.summary,
      coachNote: result.coachNote,
    },
  };
}

/** Slaat de inzending op. Vervang de body door een fetch() naar je backend voor productie. */
export async function submitSubmission(sub: Submission): Promise<void> {
  const list = read();
  list.unshift(sub);
  write(list);
  // Productie-voorbeeld:
  // await fetch('/api/groeiscan', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(sub) });
}

export function getSubmissions(): Submission[] {
  return read();
}

/* ----------------------------------------------------------------------------
 * Concept-vragen (admin)
 * Terwijl de scan nog in ontwikkeling is, kan een admin hier extra vragen
 * bedenken en bewaren (localStorage). Ze staan los van het kernmodel in
 * model.ts en worden in het overzicht gemarkeerd als "concept". Later kun je
 * ze promoveren naar het echte model in code.
 * ------------------------------------------------------------------------- */

const CQ_KEY = 'dockwize_groeiscan_custom_questions_v1';

export interface CustomQuestion {
  id: string;
  phase: 1 | 2 | 3 | 4;
  short: string;
  statement: string;
  definition?: string;
  createdAt: string;
}

export function getCustomQuestions(): CustomQuestion[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(CQ_KEY);
    return raw ? (JSON.parse(raw) as CustomQuestion[]) : [];
  } catch {
    return [];
  }
}

export function addCustomQuestion(q: Omit<CustomQuestion, 'id' | 'createdAt'>): CustomQuestion {
  const item: CustomQuestion = { ...q, id: 'cq_' + Math.random().toString(36).slice(2, 9), createdAt: new Date().toISOString() };
  const list = getCustomQuestions();
  list.push(item);
  if (typeof window !== 'undefined') window.localStorage.setItem(CQ_KEY, JSON.stringify(list));
  return item;
}

export function deleteCustomQuestion(id: string): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(CQ_KEY, JSON.stringify(getCustomQuestions().filter((q) => q.id !== id)));
}

export function deleteSubmission(id: string): void {
  write(read().filter((s) => s.id !== id));
}

export function clearSubmissions(): void {
  write([]);
}

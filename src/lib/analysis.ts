import {
  MILESTONES, PHASES, PACKAGES, CROSS_CHECKS, NEEDS, PHASE_PLAIN, SELF_CHECKS, TRACTION, TEAM_SIZES,
  type Milestone, type Phase, type PhaseId, type PackageKey, type CrossCheck, type DockPackage, type Need, type SelfCheck, type TractionLevel, type Option,
} from './model';

/* ============================================================================
 * Behoefte-gestuurde analyse (v2) — input: situatie + behoeften.
 * Levert een mensentaal-uitkomst voor de ondernemer én een intake-brief voor
 * de coach (welke modules, welk programma, waar zit een mogelijke mismatch).
 * ========================================================================== */

export interface NeedsAnswers {
  situation: PhaseId | 0 | null; // 0 = "weet ik nog niet"
  team: string;
  traction: string;
  needs: string[];
  selfChecks: Record<string, Score>;
  challenge: string;
}

export interface NeedsResult {
  situationPhase: PhaseId | null;
  focusPhase: PhaseId;
  focusPhaseInfo: Phase;
  recommendedPackage: DockPackage;
  selectedNeeds: Need[];
  recommendedModules: string[];
  strengths: SelfCheck[];
  gaps: SelfCheck[];
  mismatch: boolean;
  teamLabel: string;
  tractionLabel: string;
  headline: string;
  summary: string;
  coachNote: string;
}

const PHASE_PKG: Record<PhaseId, PackageKey> = { 1: 'explorer', 2: 'potential', 3: 'grow', 4: 'scale' };

export function analyzeNeeds(a: NeedsAnswers): NeedsResult {
  const selectedNeeds = NEEDS.filter((n) => a.needs.includes(n.id));
  const sit = (a.situation && a.situation > 0 ? a.situation : null) as PhaseId | null; // "weet ik nog niet" => geen fase-claim
  const tract = TRACTION.find((t) => t.value === a.traction) ?? null;
  const team = TEAM_SIZES.find((t) => t.value === a.team) ?? null;

  const sc = (id: string): Score => a.selfChecks[id] ?? 0;
  const ordered = [...SELF_CHECKS].sort((x, y) => x.phase - y.phase);
  const firstGap = ordered.find((c) => sc(c.id) < 1) ?? null;
  const focusPhase = (firstGap ? firstGap.phase : (tract?.phase ?? sit ?? 4)) as PhaseId;
  const focusPhaseInfo = PHASES[focusPhase - 1];
  const recommendedPackage = PACKAGES[PHASE_PKG[focusPhase]];

  const strengths = ordered.filter((c) => sc(c.id) === 1);
  const gaps = ordered.filter((c) => sc(c.id) < 1);

  const claimedPhase = Math.max(sit ?? 1, tract?.phase ?? 1) as PhaseId;
  const mismatch = claimedPhase > focusPhase && gaps.some((g) => g.phase < claimedPhase);

  const recommendedModules = [...new Set([
    ...selectedNeeds.flatMap((n) => n.modules),
    ...gaps.filter((g) => g.phase <= Math.max(focusPhase, claimedPhase)).map((g) => g.module),
  ])];

  const headline = `Jouw focus: ${PHASE_PLAIN[focusPhase].label}`;
  const summary = buildNeedsSummary({ focusPhase, mismatch, strengths, gaps });
  const coachNote = buildNeedsCoachNote({ sit, team, tract, focusPhase, focusPhaseInfo, mismatch, claimedPhase, gaps, recommendedPackage });

  return {
    situationPhase: sit, focusPhase, focusPhaseInfo, recommendedPackage, selectedNeeds, recommendedModules,
    strengths, gaps, mismatch,
    teamLabel: team?.label ?? '', tractionLabel: tract?.label ?? '',
    headline, summary, coachNote,
  };
}

function buildNeedsSummary(p: { focusPhase: PhaseId; mismatch: boolean; strengths: SelfCheck[]; gaps: SelfCheck[] }): string {
  const parts: string[] = [PHASE_PLAIN[p.focusPhase].you];
  if (p.strengths.length) parts.push(`Je hebt al ${p.strengths.length} van de 5 basics op orde, een mooi vertrekpunt.`);
  if (p.mismatch) parts.push('Je bent met je bedrijf al verder, maar een paar fundamenten staan nog open. Juist die eerst stevig neerzetten voorkomt gedoe later.');
  else if (p.gaps.length) parts.push(`Er ${p.gaps.length === 1 ? 'is nog 1 punt' : `zijn nog ${p.gaps.length} punten`} waar je aan kunt werken om door te groeien.`);
  return parts.join(' ');
}

function buildNeedsCoachNote(p: { sit: PhaseId | null; team: Option | null; tract: TractionLevel | null; focusPhase: PhaseId; focusPhaseInfo: Phase; mismatch: boolean; claimedPhase: PhaseId; gaps: SelfCheck[]; recommendedPackage: DockPackage }): string {
  const bits: string[] = [];
  bits.push(`Zelf-inschatting fase ${p.sit ?? '?'}; tractie: ${p.tract?.label ?? '?'}; team: ${p.team?.label ?? '?'}.`);
  bits.push(`Aanbevolen startpunt: fase ${p.focusPhase} (${p.focusPhaseInfo.name}), programma ${p.recommendedPackage.label}.`);
  if (p.mismatch) bits.push(`LET OP: ondernemer plaatst zich rond fase ${p.claimedPhase} maar ${p.gaps.length} fundament-check(s) staan open. Fundament checken bij intake.`);
  if (p.gaps.length) bits.push(`Openstaande checks: ${p.gaps.map((g) => g.focus).join('; ')}.`);
  return bits.join(' ');
}

export type Score = 0 | 0.5 | 1;

export interface WizardAnswers {
  stage: PhaseId | null;                 // zelf-inschatting vooraf
  milestones: Record<number, Score>;     // mijlpaal-id -> score
  crossChecks: Record<string, Score>;    // crosscheck-id -> score
}

export interface PhaseScore {
  phase: Phase;
  pct: number;                           // 0..100
  status: 'done' | 'busy' | 'open';
}

export interface AnalysisResult {
  currentPhase: Phase;
  currentMilestoneId: number | null;     // eerste openstaande mijlpaal (null = alles op orde)
  recommendedPackage: DockPackage;
  overallPct: number;
  phaseScores: PhaseScore[];
  skipped: Milestone[];                  // overgeslagen fundamenten onder je verste mijlpaal
  nextSteps: Milestone[];                // openstaande mijlpalen in je huidige fase
  attention: CrossCheck[];               // strategische checks die nog niet op orde zijn
  furthestPhase: number;                 // hoogste fase met een behaalde mijlpaal
  jumpedAhead: boolean;                  // werk je al verderop terwijl het fundament nog open staat?
  claimedPhase: PhaseId | null;
  claimMismatch: boolean;                // schatte zichzelf hoger in dan de mijlpalen laten zien
  headline: string;
  summary: string;
}

const score = (a: WizardAnswers, m: Milestone): Score => a.milestones[m.id] ?? 0;

function phaseScores(a: WizardAnswers): PhaseScore[] {
  return PHASES.map((phase) => {
    const ms = MILESTONES.filter((m) => m.phase === phase.id);
    const sum = ms.reduce((acc, m) => acc + score(a, m), 0);
    const pct = Math.round((sum / ms.length) * 100);
    const status: PhaseScore['status'] = pct === 100 ? 'done' : pct === 0 ? 'open' : 'busy';
    return { phase, pct, status };
  });
}

export function analyze(a: WizardAnswers): AnalysisResult {
  const ordered = [...MILESTONES].sort((x, y) => x.id - y.id);

  // Eerste openstaande mijlpaal bepaalt je huidige fase en het aanbevolen pakket.
  const firstGap = ordered.find((m) => score(a, m) < 1) ?? null;
  const currentPhase = firstGap ? PHASES[firstGap.phase - 1] : PHASES[3];
  const recommendedPackage = PACKAGES[firstGap ? firstGap.pkg : 'mature'];

  // Verste behaalde mijlpaal -> detecteert "vooruitlopen op het fundament".
  const wins = ordered.filter((m) => score(a, m) === 1);
  const furthestPhase = wins.length ? Math.max(...wins.map((m) => m.phase)) : 0;
  const jumpedAhead = furthestPhase > currentPhase.id;

  // Overgeslagen stappen: alles wat nog open staat ónder je verste behaalde mijlpaal.
  const skipped = ordered.filter((m) => score(a, m) < 1 && m.phase < furthestPhase);
  const skippedIds = new Set(skipped.map((m) => m.id));

  // Eerstvolgende stappen binnen je huidige fase (zonder dubbeling met overgeslagen).
  const nextSteps = ordered.filter(
    (m) => score(a, m) < 1 && m.phase === currentPhase.id && !skippedIds.has(m.id),
  );

  const attention = CROSS_CHECKS.filter((c) => (a.crossChecks[c.id] ?? 0) < 1);

  const totalScore = ordered.reduce((acc, m) => acc + score(a, m), 0);
  const overallPct = Math.round((totalScore / ordered.length) * 100);

  const claimMismatch = a.stage != null && a.stage > currentPhase.id;

  const headline = firstGap
    ? `Fase ${currentPhase.id} — ${currentPhase.name}`
    : 'Je hebt alle 15 mijlpalen op orde';

  const summary = buildSummary({
    firstGap, currentPhase, jumpedAhead, furthestPhase, skipped, nextSteps, attention, claimMismatch, claimedPhase: a.stage,
  });

  return {
    currentPhase,
    currentMilestoneId: firstGap?.id ?? null,
    recommendedPackage,
    overallPct,
    phaseScores: phaseScores(a),
    skipped,
    nextSteps,
    attention,
    furthestPhase,
    jumpedAhead,
    claimedPhase: a.stage,
    claimMismatch,
    headline,
    summary,
  };
}

function buildSummary(p: {
  firstGap: Milestone | null;
  currentPhase: Phase;
  jumpedAhead: boolean;
  furthestPhase: number;
  skipped: Milestone[];
  nextSteps: Milestone[];
  attention: CrossCheck[];
  claimMismatch: boolean;
  claimedPhase: PhaseId | null;
}): string {
  if (!p.firstGap) {
    return 'Knap werk — alle vijftien mijlpalen van het levensfasemodel staan op orde. De focus verschuift nu naar bestendigen: strategie als doorlopend proces en een organisatie die zelfstandig blijft bijsturen.';
  }
  const parts: string[] = [];
  parts.push(
    `Op basis van je antwoorden werk je je nu door fase ${p.currentPhase.id}: ${p.currentPhase.name.toLowerCase()}. ${p.currentPhase.goal}`,
  );
  if (p.jumpedAhead && p.skipped.length) {
    parts.push(
      `Opvallend: je zet al stappen in fase ${p.furthestPhase}, terwijl ${p.skipped.length} ${p.skipped.length === 1 ? 'fundament' : 'fundamenten'} uit eerdere fases nog open ${p.skipped.length === 1 ? 'staat' : 'staan'}. Juist daar zit vaak verborgen risico én de snelste winst.`,
    );
  } else if (p.nextSteps.length) {
    parts.push(`Er ${p.nextSteps.length === 1 ? 'staat nog 1 mijlpaal' : `staan nog ${p.nextSteps.length} mijlpalen`} open in deze fase voordat je stevig door kunt naar de volgende.`);
  }
  if (p.attention.length) {
    parts.push(`Let daarnaast op ${p.attention.length} strategisch aandachtspunt${p.attention.length === 1 ? '' : 'en'} dat in elke fase meeloopt.`);
  }
  return parts.join(' ');
}

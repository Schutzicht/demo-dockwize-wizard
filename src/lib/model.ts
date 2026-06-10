/**
 * Dockwize Levensfasemodel — bron: "Dockwize Architecture" + "mijlpalen en fasering".
 * Publieksvriendelijke (MKB) formulering van de 15 mijlpalen, verdeeld over 4 fasen.
 * Elke mijlpaal hoort bij een Dockwize-pakket (Explorer/Potential/Grow/Scale/Mature).
 */

export type PhaseId = 1 | 2 | 3 | 4;
export type PackageKey = 'explorer' | 'potential' | 'grow' | 'scale' | 'mature';

export interface Phase {
  id: PhaseId;
  name: string;
  tag: string; // engelse vakterm (customer discovery, ...)
  intro: string; // 1 zin: waar draait deze fase om
  goal: string; // DOEL uit de checklist
}

export interface Milestone {
  id: number; // 1..15
  phase: PhaseId;
  pkg: PackageKey;
  short: string; // korte titel voor in de analyse
  statement: string; // ja/deels/nee-stelling die de bezoeker beoordeelt
  definition: string; // de mijlpaal-definitie (MKB-versie)
}

export interface CrossCheck {
  id: string;
  statement: string;
  hint: string;
}

export interface DockPackage {
  key: PackageKey;
  label: string;
  phase: PhaseId;
  tagline: string;
  focus: string;
}

export const PHASES: Phase[] = [
  {
    id: 1,
    name: 'Klant & behoefte',
    tag: 'customer discovery',
    intro: 'Scherp krijgen wie je klant is en welk probleem je écht oplost.',
    goal: 'Aangetoond dat er een specifieke groep klanten is met een probleem waar jouw oplossing op inspeelt.',
  },
  {
    id: 2,
    name: 'Verkoopbaar product',
    tag: 'customer validation',
    intro: 'Een product of dienst waar klanten daadwerkelijk voor willen betalen.',
    goal: 'Klanten zijn bereid het product te kopen; kanalen, prijs en verdienmodel zijn getest en kosten/baten zijn in evenwicht.',
  },
  {
    id: 3,
    name: 'Eerste verkopen',
    tag: 'customer creation',
    intro: 'Gestructureerd en herhaalbaar verkopen, en daarop kunnen sturen.',
    goal: 'Je bedient klanten via een bewezen verkoopproces en kunt de verkopen volgens (of boven) begroting opschalen.',
  },
  {
    id: 4,
    name: 'Klaar voor verdere groei',
    tag: 'company building / scaling up',
    intro: 'Toekomstvisie, organisatie en sturing klaarmaken om op te schalen.',
    goal: 'Een duidelijk toekomstbeeld met organisatie, rollen, middelen en geldstromen uitgewerkt, en een betrokken organisatie.',
  },
];

export const MILESTONES: Milestone[] = [
  // FASE 1 — Klant & behoefte
  {
    id: 1, phase: 1, pkg: 'explorer',
    short: 'Klant & probleem scherp',
    statement: 'We hebben aangetoond dat er een duidelijke groep klanten is die structureel hetzelfde probleem heeft en naar een betere oplossing zoekt.',
    definition: 'Aantonen dat er een groep klanten is die structureel een probleem heeft en naar een (betere) oplossing zoekt.',
  },
  {
    id: 2, phase: 1, pkg: 'explorer',
    short: 'Oplossing gevalideerd',
    statement: 'Onze doelgroep heeft zelf bevestigd waar een goede oplossing aan moet voldoen — we hebben dit niet alleen zelf bedacht.',
    definition: 'Door doelgroepklanten laten specificeren en bevestigen waar een (betere) oplossing aan moet voldoen.',
  },
  {
    id: 3, phase: 1, pkg: 'explorer',
    short: 'Betaalbereidheid bewezen',
    statement: 'We hebben aangetoond dat klanten bereid zijn te betalen voor onze oplossing, inclusief een indicatie van de prijs.',
    definition: 'Aankoopbereidheid van de beoogde oplossing (incl. prijs) aantonen bij doelgroepklanten.',
  },
  // FASE 2 — Verkoopbaar product
  {
    id: 4, phase: 2, pkg: 'potential',
    short: 'Werkend eerste product (MVP)',
    statement: 'We hebben een eerste versie van ons product of dienst waarvan klanten zélf zeggen dat het hun probleem oplost.',
    definition: 'Eerste product-/dienstversie waarvan klanten vinden dat deze het klantprobleem oplost.',
  },
  {
    id: 5, phase: 2, pkg: 'potential',
    short: 'Herhaalbaar verkoopproces',
    statement: 'We hebben een herhaalbaar en schaalbaar proces ontworpen om te produceren én te verkopen.',
    definition: 'Ontwerp van een herhaalbaar en schaalbaar productie- en verkoopproces.',
  },
  {
    id: 6, phase: 2, pkg: 'potential',
    short: 'Rendabele marktbenadering',
    statement: 'We hebben aangetoond dat we het product bij herhaling kunnen verkopen, met een verdienmodel en kanalen die rendabel zijn.',
    definition: 'Aangetoond dat product/dienst bij herhaling verkocht kan worden met het bedachte verdienmodel, kanalen en een positief rendement.',
  },
  // FASE 3 — Eerste verkopen
  {
    id: 7, phase: 3, pkg: 'grow',
    short: 'Gerichte sales- & marketingmotor',
    statement: 'We hebben duidelijke marketing- en salesplannen, vertaald naar doelen en een vaste werkwijze voor leads en conversie.',
    definition: 'Duidelijke marketing- en salesplannen, vertaald naar doelen en een gestructureerde werkwijze voor leadgeneratie en conversie.',
  },
  {
    id: 8, phase: 3, pkg: 'grow',
    short: 'Volledig business model vastgelegd',
    statement: 'We hebben een volledig, doordacht business model en onze belangrijke processen liggen vast.',
    definition: 'Goed doordacht (volledig) business model en schaalbaarheidsanalyse aanwezig; alle relevante processen zijn vastgelegd.',
  },
  {
    id: 9, phase: 3, pkg: 'grow',
    short: 'Sturen op omzetgroei',
    statement: 'We sturen kort-cyclisch op verkoopresultaten, de directie is betrokken en de groei is duidelijk zichtbaar.',
    definition: 'Duidelijke, kort-cyclische opvolging van verkoopresultaten met betrokken directie; groei is zichtbaar.',
  },
  // FASE 4 — Klaar voor verdere groei
  {
    id: 10, phase: 4, pkg: 'scale',
    short: 'Toekomstvisie helder',
    statement: 'We hebben een duidelijk toekomstbeeld (missie, ambitie en doelen voor de komende jaren), ook voor de rol van de ondernemer(s).',
    definition: 'De gewenste bedrijfsontwikkeling op lange en middellange termijn is duidelijk, net als de ambitie en rol van de ondernemer(s).',
  },
  {
    id: 11, phase: 4, pkg: 'scale',
    short: 'Vertaald naar organisatie & cashflow',
    statement: 'Onze toekomstvisie is vertaald naar hoe organisatie en bezetting (FTE) zich ontwikkelen, met een cashflow-prognose waarop we sturen.',
    definition: 'Toekomstvisie en business model vertaald naar bezetting (#FTE) en organisatie-ontwikkeling, met een op geldstromen gebaseerde prognose.',
  },
  {
    id: 12, phase: 4, pkg: 'scale',
    short: 'Team & sleutelrollen versterkt',
    statement: 'De rol van de eigenaar/DGA is herijkt, sleutelfuncties zijn duidelijk en we versterken het team actief.',
    definition: 'Rol van DGA/ondernemer(s) is expliciet besproken, sleutelfuncties en verantwoordelijkheden zijn duidelijk; team wordt actief versterkt.',
  },
  {
    id: 13, phase: 4, pkg: 'mature',
    short: 'Aansturing & stuurinformatie',
    statement: 'Onze bedrijfsvoering is ingericht met een duidelijke manier van leidinggeven, overlegvormen en stuurinformatie (KPI’s/dashboard).',
    definition: 'Bedrijfsvoering ingericht met keuzes over leidinggeven en sturen via overleggen, plus geïmplementeerde sturingsmechanismen (KSF/KPI/dashboard).',
  },
  {
    id: 14, phase: 4, pkg: 'mature',
    short: 'Betrokken organisatie',
    statement: 'Onze mensen zijn intrinsiek gemotiveerd en aantoonbaar betrokken bij de organisatie.',
    definition: 'De organisatie is gemobiliseerd op basis van de intrinsieke motivatie van het personeel.',
  },
  {
    id: 15, phase: 4, pkg: 'mature',
    short: 'Strategie als doorlopend proces',
    statement: 'We halen structureel feedback op van klanten en medewerkers en hebben advies & toezicht (bijv. raad van advies) georganiseerd om de strategie bij te sturen.',
    definition: 'Feedback van klanten en medewerkers wordt structureel opgehaald; sparring, advies en toezicht zijn georganiseerd en de strategie wordt periodiek bijgestuurd.',
  },
];

/** Strategische dwarsdoorsnedes — gelden in elke fase (uit de checklist). */
export const CROSS_CHECKS: CrossCheck[] = [
  {
    id: 'funding',
    statement: 'Onze financierings- en exitstrategie is actueel en past nog bij waar we nu staan.',
    hint: 'Weet je hoeveel geld je nodig hebt voor de volgende fase, en hoe je daar komt?',
  },
  {
    id: 'ip',
    statement: 'De bescherming van ons intellectueel eigendom (merk, kennis, techniek) ligt op koers.',
    hint: 'Denk aan merkregistratie, octrooi, contracten of geheimhouding.',
  },
  {
    id: 'team',
    statement: 'De capaciteiten van ons team zijn bestand tegen de uitdagingen van de volgende fase.',
    hint: 'Heb je de juiste mensen en competenties in huis om door te groeien?',
  },
];

export const PACKAGES: Record<PackageKey, DockPackage> = {
  explorer: {
    key: 'explorer', label: 'Explorer', phase: 1,
    tagline: 'Van idee naar bewezen klantbehoefte',
    focus: 'Klant- en probleemvalidatie: praten met je doelgroep en bewijzen dat het probleem en de betaalbereidheid er zijn.',
  },
  potential: {
    key: 'potential', label: 'Potential', phase: 2,
    tagline: 'Van MVP naar verkoopbaar product',
    focus: 'Je product aanscherpen, je verdienmodel en kanalen testen en een herhaalbaar verkoopproces ontwerpen.',
  },
  grow: {
    key: 'grow', label: 'Grow', phase: 3,
    tagline: 'Gestructureerd opschalen van je verkoop',
    focus: 'Een werkende sales- en marketingmotor, een volledig business model en kort-cyclisch sturen op groei.',
  },
  scale: {
    key: 'scale', label: 'Scale', phase: 4,
    tagline: 'Toekomstvisie vertalen naar organisatie',
    focus: 'Missie, ambitie en doelen vastleggen en vertalen naar organisatie, bezetting en cashflow.',
  },
  mature: {
    key: 'mature', label: 'Mature', phase: 4,
    tagline: 'Sterke aansturing en een betrokken organisatie',
    focus: 'Leiderschap, stuurinformatie en betrokkenheid inrichten, met strategie als doorlopend proces.',
  },
};

/** Zelf-inschatting bij de start (gevoelsmatige fase). */
export const STAGE_CHOICES: { value: PhaseId; label: string; sub: string }[] = [
  { value: 1, label: 'We zijn net begonnen', sub: 'Idee of net gestart, nog veel aan het uitzoeken' },
  { value: 2, label: 'Onze eerste klanten', sub: 'Eerste product en eerste verkopen' },
  { value: 3, label: 'We verkopen structureel', sub: 'Groeiende omzet, sales loopt' },
  { value: 4, label: 'We schalen op', sub: 'Organisatie en team inrichten voor groei' },
];

export const ANSWER_OPTIONS: { value: 0 | 0.5 | 1; label: string }[] = [
  { value: 1, label: 'Ja' },
  { value: 0.5, label: 'Deels' },
  { value: 0, label: 'Nog niet' },
];

/* ============================================================================
 * BEHOEFTE-GESTUURDE SCAN (v2)
 * Korte flow vanuit de ondernemer: waar sta je + waar wil je mee geholpen
 * worden. Hieruit leiden we fase, programma en aanbevolen modules af. De zware
 * model-analyse blijft input voor de coach (zie /beheer), niet voor de bezoeker.
 * NB: de exacte vraagteksten worden nog vervangen door de Pitchlane-vragen.
 * ========================================================================== */

export interface Situation {
  id: PhaseId;
  label: string;
  sub: string;
}

/** Stap 1 — waar staat de ondernemer (gevoelsmatig, in eigen taal). */
export const SITUATIONS: Situation[] = [
  { id: 1, label: 'Ik heb een idee', sub: 'Ik wil weten of er echt markt en behoefte voor is' },
  { id: 2, label: 'Ik heb een product of prototype', sub: 'En ik wil het naar de markt brengen' },
  { id: 3, label: 'Ik heb mijn eerste klanten', sub: 'En ik wil structureel gaan verkopen' },
  { id: 4, label: 'Mijn bedrijf draait en groeit', sub: 'Ik wil opschalen: mensen, organisatie, strategie' },
];

export interface Need {
  id: string;
  phase: PhaseId;
  cross?: boolean; // cross-cutting (telt niet mee voor fase-bepaling)
  label: string;
  modules: string[];
}

/** Stap 2 — waar wil de ondernemer mee geholpen worden (mapt naar fase + modules). */
export const NEEDS: Need[] = [
  { id: 'klant', phase: 1, label: 'Scherp krijgen wie mijn klant is en welk probleem ik oplos', modules: ['Klant- & probleemvalidatie', 'Interviewtechnieken', 'Value Proposition Canvas'] },
  { id: 'betaalbereid', phase: 1, label: 'Testen of klanten écht voor mijn oplossing willen betalen', modules: ['Betaalbereidheid testen', 'Lean Canvas'] },
  { id: 'product', phase: 2, label: 'Mijn product of dienst aanscherpen tot iets verkoopbaars', modules: ['MVP-ontwikkeling', 'Klantreis & waardepropositie'] },
  { id: 'prijs', phase: 2, label: 'Een goede prijs en verdienmodel bepalen', modules: ['Verdienmodel & pricing', 'Marktgrootte (TAM/SAM/SOM)'] },
  { id: 'marketing', phase: 3, label: 'Klanten vinden: marketing en sales op gang krijgen', modules: ['Marketing- & salesfunnel', 'Kanalenstrategie', 'Positionering'] },
  { id: 'verkopen', phase: 3, label: 'Structureel en voorspelbaar gaan verkopen', modules: ['Herhaalbaar verkoopproces', 'Business Model Canvas', 'Sturen op omzet & metrics'] },
  { id: 'opschalen', phase: 4, label: 'Opschalen: mensen aannemen en mijn organisatie inrichten', modules: ['Organisatie- & bezettingsplan', 'Team & leiderschap'] },
  { id: 'financiering', phase: 4, label: 'Financiering en geldstromen op orde krijgen', modules: ['Cashflow & sturen op cash', 'Financieringsbegeleiding'] },
  { id: 'strategie', phase: 4, label: 'Een duidelijke strategie en toekomstplan maken', modules: ['Toekomstvisie & strategie', 'Roadmap & doelen'] },
  { id: 'netwerk', phase: 4, cross: true, label: 'Sparren met andere ondernemers en experts', modules: ['Community & events', 'Expertnetwerk'] },
];

export interface Option { value: string; label: string; sub?: string }

/** Bedrijfsbasics (context voor de coach). */
export const TEAM_SIZES: Option[] = [
  { value: 'solo', label: 'Ik werk alleen' },
  { value: 'small', label: 'Klein team (2-5)' },
  { value: 'mid', label: 'Groter team (6 of meer)' },
];

export interface TractionLevel { value: string; label: string; phase: PhaseId }
export const TRACTION: TractionLevel[] = [
  { value: 'idea', label: 'Nog geen omzet, ik ben aan het valideren', phase: 1 },
  { value: 'first', label: 'Eerste betalende klanten', phase: 2 },
  { value: 'recurring', label: 'Structurele, terugkerende omzet', phase: 3 },
  { value: 'scaling', label: 'Groeiende omzet, we schalen op', phase: 4 },
];

/** Korte zelfcheck: 5 kernpunten in plain taal (Ja/Deels/Nog niet). Geeft de coach
 *  diepte en bepaalt fase + aandachtspunten, zonder de 15-mijlpalen-overhoring. */
export interface SelfCheck { id: string; phase: PhaseId; statement: string; focus: string; module: string }
export const SELF_CHECKS: SelfCheck[] = [
  { id: 'klant', phase: 1, statement: 'Ik weet precies wie mijn klant is en welk probleem ik voor ze oplos.', focus: 'Klant en probleem scherp', module: 'Klant- & probleemvalidatie' },
  { id: 'betaal', phase: 1, statement: 'Klanten laten aantoonbaar zien dat ze voor mijn oplossing willen betalen.', focus: 'Betaalbereidheid aantonen', module: 'Betaalbereidheid testen' },
  { id: 'verdien', phase: 2, statement: 'Ik heb een helder verdienmodel en weet welke prijs ik kan vragen.', focus: 'Verdienmodel en prijs', module: 'Verdienmodel & pricing' },
  { id: 'sales', phase: 3, statement: 'Mijn marketing en verkoop lopen gestructureerd en voorspelbaar.', focus: 'Gestructureerde sales en marketing', module: 'Marketing- & salesfunnel' },
  { id: 'plan', phase: 4, statement: 'Ik heb een duidelijk plan voor mijn organisatie en groei voor de komende jaren.', focus: 'Plan voor organisatie en groei', module: 'Toekomstvisie & strategie' },
];

/** Plain-language fase-labels voor de ondernemer (geen modeljargon). */
export const PHASE_PLAIN: Record<PhaseId, { label: string; you: string }> = {
  1: { label: 'Idee & klant', you: 'Je bent je idee aan het scherpstellen en wilt zeker weten dat er behoefte is.' },
  2: { label: 'Verkoopbaar product', you: 'Je hebt iets in handen en wilt het zo aanscherpen dat klanten ervoor betalen.' },
  3: { label: 'Eerste verkopen', you: 'Je verkoopt al en wilt dat structureel en voorspelbaar maken.' },
  4: { label: 'Opschalen', you: 'Je bedrijf draait en je wilt groeien met de juiste mensen, organisatie en strategie.' },
};

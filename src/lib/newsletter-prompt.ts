const VISITS_KEY = "spc:newsletter-prompt:visits";
const STATE_KEY = "spc:newsletter-prompt:state";
const SESSION_FLAG_KEY = "spc:newsletter-prompt:session-counted";

type PromptStatus = "pending" | "subscribed" | "snoozed" | "blocked";

interface VisitsData {
  count: number;
  firstVisitAt: string;
  lastVisitAt: string;
}

interface StateData {
  status: PromptStatus;
  /** Date ISO à partir de laquelle le rappel redevient éligible (statut "snoozed") */
  snoozedUntil?: string;
}

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function writeJSON(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* noop */
  }
}

function getVisits(): VisitsData {
  return readJSON<VisitsData>(VISITS_KEY, { count: 0, firstVisitAt: "", lastVisitAt: "" });
}

function getState(): StateData {
  return readJSON<StateData>(STATE_KEY, { status: "pending" });
}

/**
 * Enregistre une nouvelle visite si ce n'est pas déjà fait pour la session
 * (onglet/navigateur) courante — évite qu'un simple rechargement de page
 * compte comme une nouvelle visite.
 */
export function registerVisitOncePerSession(): void {
  if (typeof window === "undefined") return;
  if (window.sessionStorage.getItem(SESSION_FLAG_KEY)) return;

  const visits = getVisits();
  const now = new Date().toISOString();
  writeJSON(VISITS_KEY, {
    count: visits.count + 1,
    firstVisitAt: visits.firstVisitAt || now,
    lastVisitAt: now,
  });
  window.sessionStorage.setItem(SESSION_FLAG_KEY, "1");
}

/**
 * Détermine si le modal newsletter doit être proposé maintenant :
 * - jamais si déjà abonné ou définitivement bloqué
 * - pas avant la 3ᵉ visite
 * - pas avant l'échéance d'un rappel différé ("me rappeler plus tard")
 */
export function shouldShowNewsletterPrompt(): boolean {
  const state = getState();
  if (state.status === "subscribed" || state.status === "blocked") return false;

  if (state.status === "snoozed" && state.snoozedUntil) {
    if (new Date(state.snoozedUntil) > new Date()) return false;
  }

  const visits = getVisits();
  return visits.count >= 3;
}

export function markSubscribed(): void {
  writeJSON(STATE_KEY, { status: "subscribed" satisfies PromptStatus });
}

export function markBlocked(): void {
  writeJSON(STATE_KEY, { status: "blocked" satisfies PromptStatus });
}

/** Reporte l'affichage de X jours ("me rappeler plus tard") */
export function snoozeFor(days: number): void {
  const until = new Date();
  until.setDate(until.getDate() + days);
  writeJSON(STATE_KEY, { status: "snoozed" satisfies PromptStatus, snoozedUntil: until.toISOString() });
}
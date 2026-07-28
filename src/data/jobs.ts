// src/data/jobs.ts
import { Clock, CheckCircle2, XCircle } from "lucide-react";

export type JobContractType = "cdi" | "cdd" | "stage" | "freelance" | "alternance";

export const JOB_CONTRACT_TYPES: JobContractType[] = ["cdi", "cdd", "stage", "freelance", "alternance"];

export const JOB_CONTRACT_TYPE_LABELS: Record<JobContractType, string> = {
  cdi: "CDI",
  cdd: "CDD",
  stage: "Stage",
  freelance: "Freelance",
  alternance: "Alternance",
};

export type JobWorkMode = "presentiel" | "hybride" | "teletravail";

export const JOB_WORK_MODE_LABELS: Record<JobWorkMode, string> = {
  presentiel: "Présentiel",
  hybride: "Hybride",
  teletravail: "Télétravail",
};

// --- Mapping pour JobEducationLevel ---
export type JobEducationLevel =
  | "sans_diplome"
  | "bepc"
  | "bac"
  | "bac+2"
  | "bac+3"
  | "master"
  | "doctorat";

export const JOB_EDUCATION_LEVEL_LABELS: Record<JobEducationLevel, string> = {
  sans_diplome: "Sans diplôme / Autodidacte",
  bepc: "BEPC",
  bac: "BAC",
  "bac+2": "BAC +2 (BTS, DUT, DEUG)",
  "bac+3": "BAC +3 (Licence)",
  master: "BAC +5 (Master, DEA, Ingénieur)",
  doctorat: "Doctorat (PhD)",
};

/**
 * Retourne le libellé formaté pour un niveau d'études.
 */
export function getEducationLevelLabel(level?: JobEducationLevel | string | null): string {
  if (!level) return "Non renseigné";
  if (level in JOB_EDUCATION_LEVEL_LABELS) {
    return JOB_EDUCATION_LEVEL_LABELS[level as JobEducationLevel];
  }
  return level;
}

export type APIJobOffer = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  department: string;
  contractType: JobContractType;
  workMode: JobWorkMode;
  location: string;
  numPositions: number;
  description: string;
  missions: string[];
  profile: string[];
  educationLevel: JobEducationLevel | string | null;
  salaryMin: number | null;
  salaryMax: number | null;
  expiresAt: string;
  createdAt?: string;
};

// --- Configuration des statuts de candidature ---
export type JobApplicationStatus = "pending" | "accepted" | "rejected" | string;

export const STATUS_CONFIG: Record<
  string,
  { label: string; className: string; icon: typeof Clock }
> = {
  pending: {
    label: "En attente d'examen",
    className: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    icon: Clock,
  },
  accepted: {
    label: "Candidature Retenue",
    className: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    icon: CheckCircle2,
  },
  rejected: {
    label: "Non retenue",
    className: "bg-muted text-muted-foreground border-border",
    icon: XCircle,
  },
};

export type APIJobApplication = {
  id: string;
  jobOfferId: string;
  jobOffer: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  educationLevel?: JobEducationLevel | string | null;
  coverLetter: string | null;
  coverLetterPath?: string | null;
  cvUrl: string;
  coverLetterFileUrl?: string | null;
  status: JobApplicationStatus;
  reviewedAt: string | null;
  createdAt: string;
  updatedAt: string;
};

export function isJobOfferExpired(offer: Pick<APIJobOffer, "expiresAt">): boolean {
  return new Date(offer.expiresAt) < new Date();
}

export function formatSalaryRange(min: number | null, max: number | null): string | null {
  if (!min && !max) return null;
  const fmt = (n: number) => n.toLocaleString("fr-FR");
  if (min && max) return `${fmt(min)} - ${fmt(max)} FCFA`;
  if (min) return `À partir de ${fmt(min)} FCFA`;
  return `Jusqu'à ${fmt(max as number)} FCFA`;
}
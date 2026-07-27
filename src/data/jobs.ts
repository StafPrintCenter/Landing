export type JobContractType = "cdi" | "cdd" | "stage" | "freelance" | "alternance";

export const JOB_CONTRACT_TYPES: JobContractType[] = ["cdi", "cdd", "stage", "freelance", "alternance"];

export const JOB_CONTRACT_TYPE_LABELS: Record<JobContractType, string> = {
  cdi: "CDI",
  cdd: "CDD",
  stage: "Stage",
  freelance: "Freelance",
  alternance: "Alternance",
};

export type APIJobOffer = {
  id: string;
  title: string;
  slug: string;
  department: string;
  contractType: JobContractType;
  location: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  salaryMin: number | null;
  salaryMax: number | null;
  expiresAt: string;
};

export type JobApplicationStatus = "pending" | "accepted" | "rejected" | string;

export type APIJobApplication = {
  id: string;
  jobOfferId: string;
  jobOffer: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  coverLetter: string | null;
  cvUrl: string;
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
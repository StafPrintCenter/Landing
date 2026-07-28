import { Clock, Eye, MessageCircleQuestion, CheckCircle2, XCircle, type LucideIcon } from "lucide-react";

export type InternshipRequestStatus =
  | "pending"
  | "under_review"
  | "additional_info_requested"
  | "accepted"
  | "rejected";

export const INTERNSHIP_STATUS_CONFIG: Record<InternshipRequestStatus, { label: string; className: string; icon: LucideIcon }> = {
  pending: { label: "En attente", className: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Clock },
  under_review: { label: "En cours d'examen", className: "bg-amber-500/10 text-amber-600 border-amber-500/20", icon: Eye },
  additional_info_requested: { label: "Informations demandées", className: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: MessageCircleQuestion },
  accepted: { label: "Acceptée", className: "bg-success/10 text-success border-success/20", icon: CheckCircle2 },
  rejected: { label: "Non retenue", className: "bg-muted text-muted-foreground border-border", icon: XCircle },
};

/**
 * Type aligné sur la réponse de POST /public/internships/requests/create
 * et /public/internships/requests/check
 */
export type APIInternshipRequest = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  institution: string | null;
  fieldOfStudy: string | null;
  desiredStartDate: string | null;
  duration: string | null;
  message: string | null;
  cvUrl: string | null;
  status: InternshipRequestStatus;
  infoRequestedMessage: string | null;
  reviewedAt: string | null;
  createdAt: string;
};
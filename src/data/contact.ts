export type ContactStatus = "new" | "in_progress" | "resolved" | "closed";

export const CONTACT_STATUS_LABELS: Record<ContactStatus, string> = {
  new: "Nouvelle",
  in_progress: "En cours de traitement",
  resolved: "Résolue",
  closed: "Clôturée",
};

export const CONTACT_STATUS_COLORS: Record<ContactStatus, string> = {
  new: "bg-blue-500/10 text-blue-600 border-blue-500/20",
  in_progress: "bg-amber-500/10 text-amber-600 border-amber-500/20",
  resolved: "bg-success/10 text-success border-success/20",
  closed: "bg-muted text-muted-foreground border-border",
};

/**
 * Type aligné sur la réponse de l'API publique /contact
 */
export type APIContactRequest = {
  id: string;
  ticketNumber: string;
  name: string;
  email: string;
  service: string;
  customService: string | null;
  message: string;
  adminNotes: string;
  status: ContactStatus;
  handledBy: string | null;
  handledAt: string | null;
  createdAt: string;
};
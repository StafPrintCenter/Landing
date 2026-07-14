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
  status: string;
  handledBy: string | null;
  handledAt: string | null;
  createdAt: string;
};
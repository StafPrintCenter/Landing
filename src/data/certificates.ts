export type CertificateStatus = "active" | "revoked";

/**
 * Type aligné sur la réponse de GET /public/certificates/verify/{number}
 * (réponse plate, sans enveloppe `data`)
 */
export type APICertificateVerification = {
  valid: boolean;
  studentName: string;
  trainingTitle: string;
  instructorName: string;
  issuedAt: string;
  status: CertificateStatus;
};
import type { APIReviewQuestion, ReviewAnswers } from "@/data/reviews";

export function validateQuestionAnswers(questions: APIReviewQuestion[], answers: ReviewAnswers): Record<string, string> {
  const errors: Record<string, string> = {};

  for (const q of questions) {
    const value = answers[q.id];
    const isEmpty =
      value === null ||
      value === undefined ||
      value === "" ||
      (Array.isArray(value) && value.length === 0);

    if (q.isRequired && isEmpty) {
      errors[q.id] = "Ce champ est obligatoire.";
      continue;
    }

    if (isEmpty) continue;

    if ((q.type === "short_text" || q.type === "long_text") && q.validationRules?.max_length) {
      if (String(value).length > q.validationRules.max_length) {
        errors[q.id] = `Maximum ${q.validationRules.max_length} caractères.`;
      }
    }

    if (q.type === "number" && q.validationRules) {
      const num = Number(value);
      if (q.validationRules.min !== undefined && num < q.validationRules.min) {
        errors[q.id] = `Valeur minimale : ${q.validationRules.min}.`;
      }
      if (q.validationRules.max !== undefined && num > q.validationRules.max) {
        errors[q.id] = `Valeur maximale : ${q.validationRules.max}.`;
      }
    }

    if (q.type === "email" && typeof value === "string" && !/.+@.+\..+/.test(value)) {
      errors[q.id] = "Adresse email invalide.";
    }
  }

  return errors;
}

export function validateClientInfo(clientName: string, clientEmail: string, privacyAccepted: boolean): Record<string, string> {
  const errors: Record<string, string> = {};
  if (!clientName.trim()) errors.clientName = "Votre nom est requis.";
  if (!clientEmail.trim() || !/.+@.+\..+/.test(clientEmail)) errors.clientEmail = "Adresse email invalide.";
  if (!privacyAccepted) errors.privacyAccepted = "Vous devez accepter la politique de confidentialité.";
  return errors;
}
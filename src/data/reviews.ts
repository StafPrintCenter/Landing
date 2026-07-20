export type ReviewQuestionType =
  | "short_text"
  | "long_text"
  | "email"
  | "phone"
  | "number"
  | "date"
  | "datetime"
  | "single_choice"
  | "multiple_choice"
  | "select"
  | "rating"
  | "boolean"
  | "file";

export type ReviewQuestionOption = {
  label: string;
  value: string;
};

export type ReviewValidationRules = {
  max_length?: number;
  min?: number;
  max?: number;
};

export type ReviewQuestionSettings = {
  max_size_kb?: number;
};

export type APIReviewQuestion = {
  id: string;
  type: ReviewQuestionType;
  title: string;
  description: string | null;
  order: number;
  isRequired: boolean;
  validationRules: ReviewValidationRules | null;
  options: ReviewQuestionOption[] | null;
  settings: ReviewQuestionSettings | null;
};

/**
 * Type aligné sur la réponse de GET /public/reviews/{token}
 */
export type APIReviewFormPublic = {
  id: string;
  title: string;
  description: string | null;
  allowResponseEdit: boolean;
  questions: APIReviewQuestion[];
};

/** Infos du client destinataire de l'invitation — pré-remplies, éditables */
export type APIReviewClientInfo = {
  name: string;
  email: string;
  project: string;
};

/**
 * Valeurs de réponses déjà soumises — mêmes clés que question.id, mais toujours
 */
export type ReviewExistingAnswers = Record<string, string | number | boolean | string[] | null>;

/**
 * Type aligné sur la réponse réelle de GET /public/reviews/{token} :
 */
export type APIReviewInvitationDetails = {
  client: APIReviewClientInfo;
  form: APIReviewFormPublic;
  /** true si une réponse a déjà été soumise ET que le formulaire autorise sa modification */
  isEditMode: boolean;
  /** Réponses précédemment soumises, à pré-remplir si isEditMode est true */
  existingAnswers: ReviewExistingAnswers | null;
  existingAllowPublication: boolean;
};

export type ReviewInvitationStatus = "pending" | "opened" | "completed" | "expired" | "revoked";

/** Valeur de réponse selon le type de question */
export type ReviewAnswerValue = string | number | boolean | string[] | File | null;

export type ReviewAnswers = Record<string, ReviewAnswerValue>;
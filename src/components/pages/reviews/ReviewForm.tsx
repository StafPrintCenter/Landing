import { useState } from "react";
import { Loader2, AlertCircle, Send } from "lucide-react";
import { QuestionRenderer } from "./QuestionRenderer";
import { ClientInfoFields } from "./ClientInfoFields";
import { validateQuestionAnswers, validateClientInfo } from "./validate-answers";
import { ReviewSubmittedState } from "./states/SubmittedState";
import { submitReviewResponse, editReviewResponse } from "@/stores/useReviewsStore";
import type { APIReviewFormPublic, ReviewAnswers, ReviewAnswerValue } from "@/data/reviews";

interface ReviewFormProps {
  token: string;
  form: APIReviewFormPublic;
  /** true si l'utilisateur a déjà répondu et vient modifier sa réponse (PUT au lieu de POST) */
  isEditing?: boolean;
}

export function ReviewForm({ token, form, isEditing = false }: ReviewFormProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [allowPublication, setAllowPublication] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);

  const [answers, setAnswers] = useState<ReviewAnswers>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const sortedQuestions = [...form.questions].sort((a, b) => a.order - b.order);

  const setAnswer = (questionId: string, value: ReviewAnswerValue) => {
    setAnswers((prev) => ({ ...prev, [questionId]: value }));
    setErrors((prev) => {
      if (!prev[questionId]) return prev;
      const next = { ...prev };
      delete next[questionId];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const questionErrors = validateQuestionAnswers(sortedQuestions, answers);
    const clientErrors = isEditing ? {} : validateClientInfo(clientName, clientEmail, privacyAccepted);
    const allErrors = { ...questionErrors, ...clientErrors };

    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await editReviewResponse(token, { answers, allowPublication });
      } else {
        await submitReviewResponse(token, { clientName, clientEmail, answers, allowPublication, privacyAccepted });
      }
      setSubmitted(true);
    } catch {
      setSubmitError("Une erreur est survenue lors de l'envoi. Merci de réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return <ReviewSubmittedState />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:items-start">
      {/* Colonne gauche : identité + consentements */}
      {!isEditing && (
        <div className="rounded-2xl border border-border bg-card p-6">
          <ClientInfoFields
            clientName={clientName}
            onClientNameChange={setClientName}
            clientEmail={clientEmail}
            onClientEmailChange={setClientEmail}
            allowPublication={allowPublication}
            onAllowPublicationChange={setAllowPublication}
            privacyAccepted={privacyAccepted}
            onPrivacyAcceptedChange={setPrivacyAccepted}
            errors={errors}
          />
        </div>
      )}

      {/* Colonne droite : questions du formulaire */}
      <div className={`space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8 ${isEditing ? "lg:col-span-2" : ""}`}>
        {isEditing && (
          <label className="flex items-start gap-2 border-b border-border pb-4 text-xs text-foreground/70 cursor-pointer">
            <input
              type="checkbox"
              checked={allowPublication}
              onChange={(e) => setAllowPublication(e.target.checked)}
              className="mt-0.5 cursor-pointer"
            />
            <span>J'accepte que mon avis soit publié publiquement sur le site {SITE.name}.</span>
          </label>
        )}

        {sortedQuestions.map((q) => (
          <QuestionRenderer
            key={q.id}
            question={q}
            value={answers[q.id] ?? null}
            onChange={(value) => setAnswer(q.id, value)}
            error={errors[q.id]}
          />
        ))}

        {submitError && (
          <div className="flex items-start gap-2 rounded-lg bg-destructive/10 px-3 py-2.5 text-xs text-destructive">
            <AlertCircle size={14} className="mt-0.5 shrink-0" />
            <p>{submitError}</p>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:opacity-60 cursor-pointer"
        >
          {isSubmitting ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Envoi…
            </>
          ) : (
            <>
              <Send size={16} /> {isEditing ? "Mettre à jour mon avis" : "Envoyer mon avis"}
            </>
          )}
        </button>
      </div>
    </form>
  );
}
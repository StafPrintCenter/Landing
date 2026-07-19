import { useState } from "react";
import { Loader2, AlertCircle, Send } from "lucide-react";
import { QuestionRenderer } from "./QuestionRenderer";
import { validateAnswers } from "./validate-answers";
import { ReviewSubmittedState } from "./states/SubmittedState";
import { submitReviewResponse } from "@/stores/useReviewsStore";
import type { APIReviewFormPublic, ReviewAnswers, ReviewAnswerValue } from "@/data/reviews";

interface ReviewFormProps {
  token: string;
  form: APIReviewFormPublic;
}

export function ReviewForm({ token, form }: ReviewFormProps) {
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

    const validationErrors = validateAnswers(sortedQuestions, answers);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitReviewResponse(token, answers);
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
    <form onSubmit={handleSubmit} className="space-y-6 rounded-2xl border border-border bg-card p-6 md:p-8">
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
            <Send size={16} /> Envoyer mon avis
          </>
        )}
      </button>
    </form>
  );
}
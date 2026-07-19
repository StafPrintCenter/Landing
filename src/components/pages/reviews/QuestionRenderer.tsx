import { QuestionField } from "./QuestionField";
import { TextQuestion } from "./questions/TextQuestion";
import { ContactQuestion } from "./questions/ContactQuestion";
import { NumberQuestion } from "./questions/NumberQuestion";
import { DateQuestion } from "./questions/DateQuestion";
import { ChoiceQuestion } from "./questions/ChoiceQuestion";
import { RatingQuestion } from "./questions/RatingQuestion";
import { BooleanQuestion } from "./questions/BooleanQuestion";
import { FileQuestion } from "./questions/FileQuestion";
import type { APIReviewQuestion, ReviewAnswerValue } from "@/data/reviews";

interface QuestionRendererProps {
  question: APIReviewQuestion;
  value: ReviewAnswerValue;
  onChange: (value: ReviewAnswerValue) => void;
  error?: string;
}

export function QuestionRenderer({ question, value, onChange, error }: QuestionRendererProps) {
  return (
    <QuestionField question={question} error={error}>
      {(() => {
        switch (question.type) {
          case "short_text":
          case "long_text":
            return <TextQuestion question={question} value={(value as string) ?? ""} onChange={onChange} />;
          case "email":
          case "phone":
            return <ContactQuestion type={question.type} value={(value as string) ?? ""} onChange={onChange} />;
          case "number":
            return <NumberQuestion question={question} value={(value as string) ?? ""} onChange={onChange} />;
          case "date":
          case "datetime":
            return <DateQuestion type={question.type} value={(value as string) ?? ""} onChange={onChange} />;
          case "single_choice":
          case "multiple_choice":
          case "select":
            return (
              <ChoiceQuestion
                question={question}
                value={(value as string | string[]) ?? (question.type === "multiple_choice" ? [] : "")}
                onChange={onChange}
              />
            );
          case "rating":
            return <RatingQuestion value={(value as number) ?? 0} onChange={onChange} />;
          case "boolean":
            return <BooleanQuestion value={(value as boolean) ?? null} onChange={onChange} />;
          case "file":
            return <FileQuestion question={question} value={(value as File) ?? null} onChange={onChange} error={error} />;
          default:
            return <p className="text-xs text-destructive">Type de question non pris en charge : {question.type}</p>;
        }
      })()}
    </QuestionField>
  );
}
import { Mail } from "lucide-react";
import { SITE } from "@/data/site";

interface LegalContactCardProps {
  question: string;
}

export function LegalContactCard({ question }: LegalContactCardProps) {
  return (
    <article className="rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-center md:p-8">
      <p className="text-sm text-muted-foreground">{question}</p>
      <a
        href={`mailto:${SITE.email}`}
        className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
      >
        <Mail size={14} />
        {SITE.email}
      </a>
    </article>
  );
}
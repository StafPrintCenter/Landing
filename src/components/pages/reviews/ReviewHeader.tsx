import { MessageSquareText } from "lucide-react";
import { Reveal } from "@/components/site/Reveal";

interface ReviewHeaderProps {
  title: string;
  description: string | null;
}

export function ReviewHeader({ title, description }: ReviewHeaderProps) {
  return (
    <Reveal>
      <div className="mx-auto max-w-2xl text-center">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
          <MessageSquareText size={14} /> Formulaire d'avis
        </span>
        <h1 className="mt-4 text-2xl md:text-4xl font-bold tracking-tight">{title}</h1>
        {description && <p className="mt-3 text-muted-foreground">{description}</p>}
      </div>
    </Reveal>
  );
}
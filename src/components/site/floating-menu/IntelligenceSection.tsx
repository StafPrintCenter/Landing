import { SITE_LINK } from "@/data/site";
import { Bot, Sparkles, ExternalLink } from "lucide-react";

export function IntelligenceSection() {
  return (
    <div className="space-y-2 border-t border-border pt-3">
      <div className="flex items-center gap-1.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
          SPC Intelligence
        </span>
        <Sparkles size={12} className="text-amber-500 animate-pulse" />
      </div>

      <a
        href={SITE_LINK.aiUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 text-sm font-medium text-foreground transition hover:bg-primary/10 cursor-pointer"
      >
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
          <Bot size={20} />
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex items-center gap-1">
            <p className="text-xs font-semibold text-foreground">Assistant IA</p>
            <ExternalLink size={10} className="text-muted-foreground" />
          </div>
          <p className="truncate text-[11px] text-muted-foreground"> Posez vos questions à l'IA</p>
        </div>
      </a>
    </div>
  );
}
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { STEPS } from "./types";

interface StepperProps {
  step: number;
}

export function Stepper({ step }: StepperProps) {
  return (
    <div className="mt-10 mx-auto max-w-3xl">
      <ol className="flex items-center justify-between gap-2">
        {STEPS.map((label, i) => {
          const done = i < step;
          const active = i === step;
          return (
            <li key={label} className="flex-1 flex items-center gap-2">
              <div
                className={cn(
                  "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold border transition-colors",
                  done && "bg-primary text-primary-foreground border-primary",
                  active && "border-primary text-primary bg-primary/10",
                  !done && !active && "border-border text-muted-foreground",
                )}
              >
                {done ? <Check size={14} /> : i + 1}
              </div>
              <span
                className={cn(
                  "hidden sm:block text-sm",
                  active ? "font-semibold text-foreground" : "text-muted-foreground",
                )}
              >
                {label}
              </span>
              {i < STEPS.length - 1 && <div className="flex-1 h-px bg-border ml-2" />}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
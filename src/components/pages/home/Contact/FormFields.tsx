import React from "react";

interface CharacterCounterProps {
  current: number;
  min: number;
  max: number;
}

export function CharacterCounter({ current, min, max }: CharacterCounterProps) {
  let colorClass = "text-muted-foreground";

  if (current === 0) {
    colorClass = "text-muted-foreground";
  } else if (current < min) {
    colorClass = "text-red-500 font-medium";
  } else if (current >= max) {
    colorClass = "text-red-500 font-bold";
  } else if (current >= max * 0.8) {
    colorClass = "text-pink-500 font-medium";
  }

  return (
    <span className={`text-xs transition-colors duration-200 select-none ${colorClass}`}>
      {current}/{max}
    </span>
  );
}

interface FieldProps {
  label: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
  counter?: React.ReactNode;
  counterPosition?: "right" | "bottom-right";
}

export function Field({
  label,
  error,
  children,
  className = "",
  counter,
  counterPosition = "right",
}: FieldProps) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium">{label}</span>
      <div className="relative flex items-center">
        {children}
        {counter && (
          <div
            className={`absolute right-3 pointer-events-none bg-card/90 px-1.5 py-0.5 rounded text-right z-10
              ${counterPosition === "right" ? "top-1/2 -translate-y-1/2" : "bottom-2"}`}
          >
            {counter}
          </div>
        )}
      </div>
      {error && <span className="mt-1 block text-xs text-destructive">{error}</span>}
    </label>
  );
}
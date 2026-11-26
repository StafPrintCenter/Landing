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
    <span className={`text-[10px] transition-colors duration-200 select-none ${colorClass}`}>
      {current}/{max}
    </span>
  );
}
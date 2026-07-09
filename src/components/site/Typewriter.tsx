import { useEffect, useState } from "react";

export function Typewriter({ words, className }: { words: string[]; className?: string }) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);

  useEffect(() => {
    const word = words[i % words.length];
    const speed = del ? 45 : 90;
    const id = setTimeout(() => {
      if (!del) {
        const next = word.slice(0, text.length + 1);
        setText(next);
        if (next === word) setTimeout(() => setDel(true), 1200);
      } else {
        const next = word.slice(0, Math.max(0, text.length - 1));
        setText(next);
        if (next.length === 0) { setDel(false); setI((v) => v + 1); }
      }
    }, speed);
    return () => clearTimeout(id);
  }, [text, del, i, words]);

  return (
    <span className={className}>
      {text}
      <span className="ml-0.5 inline-block w-0.5 h-[0.9em] -mb-1 bg-current animate-pulse" />
    </span>
  );
}
import { Pencil } from "lucide-react";

export function EditModeBanner() {
  return (
    <div className="mx-auto mb-6 flex w-fit items-center gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 px-4 py-3 text-sm text-amber-700 dark:text-amber-400">
      <Pencil size={16} className="shrink-0" />
      <p>
        Vous modifiez un avis déjà envoyé. Vous pouvez les ajuster avant de valider à nouveau.
      </p>
    </div>
  );
}
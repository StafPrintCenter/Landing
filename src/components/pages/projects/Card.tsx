import { motion } from "framer-motion";
import { getDisciplineColor, type APIProject } from "@/data/projects";

interface RealisationHomeCardProps {
  project: APIProject;
  onClick: () => void;
}

export function RealisationHomeCard({ project, onClick }: RealisationHomeCardProps) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
      className="group overflow-hidden rounded-2xl border border-border bg-card text-left cursor-pointer"
    >
      <div className="aspect-4/3 overflow-hidden">
        <img
          src={project.cover}
          alt={project.title}
          loading="lazy"
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
        />
      </div>
      <div className="p-5">
        <span
          className={[
            "w-fit rounded-full border px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wider",
            getDisciplineColor(project.category),
          ].join(" ")}
        >
          {project.category}
        </span>
        <h3 className="mt-1.5 font-display text-lg font-semibold">{project.title}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{project.client}</p>
      </div>
    </motion.button>
  );
}
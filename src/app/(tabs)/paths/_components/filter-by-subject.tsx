import Link from "next/link";
import type { Tables } from "@/lib/supabase/database.types";

type PathOption = Pick<Tables<"paths">, "subject" | "label">;

type FilterBySubjectProps = {
  paths: PathOption[];
};

const chipClassName = (isActive: boolean) =>
  `flex min-h-11 shrink-0 items-center rounded-full px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
    isActive ? "bg-ink font-bold text-white" : "bg-white text-ink"
  }`;

export default function FilterBySubject({ paths }: FilterBySubjectProps) {
  const isAllActive = false; // TODO: quando è attiva "Tutte"?

  return (
    <nav
      aria-label="Filtra per materia"
      className="flex gap-2 overflow-x-auto pb-2"
    >
      <Link
        href="/paths" // TODO: verifica che sia l'URL giusto per "Tutte"
        aria-current={isAllActive ? "page" : undefined}
        className={chipClassName(isAllActive)}
      >
        Tutte
      </Link>

      {paths.map((path) => {
        const isActive = false; // TODO: quando è attiva questa materia?

        return (
          <Link
            key={path.subject}
            href="/paths" // TODO: l'URL con il query param di questa materia
            aria-current={isActive ? "page" : undefined}
            className={chipClassName(isActive)}
          >
            {path.label}
          </Link>
        );
      })}
    </nav>
  );
}

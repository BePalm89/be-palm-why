import Link from "next/link";
import type { Tables } from "@/lib/supabase/database.types";

type PathOption = Pick<Tables<"paths">, "subject" | "label">;

type FilterBySubjectProps = {
  paths: PathOption[];
  subjectParam: string | null;
};

const chipClassName = (isActive: boolean) =>
  `flex min-h-11 shrink-0 items-center rounded-full px-4 text-[15px] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
    isActive ? "bg-ink font-bold text-white" : "bg-white text-ink"
  }`;

export default function FilterBySubject({
  paths,
  subjectParam,
}: FilterBySubjectProps) {
  const isAllActive = subjectParam === null;

  return (
    <nav
      aria-label="Filtra per materia"
      className="flex gap-2 overflow-x-auto pb-2"
    >
      <Link
        href="/paths"
        aria-current={isAllActive ? "page" : undefined}
        className={chipClassName(isAllActive)}
      >
        Tutte
      </Link>

      {paths.map((path) => {
        const isActive = subjectParam === path.subject;

        return (
          <Link
            key={path.subject}
            href={`/paths?subject=${encodeURIComponent(path.subject)}`}
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

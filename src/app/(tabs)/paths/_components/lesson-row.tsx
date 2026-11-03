import { Lesson } from "./subject-section";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { formatDayMonth } from "@/lib/utils/date";

type LessonRowProps = Lesson & {
  color: string | null;
};

export default function LessonRow({
  step,
  title,
  date,
  id,
  color,
}: LessonRowProps) {
  const formattedDate = formatDayMonth(date);
  const subjectColor = color ?? "var(--color-ink)";

  return (
    <Link
      href={`/lessons/${id}`}
      className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      <div className="flex min-h-15 items-center gap-3.5 py-2">
        <p
          className="flex size-9 shrink-0 items-center justify-center rounded-[10px] font-heading text-base font-bold"
          style={{
            color: subjectColor,
            backgroundColor: `color-mix(in srgb, ${subjectColor} 14%, white)`,
          }}
        >
          <span className="sr-only">Tappa {step ?? "non assegnata"}</span>
          <span aria-hidden="true">{step ?? "–"}</span>
        </p>
        <div className="flex min-w-0 grow flex-col gap-0.5">
          <p className="text-base font-bold">{title}</p>
          <p className="text-sm text-muted">{formattedDate}</p>
        </div>
        <ChevronRight
          size={20}
          aria-hidden="true"
          className="shrink-0 text-muted"
        />
      </div>
    </Link>
  );
}

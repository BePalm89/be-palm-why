import LessonRow from "./lesson-row";
import type { Lesson } from "@/lib/types/lesson";

export type LessonItem = Pick<Lesson, "id" | "step" | "title" | "date">;

export type SubjectSectionProps = {
  color: string | null;
  labelSubject: string;
  lessons: LessonItem[];
  totalStep: number;
  stepDone: number;
};

export default function SubjectSection({
  color,
  labelSubject,
  lessons,
  totalStep,
  stepDone,
}: SubjectSectionProps) {
  const screenReaderProgressLabel =
    stepDone === 1
      ? `${stepDone} tappa fatta su ${totalStep}`
      : `${stepDone} tappe fatte su ${totalStep}`;

  return (
    <section className="flex flex-col gap-2.5">
      <div className="flex items-baseline justify-between">
        <h2 className="flex items-center gap-2 font-heading text-xl font-bold">
          <span
            aria-hidden="true"
            className="size-2.5 shrink-0 rounded-full"
            style={{ backgroundColor: color ?? "var(--color-ink)" }}
          />
          {labelSubject}
        </h2>
        <p className="sr-only">{screenReaderProgressLabel}</p>
        <p className="text-sm text-muted" aria-hidden="true">
          {stepDone} / {totalStep}
        </p>
      </div>

      {lessons.length ? (
        <ul className="divide-y divide-track rounded-[20px] bg-white px-4.5">
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <LessonRow {...lesson} color={color} />
            </li>
          ))}
        </ul>
      ) : (
        <p className="rounded-[20px] bg-white px-4.5 py-4 text-[15px] text-muted">
          Non hai ancora nessuna lezione per questo percorso
        </p>
      )}
    </section>
  );
}

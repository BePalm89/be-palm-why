import LessonRow from "./lesson-row";

export type Lesson = {
  step: number | null;
  title: string;
  date: string;
  id: string;
};
export type SubjectSectionProps = {
  color: string | null;
  labelSubject: string;
  lessons: Lesson[];
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
        <p className="text-sm text-muted">
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

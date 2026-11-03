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
    <section className="mt-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-4 w-4 rounded-full"
            style={{
              backgroundColor: color ?? "var(--color-ink)",
            }}
          ></div>
          <h3 className="text-2xl">{labelSubject}</h3>
        </div>
        <div>
          <p>
            {stepDone} / {totalStep}
          </p>
        </div>
      </div>
      {lessons.length ? (
        <ul>
          {lessons.map((lesson) => (
            <li key={lesson.id}>
              <LessonRow {...lesson} />
            </li>
          ))}
        </ul>
      ) : (
        <p>Non hai ancora nessuna lezione per questo percorso</p>
      )}
    </section>
  );
}

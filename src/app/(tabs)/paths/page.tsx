import { Suspense } from "react";
import LessonsBySubject from "./_components/lessons-by-subject";
import LessonsBySubjectSkeleton from "./_components/lessons-by-subject-skeleton";

export default function PathsPage() {
  return (
    <div className="mb-3 flex flex-col gap-5">
      <div className="mt-4 flex flex-col gap-1">
        <h1 className="font-heading text-[30px] leading-[1.1] font-bold">
          Percorsi
        </h1>
        <p className="text-[15px] text-muted">
          Le tue lezioni, materia per materia
        </p>
      </div>

      <Suspense fallback={<LessonsBySubjectSkeleton />}>
        <LessonsBySubject />
      </Suspense>
    </div>
  );
}

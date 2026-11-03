import { Suspense } from "react";
import LessonsBySubject from "./_components/lessons-by-subject";

export default function PathsPage() {
  return (
    <>
      <h1>Percorsi</h1>
      <p>Le tue lezioni, materia per materia</p>
      <Suspense fallback={<p>caricando</p>}>
        <LessonsBySubject />
      </Suspense>
    </>
  );
}

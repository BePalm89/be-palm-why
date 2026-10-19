import { Suspense } from "react";
import LatestLesson from "./_components/latest-lesson";

export default function TodayPage() {
  return (
    <div>
      <h1>Oggi</h1>
      <Suspense fallback={<p>Caricamento</p>}>
        <LatestLesson />
      </Suspense>
    </div>
  );
}

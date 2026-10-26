import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Lesson from "./_components/lesson";
import LessonContentSkeleton from "./_components/lesson-content-skeleton";

export default function LessonPage({ params }: PageProps<"/lessons/[id]">) {
  return (
    <div className="flex-1 bg-white">
      <div className="mx-auto flex w-full max-w-md flex-col">
        <header className="flex items-center justify-between px-5 pt-5 pb-3">
          <Link
            href="/"
            className="flex size-11 items-center justify-center rounded-xl bg-paper text-ink"
            aria-label="Torna a Oggi"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </Link>
        </header>

        <main>
          <Suspense fallback={<LessonContentSkeleton />}>
            <Lesson params={params} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}

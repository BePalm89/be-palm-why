import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";
import Lesson from "./_components/lesson";

export default function LessonPage({ params }: PageProps<"/lessons/[id]">) {
  return (
    <>
      <header className="mt-4">
        <Link
          href={`/`}
          className="rounded-xl bg-paper"
          aria-label="Torna a Oggi"
        >
          <ChevronLeft size={44} aria-hidden="true" />
        </Link>
      </header>
      <Suspense fallback={<p>Caricando</p>}>
        <Lesson params={params} />
      </Suspense>
    </>
  );
}

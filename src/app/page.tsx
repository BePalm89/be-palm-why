import { Suspense } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";

export default function HomePage() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-3xl font-semibold">Perché?</h1>
      <Suspense fallback={<LessonListSkeleton />}>
        <LessonList />
      </Suspense>
    </main>
  );
}

async function LessonList() {
  const supabase = await createClient();
  const { data: lessons, error } = await supabase
    .from("lessons")
    .select("id, date, subject, title, main_idea, subject_label")
    .order("date", { ascending: false });

  if (error || !lessons) {
    return <p className="text-red-600">Non riesco a caricare le lezioni.</p>;
  }

  if (lessons.length === 0) {
    return <p className="text-neutral-500">Ancora nessuna lezione.</p>;
  }

  return (
    <ul className="flex flex-col gap-3">
      {lessons.map((lesson) => (
        <li key={lesson.id}>
          <Link
            href={`/lessons/${lesson.id}`}
            className="block rounded-xl border border-neutral-200 p-4 transition hover:bg-neutral-50 dark:border-neutral-800 dark:hover:bg-neutral-900"
          >
            <p className="text-sm text-neutral-500">
              {formatDate(lesson.date)} · {lesson.subject_label}
            </p>
            <h2 className="text-lg font-medium">{lesson.title}</h2>
            {lesson.main_idea && (
              <p className="mt-1 text-neutral-600 dark:text-neutral-400">
                {lesson.main_idea}
              </p>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
}

function LessonListSkeleton() {
  return (
    <ul className="flex flex-col gap-3">
      {[1, 2, 3].map((i) => (
        <li
          key={i}
          className="h-24 animate-pulse rounded-xl bg-neutral-100 dark:bg-neutral-900"
        />
      ))}
    </ul>
  );
}
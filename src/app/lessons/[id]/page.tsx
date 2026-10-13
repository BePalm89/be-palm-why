import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/format";
import Markdown from "react-markdown";

type Props = { params: Promise<{ id: string }> };

export default function LessonPage({ params }: Props) {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <Link href="/" className="text-sm text-neutral-500 hover:underline">
        ← Tutte le lezioni
      </Link>
      <Suspense fallback={<p className="mt-6 text-neutral-500">Caricamento…</p>}>
        <Lesson params={params} />
      </Suspense>
    </main>
  );
}

async function Lesson({ params }: Props) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!lesson) notFound();

  return (
    <article className="mt-6 flex flex-col gap-6">
      <header>
        <p className="text-sm text-neutral-500">
          {formatDate(lesson.date)} · {lesson.subject_label}
        </p>
        <h1 className="text-3xl font-semibold">{lesson.title}</h1>
        {lesson.main_idea && (
          <p className="mt-2 text-lg text-neutral-600 dark:text-neutral-400">
            {lesson.main_idea}
          </p>
        )}
      </header>

      <div className="flex flex-col gap-4 leading-relaxed [&_ol]:list-decimal [&_ol]:pl-5 [&_strong]:font-semibold">
        <Markdown>{lesson.body}</Markdown>
      </div>

      {lesson.kid_version && (
        <section className="rounded-xl bg-amber-50 p-4 dark:bg-amber-950">
          <h2 className="mb-2 font-medium">Per Luca</h2>
          <p className="whitespace-pre-line">{lesson.kid_version}</p>
        </section>
      )}

      {lesson.fun_facts.length > 0 && (
        <section>
          <h2 className="mb-2 font-medium">Curiosità</h2>
          <ul className="list-disc pl-5">
            {lesson.fun_facts.map((fact: string) => (
              <li key={fact}>{fact}</li>
            ))}
          </ul>
        </section>
      )}

      {lesson.next_step && (
        <p className="text-neutral-500">Prossima tappa: {lesson.next_step}</p>
      )}
    </article>
  );
}
import { createClient } from "@/lib/supabase/server";
import { isValidLessonId } from "@/lib/utils/lesson-id";
import { notFound } from "next/navigation";
import LessonContent, { type LessonContentProps } from "./lesson-content";

type LessonRow = NonNullable<Awaited<ReturnType<typeof getLesson>>["data"]>;

type LessonProps = {
  params: Promise<{
    id: string;
  }>;
};
export default async function Lesson({ params }: LessonProps) {
  const { id } = await params;

  if (!isValidLessonId(id)) notFound();

  const { data, error } = await getLesson(id);

  if (error) throw error;

  if (!data) notFound();

  const lesson = mapLesson(data);

  return <LessonContent {...lesson} />;
}

const getLesson = async (id: string) => {
  const supabase = await createClient();

  const response = await supabase
    .from("lessons")
    .select("title, subject_label, main_idea, step")
    .eq("id", id)
    .maybeSingle();

  return response;
};

const mapLesson = (data: LessonRow): LessonContentProps => {
  return {
    title: data.title,
    subject: data.subject_label,
    step: data.step,
    mainIdea: data.main_idea,
  };
};

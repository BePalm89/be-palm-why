import { createClient } from "@/lib/supabase/server";
import { isValidLessonId } from "@/lib/utils/lesson-id";
import { notFound } from "next/navigation";

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

  return <p>{data.title}</p>;
}

const getLesson = async (id: string) => {
  const supabase = await createClient();

  const response = await supabase
    .from("lessons")
    .select("id, title, subject_label, main_idea, step")
    .eq("id", id)
    .maybeSingle();

  return response;
};

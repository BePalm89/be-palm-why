import { createClient } from "@/lib/supabase/server";
import LessonCard, { type LessonCardProps } from "./lesson-card";

type LatestLessonRow = NonNullable<
  Awaited<ReturnType<typeof getLatestLesson>>["data"]
>;

export default async function LatestLesson() {
  const { data, error } = await getLatestLesson();

  if (error) {
    throw error;
  }

  if (!data) {
    return <p>Nessuna lezione</p>;
  }

  const lesson = mapLesson(data);

  return <LessonCard {...lesson} />;
}

const mapLesson = (data: LatestLessonRow): LessonCardProps => {
  return {
    id: data.id,
    title: data.title,
    subject: data.subject_label,
    step: data.step,
    mainIdea: data.main_idea,
  };
};

const getLatestLesson = async () => {
  const supabase = await createClient();

  const response = await supabase
    .from("lessons")
    .select("id, title, step, main_idea, subject_label")
    .order("date", { ascending: false })
    .limit(1)
    .maybeSingle();

  return response;
};

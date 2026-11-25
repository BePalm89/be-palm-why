import type { Lesson } from "@/lib/types/lesson";

type LessonItem = Pick<Lesson, "id" | "title" | "step" | "subject" | "date">;

export const groupLessonsBySubject = (
  lessons: LessonItem[],
): Record<string, Omit<LessonItem, "subject">[]> => {
  const result: Record<string, Omit<LessonItem, "subject">[]> = {};

  for (const lesson of lessons) {
    if (!Object.hasOwn(result, lesson.subject)) {
      result[lesson.subject] = [];
    }

    result[lesson.subject].push({
      id: lesson.id,
      title: lesson.title,
      date: lesson.date,
      step: lesson.step,
    });
  }

  return result;
};

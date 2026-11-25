import type { Lesson } from "@/lib/types/lesson";

type LessonItem = Pick<Lesson, "subject" | "step">;

export const groupStepsBySubject = (
  lessons: LessonItem[],
): Record<string, (number | null)[]> => {
  const result: Record<string, (number | null)[]> = {};

  for (const lesson of lessons) {
    if (!Object.hasOwn(result, lesson.subject)) {
      result[lesson.subject] = [];
    }

    result[lesson.subject].push(lesson.step);
  }

  return result;
};

import type { Lesson } from "@/lib/types/lesson";

type LessonItem = Pick<Lesson, "id" | "title" | "step" | "subject" | "date">;

export const sortLessonsByStep = (lessons: LessonItem[]): LessonItem[] => {
  return [...lessons].sort((a, b) => {
    if (a.step === b.step) return a.date.localeCompare(b.date);

    if (a.step === null) return 1;
    if (b.step === null) return -1;

    return a.step - b.step;
  });
};

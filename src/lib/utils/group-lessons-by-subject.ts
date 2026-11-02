type Lesson = {
  id: string;
  title: string;
  date: string;
  step: number | null;
  subject: string;
};

export const groupLessonsBySubject = (
  lessons: Lesson[],
): Record<string, Omit<Lesson, "subject">[]> => {
  const result: Record<string, Omit<Lesson, "subject">[]> = {};

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

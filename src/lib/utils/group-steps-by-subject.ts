type Lesson = {
  subject: string;
  step: number | null;
};

export const groupStepsBySubject = (
  lessons: Lesson[],
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

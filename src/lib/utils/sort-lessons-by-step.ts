type Lesson = {
  id: string;
  title: string;
  date: string;
  step: number | null;
  subject: string;
};

export const sortLessonsByStep = (lessons: Lesson[]): Lesson[] => {
  return [...lessons].sort((a, b) => {
    if (a.step === b.step) return a.date.localeCompare(b.date);

    if (a.step === null) return 1;
    if (b.step === null) return -1;

    return a.step - b.step;
  });
};

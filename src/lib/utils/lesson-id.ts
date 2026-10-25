import { z } from "zod";

export const isValidLessonId = (id: string): boolean => {
  return z.uuid().safeParse(id).success;
};

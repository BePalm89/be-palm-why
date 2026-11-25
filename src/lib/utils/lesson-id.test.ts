import { describe, it, expect } from "vitest";
import { isValidLessonId } from "./lesson-id";

describe("isValidLessonId", () => {
  it.each([
    { id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", expected: true },
    { id: "1B9D6BCD-BBFD-4B2D-9B5D-AB8DFBBD4BED", expected: true },
    { id: "", expected: false },
    { id: "1b9d6bcd-bbfd", expected: false },
    { id: "ciao", expected: false },
    { id: "1B9dD6BCD-bbfd-4b2d-9b5d-ab8dfbbd4bed", expected: false },
    { id: " 1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed", expected: false },
    { id: "1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bedDD", expected: false },
  ])('returns "$expected" when id is $id', ({ id, expected }) => {
    expect(isValidLessonId(id)).toBe(expected);
  });
});

import { describe, it, expect } from "vitest";
import { sortLessonsByStep } from "./sort-lessons-by-step";

const lesson = (
  id: string,
  title: string,
  step: number | null,
  date: string,
) => ({
  id,
  title,
  subject: "fisica",
  step,
  date,
});

const galileo = lesson("1", "Galileo", 1, "2026-10-10");
const numeriPrimi = lesson("2", "Numeri primi", 1, "2026-10-11");
const newton = lesson("3", "Newton", 2, "2026-10-17");

const cases = [
  {
    name: "orders by step and, with the same step, puts the older first",
    lessons: [numeriPrimi, newton, galileo],
    expected: ["1", "2", "3"],
  },
  {
    name: "puts lessons without step at the end",
    lessons: [{ ...galileo, step: null }, newton, numeriPrimi],
    expected: ["2", "3", "1"],
  },
  {
    name: "orders lessons without step by date, older first",
    lessons: [
      { ...newton, step: null },
      { ...galileo, step: null },
      numeriPrimi,
    ],
    expected: ["2", "1", "3"],
  },
];

describe("sortLessonByStep", () => {
  it.each(cases)(
    "returns $expected when the lessons are $name",
    ({ lessons, expected }) => {
      const result = sortLessonsByStep(lessons);
      const ids = result.map((l) => l.id);

      expect(ids).toEqual(expected);
    },
  );

  it("does not mutate the original input array", () => {
    const input = [numeriPrimi, newton, galileo];

    const originalIds = input.map((lesson) => lesson.id);

    sortLessonsByStep(input);

    const idsAfter = input.map((lesson) => lesson.id);

    expect(idsAfter).toEqual(originalIds);
  });
});

import { describe, it, expect } from "vitest";
import { formatDate, isToday } from "./date";

describe("formatDate", () => {
  it.each([
    { date: new Date("2026-10-20T06:00:00Z"), expected: "Martedì 20 ottobre" },
    { date: new Date("2026-10-19T22:30:00Z"), expected: "Martedì 20 ottobre" },
    { date: new Date("2026-10-20T21:59:00Z"), expected: "Martedì 20 ottobre" },
  ])('returns "$expected" when date is $date', ({ date, expected }) => {
    expect(formatDate(date)).toBe(expected);
  });
});

describe("isToday", () => {
  it.each([
    {
      lessonDate: "2026-10-20",
      now: new Date("2026-10-20T06:00:00Z"),
      expected: true,
    },
    {
      lessonDate: "2026-10-19",
      now: new Date("2026-10-20T06:00:00Z"),
      expected: false,
    },
    {
      lessonDate: "2026-10-20",
      now: new Date("2026-10-19T22:30:00Z"),
      expected: true,
    },
    {
      lessonDate: "2026-10-19",
      now: new Date("2026-10-19T22:30:00Z"),
      expected: false,
    },
  ])(
    'returns "$expected" when lessonDate is $lessonDate and now is $now',
    ({ lessonDate, now, expected }) => {
      expect(isToday(lessonDate, now)).toBe(expected);
    },
  );
});

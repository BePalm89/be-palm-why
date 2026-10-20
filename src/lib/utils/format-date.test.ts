import { describe, it, expect } from "vitest";
import formatDate from "./format-date";

describe("format date", () => {
  it.each([
    { date: new Date("2026-10-20T06:00:00Z"), expected: "Martedì 20 ottobre" },
    { date: new Date("2026-10-19T22:30:00Z"), expected: "Martedì 20 ottobre" },
    { date: new Date("2026-10-20T21:59:00Z"), expected: "Martedì 20 ottobre" },
  ])('returns "$expected" when date is $date', ({ date, expected }) => {
    expect(formatDate(date)).toBe(expected);
  });
});

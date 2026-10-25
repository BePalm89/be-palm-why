import { describe, it, expect } from "vitest";
import { badgeLabel } from "./badge-label";

describe("badgeLabel", () => {
  it.each([
    { subject: "Fisica", step: 2, expected: "Fisica · Tappa 2" },
    { subject: "Fisica", step: null, expected: "Fisica" },
    { subject: null, step: 2, expected: "Tappa 2" },
    { subject: "", step: 2, expected: "Tappa 2" },
    { subject: null, step: null, expected: "" },
    { subject: "", step: null, expected: "" },
  ])(
    'returns "$expected" when subject is $subject and step is $step',
    ({ subject, step, expected }) => {
      expect(badgeLabel(subject, step)).toBe(expected);
    },
  );
});

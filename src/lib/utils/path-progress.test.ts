import { describe, it, expect } from "vitest";
import { pathProgress } from "./path-progress";

describe("pathProgress", () => {
  it.each([
    { totalSteps: 10, steps: [], expected: { done: 0, percent: 0 } },
    { totalSteps: 10, steps: [1], expected: { done: 1, percent: 10 } },
    { totalSteps: 10, steps: [1, 2, 2], expected: { done: 2, percent: 20 } },
    { totalSteps: 10, steps: [1, null, 2], expected: { done: 2, percent: 20 } },
    { totalSteps: 2, steps: [1, 2, 3], expected: { done: 3, percent: null } },
    { totalSteps: 14, steps: [1], expected: { done: 1, percent: 7 } },
    {
      totalSteps: 14,
      steps: [1, 2, 3, 4, 5],
      expected: { done: 5, percent: 35 },
    },
  ])(
    "returns $expected when total step is $totalSteps and steps is $steps",
    ({ totalSteps, steps, expected }) => {
      expect(pathProgress(totalSteps, steps)).toEqual(expected);
    },
  );
});

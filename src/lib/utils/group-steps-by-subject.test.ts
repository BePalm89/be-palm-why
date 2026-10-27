import { describe, it, expect } from "vitest";
import { groupStepsBySubject } from "./group-steps-by-subject";

describe("groupStepsBySubject", () => {
  it.each([
    {
      lessons: [
        { subject: "fisica", step: 1 },
        { subject: "arte", step: 1 },
        { subject: "fisica", step: 2 },
      ],
      name: "mixed subject",
      expected: { fisica: [1, 2], arte: [1] },
    },
    { lessons: [], name: "no lesson", expected: {} },
    {
      lessons: [
        { subject: "fisica", step: null },
        { subject: "arte", step: 1 },
        { subject: "fisica", step: 2 },
      ],
      name: "null step",
      expected: { fisica: [null, 2], arte: [1] },
    },
    {
      lessons: [
        { subject: "fisica", step: 1 },
        { subject: "arte", step: 1 },
        { subject: "scienza", step: 1 },
        { subject: "scienza", step: 2 },
      ],
      name: "different lessons",
      expected: { fisica: [1], arte: [1], scienza: [1, 2] },
    },
  ])(
    "returns $expected when the lessons are $name",
    ({ lessons, expected }) => {
      expect(groupStepsBySubject(lessons)).toEqual(expected);
    },
  );
});

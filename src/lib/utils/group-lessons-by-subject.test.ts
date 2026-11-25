import { describe, it, expect } from "vitest";
import { groupLessonsBySubject } from "./group-lessons-by-subject";

describe("groupLessonsBySubject", () => {
  it.each([
    {
      lessons: [
        {
          id: "1",
          title: "Galileo",
          subject: "fisica",
          step: 1,
          date: "2026-10-10",
        },
        {
          id: "2",
          title: "Numeri primi",
          subject: "matematica",
          step: 1,
          date: "2026-10-11",
        },
        {
          id: "3",
          title: "Newton",
          subject: "fisica",
          step: 2,
          date: "2026-10-17",
        },
      ],
      name: "mixed subject",
      expected: {
        fisica: [
          {
            id: "1",
            title: "Galileo",
            step: 1,
            date: "2026-10-10",
          },
          {
            id: "3",
            title: "Newton",
            step: 2,
            date: "2026-10-17",
          },
        ],
        matematica: [
          {
            id: "2",
            title: "Numeri primi",
            step: 1,
            date: "2026-10-11",
          },
        ],
      },
    },
    {
      lessons: [],
      name: "no lesson",
      expected: {},
    },
    {
      lessons: [
        {
          id: "1",
          title: "Galileo",
          subject: "fisica",
          step: 1,
          date: "2026-10-10",
        },
        {
          id: "2",
          title: "Numeri primi",
          subject: "matematica",
          step: 1,
          date: "2026-10-11",
        },
        {
          id: "3",
          title: "Newton",
          subject: "fisica",
          step: 2,
          date: "2026-10-17",
        },
        {
          id: "4",
          title: "La prima guerra mondiale",
          subject: "storia",
          step: null,
          date: "2026-10-12",
        },
      ],
      name: "null step",
      expected: {
        fisica: [
          {
            id: "1",
            title: "Galileo",
            step: 1,
            date: "2026-10-10",
          },
          {
            id: "3",
            title: "Newton",
            step: 2,
            date: "2026-10-17",
          },
        ],
        matematica: [
          {
            id: "2",
            title: "Numeri primi",
            step: 1,
            date: "2026-10-11",
          },
        ],
        storia: [
          {
            id: "4",
            title: "La prima guerra mondiale",
            step: null,
            date: "2026-10-12",
          },
        ],
      },
    },
  ])(
    "return $expected when the groups lessons when $name",
    ({ lessons, expected }) => {
      expect(groupLessonsBySubject(lessons)).toEqual(expected);
    },
  );
});

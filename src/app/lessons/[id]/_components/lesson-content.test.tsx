// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { describe, it, expect, afterEach } from "vitest";
import LessonContent, { type LessonContentProps } from "./lesson-content";

afterEach(cleanup);

const baseProps: LessonContentProps = {
  title: "L'italia dalla neutralità all'intervento",
  subject: "Storia contemporanea",
  step: 3,
  mainIdea: "L'Italia entrò in guerra per decisione di una minoranza",
};

describe("LessonContent", () => {
  it("shows the badge with subject and step", () => {
    render(<LessonContent {...baseProps} />);

    expect(
      screen.getByText("Storia contemporanea · Tappa 3"),
    ).toBeInTheDocument();
  });

  it("hides the badge when subject and step are null", () => {
    render(<LessonContent {...baseProps} subject={null} step={null} />);

    expect(screen.queryByTestId("lesson-badge")).not.toBeInTheDocument();
  });

  it("shows the title as the main heading", () => {
    render(<LessonContent {...baseProps} />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "L'italia dalla neutralità all'intervento",
      }),
    ).toBeInTheDocument();
  });

  it("shows the main idea box when mainIdea is present", () => {
    render(<LessonContent {...baseProps} />);

    expect(
      screen.getByRole("region", { name: "L'idea principale" }),
    ).toBeInTheDocument();
  });

  it("hides the main idea box when mainIdea is null", () => {
    render(<LessonContent {...baseProps} mainIdea={null} />);

    expect(screen.queryByText("L'idea principale")).not.toBeInTheDocument();
  });
});

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
  body: "Questa è un testo **importante**.",
  kidVersion: "la storia spiegata a Luca",
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

  it("shows body as markdown", () => {
    render(<LessonContent {...baseProps} />);

    expect(screen.getByText("importante").tagName).toBe("STRONG");
  });

  it("does not render raw HTML from the body", () => {
    render(
      <LessonContent
        {...baseProps}
        body="body='<img src='x' onerror='alert(1)'>'"
      />,
    );

    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("shows the kid version box when kid version is present", () => {
    render(<LessonContent {...baseProps} />);

    expect(
      screen.queryByRole("region", { name: "Come lo spiegheresti a Luca" }),
    ).toBeInTheDocument();
  });

  it("hides the kid version box when kid version is null", () => {
    render(<LessonContent {...baseProps} kidVersion={null} />);

    expect(
      screen.queryByRole("region", { name: "Come lo spiegheresti a Luca" }),
    ).not.toBeInTheDocument();
  });
});

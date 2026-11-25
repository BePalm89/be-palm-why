// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import LessonCard, { type LessonCardProps } from "./lesson-card";

afterEach(cleanup); // smonta la card dopo ogni test, così non si accumulano

const baseProps: LessonCardProps = {
  id: "abc",
  title: "Freud e l'inconscio",
  subject: "Psicologia",
  step: 1,
  mainIdea: "Sotto la superficie dei pensieri",
  isFromToday: true,
};

describe("LessonCard", () => {
  it("shows 'La lezione di oggi' when the lesson is from today", () => {
    render(<LessonCard {...baseProps} />);

    expect(screen.getByText("La lezione di oggi")).toBeInTheDocument();
  });

  it("shows 'La tua ultima lezione' when the lesson is not from today", () => {
    render(<LessonCard {...baseProps} isFromToday={false} />);

    expect(screen.getByText("La tua ultima lezione")).toBeInTheDocument();
  });

  it("shows 'Psicologia · Tappa 1' when the subject is Psicologia and the step is 1", () => {
    render(<LessonCard {...baseProps} />);

    expect(screen.getByText("Psicologia · Tappa 1")).toBeInTheDocument();
  });

  it("hides the badge label when the subject and step are null", () => {
    render(<LessonCard {...baseProps} subject={null} step={null} />);

    expect(screen.queryByTestId("lesson-badge")).not.toBeInTheDocument();
  });

  it("shows 'Sotto la superficie dei pensieri' when the main idea is not empty", () => {
    render(<LessonCard {...baseProps} />);

    expect(
      screen.getByText("Sotto la superficie dei pensieri"),
    ).toBeInTheDocument();
  });

  it("hides the main idea when it is null", () => {
    render(<LessonCard {...baseProps} mainIdea={null} />);

    expect(screen.queryByTestId("lesson-main-idea")).not.toBeInTheDocument();
  });

  it("links to /lessons/:id", () => {
    render(<LessonCard {...baseProps} />);

    const link = screen.getByRole("link", { name: /inizia a leggere/i });

    expect(link).toHaveAttribute("href", "/lessons/abc");
  });
});

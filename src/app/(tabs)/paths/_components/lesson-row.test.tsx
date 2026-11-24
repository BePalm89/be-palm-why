// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import LessonRow, { type LessonRowProps } from "./lesson-row";

afterEach(cleanup);

const baseProps: LessonRowProps = {
  step: 1,
  title: "Socrate",
  date: "2026-10-10",
  id: "1",
  color: null,
};

describe("LessonRow", () => {
  it("shows the correct title, formatted date and step for a lesson", () => {
    render(<LessonRow {...baseProps} />);

    const link = screen.getByRole("link", { name: /Socrate/ });

    expect(screen.getByText("Socrate")).toBeInTheDocument();
    expect(screen.getByText("10 ottobre")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("Tappa 1")).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/lessons/1");
  });

  it("shows non assegnata and a - when step is null", () => {
    render(<LessonRow {...baseProps} step={null} />);

    expect(screen.getByText("–")).toBeInTheDocument();
    expect(screen.getByText("Tappa non assegnata")).toBeInTheDocument();
  });
});

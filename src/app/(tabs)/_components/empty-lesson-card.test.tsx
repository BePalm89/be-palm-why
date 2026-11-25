// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import EmptyLessonCard from "./empty-lesson-card";

afterEach(cleanup);

describe("EmptyLessonCard", () => {
  it("shows the empty state title when there are no lessons", () => {
    render(<EmptyLessonCard />);

    expect(
      screen.getByRole("region", { name: "Non hai ancora nessuna lezione" }),
    ).toBeInTheDocument();
  });

  it("does not show any link'", () => {
    render(<EmptyLessonCard />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });
});

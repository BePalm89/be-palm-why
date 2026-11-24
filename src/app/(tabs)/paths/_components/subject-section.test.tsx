// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import SubjectSection, { type SubjectSectionProps } from "./subject-section";

afterEach(cleanup);

const baseProps: SubjectSectionProps = {
  color: null,
  labelSubject: "Educazione civica",
  lessons: [
    {
      id: "1",
      step: 1,
      title: "Cos'è uno Stato e a cosa serve una Costituzione",
      date: "2026-10-10",
    },
  ],
  totalStep: 12,
  stepDone: 1,
};

describe("SubjectSection", () => {
  it("shows the correct label and progress for a particular subject", () => {
    render(<SubjectSection {...baseProps} />);

    const labelSubject = screen.getByRole("heading", {
      level: 2,
      name: "Educazione civica",
    });

    const link = screen.getByRole("link", { name: /Cos'è uno Stato/ });

    expect(labelSubject).toBeInTheDocument();
    expect(screen.getByText("1 tappa fatta su 12")).toBeInTheDocument();
    expect(screen.getByText("1 / 12")).toBeInTheDocument();
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/lessons/1");
  });

  it("shows 'Non hai ancora nessuna lezione per questo percorso' when the lessons is an empty array", () => {
    render(<SubjectSection {...baseProps} lessons={[]} />);

    const labelSubject = screen.getByRole("heading", {
      level: 2,
      name: "Educazione civica",
    });

    expect(labelSubject).toBeInTheDocument();
    expect(
      screen.getByText("Non hai ancora nessuna lezione per questo percorso"),
    ).toBeInTheDocument();
  });

  it("shows the correct label, progress and lessons for a particular subject", () => {
    render(
      <SubjectSection
        {...baseProps}
        stepDone={2}
        lessons={[
          ...baseProps.lessons,
          {
            id: "2",
            step: 2,
            title: "cosa è lo stato parte 2",
            date: "2026-10-17",
          },
        ]}
      />,
    );

    const labelSubject = screen.getByRole("heading", {
      level: 2,
      name: "Educazione civica",
    });

    const links = screen.getAllByRole("link");
    const secondLink = screen.getByRole("link", { name: /parte 2/ });

    expect(labelSubject).toBeInTheDocument();
    expect(screen.getByText("2 tappe fatte su 12")).toBeInTheDocument();
    expect(screen.getByText("2 / 12")).toBeInTheDocument();
    expect(links).toHaveLength(2);
    expect(secondLink).toHaveAttribute("href", "/lessons/2");
  });

  it("shows the correct screen reader label when step done is 0", () => {
    render(<SubjectSection {...baseProps} stepDone={0} />);

    expect(screen.getByText("0 tappe fatte su 12")).toBeInTheDocument();
    expect(screen.getByText("0 / 12")).toBeInTheDocument();
  });
});

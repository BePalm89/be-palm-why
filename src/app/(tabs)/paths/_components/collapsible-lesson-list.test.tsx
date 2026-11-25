// @vitest-environment jsdom

import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import userEvent from "@testing-library/user-event";

import CollapsibleLessonList, {
  type CollapsibleLessonListProps,
} from "./collapsible-lesson-list";

afterEach(cleanup);

const baseProps: CollapsibleLessonListProps = {
  lessons: [
    {
      id: "1",
      step: 1,
      title: "Socrate",
      date: "2026-10-10",
    },
    {
      id: "2",
      step: 2,
      title: "Platone",
      date: "2026-10-17",
    },
    {
      id: "3",
      step: 3,
      title: "Aristotele",
      date: "2026-10-21",
    },
  ],
  color: null,
};

describe("CollapsibleLessonList", () => {
  it("shows three lessons and the button 'Mostra tutte (n)' is not in the document", () => {
    render(<CollapsibleLessonList {...baseProps} />);

    const links = screen.getAllByRole("link");
    const button = screen.queryByRole("button");

    expect(links).toHaveLength(3);
    expect(links[0].textContent).toContain("Socrate");
    expect(links[1].textContent).toContain("Platone");
    expect(links[2].textContent).toContain("Aristotele");
    expect(button).not.toBeInTheDocument();
  });

  it("shows the correct lessons and button label when there are four lessons", async () => {
    const user = userEvent.setup();

    render(
      <CollapsibleLessonList
        {...baseProps}
        lessons={[
          ...baseProps.lessons,
          {
            id: "4",
            step: 4,
            title: "Marx",
            date: "2026-10-28",
          },
        ]}
      />,
    );

    const links = screen.getAllByRole("link");
    const button = screen.queryByRole("button", { name: "Mostra tutte (4)" });

    expect(links).toHaveLength(3);
    expect(links[0].textContent).toContain("Socrate");
    expect(links[1].textContent).toContain("Platone");
    expect(links[2].textContent).toContain("Aristotele");
    expect(button).toBeInTheDocument();
    expect(button?.textContent).toBe("Mostra tutte (4)");
    expect(button).toHaveAttribute("aria-expanded", "false");

    await user.click(screen.getByRole("button", { name: "Mostra tutte (4)" }));

    const linksAfterClick = screen.getAllByRole("link");

    expect(linksAfterClick).toHaveLength(4);
    expect(linksAfterClick[0].textContent).toContain("Socrate");
    expect(linksAfterClick[1].textContent).toContain("Platone");
    expect(linksAfterClick[2].textContent).toContain("Aristotele");
    expect(linksAfterClick[3].textContent).toContain("Marx");
    expect(button).toBeInTheDocument();
    expect(button?.textContent).toBe("Mostra meno");
    expect(button).toHaveAttribute("aria-expanded", "true");

    await user.click(screen.getByRole("button", { name: "Mostra meno" }));

    const linksAfterSecondClick = screen.getAllByRole("link");

    expect(linksAfterSecondClick).toHaveLength(3);
    expect(linksAfterSecondClick[0].textContent).toContain("Socrate");
    expect(linksAfterSecondClick[1].textContent).toContain("Platone");
    expect(linksAfterSecondClick[2].textContent).toContain("Aristotele");
    expect(button).toBeInTheDocument();
    expect(button?.textContent).toBe("Mostra tutte (4)");
    expect(button).toHaveAttribute("aria-expanded", "false");
  });
});

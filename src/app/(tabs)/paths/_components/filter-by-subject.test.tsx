// @vitest-environment jsdom
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import FilterBySubject, {
  type FilterBySubjectProps,
} from "./filter-by-subject";

afterEach(cleanup);

const baseProps: FilterBySubjectProps = {
  paths: [
    { subject: "fisica", label: "Fisica" },
    { subject: "matematica", label: "Matematica" },
    { subject: "storia", label: "Storia" },
    { subject: "arte & design", label: "Arte & Design" },
  ],
  subjectParam: "fisica",
};

describe("FilterBySubject", () => {
  it("shows the correct chips for paths", () => {
    render(<FilterBySubject {...baseProps} />);

    const links = screen.getAllByRole("link");

    expect(links).toHaveLength(5);
    expect(links[0].textContent).toBe("Tutte");
    expect(links[1].textContent).toBe("Fisica");
    expect(links[2].textContent).toBe("Matematica");
    expect(links[3].textContent).toBe("Storia");
    expect(links[4].textContent).toBe("Arte & Design");
  });

  it("shows aria-current='page' only on the active chip", () => {
    render(<FilterBySubject {...baseProps} />);

    const links = screen.getAllByRole("link");

    expect(links[0]).not.toHaveAttribute("aria-current");
    expect(links[1]).toHaveAttribute("aria-current", "page");
    expect(links[2]).not.toHaveAttribute("aria-current");
    expect(links[3]).not.toHaveAttribute("aria-current");
    expect(links[4]).not.toHaveAttribute("aria-current");
  });

  it("has the correct href for each path", () => {
    render(<FilterBySubject {...baseProps} />);

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("href", "/paths");
    expect(links[1]).toHaveAttribute("href", "/paths?subject=fisica");
    expect(links[2]).toHaveAttribute("href", "/paths?subject=matematica");
    expect(links[3]).toHaveAttribute("href", "/paths?subject=storia");
    expect(links[4]).toHaveAttribute(
      "href",
      "/paths?subject=arte%20%26%20design",
    );
  });

  it("shows aria-current='page' on the 'Tutte' chip when the subjectParam is null", () => {
    render(<FilterBySubject {...baseProps} subjectParam={null} />);

    const links = screen.getAllByRole("link");

    expect(links[0]).toHaveAttribute("aria-current", "page");
    expect(links[1]).not.toHaveAttribute("aria-current");
    expect(links[2]).not.toHaveAttribute("aria-current");
    expect(links[3]).not.toHaveAttribute("aria-current");
    expect(links[4]).not.toHaveAttribute("aria-current");
  });
});

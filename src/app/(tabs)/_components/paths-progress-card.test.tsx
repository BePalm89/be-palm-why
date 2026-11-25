// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { type PathProgressCardProps } from "./paths-progress-card";
import { cleanup, render, screen } from "@testing-library/react";
import PathsProgressCard from "./paths-progress-card";

afterEach(cleanup);

const baseProps: PathProgressCardProps = {
  paths: [
    {
      subject: "fisica",
      label: "Fisica",
      color: "#FFF",
      done: 3,
      total: 10,
      percent: 30,
    },
  ],
};

describe("PathsProgressCard", () => {
  it("shows the correct message when subject is fisica, done is 3 and total is 10", () => {
    render(<PathsProgressCard {...baseProps} />);

    expect(screen.getByText("3 / 10")).toBeInTheDocument();
    expect(screen.getByRole("progressbar", { name: "Fisica" })).toHaveAttribute(
      "aria-valuetext",
      "3 di 10 tappe",
    );
  });

  it("shows the correct message when subject is fisica, done is 0 and total is 10", () => {
    render(
      <PathsProgressCard
        {...baseProps}
        paths={baseProps.paths.map((path) => ({
          ...path,
          done: 0,
          percent: 0,
        }))}
      />,
    );

    expect(screen.getByRole("progressbar", { name: "Fisica" })).toHaveAttribute(
      "aria-valuetext",
      "0 di 10 tappe",
    );
    expect(screen.getByText("0 / 10")).toBeInTheDocument();
  });

  it("shows the 'dati non corretti' when the number of step are greater than the total step", () => {
    render(
      <PathsProgressCard
        {...baseProps}
        paths={baseProps.paths.map((path) => ({
          ...path,
          done: 11,
          percent: null,
        }))}
      />,
    );

    expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
    expect(screen.getByText("Dati non corretti")).toBeInTheDocument();
  });

  it("shows the 'Non hai ancora nessun percorso' when the paths is an empty array", () => {
    const props = { paths: [] };
    render(<PathsProgressCard {...props} />);

    expect(
      screen.getByText("Non hai ancora nessun percorso"),
    ).toBeInTheDocument();
  });
});

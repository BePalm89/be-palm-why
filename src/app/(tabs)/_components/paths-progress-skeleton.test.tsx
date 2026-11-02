// @vitest-environment jsdom
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import PathsProgressSkeleton from "./paths-progress-skeleton";

afterEach(cleanup);

describe("PathsProgressSkeleton", () => {
  it("announces that the paths are loading", () => {
    render(<PathsProgressSkeleton />);

    expect(screen.getByRole("status")).toHaveTextContent(
      "Caricamento dei tuoi percorsi",
    );
  });
});

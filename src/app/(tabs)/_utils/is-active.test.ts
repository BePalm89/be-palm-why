import { describe, it, expect } from "vitest";
import { isActive } from "./is-active";

describe("isActive", () => {
  it.each([
    { pathname: "/", href: "/", expected: true },
    { pathname: "/paths", href: "/", expected: false },
    { pathname: "/paths", href: "/paths", expected: true },
    { pathname: "/paths/story", href: "/paths", expected: true },
    { pathname: "/pathsology", href: "/paths", expected: false },
  ])(
    "returns $expected when pathname is $pathname and href is $href",
    ({ pathname, href, expected }) => {
      expect(isActive(pathname, href)).toBe(expected);
    },
  );
});

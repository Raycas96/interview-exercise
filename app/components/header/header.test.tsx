import { Header } from "./header";
import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

describe("Header", () => {
  it("should render", () => {
    expect(render(<Header />)).toBeTruthy();
  });

  it("should have the correct menu items", () => {
    const { getByText } = render(<Header />);
    expect(getByText("Find a recipe")).toBeDefined();
    expect(getByText("Saved recipes")).toBeDefined();
  });
});

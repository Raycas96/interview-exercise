import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Card } from "./card";

describe("Card", () => {
  it("should render", () => {
    expect(render(<Card title="Test" />)).toBeTruthy();
  });

  it("should have the correct title", () => {
    const { getByText } = render(<Card title="Test" />);
    expect(getByText("Test")).toBeDefined();
  });

  it("should have the correct description", () => {
    const { getByText } = render(
      <Card description="Test description" title="Test" />,
    );
    expect(getByText("Test description")).toBeDefined();
  });
});

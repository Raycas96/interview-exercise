import { fireEvent, render } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { FirstStep } from "./first-step";

describe("AreaSelect", () => {
  it("shows area selector in area mode", () => {
    const { getByLabelText } = render(
      <FirstStep
        areas={[{ name: "Italian" }]}
        selectedArea={null}
        nameQuery=""
        searchMode="area"
        onSelectArea={vi.fn()}
        onSearchModeChange={vi.fn()}
        onNameQueryChange={vi.fn()}
        onNameRecipeSelect={vi.fn()}
      />,
    );

    expect(getByLabelText("Area")).toBeTruthy();
  });

  it("switches mode and clears name-query selection context", () => {
    const onSearchModeChange = vi.fn();
    const onNameQueryChange = vi.fn();
    const onNameRecipeSelect = vi.fn();
    const { getByLabelText } = render(
      <FirstStep
        areas={[{ name: "Italian" }]}
        selectedArea={null}
        nameQuery="arr"
        searchMode="name"
        onSelectArea={vi.fn()}
        onSearchModeChange={onSearchModeChange}
        onNameQueryChange={onNameQueryChange}
        onNameRecipeSelect={onNameRecipeSelect}
      />,
    );

    fireEvent.click(getByLabelText("Search by area"));

    expect(onSearchModeChange).toHaveBeenCalledWith("area");
    expect(onNameQueryChange).toHaveBeenCalledWith("");
    expect(onNameRecipeSelect).toHaveBeenCalledWith(null);
  });
});

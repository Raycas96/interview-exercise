import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { DetailsFormSection } from "./details-form-section";

describe("DetailsFormSection", () => {
  it("renders category and ingredients controls", () => {
    const onSelectCategory = vi.fn();
    const onSelectIngredients = vi.fn();
    render(
      <DetailsFormSection
        categoriesList={[{ name: "Pasta" }]}
        ingredientsList={[
          {
            id: "1",
            name: "Tomato",
            description: null,
            type: "",
            thumbnail: null,
          },
        ]}
        selectedCategory=""
        selectedIngredients={[]}
        onSelectCategory={onSelectCategory}
        onSelectIngredients={onSelectIngredients}
      />,
    );

    fireEvent.change(screen.getByLabelText("Category"), {
      target: { value: "Pasta" },
    });

    expect(onSelectCategory).toHaveBeenCalledWith("Pasta");
    expect(screen.getByText("Ingredients")).toBeTruthy();
  });

  it("disables controls when disabled", () => {
    render(
      <DetailsFormSection
        categoriesList={[{ name: "Pasta" }]}
        ingredientsList={[]}
        selectedCategory=""
        selectedIngredients={[]}
        onSelectCategory={vi.fn()}
        onSelectIngredients={vi.fn()}
        disabled={true}
      />,
    );

    expect(screen.getByLabelText("Category").hasAttribute("disabled")).toBe(
      true,
    );
    expect(
      screen
        .getByRole("button", { name: "Ingredients" })
        .hasAttribute("disabled"),
    ).toBe(true);
  });
});

import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { RECIPES_FIXTURE } from "../test-utils/recipes-fixture";
import { RecipeCard } from "./recipe-card";

describe("RecipeCard", () => {
  it("renders recipe card and details link", () => {
    const recipe = RECIPES_FIXTURE[0];
    const { container, getByText, getByRole } = render(
      <RecipeCard
        recipe={recipe}
        selectedInputs={{ area: null, category: null, ingredients: [] }}
        onNewIdea={vi.fn()}
        showNewIdea={false}
      />,
    );

    expect(container).toBeTruthy();
    expect(getByText(recipe.name)).toBeTruthy();
    expect(getByRole("link", { name: "View details" })).toBeTruthy();
  });

  it("shows New Idea when mode is area", () => {
    const recipe = RECIPES_FIXTURE[0];
    const onNewIdea = vi.fn();

    render(
      <RecipeCard
        recipe={recipe}
        selectedInputs={{ area: "Italian", category: null, ingredients: [] }}
        onNewIdea={onNewIdea}
        showNewIdea={true}
      />,
    );

    const newIdeaButton = screen.getByRole("button", { name: "New Idea" });
    expect(newIdeaButton).toBeTruthy();
    newIdeaButton.click();
    expect(onNewIdea).toHaveBeenCalledTimes(1);
  });

  it("does not show New Idea when mode is not area", () => {
    const recipe = RECIPES_FIXTURE[0];
    render(
      <RecipeCard
        recipe={recipe}
        selectedInputs={{ area: null, category: null, ingredients: [] }}
        onNewIdea={vi.fn()}
        showNewIdea={false}
      />,
    );

    expect(screen.queryByRole("button", { name: "New Idea" })).toBeNull();
  });
});

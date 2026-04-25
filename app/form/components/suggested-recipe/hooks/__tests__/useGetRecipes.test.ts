import { renderHook, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { getRecipesByArea } from "@/lib/mealdb/client/get-recipes-by-area";
import { RECIPES_FIXTURE } from "./useGetRecipes.fixtures";
import { useGetRecipes } from "../useGetRecipes";

vi.mock("@/lib/mealdb/client/get-recipes-by-area", () => ({
  getRecipesByArea: vi.fn(),
}));

const mockedGetRecipesByArea = vi.mocked(getRecipesByArea);

describe("useGetRecipes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(Math, "random").mockReturnValue(0);
  });

  it("selects the recipe matching category and ingredients", async () => {
    mockedGetRecipesByArea.mockResolvedValue(RECIPES_FIXTURE);

    const { result } = renderHook(() =>
      useGetRecipes({
        area: "Italian",
        category: "Pasta",
        ingredients: ["Tomato"],
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.selectedRecipe?.id).toBe("2");
    });

    expect(mockedGetRecipesByArea).toHaveBeenCalledWith(
      "Italian",
      expect.objectContaining({
        signal: expect.any(AbortSignal),
      }),
    );
    expect(result.current.error).toBeNull();
  });

  it("updates selected recipe when filters change dynamically", async () => {
    mockedGetRecipesByArea.mockResolvedValue(RECIPES_FIXTURE);

    const { result, rerender } = renderHook(
      ({ category, ingredients }) =>
        useGetRecipes({
          area: "Indian",
          category,
          ingredients,
        }),
      {
        initialProps: {
          category: null as string | null,
          ingredients: [] as string[],
        },
      },
    );

    await waitFor(() => {
      expect(result.current.selectedRecipe?.id).toBe("1");
    });

    rerender({
      category: "Pasta",
      ingredients: ["Tomato"],
    });

    await waitFor(() => {
      expect(result.current.selectedRecipe?.id).toBe("2");
    });
  });

  it("returns null selectedRecipe when no recipe matches filters", async () => {
    mockedGetRecipesByArea.mockResolvedValue(RECIPES_FIXTURE);

    const { result } = renderHook(() =>
      useGetRecipes({
        area: "Indian",
        category: "Seafood",
        ingredients: ["Salmon"],
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.selectedRecipe).toBeNull();
    });
  });

  it("exposes api errors", async () => {
    mockedGetRecipesByArea.mockRejectedValue(new Error("API error"));

    const { result } = renderHook(() =>
      useGetRecipes({
        area: "Indian",
        category: null,
        ingredients: [],
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe("API error");
    });
  });

  it("does not expose aborted requests as errors", async () => {
    const abortError = new Error("signal is aborted without reason");
    abortError.name = "AbortError";
    mockedGetRecipesByArea.mockRejectedValue(abortError);

    const { result } = renderHook(() =>
      useGetRecipes({
        area: "Indian",
        category: null,
        ingredients: [],
      }),
    );

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeNull();
    });
  });
});

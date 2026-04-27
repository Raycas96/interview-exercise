import { getRecipesByArea } from "@/lib/mealdb/client/get-recipes-by-area";
import { Recipe } from "@/lib/mealdb/types";
import { isAbortError } from "@/lib/api/utils";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface UseGetRecipesProps {
  searchMode: "area" | "name";
  area: string | null;
  category: string | null;
  ingredients: string[];
  selectedRecipeOverride?: Recipe | null;
}
export const useGetRecipes = ({
  searchMode,
  area,
  category,
  ingredients,
  selectedRecipeOverride = null,
}: UseGetRecipesProps) => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const requestIdRef = useRef(0);

  const fetchRecipes = useCallback(
    async (requestInit?: RequestInit) => {
      if (!area || searchMode !== "area") {
        return;
      }

      const requestId = ++requestIdRef.current;
      setLoading(true);
      setError(null);
      try {
        const response = await getRecipesByArea(area, requestInit);
        if (requestId !== requestIdRef.current) {
          return;
        }
        setRecipes(response);
      } catch (error) {
        if (requestId !== requestIdRef.current) {
          return;
        }

        if (isAbortError(error)) {
          return;
        }

        setError(
          error instanceof Error ? error.message : "An unknown error occurred",
        );
      } finally {
        if (requestId === requestIdRef.current) {
          setLoading(false);
        }
      }
    },
    [area, searchMode],
  );

  // effect to fetch the recipes based on the area
  useEffect(() => {
    if (!area || searchMode !== "area") {
      return;
    }
    const abortController = new AbortController();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void fetchRecipes({ signal: abortController.signal });

    return () => {
      abortController.abort();
    };
  }, [area, fetchRecipes, searchMode]);

  const filteredRecipes = useMemo(() => {
    return recipes.filter((recipe) => {
      if (category && ingredients.length > 0) {
        return (
          recipe.category === category &&
          ingredients.every((selectedIngredient) =>
            recipe.ingredients.some((i) => i.name === selectedIngredient),
          )
        );
      }
      if (category) {
        return recipe.category === category;
      }
      if (ingredients.length > 0) {
        return ingredients.every((selectedIngredient) =>
          recipe.ingredients.some((i) => i.name === selectedIngredient),
        );
      }
      return true;
    });
  }, [recipes, category, ingredients]);

  const pickRandomRecipe = useCallback(
    (excludedRecipeId: string | undefined) => {
      if (filteredRecipes.length === 0) {
        setSelectedRecipe(null);
        return;
      }

      if (filteredRecipes.length === 1) {
        setSelectedRecipe(filteredRecipes[0]);
        return;
      }

      const eligibleRecipes = filteredRecipes.filter(
        (recipe) => recipe.id !== excludedRecipeId,
      );

      setSelectedRecipe(
        eligibleRecipes[Math.floor(Math.random() * eligibleRecipes.length)],
      );
    },
    [filteredRecipes],
  );

  // effect to select one recipe when filters change
  useEffect(() => {
    if (searchMode !== "area") {
      return;
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect
    pickRandomRecipe(selectedRecipe?.id);
    // in this case we do not need the full array otherwhise we got an infinite loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickRandomRecipe, searchMode]);

  const suggestAnother = useCallback(() => {
    if (searchMode !== "area") {
      return;
    }
    const currentId = selectedRecipe?.id;
    if (currentId) {
      pickRandomRecipe(currentId);
    }
  }, [pickRandomRecipe, searchMode, selectedRecipe?.id]);

  return {
    loading,
    error,
    retry: fetchRecipes,
    selectedRecipe:
      searchMode === "name" ? (selectedRecipeOverride ?? null) : selectedRecipe,
    suggestAnother,
    canSuggestAnother: searchMode === "area" && filteredRecipes.length > 1,
  };
};

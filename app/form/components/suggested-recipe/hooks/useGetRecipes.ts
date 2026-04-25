import { getRecipesByArea } from "@/lib/mealdb/client/get-recipes-by-area";
import { Recipe } from "@/lib/mealdb/types";
import { isAbortError } from "@/lib/api/utils";
import { useCallback, useEffect, useRef, useState } from "react";

interface UseGetRecipesProps {
  area: string | null;
  category: string | null;
  ingredients: string[];
}
export const useGetRecipes = ({
  area,
  category,
  ingredients,
}: UseGetRecipesProps) => {
  const [loading, setLoading] = useState(false);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const requestIdRef = useRef(0);

  const fetchRecipes = useCallback(
    async (requestInit?: RequestInit) => {
      if (!area) {
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
    [area],
  );

  // effect to fetch the recipes based on the area
  useEffect(() => {
    if (!area) {
      return;
    }
    const abortController = new AbortController();
    queueMicrotask(() => {
      void fetchRecipes({ signal: abortController.signal });
    });

    return () => {
      abortController.abort();
    };
  }, [area, fetchRecipes]);

  // effect to filter the recipes based on the category and ingredient
  useEffect(() => {
    const filteredRecipes = recipes.filter((recipe) => {
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
    if (filteredRecipes.length === 1) {
      queueMicrotask(() => {
        setSelectedRecipe(filteredRecipes[0]);
      });
    } else if (filteredRecipes.length > 1) {
      queueMicrotask(() => {
        setSelectedRecipe(
          filteredRecipes[Math.floor(Math.random() * filteredRecipes.length)],
        );
      });
    } else {
      queueMicrotask(() => {
        setSelectedRecipe(null);
      });
    }
  }, [recipes, category, ingredients]);

  return {
    loading,
    error,
    retry: fetchRecipes,
    selectedRecipe,
  };
};

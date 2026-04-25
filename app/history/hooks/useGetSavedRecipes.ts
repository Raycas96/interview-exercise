import {
  getStoredHistoryRecipes,
  sortHistoryByLatest,
  updateRecipeFeedbackInHistory,
} from "@/app/lib/utils/history";
import { HistoryRecipe } from "@/app/lib/utils/types";
import { useCallback, useEffect, useState } from "react";

export const useGetSavedRecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState<HistoryRecipe[]>([]);

  useEffect(() => {
    queueMicrotask(() => {
      setSavedRecipes(getStoredHistoryRecipes().sort(sortHistoryByLatest));
    });
  }, []);

  const updateRecipePreference = useCallback(
    (recipeId: string, liked: boolean) => {
      const updatedRecipes = updateRecipeFeedbackInHistory(recipeId, liked);
      setSavedRecipes(updatedRecipes);
    },
    [],
  );

  const likedCount = savedRecipes.filter((recipe) => recipe.liked).length;
  const dislikedCount = savedRecipes.length - likedCount;

  return { savedRecipes, likedCount, dislikedCount, updateRecipePreference };
};

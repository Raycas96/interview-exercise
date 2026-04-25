import {
  getStoredHistoryRecipes,
  sortHistoryByLatest,
} from "@/app/lib/utils/history";
import { HistoryRecipe } from "@/app/lib/utils/types";
import { useState } from "react";

export const useGetSavedRecipes = () => {
  const [savedRecipes] = useState<HistoryRecipe[]>(() =>
    getStoredHistoryRecipes().sort(sortHistoryByLatest),
  );

  const likedCount = savedRecipes.filter((recipe) => recipe.liked).length;
  const dislikedCount = savedRecipes.length - likedCount;

  return { savedRecipes, likedCount, dislikedCount };
};

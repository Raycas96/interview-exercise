import {
  getStoredHistoryRecipes,
  sortHistoryByLatest,
  updateRecipeFeedbackInHistory,
} from "@/utils/history";
import { useCallback, useState, useSyncExternalStore } from "react";

const emptySubscribe = () => () => {};

export const useGetSavedRecipes = () => {
  const [, setVersion] = useState(0);
  // added this just to prevent hydratation server missmatch
  const isHydrated = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const savedRecipes = isHydrated
    ? getStoredHistoryRecipes().sort(sortHistoryByLatest)
    : [];

  const updateRecipePreference = useCallback(
    (recipeId: string, liked: boolean) => {
      updateRecipeFeedbackInHistory(recipeId, liked);
      setVersion((value) => value + 1);
    },
    [],
  );

  const likedCount = savedRecipes.filter((recipe) => recipe.liked).length;
  const dislikedCount = savedRecipes.length - likedCount;

  return { savedRecipes, likedCount, dislikedCount, updateRecipePreference };
};

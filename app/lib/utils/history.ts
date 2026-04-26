import { Recipe } from "@/lib/mealdb/types";
import { LOCAL_STORAGE_HISTORY_KEY } from "@/utils/constants";
import { HistoryRecipe } from "@/utils/types";

const isHistoryRecipe = (value: unknown): value is HistoryRecipe => {
  return (
    typeof value === "object" &&
    value !== null &&
    "recipeId" in value &&
    "title" in value &&
    "image" in value
  );
};

const safeParseHistoryFromStorage = (value: string | null): HistoryRecipe[] => {
  if (!value) {
    return [];
  }

  try {
    const parsed = JSON.parse(value) as HistoryRecipe[];
    return parsed.filter(isHistoryRecipe);
  } catch {
    return [];
  }
};

export const getStoredHistoryRecipes = (): HistoryRecipe[] => {
  if (typeof window === "undefined") {
    return [];
  }
  return safeParseHistoryFromStorage(
    localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY),
  );
};

export const sortHistoryByLatest = (
  recipeA: HistoryRecipe,
  recipeB: HistoryRecipe,
): number => {
  return (
    new Date(recipeB.timestamp).getTime() -
    new Date(recipeA.timestamp).getTime()
  );
};

export const upsertRecipeFromSuggestion = (
  recipe: Recipe,
  liked: boolean,
  selectedInputs: {
    area: string | null;
    category: string | null;
    ingredients: string[];
  },
): HistoryRecipe[] => {
  const current = getStoredHistoryRecipes();
  const now = new Date().toISOString();
  const existingIndex = current.findIndex(
    (entry) => entry.recipeId === recipe.id,
  );

  if (existingIndex >= 0) {
    const updated = [...current];
    updated[existingIndex] = {
      ...updated[existingIndex],
      liked,
      timestamp: now,
    };
    localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
    return updated;
  }

  const nextEntry: HistoryRecipe = {
    recipeId: recipe.id,
    title: recipe.name,
    image: recipe.thumbnail,
    timestamp: now,
    inputs: {
      area: selectedInputs.area ?? recipe.area,
      category: selectedInputs.category ?? recipe.category,
      ingredients: selectedInputs.ingredients,
    },
    liked,
  };

  const updated = [...current, nextEntry];
  localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
  return updated;
};

export const updateRecipeFeedbackInHistory = (
  recipeId: string,
  liked: boolean,
): HistoryRecipe[] => {
  const current = getStoredHistoryRecipes();
  const now = new Date().toISOString();
  const updated = current.map((entry) =>
    entry.recipeId === recipeId
      ? {
          ...entry,
          liked,
          timestamp: now,
        }
      : entry,
  );

  localStorage.setItem(LOCAL_STORAGE_HISTORY_KEY, JSON.stringify(updated));
  return updated;
};

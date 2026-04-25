import { Recipe } from "../types";

interface RecipesByAreaResponse {
  data?: Recipe[];
  error?: {
    code?: string;
    message?: string;
  };
}

export async function getRecipesByArea(area: string): Promise<Recipe[]> {
  const response = await fetch(
    `/api/mealdb/recipe-by-area?area=${encodeURIComponent(area)}`,
  );
  const json = (await response.json()) as RecipesByAreaResponse;

  if (!response.ok) {
    throw new Error(json.error?.message ?? "Failed to fetch recipes by area");
  }

  return json.data ?? [];
}

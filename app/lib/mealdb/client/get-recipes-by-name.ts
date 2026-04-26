import { Recipe } from "../types";

interface RecipesByNameResponse {
  data?: Recipe[];
  error?: {
    code?: string;
    message?: string;
  };
}

export async function getRecipesByName(
  name: string,
  init?: RequestInit,
): Promise<Recipe[]> {
  const response = await fetch(
    `/api/mealdb/recipe-by-name?name=${encodeURIComponent(name)}`,
    init,
  );
  const json = (await response.json()) as RecipesByNameResponse;

  if (!response.ok) {
    throw new Error(json.error?.message ?? "Failed to search recipes by name");
  }

  return json.data ?? [];
}

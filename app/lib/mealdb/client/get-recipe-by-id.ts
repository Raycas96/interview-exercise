import { Recipe } from "../types";

interface RecipeByIdResponse {
  data?: Recipe[];
  error?: {
    code?: string;
    message?: string;
  };
}

export async function getRecipeById(id: string): Promise<Recipe> {
  const response = await fetch(
    `/api/mealdb/recipe-by-id?id=${encodeURIComponent(id)}`,
  );
  const json = (await response.json()) as RecipeByIdResponse;

  if (!response.ok) {
    throw new Error(json.error?.message ?? "Failed to fetch recipes by area");
  }

  if (!json.data || json.data.length === 0) {
    throw new Error("No recipe found");
  }

  return json.data[0];
}

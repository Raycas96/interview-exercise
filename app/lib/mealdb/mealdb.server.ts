import { MealDbError } from "@/lib/api/mealdb-error";
import {
  MealDbAreaResponse,
  MealDbCategoryResponse,
  MealDbIngredientResponse,
  MealDbRecipesResponse,
} from "./types";

// app/lib/mealdb.server.ts
const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";

async function fetchTheMealDbData<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let res: Response;

  try {
    res = await fetch(`${MEALDB_BASE}${path}`, {
      ...init,

      // this data could be cached for 1 hour
      // since i do not think this data will change so often
      next: { revalidate: 3600 },
    });
  } catch {
    throw new MealDbError(
      "Unable to reach MealDB",
      502,
      "UPSTREAM_UNREACHABLE",
    );
  }

  if (!res.ok) {
    throw new MealDbError(
      `MealDB responded with ${res.status}`,
      502,
      "UPSTREAM_BAD_RESPONSE",
    );
  }

  const json = (await res.json()) as T;
  return json;
}

export async function getAreas() {
  return fetchTheMealDbData<MealDbAreaResponse>("/list.php?a=list");
}

export async function getCategories() {
  return fetchTheMealDbData<MealDbCategoryResponse>("/list.php?c=list");
}

export async function getIngredients() {
  return fetchTheMealDbData<MealDbIngredientResponse>("/list.php?i=list");
}

// this funcion will take a little bit longer and it will have the n+1 problem
// but since we do not have the API premium this will allow us
// to get all the recipe details and filter them using all the fileds
// from the frontend
export async function getRecipesByArea(
  area: string,
): Promise<MealDbRecipesResponse> {
  const recipesByArea = await fetchTheMealDbData<MealDbRecipesResponse>(
    `/filter.php?a=${encodeURIComponent(area)}`,
  );
  const meals = recipesByArea.meals ?? [];
  const recipes = await Promise.all(
    meals.map(async (meal) => {
      const recipeDetails = await getRecipeById(meal.idMeal);
      return recipeDetails;
    }),
  );

  return {
    meals: recipes
      .map((recipe) => recipe.meals?.[0] ?? null)
      .filter((meal) => meal !== null),
  };
}

export async function getRecipeById(id: string) {
  return fetchTheMealDbData<MealDbRecipesResponse>(`/lookup.php?i=${id}`);
}

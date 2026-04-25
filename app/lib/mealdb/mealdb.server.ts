import { MealDbError } from "../errors/mealdb-error";
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

export async function getRecipesByArea(area: string) {
  return fetchTheMealDbData<MealDbRecipesResponse>(`/filter.php?a=${area}`);
}

export async function getRecipeById(id: string) {
  return fetchTheMealDbData<MealDbRecipesResponse>(`lookup.php?i=${id}`);
}

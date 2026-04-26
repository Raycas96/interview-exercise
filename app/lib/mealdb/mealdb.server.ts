import { MealDbError } from "@/lib/api/mealdb-error";
import {
  MealDbAreaResponse,
  MealDbCategoryResponse,
  MealDbIngredientResponse,
  MealDbRecipesResponse,
} from "./types";

// app/lib/mealdb.server.ts
const MEALDB_BASE = "https://www.themealdb.com/api/json/v1/1";
const REQUEST_TIMEOUT_MS = 8000;
const DETAILS_CONCURRENCY = 4;

async function fetchTheMealDbData<T>(
  path: string,
  init?: RequestInit,
): Promise<T> {
  let res: Response;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, REQUEST_TIMEOUT_MS);

  try {
    res = await fetch(`${MEALDB_BASE}${path}`, {
      ...init,
      signal: init?.signal ?? controller.signal,

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
  } finally {
    clearTimeout(timeoutId);
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
  const recipeRequests = meals.map(
    (meal) => async () => getRecipeById(meal.idMeal),
  );
  const recipes = await runWithConcurrencyLimit(
    recipeRequests,
    DETAILS_CONCURRENCY,
  );

  return {
    meals: recipes
      .filter(
        (result): result is PromiseFulfilledResult<MealDbRecipesResponse> => {
          return result.status === "fulfilled";
        },
      )
      .map((result) => result.value.meals?.[0] ?? null)
      .filter((meal) => meal !== null),
  };
}

export async function getRecipeById(id: string) {
  return fetchTheMealDbData<MealDbRecipesResponse>(`/lookup.php?i=${id}`);
}

async function runWithConcurrencyLimit<T>(
  tasks: Array<() => Promise<T>>,
  maxConcurrency: number,
): Promise<PromiseSettledResult<T>[]> {
  const settledResults: PromiseSettledResult<T>[] = [];

  for (let i = 0; i < tasks.length; i += maxConcurrency) {
    const chunk = tasks.slice(i, i + maxConcurrency);
    const chunkResults = await Promise.allSettled(
      chunk.map(async (task) => task()),
    );
    settledResults.push(...chunkResults);
  }

  return settledResults;
}

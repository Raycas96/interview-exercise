import { getRecipeById } from "@/lib/mealdb/mealdb.server";
import { toApiErrorResponse } from "@/lib/api/to-api-error-response";
import { MealDbError } from "@/lib/api/mealdb-error";
import { toApiSuccessResponse } from "@/lib/api/to-api-success-response";
import { fromMealDbRecipesResponseToRecipes } from "@/lib/mealdb/adapters/recipe.adapters";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const recipeId = searchParams.get("recipeId");

  if (!recipeId) {
    return toApiErrorResponse(
      new MealDbError("Missing 'recipeId' query param", 400, "BAD_REQUEST"),
    );
  }

  try {
    const recipe = await getRecipeById(recipeId);
    return toApiSuccessResponse(fromMealDbRecipesResponseToRecipes(recipe));
  } catch (e) {
    return toApiErrorResponse(e);
  }
}

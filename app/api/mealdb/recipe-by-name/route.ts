import { getRecipesByName } from "@/lib/mealdb/mealdb.server";
import { toApiErrorResponse } from "@/lib/api/to-api-error-response";
import { MealDbError } from "@/lib/api/mealdb-error";
import { toApiSuccessResponse } from "@/lib/api/to-api-success-response";
import { fromMealDbRecipesResponseToRecipes } from "@/lib/mealdb/adapters/recipe.adapters";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name");

  if (!name) {
    return toApiErrorResponse(
      new MealDbError("Missing 'name' query param", 400, "BAD_REQUEST"),
    );
  }

  try {
    const recipes = await getRecipesByName(name);
    return toApiSuccessResponse(fromMealDbRecipesResponseToRecipes(recipes));
  } catch (error) {
    return toApiErrorResponse(error);
  }
}

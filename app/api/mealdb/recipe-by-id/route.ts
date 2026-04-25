// app/api/mealdb/areas/route.ts
import { NextResponse } from "next/server";
import { getRecipeById } from "@/lib/mealdb/mealdb.server";
import { toApiErrorResponse } from "@/lib/errors/to-api-error-response";
import { fromMealDbRecipesResponseToRecipes } from "@/lib/mealdb/adapters/recipe.adapters";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const recipeId = searchParams.get("recipeId");

  if (!recipeId) {
    return NextResponse.json(
      {
        error: {
          code: "BAD_REQUEST",
          message: "Missing 'recipeId' query param",
        },
      },
      { status: 400 },
    );
  }

  try {
    const recipe = await getRecipeById(recipeId);
    return NextResponse.json({
      data: fromMealDbRecipesResponseToRecipes(recipe),
    });
  } catch (e) {
    return toApiErrorResponse(e);
  }
}

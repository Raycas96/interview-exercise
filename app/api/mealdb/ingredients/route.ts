// app/api/mealdb/areas/route.ts
import { NextResponse } from "next/server";
import { getIngredients } from "@/lib/mealdb/mealdb.server";
import { fromMealDbIngredientResponseToIngredient } from "@/app/lib/mealdb/adapters/ingredients.adapter";
import { toApiErrorResponse } from "@/lib/errors/to-api-error-response";

export async function GET() {
  try {
    const ingredients = await getIngredients();
    return NextResponse.json({
      data: fromMealDbIngredientResponseToIngredient(ingredients),
    });
  } catch (e) {
    return toApiErrorResponse(e);
  }
}

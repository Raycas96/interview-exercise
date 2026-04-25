import { NextResponse } from "next/server";
import { MealDbError } from "./mealdb-error";

export function toApiErrorResponse(error: unknown) {
  if (error instanceof MealDbError) {
    return NextResponse.json(
      { error: { code: error.code, message: error.message } },
      { status: error.status },
    );
  }

  return NextResponse.json(
    { error: { code: "INTERNAL_ERROR", message: "Unexpected server error" } },
    { status: 500 },
  );
}

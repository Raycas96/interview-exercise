import { MealDbCategoryResponse } from "../types";
import { Category } from "../types";

export const fromMealDbCategoryResponseToCategory = (
  categories: MealDbCategoryResponse,
): Category[] =>
  categories.meals?.map((category) => ({
    name: category.strCategory,
  })) ?? [];

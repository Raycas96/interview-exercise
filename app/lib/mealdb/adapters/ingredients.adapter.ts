import { Ingredient, MealDbIngredientResponse } from "../types";

export const fromMealDbIngredientResponseToIngredient = (
  ingredients: MealDbIngredientResponse,
): Ingredient[] => {
  return (
    ingredients.meals?.map((ingredient) => ({
      id: ingredient.idIngredient,
      name: ingredient.strIngredient,
      description: ingredient.strDescription,
      type: ingredient.strType,
      thumbnail: ingredient.strThumb,
    })) ?? []
  );
};

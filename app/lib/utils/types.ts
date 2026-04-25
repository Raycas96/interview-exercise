import { Recipe } from "../mealdb/types";

export interface HistoryRecipe {
  recipeId: string;
  title: string;
  image: string;
  timestamp: string;
  inputs: {
    area: string;
    category: string;
    ingredients: string[];
  };
  liked: boolean;
}

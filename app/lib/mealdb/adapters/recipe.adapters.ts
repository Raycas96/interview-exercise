import { MealDbRecipesResponse, Recipe } from "../types";

type MealDbRecipe = NonNullable<MealDbRecipesResponse["meals"]>[number];

const formatIngredients = (recipe: MealDbRecipe): Recipe["ingredients"] => {
  const ingredients: Recipe["ingredients"] = [];

  for (let i = 1; i <= 20; i++) {
    const ingredientKey = `strIngredient${i}` as keyof MealDbRecipe;
    const measureKey = `strMeasure${i}` as keyof MealDbRecipe;
    const ingredient = recipe[ingredientKey];
    const measure = recipe[measureKey];
    if (typeof ingredient === "string" && ingredient) {
      ingredients.push({
        name: ingredient,
        measure: typeof measure === "string" ? measure : null,
      });
    }
  }
  return ingredients;
};

export const fromMealDbRecipesResponseToRecipes = (
  recipes: MealDbRecipesResponse,
): Recipe[] =>
  recipes.meals?.map((recipe) => ({
    id: recipe.idMeal,
    name: recipe.strMeal,
    alternateName: recipe.strMealAlternate,
    thumbnail: recipe.strMealThumb,
    category: recipe.strCategory,
    area: recipe.strArea,
    instructions: recipe.strInstructions,
    tags: recipe.strTags,
    youtubeUrl: recipe.strYoutube,
    ingredients: formatIngredients(recipe),
  })) ?? [];

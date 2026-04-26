export interface MealDbAreaResponse {
  meals: Array<{ strArea: string }> | null;
}

export interface Area {
  name: string;
}

export interface MealDbCategoryResponse {
  meals: Array<{ strCategory: string }> | null;
}

export interface Category {
  name: string;
}

export interface MealDbIngredientResponse {
  meals: Array<{
    strIngredient: string;
    idIngredient: string;
    strDescription: string | null;
    strType: string;
    strThumb: string | null;
  }> | null;
}

export interface Ingredient {
  id: string;
  name: string;
  description: string | null;
  type: string;
  thumbnail: string | null;
}

export interface MealDbRecipesResponse {
  meals: Array<{
    idMeal: string;
    strMeal: string;
    strMealAlternate: string | null;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    strMealThumb: string;
    strTags: string | null;
    strYoutube: string | null;
    strIngredient1: string | null;
    strIngredient2: string | null;
    strIngredient3: string | null;
    strIngredient4: string | null;
    strIngredient5: string | null;
    strIngredient6: string | null;
    strIngredient7: string | null;
    strIngredient8: string | null;
    strIngredient9: string | null;
    strIngredient10: string | null;
    strIngredient11: string | null;
    strIngredient12: string | null;
    strIngredient13: string | null;
    strIngredient14: string | null;
    strIngredient15: string | null;
    strIngredient16: string | null;
    strIngredient17: string | null;
    strIngredient18: string | null;
    strIngredient19: string | null;
    strIngredient20: string | null;
    strMeasure1: string | null;
    strMeasure2: string | null;
    strMeasure3: string | null;
    strMeasure4: string | null;
    strMeasure5: string | null;
    strMeasure6: string | null;
    strMeasure7: string | null;
    strMeasure8: string | null;
    strMeasure9: string | null;
    strMeasure10: string | null;
    strMeasure11: string | null;
    strMeasure12: string | null;
    strMeasure13: string | null;
    strMeasure14: string | null;
    strMeasure15: string | null;
    strMeasure16: string | null;
    strMeasure17: string | null;
    strMeasure18: string | null;
    strMeasure19: string | null;
    strMeasure20: string | null;
    strSource: string | null;
    strImageSource: string | null;
    strCreativeCommonsConfirmed: boolean;
    dateModified: string | null;
  }> | null;
}

export interface Recipe {
  id: string;
  name: string;
  alternateName: string | null;
  thumbnail: string;
  category: string;
  area: string;
  instructions: string;
  ingredients: {
    name: string;
    measure: string | null;
  }[];
}

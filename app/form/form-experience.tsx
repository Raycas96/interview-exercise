"use client";
import { FormContainer } from "./components/recipe-form";
import { useRecipeFromReducer } from "./hooks/useRecipeFromReducer";
import { Area } from "@/lib/mealdb/types";
import { Category } from "@/lib/mealdb/types";
import { Ingredient } from "@/lib/mealdb/types";
import { SuggestedRecipe } from "./components/suggested-recipe";

interface FormExperienceProps {
  areas: Area[];
  categories: Category[];
  ingredients: Ingredient[];
}

export const FormExperience = ({
  areas,
  categories,
  ingredients,
}: FormExperienceProps) => {
  const {
    state,
    handleSelectArea,
    handleSelectIngredients,
    handleSelectCategory,
  } = useRecipeFromReducer();

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      <section className="flex min-w-0 flex-col">
        <FormContainer
          areasList={areas}
          categoriesList={categories}
          ingredientsList={ingredients}
          selectedArea={state.firstStep.area}
          selectedIngredients={state.secondStep.selectedIngredients}
          selectedCategory={state.secondStep.selectedCategory}
          onSelectArea={handleSelectArea}
          onSelectIngredients={handleSelectIngredients}
          onSelectCategory={handleSelectCategory}
        />
      </section>
      <section className="flex min-w-0 flex-col md:items-center lg:items-stretch">
        <SuggestedRecipe
          area={state.firstStep.area}
          category={state.secondStep.selectedCategory}
          ingredients={state.secondStep.selectedIngredients}
        />
      </section>
    </div>
  );
};

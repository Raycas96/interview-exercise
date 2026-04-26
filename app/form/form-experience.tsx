"use client";
import { FormContainer } from "./components/recipe-form";
import { useRecipeFromReducer } from "./hooks/useRecipeFromReducer";
import { Area, Category, Ingredient, Recipe } from "@/lib/mealdb/types";
import { SuggestedRecipe } from "./components/suggested-recipe";
import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { FormState } from "./components/recipe-form/reducer";

interface FormExperienceProps {
  areas: Area[];
  categories: Category[];
  ingredients: Ingredient[];
  initialFormState: FormState;
}

export const FormExperience = ({
  areas,
  categories,
  ingredients,
  initialFormState,
}: FormExperienceProps) => {
  const {
    state,
    handleSelectArea,
    handleSelectIngredients,
    handleSelectCategory,
    handleSearchModeChange,
    handleNameQueryChange,
  } = useRecipeFromReducer(initialFormState);
  const [selectedNameRecipe, setSelectedNameRecipe] = useState<Recipe | null>(
    null,
  );
  const pathname = usePathname();
  const router = useRouter();
  const lastSyncedQueryRef = useRef<string>("");

  const handleNameRecipeSelect = useCallback((recipe: Recipe | null) => {
    setSelectedNameRecipe(recipe);
  }, []);

  const handleSearchModeSelect = useCallback(
    (searchMode: "area" | "name") => {
      handleSearchModeChange(searchMode);
      if (searchMode === "area") {
        setSelectedNameRecipe(null);
      }
    },
    [handleSearchModeChange],
  );

  useEffect(() => {
    const params = new URLSearchParams();
    params.set("mode", state.firstStep.searchMode);

    if (state.firstStep.searchMode === "area") {
      if (state.firstStep.area) {
        params.set("area", state.firstStep.area);
      }
      if (state.secondStep.selectedCategory) {
        params.set("category", state.secondStep.selectedCategory);
      }
      if (state.secondStep.selectedIngredients.length > 0) {
        params.set(
          "ingredients",
          state.secondStep.selectedIngredients.join(","),
        );
      }
    } else if (state.firstStep.nameQuery.trim().length > 0) {
      params.set("name", state.firstStep.nameQuery.trim());
    }

    const nextQuery = params.toString();
    const nextUrl = nextQuery ? `${pathname}?${nextQuery}` : pathname;
    if (nextQuery !== lastSyncedQueryRef.current) {
      lastSyncedQueryRef.current = nextQuery;
      router.replace(nextUrl, { scroll: false });
    }
  }, [
    pathname,
    router,
    state.firstStep.area,
    state.firstStep.nameQuery,
    state.firstStep.searchMode,
    state.secondStep.selectedCategory,
    state.secondStep.selectedIngredients,
  ]);

  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      <section className="flex min-w-0 flex-col">
        <FormContainer
          areasList={areas}
          categoriesList={categories}
          ingredientsList={ingredients}
          selectedArea={state.firstStep.area}
          nameQuery={state.firstStep.nameQuery}
          searchMode={state.firstStep.searchMode}
          selectedIngredients={state.secondStep.selectedIngredients}
          selectedCategory={state.secondStep.selectedCategory}
          onSelectArea={handleSelectArea}
          onSelectIngredients={handleSelectIngredients}
          onSelectCategory={handleSelectCategory}
          onSearchModeChange={handleSearchModeSelect}
          onNameQueryChange={handleNameQueryChange}
          onNameRecipeSelect={handleNameRecipeSelect}
        />
      </section>
      <section className="flex min-w-0 flex-col md:items-center lg:items-stretch">
        <SuggestedRecipe
          searchMode={state.firstStep.searchMode}
          area={state.firstStep.area}
          category={state.secondStep.selectedCategory}
          ingredients={state.secondStep.selectedIngredients}
          selectedNameRecipe={selectedNameRecipe}
        />
      </section>
    </div>
  );
};

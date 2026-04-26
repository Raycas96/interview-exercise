import { Card } from "@/app/components/card";
import { NoAreaCard } from "./components/no-area-card";
import { SkeletonRecipeCard } from "./components/skeleton-recipe-card";
import { useGetRecipes } from "./hooks/useGetRecipes";
import { Button } from "@/components/button";
import { RecipeCard } from "./components/recipe-card";
import { NoRecipeCard } from "./components/no-recipe-card";

import { Recipe } from "@/lib/mealdb/types";
interface SuggestedRecipeProps {
  searchMode: "area" | "name";
  area: string | null;
  category: string | null;
  ingredients: string[];
  selectedNameRecipe: Recipe | null;
}
export const SuggestedRecipe = ({
  searchMode,
  area,
  category,
  ingredients,
  selectedNameRecipe,
}: SuggestedRecipeProps) => {
  const {
    loading,
    error,
    retry,
    selectedRecipe,
    suggestAnother,
    canSuggestAnother,
  } = useGetRecipes({
    searchMode,
    area,
    category,
    ingredients,
    selectedRecipeOverride: selectedNameRecipe,
  });

  if (searchMode === "area" && !area) {
    return <NoAreaCard />;
  }

  if (loading) {
    return <SkeletonRecipeCard />;
  }

  if (error) {
    return (
      <Card title="Error" description={error}>
        <div className="flex justify-center w-full">
          <Button
            type="button"
            onClick={() => {
              retry();
            }}
          >
            Retry
          </Button>
        </div>
      </Card>
    );
  }

  if (searchMode === "name" && !selectedRecipe) {
    return (
      <Card
        title="Pick a recipe by name"
        description="Choose one recipe from the name preview list to show it here."
      />
    );
  }

  if (!selectedRecipe) {
    return <NoRecipeCard />;
  }

  return (
    <div className="w-full">
      <h2 className="pb-3 text-sm font-bold sm:text-base md:text-center">
        Based on your preferences, we think you&apos;ll like the following
      </h2>
      <RecipeCard
        recipe={selectedRecipe}
        selectedInputs={{ area, category, ingredients }}
        onNewIdea={suggestAnother}
        showNewIdea={searchMode === "area" && canSuggestAnother}
      />
    </div>
  );
};

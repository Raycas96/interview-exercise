import { Card } from "@/app/components/card";
import { NoAreaCard } from "./components/no-area-card";
import { SkeletonRecipeCard } from "./components/skeleton-recipe-card";
import { useGetRecipes } from "./hooks/useGetRecipes";
import { Button } from "@/components/button";
import { RecipeCard } from "./components/recipe-card";
import { NoRecipeCard } from "./components/no-recipe-card";

interface SuggestedRecipeProps {
  area: string | null;
  category: string | null;
  ingredients: string[];
}
export const SuggestedRecipe = ({
  area,
  category,
  ingredients,
}: SuggestedRecipeProps) => {
  const {
    loading,
    error,
    retry,
    selectedRecipe,
    suggestAnother,
    canSuggestAnother,
  } = useGetRecipes({
    area,
    category,
    ingredients,
  });
  if (!area) {
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
        showNewIdea={canSuggestAnother}
      />
    </div>
  );
};

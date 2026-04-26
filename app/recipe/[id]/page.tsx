import { Card } from "@/components/card";
import { FallbackImage } from "@/components/fallback-image";
import { fromMealDbRecipesResponseToRecipes } from "@/lib/mealdb/adapters/recipe.adapters";
import { getRecipeById } from "@/lib/mealdb/mealdb.server";
import { notFound } from "next/navigation";
import { RecipeActions } from "./components/recipe-actions";
import { RecipeIngredientsSection } from "./components/recipe-ingredients-section";
import { RecipeInstructionsSection } from "./components/recipe-instructions-section";
import { RecipeMetaBadges } from "@/components/recipe-meta-badges";

interface RecipeDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipeDetailsPage({
  params,
}: RecipeDetailsPageProps) {
  const { id } = await params;
  const recipeResponse = await getRecipeById(id);
  const recipe = fromMealDbRecipesResponseToRecipes(recipeResponse)[0];

  if (!recipe) {
    notFound();
  }

  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8">
      <Card title={recipe.name} description="Detailed recipe overview">
        <div className="flex flex-col gap-4">
          <FallbackImage
            src={recipe.thumbnail}
            alt={recipe.name}
            containerClassName="h-56 sm:h-64"
            sizes="(min-width: 768px) 720px, 100vw"
          />

          <RecipeMetaBadges area={recipe.area} category={recipe.category} />
          <RecipeIngredientsSection ingredients={recipe.ingredients} />
          <RecipeInstructionsSection instructions={recipe.instructions} />
          <RecipeActions />
        </div>
      </Card>
    </main>
  );
}

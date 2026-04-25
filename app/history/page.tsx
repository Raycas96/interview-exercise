"use client";

import { SavedRecipeCard } from "@/app/history/components/saved-recipe-card";
import { useGetSavedRecipes } from "@/app/history/hooks/useGetSavedRecipes";

export default function History() {
  const { savedRecipes, likedCount, dislikedCount } = useGetSavedRecipes();

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-4 py-8">
      <section className="rounded-2xl border border-border bg-surface p-5">
        <h1 className="text-2xl font-semibold text-foreground">
          Recipe history
        </h1>
        <p className="mt-1 text-sm text-muted">
          Full list of your previous feedback.
        </p>

        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          <span className="rounded-full bg-brand/15 px-2 py-1 text-brand">
            Total: {savedRecipes.length}
          </span>
          <span className="rounded-full bg-brand/15 px-2 py-1 text-brand">
            Yes: {likedCount}
          </span>
          <span className="rounded-full bg-action/15 px-2 py-1 text-action">
            No: {dislikedCount}
          </span>
        </div>
      </section>

      {savedRecipes.length === 0 ? (
        <p className="rounded-xl border border-border bg-surface p-4 text-sm text-muted text-center">
          No saved recipes yet. Go to the &quot;find a recipe&quot; section and
          use our magic algorithm to find a recipe and then save it to your
          history.
        </p>
      ) : (
        <ul className="grid grid-cols-1 gap-4 sm:grid-col-1 md:grid-cols-2 lg:grid-cols-4">
          {savedRecipes.map((recipe) => (
            <li key={recipe.recipeId}>
              <SavedRecipeCard recipe={recipe} />
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}

import { useDebouncedValue } from "@/lib/hooks/use-debounced-value";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import { getRecipesByName } from "@/lib/mealdb/client/get-recipes-by-name";
import { Recipe } from "@/lib/mealdb/types";

interface NameRecipeSearchProps {
  query: string;
  onQueryChange: (query: string) => void;
  onRecipeSelect: (recipe: Recipe | null) => void;
}

export const NameRecipeSearch = ({
  query,
  onQueryChange,
  onRecipeSelect,
}: NameRecipeSearchProps) => {
  const [nameResults, setNameResults] = useState<Recipe[]>([]);
  const [nameSearchLoading, setNameSearchLoading] = useState(false);
  const [nameSearchError, setNameSearchError] = useState<string | null>(null);

  const debouncedRecipeNameQuery = useDebouncedValue(query, 300);

  const isQueryTooShort = debouncedRecipeNameQuery.trim().length < 2;

  const displayResults = isQueryTooShort ? [] : nameResults;
  const displayLoading = isQueryTooShort ? false : nameSearchLoading;
  const displayError = isQueryTooShort ? null : nameSearchError;

  useEffect(() => {
    const trimmed = debouncedRecipeNameQuery.trim();

    if (trimmed.length < 2) {
      // 3. ONLY call the parent updater.
      // We removed ALL local synchronous setStates to fix the linter error!
      onRecipeSelect(null);
      return;
    }

    const abortController = new AbortController();
    const searchByName = async () => {
      setNameSearchLoading(true);
      setNameSearchError(null);
      try {
        const recipes = await getRecipesByName(trimmed, {
          signal: abortController.signal,
        });
        setNameResults(recipes.slice(0, 5));
      } catch (error) {
        if (
          error instanceof Error &&
          (error.name === "AbortError" ||
            error.message.includes("signal is aborted"))
        ) {
          return;
        }
        setNameSearchError(
          error instanceof Error ? error.message : "Unknown search error",
        );
      } finally {
        setNameSearchLoading(false);
      }
    };

    void searchByName();

    return () => {
      abortController.abort();
    };
  }, [debouncedRecipeNameQuery, onRecipeSelect]);

  return (
    <div className="mt-3 rounded-lg border border-border/80 p-3">
      <label
        htmlFor="recipe-name-search"
        className="text-sm/6 font-medium text-white"
      >
        Search recipe by name
      </label>
      <p className="text-sm/6 text-white/50">
        Type at least 2 characters to fetch live recipe matches.
      </p>
      <input
        id="recipe-name-search"
        type="text"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="e.g. Arrabiata"
        className="mt-3 w-full rounded-lg bg-white/5 px-3 py-2 text-sm/6 text-white placeholder:text-white/40 focus:outline-none focus:outline-2 focus:-outline-offset-2 focus:outline-white/25"
      />

      {/* 5. Use the derived state variables here instead of the raw state */}
      {displayLoading ? (
        <p className="mt-2 text-sm text-muted">Searching recipes...</p>
      ) : null}

      {displayError ? (
        <p className="mt-2 text-sm text-action">{displayError}</p>
      ) : null}

      {!isQueryTooShort && !displayLoading && !displayError ? (
        displayResults.length > 0 ? (
          <ul className="mt-2 space-y-1 text-sm text-foreground">
            {displayResults.map((recipe) => (
              <li
                key={recipe.id}
                className="flex items-center justify-between gap-2"
              >
                <button
                  type="button"
                  onClick={() => onRecipeSelect(recipe)}
                  className="text-left hover:underline text-brand"
                >
                  {recipe.name}
                </button>
                <Link
                  href={`/recipe/${recipe.id}`}
                  className="text-xs text-muted hover:underline"
                >
                  details
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-2 text-sm text-muted">No recipes found by name.</p>
        )
      ) : null}
    </div>
  );
};

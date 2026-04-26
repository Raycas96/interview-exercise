"use client";

import { PreferenceFeedback } from "@/components/preference-feedback";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { Recipe } from "@/lib/mealdb/types";
import {
  getStoredHistoryRecipes,
  upsertRecipeFromSuggestion,
} from "@/utils/history";
import { useState } from "react";

interface SaveRecipeFromDetailsProps {
  recipe: Recipe;
}

export const SaveRecipeFromDetails = ({
  recipe,
}: SaveRecipeFromDetailsProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const existingPreference =
    getStoredHistoryRecipes().find(
      (historyEntry) => historyEntry.recipeId === recipe.id,
    )?.liked ?? null;

  const handleSaveRecipe = (liked: boolean) => {
    upsertRecipeFromSuggestion(recipe, liked, {
      area: recipe.area,
      category: recipe.category,
      ingredients: [],
    });

    setDialogMessage(
      liked
        ? "Great! This recipe was added to your liked history."
        : "Saved. This recipe was added to your disliked history.",
    );
    setIsDialogOpen(true);
  };

  return (
    <div className="rounded-xl border border-border/80 p-3">
      {existingPreference !== null ? (
        <div className="mb-3 flex justify-center">
          <span
            className={
              existingPreference
                ? "rounded-full bg-brand/15 px-2 py-1 text-xs text-action"
                : "rounded-full bg-action/15 px-2 py-1 text-xs text-brand"
            }
          >
            {existingPreference ? "Matched preference" : "Did not match"}
          </span>
        </div>
      ) : null}
      <PreferenceFeedback
        onSelect={handleSaveRecipe}
        prompt="Did it match your preference?"
        centered
      />
      <FeedbackDialog
        open={isDialogOpen}
        title="Preference saved"
        description={dialogMessage}
        onClose={() => setIsDialogOpen(false)}
        autoClose={true}
      />
    </div>
  );
};

"use client";

import { Recipe } from "@/lib/mealdb/types";
import { upsertRecipeFromSuggestion } from "@/utils/history";
import { PreferenceFeedback } from "@/app/components/preference-feedback";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { useState } from "react";

interface SaveRecipeProps {
  recipe: Recipe;
  selectedInputs: {
    area: string | null;
    category: string | null;
    ingredients: string[];
  };
}

export const SaveRecipe = ({ recipe, selectedInputs }: SaveRecipeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSaveRecipe = (liked: boolean) => {
    upsertRecipeFromSuggestion(recipe, liked, selectedInputs);

    setDialogMessage(
      liked
        ? "Gotcha! We saved this as a liked recipe in your history."
        : "Gotcha! We saved this as disliked in your history.",
    );
    setIsDialogOpen(true);
  };

  return (
    <div>
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

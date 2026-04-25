"use client";

import { LOCAL_STORAGE_HISTORY_KEY } from "@/app/lib/utils/constants";
import { HistoryRecipe } from "@/utils/types";
import { Button } from "@/components/button";
import { FeedbackDialog } from "@/components/feedback-dialog";
import { Recipe } from "@/app/lib/mealdb/types";
import { useState } from "react";
interface SaveRecipeProps {
  recipe: Recipe;
}
export const SaveRecipe = ({ recipe }: SaveRecipeProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const handleSaveRecipe = (liked: boolean) => {
    const history = localStorage.getItem(LOCAL_STORAGE_HISTORY_KEY);
    if (history) {
      const parsedHistory: HistoryRecipe[] = JSON.parse(history);
      const existingRecipe = parsedHistory.find(
        (r) => r.recipeId === recipe.id,
      );
      if (existingRecipe) {
        existingRecipe.liked = liked;
      } else {
        parsedHistory.push({
          recipeId: recipe.id,
          title: recipe.name,
          image: recipe.thumbnail,
          timestamp: new Date().toISOString(),
          inputs: {
            area: recipe.area,
            category: recipe.category,
            ingredients: recipe.ingredients.map((i) => i.name),
          },
          liked,
        });
      }

      localStorage.setItem(
        LOCAL_STORAGE_HISTORY_KEY,
        JSON.stringify(parsedHistory),
      );
    } else {
      localStorage.setItem(
        LOCAL_STORAGE_HISTORY_KEY,
        JSON.stringify([
          {
            recipeId: recipe.id,
            title: recipe.name,
            image: recipe.thumbnail,
            timestamp: new Date().toISOString(),
            inputs: {
              area: recipe.area,
              category: recipe.category,
              ingredients: recipe.ingredients.map((i) => i.name),
            },
            liked,
          },
        ]),
      );
    }

    setDialogMessage(
      liked
        ? "Great! We saved this as a liked recipe in your history."
        : "Got it. We saved this as disliked in your history.",
    );
    setIsDialogOpen(true);
  };

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm text-muted">Did it match your preference? </p>
      <div className="flex gap-2 w-full justify-center">
        <Button type="button" onClick={() => handleSaveRecipe(true)}>
          Yes
        </Button>
        <Button type="button" onClick={() => handleSaveRecipe(false)}>
          No
        </Button>
      </div>
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

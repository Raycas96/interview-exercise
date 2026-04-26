"use client";

import { Card } from "@/components/card";
import { FeedbackDialog } from "@/app/components/feedback-dialog";
import { PreferenceFeedback } from "@/app/components/preference-feedback";
import { HistoryRecipe } from "@/utils/types";
import { useMemo, useState } from "react";
import { FallbackImage } from "@/components/fallback-image";
import Link from "next/link";
import { SavedRecipeInputsSummary, SavedRecipeMeta } from "./components";

interface SavedRecipeCardProps {
  recipe: HistoryRecipe;
  onPreferenceChange: (recipeId: string, liked: boolean) => void;
}

export const SavedRecipeCard = ({
  recipe,
  onPreferenceChange,
}: SavedRecipeCardProps) => {
  const [liked, setLiked] = useState(recipe.liked);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");

  const inputsSummary = useMemo(() => {
    return [
      { label: "Area", value: recipe.inputs.area },
      { label: "Category", value: recipe.inputs.category },
      {
        label: "Ingredients",
        value:
          recipe.inputs.ingredients.length > 0
            ? recipe.inputs.ingredients.join(", ")
            : "None selected",
      },
    ];
  }, [recipe.inputs]);

  const saveFeedback = (nextLiked: boolean) => {
    setLiked(nextLiked);
    onPreferenceChange(recipe.recipeId, nextLiked);
    setDialogMessage(
      nextLiked
        ? "Great! We updated this recipe as liked in your history."
        : "Got it. We updated this recipe as disliked in your history.",
    );
    setIsDialogOpen(true);
  };

  return (
    <Card
      title={recipe.title}
      padding="sm"
      className="flex h-full min-h-0 w-full flex-col"
    >
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        <FallbackImage
          src={recipe.image}
          alt={recipe.title}
          containerClassName="h-36 md:h-40 lg:h-32"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw"
        />

        <SavedRecipeMeta timestamp={recipe.timestamp} liked={liked} />
        <SavedRecipeInputsSummary inputsSummary={inputsSummary} />

        <div className="mt-auto flex flex-col gap-3">
          <div className="flex justify-center">
            <Link
              href={`/recipe/${recipe.recipeId}`}
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface"
            >
              View details
            </Link>
          </div>

          <PreferenceFeedback
            onSelect={saveFeedback}
            liked={liked}
            prompt="Update your preference"
            centered
          />
        </div>
        <FeedbackDialog
          open={isDialogOpen}
          title="Preference updated"
          description={dialogMessage}
          onClose={() => setIsDialogOpen(false)}
          autoClose={true}
        />
      </div>
    </Card>
  );
};

"use client";

import { Card } from "@/app/components/card";
import { FeedbackDialog } from "@/app/components/feedback-dialog";
import { PreferenceFeedback } from "@/app/components/preference-feedback";
import { formatDate } from "@/utils/date";
import { HistoryRecipe } from "@/utils/types";
import { useMemo, useState } from "react";
import { FallbackImage } from "@/components/fallback-image";

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
    <Card title={recipe.title} padding="sm">
      <div className="flex flex-col gap-3">
        <FallbackImage
          src={recipe.image}
          alt={recipe.title}
          containerClassName="h-36 md:h-40 lg:h-32"
          sizes="(min-width: 1024px) 280px, (min-width: 768px) 45vw, 100vw"
        />

        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="rounded-full bg-brand/15 px-2 py-1 text-brand">
            Saved on {formatDate(recipe.timestamp)}
          </span>
          <span
            className={
              liked
                ? "rounded-full bg-brand/15 px-2 py-1 text-action"
                : "rounded-full bg-action/15 px-2 py-1 text-brand"
            }
          >
            {liked ? "Matched preference" : "Did not match"}
          </span>
        </div>

        <div className="rounded-xl border border-border/80 p-2.5">
          <p className="text-xs font-medium text-foreground sm:text-sm">
            Inputs used
          </p>
          <ul className="mt-2 space-y-1 text-xs text-muted sm:text-sm">
            {inputsSummary.map((input) => (
              <li key={input.label}>
                <span className="text-foreground">{input.label}:</span>{" "}
                {input.value}
              </li>
            ))}
          </ul>
        </div>

        <PreferenceFeedback
          onSelect={saveFeedback}
          liked={liked}
          prompt="Update your preference"
          centered
        />
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

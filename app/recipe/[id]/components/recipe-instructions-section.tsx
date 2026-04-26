interface RecipeInstructionsSectionProps {
  instructions: string;
}

export function RecipeInstructionsSection({
  instructions,
}: RecipeInstructionsSectionProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-foreground">Instructions</h2>
      <p className="text-sm leading-6 text-muted whitespace-pre-line">
        {instructions}
      </p>
    </section>
  );
}

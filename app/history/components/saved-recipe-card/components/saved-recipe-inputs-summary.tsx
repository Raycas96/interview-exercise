interface SavedRecipeInputsSummaryProps {
  inputsSummary: Array<{
    label: string;
    value: string;
  }>;
}

export function SavedRecipeInputsSummary({
  inputsSummary,
}: SavedRecipeInputsSummaryProps) {
  return (
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
  );
}

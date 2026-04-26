interface RecipeMetaBadgesProps {
  area: string;
  category: string;
}

export function RecipeMetaBadges({ area, category }: RecipeMetaBadgesProps) {
  if (!area || !category) {
    return null;
  }

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-full bg-brand/15 px-2 py-1 text-brand">
        {area}
      </span>
      <span className="rounded-full bg-action/15 px-2 py-1 text-action">
        {category}
      </span>
    </div>
  );
}

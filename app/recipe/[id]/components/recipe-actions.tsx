import Link from "next/link";

export const RecipeActions = () => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      <Link
        href="/recommender"
        className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface"
      >
        Back to recommender
      </Link>
    </div>
  );
};

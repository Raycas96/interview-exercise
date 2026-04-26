import { formatDate } from "@/utils/date";

interface SavedRecipeMetaProps {
  timestamp: string;
  liked: boolean;
}

export function SavedRecipeMeta({ timestamp, liked }: SavedRecipeMetaProps) {
  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="rounded-full bg-brand/15 px-2 py-1 text-brand">
        Saved on {formatDate(timestamp)}
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
  );
}

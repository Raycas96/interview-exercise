import { Card } from "@/components/card";
import { Skeleton } from "@/components/skeleton/skeleton";

export default function RecipeDetailsLoading() {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8">
      <Card title="Loading recipe details...">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-56 w-full rounded-xl sm:h-64" />
          <Skeleton className="h-6 w-40 rounded-md" />
          <Skeleton className="h-20 w-full rounded-md" />
          <Skeleton className="h-28 w-full rounded-md" />
        </div>
      </Card>
    </main>
  );
}

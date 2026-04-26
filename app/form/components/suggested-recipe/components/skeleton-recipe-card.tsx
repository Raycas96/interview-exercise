import { Card } from "@/app/components/card";
import { Skeleton } from "@/components/skeleton";

export const SkeletonRecipeCard = () => {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Card title={<Skeleton className="h-8 w-full sm:h-10" rounded="sm" />}>
        <div className="flex flex-col gap-2">
          <Skeleton className="h-44 w-full sm:h-52" rounded="lg" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </Card>
    </div>
  );
};

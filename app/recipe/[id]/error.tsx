"use client";

import { Card } from "@/components/card";
import { Button } from "@/components/button";

interface RecipeDetailsErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function RecipeDetailsError({
  error,
  reset,
}: RecipeDetailsErrorProps) {
  return (
    <main className="mx-auto flex w-full max-w-4xl flex-col gap-4 px-4 py-8">
      <Card title="Unable to load recipe" description={error.message}>
        <div className="flex justify-center">
          <Button type="button" onClick={reset}>
            Try again
          </Button>
        </div>
      </Card>
    </main>
  );
}

import Link from "next/link";
import { Card } from "@/components/card";

export default function Home() {
  return (
    <div className="flex flex-1 justify-center bg-background px-4 py-10 font-sans md:py-14">
      <main className="flex w-full max-w-4xl flex-col gap-6">
        <Card
          title="Welcome to Recipe Recommender"
          titleAs="h1"
          description='Are you ready to find your next recipe obsession using our advanced algorithm? click the "Find a recipe" button below to get started. Or maybe you would prefer to check what you already saved? Just click the "View history" button below to view your history.'
          id="home"
          tone="default"
        >
          <div className="flex gap-3 justify-center">
            <Link
              href="/form"
              className="rounded-md bg-brand px-4 py-2 text-sm font-medium text-brand-foreground transition-colors hover:bg-brand-hover"
            >
              Find a recipe
            </Link>
            <Link
              href="/history"
              className="rounded-md border border-border bg-background px-3 py-2 text-sm text-foreground transition-colors hover:bg-surface"
            >
              Saved recipes
            </Link>
          </div>
        </Card>
      </main>
    </div>
  );
}

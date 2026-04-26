import { Card } from "@/app/components/card";
import { Recipe } from "@/app/lib/mealdb/types";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { SaveRecipe } from "./save-recipe";
import { FallbackImage } from "@/components/fallback-image";

interface RecipeCardProps {
  recipe: Recipe;
  selectedInputs: {
    area: string | null;
    category: string | null;
    ingredients: string[];
  };
}
export const RecipeCard = ({ recipe, selectedInputs }: RecipeCardProps) => {
  return (
    <div className="mx-auto w-full max-w-xl">
      <Card title={recipe.name}>
        <div className="flex flex-col gap-4">
          <FallbackImage
            src={recipe.thumbnail}
            alt={recipe.name}
            containerClassName="mx-auto h-44  sm:h-52 sm:w-full md:w-[80%] lg:w-[70%]"
            sizes="(min-width: 640px) 480px, 100vw"
          />

          <div className="flex items-center gap-2 text-xs">
            <span className="rounded-full bg-brand/15 px-2 py-1 text-brand">
              {recipe.area}
            </span>
            <span className="rounded-full bg-action/15 px-2 py-1 text-action">
              {recipe.category}
            </span>
          </div>

          <Disclosure as="div" className="rounded-lg border border-border/80">
            {({ open }) => (
              <>
                <DisclosureButton className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-foreground">
                  Ingredients ({recipe.ingredients.length})
                  <ChevronDownIcon
                    className={clsx(
                      "size-5 text-muted transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </DisclosureButton>
                <DisclosurePanel className="border-t border-border/80 px-3 py-3">
                  <ul className="space-y-1 text-sm text-muted">
                    {recipe.ingredients.map((ingredient) => (
                      <li
                        key={`${ingredient.name}-${ingredient.measure ?? ""}`}
                      >
                        <span className="text-foreground">
                          {ingredient.name}
                        </span>
                        {ingredient.measure ? ` - ${ingredient.measure}` : ""}
                      </li>
                    ))}
                  </ul>
                </DisclosurePanel>
              </>
            )}
          </Disclosure>

          <Disclosure as="div" className="rounded-lg border border-border/80">
            {({ open }) => (
              <>
                <DisclosureButton className="flex w-full items-center justify-between px-3 py-2 text-left text-sm font-medium text-foreground">
                  Full description
                  <ChevronDownIcon
                    className={clsx(
                      "size-5 text-muted transition-transform",
                      open && "rotate-180",
                    )}
                  />
                </DisclosureButton>
                <DisclosurePanel className="border-t border-border/80 px-3 py-3 text-sm leading-6 text-muted">
                  {recipe.instructions}
                </DisclosurePanel>
              </>
            )}
          </Disclosure>

          <SaveRecipe recipe={recipe} selectedInputs={selectedInputs} />
        </div>
      </Card>
    </div>
  );
};

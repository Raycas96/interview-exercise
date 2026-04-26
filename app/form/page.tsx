import {
  getAreas,
  getCategories,
  getIngredients,
} from "@/lib/mealdb/mealdb.server";
import {
  fromMealDbAreaResponseToArea,
  fromMealDbCategoryResponseToCategory,
  fromMealDbIngredientResponseToIngredient,
} from "@/lib/mealdb/adapters";
import { FormExperience } from "./form-experience";
import { toInitialFormStateFromQuery } from "./utils/query-state";

interface FormPageProps {
  searchParams?: Promise<Record<string, string | string[] | undefined>>;
}

export default async function Form({ searchParams }: FormPageProps) {
  const [areas, categories, ingredients] = await Promise.all([
    getAreas(),
    getCategories(),
    getIngredients(),
  ]);

  const formattedAreas = fromMealDbAreaResponseToArea(areas);
  const formattedCategories = fromMealDbCategoryResponseToCategory(categories);
  const formattedIngredients =
    fromMealDbIngredientResponseToIngredient(ingredients);
  const resolvedSearchParams = searchParams ? await searchParams : {};
  const initialFormState = toInitialFormStateFromQuery(
    resolvedSearchParams,
    new Set(formattedAreas.map((area) => area.name)),
    new Set(formattedCategories.map((category) => category.name)),
    new Set(formattedIngredients.map((ingredient) => ingredient.name)),
  );

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:px-8">
      <h1 className="text-center text-2xl font-bold sm:text-3xl">
        Recipe Form
      </h1>
      <FormExperience
        areas={formattedAreas}
        categories={formattedCategories}
        ingredients={formattedIngredients}
        initialFormState={initialFormState}
      />
    </main>
  );
}

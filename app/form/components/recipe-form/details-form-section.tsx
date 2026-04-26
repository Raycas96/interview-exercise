import { SelectField } from "@/app/components/select-field";
import { MultiSelectField } from "@/app/components/multi-select-field";
import { Category, Ingredient } from "@/app/lib/mealdb/types";

interface DetailsFormSectionProps {
  categoriesList: Category[];
  ingredientsList: Ingredient[];
  selectedCategory: string | null;
  selectedIngredients: string[];
  onSelectCategory: (category: string) => void;
  onSelectIngredients: (ingredients: string[]) => void;
  disabled?: boolean;
}
export const DetailsFormSection = ({
  categoriesList,
  ingredientsList,
  selectedCategory,
  selectedIngredients,
  onSelectCategory,
  onSelectIngredients,
  disabled = false,
}: DetailsFormSectionProps) => {
  return (
    <div className="w-full max-w-md px-4 flex flex-col gap-2">
      <SelectField
        label="Category"
        description="Select the category of the recipe"
        placeholder="Select category"
        value={selectedCategory ?? ""}
        options={categoriesList.map((category) => ({
          value: category.name,
          label: category.name,
        }))}
        onChange={onSelectCategory}
        disabled={disabled}
      />
      <MultiSelectField
        label="Ingredients"
        description="Select one or more ingredients for recipe matching"
        value={selectedIngredients}
        options={ingredientsList.map((ingredient) => ({
          value: ingredient.name,
          label: ingredient.name,
        }))}
        onChange={onSelectIngredients}
        placeholder="Select ingredients"
        disabled={disabled}
      />
    </div>
  );
};

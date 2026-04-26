import { Recipe } from "@/lib/mealdb/types";

interface RecipeIngredientsSectionProps {
  ingredients: Recipe["ingredients"];
}

export function RecipeIngredientsSection({
  ingredients,
}: RecipeIngredientsSectionProps) {
  return (
    <section className="space-y-2">
      <h2 className="text-sm font-semibold text-foreground">Ingredients</h2>
      <ul className="space-y-1 text-sm text-muted">
        {ingredients.map((ingredient) => (
          <li key={`${ingredient.name}-${ingredient.measure ?? ""}`}>
            <span className="text-foreground">{ingredient.name}</span>
            {ingredient.measure ? ` - ${ingredient.measure}` : ""}
          </li>
        ))}
      </ul>
    </section>
  );
}

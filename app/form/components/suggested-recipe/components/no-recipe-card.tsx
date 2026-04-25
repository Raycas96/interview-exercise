import { Card } from "@/app/components/card";

export const NoRecipeCard = () => {
  return (
    <Card
      title="No recipe found"
      description="No recipe was found with the selected criteria, please try again with different criteria! 🍲"
    />
  );
};

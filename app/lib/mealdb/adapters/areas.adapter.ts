import { Area, MealDbAreaResponse } from "../types";

export const fromMealDbAreaResponseToArea = (
  areas: MealDbAreaResponse,
): Area[] => {
  return (
    areas.meals?.map((meal) => ({
      name: meal.strArea,
    })) ?? []
  );
};

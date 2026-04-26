import { Recipe } from "@/lib/mealdb/types";

export const RECIPES_FIXTURE: Recipe[] = [
  {
    id: "1",
    name: "Spicy Curry",
    alternateName: null,
    thumbnail: "/curry.jpg",
    category: "Vegetarian",
    area: "Indian",
    instructions: "Cook everything.",
    ingredients: [
      { name: "Garlic", measure: "1 clove" },
      { name: "Tomato", measure: "1" },
      { name: "Chili", measure: "1" },
    ],
  },
  {
    id: "2",
    name: "Classic Pasta",
    alternateName: null,
    thumbnail: "/pasta.jpg",
    category: "Pasta",
    area: "Italian",
    instructions: "Boil and mix.",
    ingredients: [
      { name: "Tomato", measure: "2" },
      { name: "Basil", measure: "3 leaves" },
    ],
  },
];

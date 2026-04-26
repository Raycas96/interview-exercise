export const TABS = [
  {
    name: "General Filters",
    code: "general-filters",
  },
  {
    name: "Recipe Details",
    code: "recipe-details",
  },
];

export type TabName = (typeof TABS)[number]["name"];

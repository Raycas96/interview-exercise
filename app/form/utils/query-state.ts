import {
  FormState,
  SearchMode,
  initialState,
} from "../components/recipe-form/reducer";

export const getSingleParam = (
  value: string | string[] | undefined,
): string | undefined => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export const toInitialFormStateFromQuery = (
  searchParams: Record<string, string | string[] | undefined>,
  allowedAreas: Set<string>,
  allowedCategories: Set<string>,
  allowedIngredients: Set<string>,
): FormState => {
  const modeParam = getSingleParam(searchParams.mode);
  const searchMode: SearchMode = modeParam === "name" ? "name" : "area";

  const areaParam = getSingleParam(searchParams.area);
  const nameParam = getSingleParam(searchParams.name) ?? "";
  const categoryParam = getSingleParam(searchParams.category);
  const ingredientsParam = getSingleParam(searchParams.ingredients) ?? "";

  const area =
    searchMode === "area" && areaParam && allowedAreas.has(areaParam)
      ? areaParam
      : null;
  const selectedCategory =
    searchMode === "area" &&
    categoryParam &&
    allowedCategories.has(categoryParam)
      ? categoryParam
      : null;
  const selectedIngredients =
    searchMode === "area"
      ? ingredientsParam
          .split(",")
          .map((value) => value.trim())
          .filter((value) => value.length > 0 && allowedIngredients.has(value))
      : [];

  return {
    ...initialState,
    firstStep: {
      area,
      searchMode,
      nameQuery: searchMode === "name" ? nameParam.trim() : "",
    },
    secondStep: {
      selectedCategory,
      selectedIngredients,
    },
  };
};

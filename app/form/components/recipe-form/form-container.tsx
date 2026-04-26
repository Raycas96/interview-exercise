"use client";

import { PropsWithChildren } from "react";
import { TABS } from "./constants";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Area, Category, Ingredient, Recipe } from "@/lib/mealdb/types";
import { FirstStep } from "./first-step";
import { DetailsFormSection } from "./details-form-section";
import { SearchMode } from "./reducer";

interface FormContainerProps extends PropsWithChildren {
  areasList: Area[];
  categoriesList: Category[];
  ingredientsList: Ingredient[];
  selectedArea: string | null;
  nameQuery: string;
  searchMode: SearchMode;
  selectedIngredients: string[];
  selectedCategory: string | null;
  onSelectArea: (area: Area) => void;
  onSelectIngredients: (ingredients: string[]) => void;
  onSelectCategory: (category: string) => void;
  onSearchModeChange: (searchMode: SearchMode) => void;
  onNameQueryChange: (query: string) => void;
  onNameRecipeSelect: (recipe: Recipe | null) => void;
}
export const FormContainer = ({
  areasList,
  categoriesList,
  ingredientsList,
  selectedArea,
  nameQuery,
  searchMode,
  selectedIngredients,
  selectedCategory,
  onSelectArea,
  onSelectIngredients,
  onSelectCategory,
  onSearchModeChange,
  onNameQueryChange,
  onNameRecipeSelect,
}: FormContainerProps) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-none lg:max-w-xl">
        <TabGroup>
          <TabList className="flex flex-wrap gap-2 sm:gap-3">
            {TABS.map(({ name, code }) => (
              <Tab
                key={code}
                disabled={searchMode === "name" && name === "Recipe Details"}
                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          {searchMode === "name" ? (
            <p className="mt-2 text-xs text-white/60">
              Recipe Details is disabled while searching by name.
            </p>
          ) : null}
          <TabPanels className="mt-3 bg-transparent">
            {TABS.map(({ code }) => (
              <TabPanel
                key={code}
                className="rounded-xl bg-transparent p-3 sm:p-4"
              >
                {code === "general-filters" ? (
                  <FirstStep
                    areas={areasList}
                    selectedArea={selectedArea ?? ""}
                    nameQuery={nameQuery}
                    searchMode={searchMode}
                    onSelectArea={onSelectArea}
                    onSearchModeChange={onSearchModeChange}
                    onNameQueryChange={onNameQueryChange}
                    onNameRecipeSelect={onNameRecipeSelect}
                  />
                ) : (
                  <DetailsFormSection
                    categoriesList={categoriesList}
                    ingredientsList={ingredientsList}
                    selectedCategory={selectedCategory ?? ""}
                    selectedIngredients={selectedIngredients}
                    onSelectCategory={onSelectCategory}
                    onSelectIngredients={onSelectIngredients}
                    disabled={searchMode === "name"}
                  />
                )}
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

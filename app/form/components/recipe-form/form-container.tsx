"use client";

import { PropsWithChildren } from "react";
import { TABS } from "./constants";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { Area, Category, Ingredient } from "@/lib/mealdb/types";
import { AreaSelect } from "./area-select";
import { DetailsFormSection } from "./details-form-section";

interface FormContainerProps extends PropsWithChildren {
  areasList: Area[];
  categoriesList: Category[];
  ingredientsList: Ingredient[];
  selectedArea: string | null;
  selectedIngredients: string[];
  selectedCategory: string | null;
  onSelectArea: (area: Area) => void;
  onSelectIngredients: (ingredients: string[]) => void;
  onSelectCategory: (category: string) => void;
}
export const FormContainer = ({
  areasList,
  categoriesList,
  ingredientsList,
  selectedArea,
  selectedIngredients,
  selectedCategory,
  onSelectArea,
  onSelectIngredients,
  onSelectCategory,
}: FormContainerProps) => {
  return (
    <div className="w-full">
      <div className="w-full max-w-none lg:max-w-xl">
        <TabGroup>
          <TabList className="flex flex-wrap gap-2 sm:gap-3">
            {TABS.map(({ name }) => (
              <Tab
                key={name}
                className="rounded-full px-3 py-1 text-sm/6 font-semibold text-white focus:not-data-focus:outline-none data-focus:outline data-focus:outline-white data-hover:bg-white/5 data-selected:bg-white/10 data-selected:data-hover:bg-white/10"
              >
                {name}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="mt-3 bg-transparent">
            {TABS.map(({ name }) => (
              <TabPanel
                key={name}
                className="rounded-xl bg-transparent p-3 sm:p-4"
              >
                {name === "Area" ? (
                  <AreaSelect
                    areas={areasList}
                    selectedArea={selectedArea ?? ""}
                    onSelectArea={onSelectArea}
                  />
                ) : (
                  <DetailsFormSection
                    categoriesList={categoriesList}
                    ingredientsList={ingredientsList}
                    selectedCategory={selectedCategory ?? ""}
                    selectedIngredients={selectedIngredients}
                    onSelectCategory={onSelectCategory}
                    onSelectIngredients={onSelectIngredients}
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

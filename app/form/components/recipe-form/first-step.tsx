import { Area } from "@/lib/mealdb/types";
import { SelectField } from "@/components/form/select-field";
import { SearchMode } from "./reducer";
import { Recipe } from "@/lib/mealdb/types";
import { NameRecipeSearch } from "./name-recipe-search";
import { SearchModeSelector } from "./search-mode-selector";

interface FirstStep {
  areas: Area[];
  selectedArea: string | null;
  nameQuery: string;
  searchMode: SearchMode;
  onSelectArea: (area: Area) => void;
  onSearchModeChange: (searchMode: SearchMode) => void;
  onNameQueryChange: (query: string) => void;
  onNameRecipeSelect: (recipe: Recipe | null) => void;
}
export const FirstStep = ({
  areas,
  selectedArea,
  nameQuery,
  searchMode,
  onSelectArea,
  onSearchModeChange,
  onNameQueryChange,
  onNameRecipeSelect,
}: FirstStep) => {
  const handleOnChange = (value: string) => {
    const selected = areas.find((area) => area.name === value);
    if (selected) {
      onSelectArea(selected);
    }
  };

  const handleModeChange = (value: string) => {
    const nextMode = value === "name" ? "name" : "area";
    onSearchModeChange(nextMode);
    onNameQueryChange("");
    onNameRecipeSelect(null);
  };

  return (
    <div className="w-full max-w-md px-4">
      <SearchModeSelector value={searchMode} onChange={handleModeChange} />

      {searchMode === "area" ? (
        <SelectField
          label="Area"
          description="Select the geographic area of the recipe"
          placeholder="Choose an area"
          value={selectedArea ?? ""}
          options={areas.map((area) => ({
            value: area.name,
            label: area.name,
          }))}
          onChange={handleOnChange}
        />
      ) : (
        <NameRecipeSearch
          query={nameQuery}
          onQueryChange={onNameQueryChange}
          onRecipeSelect={onNameRecipeSelect}
        />
      )}
    </div>
  );
};

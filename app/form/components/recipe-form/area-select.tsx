import { Area } from "@/lib/mealdb/types";
import { SelectField } from "@/components/form/select-field";

interface AreaSelectProps {
  areas: Area[];
  selectedArea: string | null;
  onSelectArea: (area: Area) => void;
}
export const AreaSelect = ({
  areas,
  selectedArea,
  onSelectArea,
}: AreaSelectProps) => {
  const handleOnChange = (value: string) => {
    const selected = areas.find((area) => area.name === value);
    if (selected) {
      onSelectArea(selected);
    }
  };

  return (
    <div className="w-full max-w-md px-4">
      <SelectField
        label="Area"
        description="Select the geographic area of the recipe"
        placeholder="Choose an area"
        value={selectedArea ?? ""}
        options={areas.map((area) => ({ value: area.name, label: area.name }))}
        onChange={handleOnChange}
      />
    </div>
  );
};

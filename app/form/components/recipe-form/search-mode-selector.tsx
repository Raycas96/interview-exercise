import { RadioGroupField } from "@/components/radio-group-field";
import { SearchMode } from "./reducer";

interface SearchModeSelectorProps {
  value: SearchMode;
  onChange: (mode: SearchMode) => void;
}

const modeOptions: Array<{
  value: SearchMode;
  label: string;
  description: string;
}> = [
  {
    value: "area",
    label: "Search by area",
    description: "Use the 2-step flow with secondary filters.",
  },
  {
    value: "name",
    label: "Search by name",
    description: "Type a recipe name and pick one from live previews.",
  },
];

export function SearchModeSelector({
  value,
  onChange,
}: SearchModeSelectorProps) {
  return (
    <RadioGroupField
      label="Search mode"
      description="Choose whether to search with area flow or recipe name."
      value={value}
      options={modeOptions}
      onChange={onChange}
      ariaLabel="Search mode"
      optionsClassName="sm:grid-cols-2"
    />
  );
}

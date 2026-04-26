import {
  Description,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import clsx from "clsx";
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
    <div>
      <p className="text-sm/6 font-medium text-white">Search mode</p>
      <p className="text-sm/6 text-white/50">
        Choose whether to search with area flow or recipe name.
      </p>
      <RadioGroup
        value={value}
        onChange={onChange}
        aria-label="Search mode"
        className="mt-3 grid gap-2 sm:grid-cols-2"
      >
        {modeOptions.map((option) => (
          <Field
            key={option.value}
            className={clsx(
              "rounded-lg border border-border/80 bg-white/5 p-3",
              "data-checked:border-brand data-checked:bg-brand/10",
            )}
          >
            <div className="flex items-center gap-2 ">
              <Radio
                value={option.value}
                className={clsx(
                  "flex h-4 w-4 shrink-0 aspect-square items-center justify-center rounded-full border border-white/50 cursor-pointer",
                  "data-checked:border-brand data-checked:bg-brand",
                )}
              >
                <span className="size-1.5 rounded-full bg-background" />
              </Radio>
              <div>
                <Label className="text-sm font-medium text-white">
                  {option.label}
                </Label>
                <Description className="text-xs text-white/60">
                  {option.description}
                </Description>
              </div>
            </div>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
}

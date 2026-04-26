import {
  Description,
  Field,
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export interface MultiSelectOption {
  value: string;
  label: string;
}

interface MultiSelectFieldProps {
  label: string;
  description?: string;
  options: MultiSelectOption[];
  value: string[];
  onChange: (value: string[]) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export function MultiSelectField({
  label,
  description,
  options,
  value,
  onChange,
  placeholder = "Select options",
  className,
  disabled = false,
}: MultiSelectFieldProps) {
  return (
    <Field>
      <Label className="text-sm/6 font-medium text-white">{label}</Label>
      {description ? (
        <Description className="text-sm/6 text-white/50">
          {description}
        </Description>
      ) : null}

      <Listbox value={value} onChange={onChange} multiple disabled={disabled}>
        <div className={clsx("relative mt-3", className)}>
          <ListboxButton className="flex w-full items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-left text-sm/6 text-white focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 disabled:cursor-not-allowed disabled:opacity-50">
            <span className="truncate">
              {value.length > 0
                ? options
                    .filter((option) => value.includes(option.value))
                    .map((option) => option.label)
                    .join(", ")
                : placeholder}
            </span>
            <ChevronDownIcon
              className="size-4 fill-white/60"
              aria-hidden="true"
            />
          </ListboxButton>

          <ListboxOptions
            anchor="bottom"
            className="z-20 mt-1 max-h-64 w-(--button-width) overflow-auto rounded-lg border border-border bg-background p-1 shadow-lg [--anchor-gap:4px]"
          >
            {options.map((option) => (
              <ListboxOption
                key={option.value}
                value={option.value}
                className="group flex cursor-pointer items-center gap-2 rounded-md px-2 py-1.5 text-sm text-foreground data-focus:bg-surface"
              >
                <CheckIcon className="invisible size-4 text-brand group-data-selected:visible" />
                <span>{option.label}</span>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </Field>
  );
}

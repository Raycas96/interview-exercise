import { Description, Field, Label, Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectFieldProps {
  label: string;
  description?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}
export function SelectField({
  label,
  description,
  placeholder,
  options,
  value,
  onChange,
  className,
  disabled = false,
}: SelectFieldProps) {
  return (
    <Field>
      <Label className="text-sm/6 font-medium text-white">{label}</Label>
      {description ? (
        <Description className="text-sm/6 text-white/50">
          {description}
        </Description>
      ) : null}
      <div className={clsx("relative", className)}>
        <Select
          value={value ?? ""}
          onChange={(event) => onChange(event.currentTarget.value)}
          disabled={disabled}
          className={clsx(
            "mt-3 block w-full appearance-none rounded-lg border-none bg-white/5 px-3 py-1.5 text-sm/6 text-white",
            "focus:not-data-focus:outline-none data-focus:outline-2 data-focus:-outline-offset-2 data-focus:outline-white/25 disabled:cursor-not-allowed disabled:opacity-50",
            "*:text-black",
          )}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </Select>
        <ChevronDownIcon
          className="pointer-events-none absolute top-2.5 right-2.5 size-4 fill-white/60"
          aria-hidden="true"
        />
      </div>
    </Field>
  );
}

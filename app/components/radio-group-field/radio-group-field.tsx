import {
  Description,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import clsx from "clsx";

interface RadioOption<T extends string> {
  value: T;
  label: string;
  description?: string;
}

interface RadioGroupFieldProps<T extends string> {
  label?: string;
  description?: string;
  value: T;
  options: RadioOption<T>[];
  onChange: (value: T) => void;
  ariaLabel: string;
  className?: string;
  optionsClassName?: string;
}

export function RadioGroupField<T extends string>({
  label,
  description,
  value,
  options,
  onChange,
  ariaLabel,
  className,
  optionsClassName,
}: RadioGroupFieldProps<T>) {
  return (
    <div className={className}>
      {label ? (
        <p className="text-sm/6 font-medium text-white">{label}</p>
      ) : null}
      {description ? (
        <p className="text-sm/6 text-white/50">{description}</p>
      ) : null}

      <RadioGroup
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        className={clsx("mt-3 grid gap-2", optionsClassName)}
      >
        {options.map((option) => (
          <Field
            key={option.value}
            className={clsx(
              "rounded-lg border border-border/80 bg-white/5 p-3",
              "data-checked:border-brand data-checked:bg-brand/10",
            )}
          >
            <div className="flex items-center gap-2">
              <Radio
                value={option.value}
                className={clsx(
                  "flex h-4 w-4 shrink-0 cursor-pointer items-center justify-center rounded-full border border-white/50",
                  "data-checked:border-brand data-checked:bg-brand",
                )}
              >
                <span className="size-1.5 rounded-full bg-background" />
              </Radio>
              <div>
                <Label className="text-sm font-medium text-white">
                  {option.label}
                </Label>
                {option.description ? (
                  <Description className="text-xs text-white/60">
                    {option.description}
                  </Description>
                ) : null}
              </div>
            </div>
          </Field>
        ))}
      </RadioGroup>
    </div>
  );
}

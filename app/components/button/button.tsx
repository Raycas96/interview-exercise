import clsx from "clsx";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import {
  ButtonVariant,
  ButtonSize,
  variantClasses,
  sizeClasses,
} from "./button.variants";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

export function Button({
  variant = "primary",
  size = "sm",
  className,
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={clsx(
        "rounded-md transition-all duration-150 ease-out hover:-translate-y-px active:translate-y-0 active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        variantClasses[variant],
        sizeClasses[size],
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md";

export const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-brand text-brand-foreground hover:bg-brand-hover focus-visible:outline-brand",
  secondary:
    "bg-surface text-foreground border border-border hover:bg-background focus-visible:outline-border",
};

export const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-2 text-sm font-medium",
  md: "px-4 py-2.5 text-sm font-semibold",
};

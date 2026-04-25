export type CardTone = "default" | "brand" | "neutral";
export type CardPadding = "sm" | "md" | "lg";
export type CardElevation = "none" | "sm" | "md";

export const toneClasses: Record<CardTone, string> = {
  default: "bg-surface text-foreground",
  brand: "bg-brand text-brand-foreground",
  neutral: "bg-background text-foreground",
};

export const paddingClasses: Record<CardPadding, string> = {
  sm: "p-4",
  md: "p-6",
  lg: "p-8",
};

export const elevationClasses: Record<CardElevation, string> = {
  none: "",
  sm: "shadow-sm",
  md: "shadow-md",
};

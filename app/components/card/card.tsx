import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import clsx from "clsx";
import type { CardElevation, CardPadding, CardTone } from "./card.variants";
import { elevationClasses, paddingClasses, toneClasses } from "./card.variants";

type CardProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "className" | "title"
> & {
  title: ReactNode;
  titleAs?: ElementType;
  description?: ReactNode;
  actions?: ReactNode;
  tone?: CardTone;
  padding?: CardPadding;
  elevation?: CardElevation;
  bordered?: boolean;
};

export function Card({
  title,
  titleAs: TitleTag = "h2",
  description,
  actions,
  tone = "default",
  padding = "md",
  elevation = "sm",
  bordered = true,
  children,
  ...props
}: CardProps) {
  return (
    <section
      className={clsx(
        "rounded-2xl",
        "text-center",
        toneClasses[tone],
        paddingClasses[padding],
        elevationClasses[elevation],
        bordered && "border border-border",
      )}
      {...props}
    >
      <header className="mb-4 flex items-start justify-between gap-4">
        <div className="min-w-0 flex-1 space-y-1">
          {title ? (
            <TitleTag className="flex justify-center text-lg font-semibold text-foreground">
              {title}
            </TitleTag>
          ) : null}
          {description ? (
            <p className="text-sm text-muted">{description}</p>
          ) : null}
        </div>
        {actions ? <div className="shrink-0">{actions}</div> : null}
      </header>

      {children}
    </section>
  );
}

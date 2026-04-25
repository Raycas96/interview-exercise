import type { ComponentPropsWithoutRef, ReactNode } from "react";
import clsx from "clsx";
import type { CardElevation, CardPadding, CardTone } from "./card.variants";
import { elevationClasses, paddingClasses, toneClasses } from "./card.variants";

type CardProps = Omit<
  ComponentPropsWithoutRef<"section">,
  "className" | "title"
> & {
  title: ReactNode;
  description?: ReactNode;
  actions?: ReactNode;
  tone?: CardTone;
  padding?: CardPadding;
  elevation?: CardElevation;
  bordered?: boolean;
};

export function Card({
  title,
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
            <h2 className="text-lg font-semibold text-foreground flex justify-center">
              {title}
            </h2>
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

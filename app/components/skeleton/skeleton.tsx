import clsx from "clsx";
import type { HTMLAttributes } from "react";
import { roundedMap } from "./skeleton.variants";

type SkeletonProps = HTMLAttributes<HTMLDivElement> & {
  rounded?: "sm" | "md" | "lg" | "full";
};

export function Skeleton({
  className,
  rounded = "md",
  ...props
}: SkeletonProps) {
  return (
    <div
      className={clsx(
        "animate-pulse bg-border/60",
        roundedMap[rounded],
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  );
}

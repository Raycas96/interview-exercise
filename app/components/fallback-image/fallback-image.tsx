"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

interface FallbackImageProps {
  src: string | null | undefined;
  alt: string;
  containerClassName?: string;
  sizes?: string;
}

export const FallbackImage = ({
  src,
  alt,
  containerClassName,
  sizes = "100vw",
}: FallbackImageProps) => {
  const [hasError, setHasError] = useState(false);
  const validSrc =
    typeof src === "string" && src.trim().length > 0 ? src : null;
  const fallbackSrc = "/no_image.svg";
  const isFallback = !validSrc || hasError;
  const resolvedSrc = isFallback ? fallbackSrc : validSrc;

  return (
    <div
      className={clsx(
        "relative w-full overflow-hidden rounded-xl",
        containerClassName,
      )}
    >
      <Image
        src={resolvedSrc}
        alt={alt}
        fill
        sizes={sizes}
        className={
          isFallback
            ? "h-full w-full object-fill"
            : "h-full w-full object-cover"
        }
        onError={() => {
          if (!hasError) {
            setHasError(true);
          }
        }}
      />
    </div>
  );
};

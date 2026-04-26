import { fireEvent, render, screen } from "@testing-library/react";
import type { ImgHTMLAttributes } from "react";
import { describe, expect, it, vi } from "vitest";
import { FallbackImage } from "./fallback-image";

vi.mock("next/image", () => ({
  default: (
    props: ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean },
  ) => {
    const { fill, ...rest } = props;
    void fill;
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img {...rest} alt={rest.alt} />
    );
  },
}));

describe("FallbackImage", () => {
  it("uses local fallback when src is missing", () => {
    render(<FallbackImage src={null} alt="No image recipe" />);

    const image = screen.getByAltText("No image recipe");
    expect(image.getAttribute("src")).toBe("/no_image.svg");
  });

  it("switches to local fallback when remote source fails", () => {
    render(
      <FallbackImage src="https://www.themealdb.com/image.jpg" alt="Recipe" />,
    );

    const image = screen.getByAltText("Recipe");
    expect(image.getAttribute("src")).toBe(
      "https://www.themealdb.com/image.jpg",
    );

    fireEvent.error(image);

    expect(screen.getByAltText("Recipe").getAttribute("src")).toBe(
      "/no_image.svg",
    );
  });
});

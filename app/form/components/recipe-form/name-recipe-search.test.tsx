import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactElement } from "react";
import { describe, expect, it, vi } from "vitest";
import { NameRecipeSearch } from "./name-recipe-search";

describe("NameRecipeSearch", () => {
  it("fetches by name and selects a preview result", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [
          {
            id: "123",
            name: "Spicy Arrabiata Penne",
            alternateName: null,
            thumbnail: "",
            category: "Pasta",
            area: "Italian",
            instructions: "",
            ingredients: [],
          },
        ],
      }),
    });
    vi.stubGlobal("fetch", fetchMock);

    const onRecipeSelect = vi.fn();
    let query = "";
    let rerenderFn: ((component: ReactElement) => void) | null = null;
    const onQueryChange = vi.fn((next: string) => {
      query = next;
      rerenderFn?.(
        <NameRecipeSearch
          query={query}
          onQueryChange={onQueryChange}
          onRecipeSelect={onRecipeSelect}
        />,
      );
    });
    const { rerender } = render(
      <NameRecipeSearch
        query={query}
        onQueryChange={onQueryChange}
        onRecipeSelect={onRecipeSelect}
      />,
    );
    rerenderFn = rerender;

    fireEvent.change(screen.getByLabelText("Search recipe by name"), {
      target: { value: "arr" },
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalled();
      expect(screen.getByText("Spicy Arrabiata Penne")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Spicy Arrabiata Penne"));
    expect(onRecipeSelect).toHaveBeenCalled();

    vi.unstubAllGlobals();
  });
});

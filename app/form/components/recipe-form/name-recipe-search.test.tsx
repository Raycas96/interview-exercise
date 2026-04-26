import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactElement } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { NameRecipeSearch } from "./name-recipe-search";

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

afterEach(() => {
  vi.unstubAllGlobals();
});

beforeEach(() => {
  fetchMock.mockReset();
  fetchMock.mockResolvedValue({
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
});

function renderControlledNameRecipeSearch(onRecipeSelect = vi.fn()) {
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

  return { onQueryChange, onRecipeSelect };
}

describe("NameRecipeSearch", () => {
  it("fetches by name and selects a preview result", async () => {
    const onRecipeSelect = vi.fn();
    renderControlledNameRecipeSearch(onRecipeSelect);

    fireEvent.change(screen.getByLabelText("Search recipe by name"), {
      target: { value: "arr" },
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(screen.getByText("Spicy Arrabiata Penne")).toBeTruthy();
    });

    fireEvent.click(screen.getByText("Spicy Arrabiata Penne"));
    expect(onRecipeSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "123",
        name: "Spicy Arrabiata Penne",
      }),
    );
  });

  it("displays not found message when no recipes are found", async () => {
    const onRecipeSelect = vi.fn();

    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        data: [],
      }),
    });

    renderControlledNameRecipeSearch(onRecipeSelect);

    fireEvent.change(screen.getByLabelText("Search recipe by name"), {
      target: { value: "aaaaaaa" },
    });

    await waitFor(() => {
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(screen.getByText("No recipes found by name.")).toBeTruthy();
    });
  });
});

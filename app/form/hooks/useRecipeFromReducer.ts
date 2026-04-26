"use client";
import { useCallback, useReducer } from "react";
import {
  reducer,
  initialState,
  ActionType,
  FormState,
} from "../components/recipe-form/reducer";
import { Area } from "@/lib/mealdb/types";

export const useRecipeFromReducer = (initialFormState?: FormState) => {
  const [state, dispatch] = useReducer(
    reducer,
    initialFormState ?? initialState,
  );

  const handleSelectArea = useCallback((area: Area) => {
    dispatch({ type: ActionType.SET_FIRST_STEP_AREA, payload: area.name });
  }, []);

  const handleSelectIngredients = useCallback((ingredients: string[]) => {
    dispatch({
      type: ActionType.SET_SECOND_STEP_SELECTED_INGREDIENT,
      payload: ingredients,
    });
  }, []);

  const handleSelectCategory = useCallback((category: string) => {
    dispatch({
      type: ActionType.SET_SECOND_STEP_SELECTED_CATEGORY,
      payload: category,
    });
  }, []);

  const handleSearchModeChange = useCallback((searchMode: "area" | "name") => {
    dispatch({
      type: ActionType.SET_SEARCH_MODE,
      payload: searchMode,
    });
  }, []);

  const handleNameQueryChange = useCallback((query: string) => {
    dispatch({
      type: ActionType.SET_FIRST_STEP_NAME_QUERY,
      payload: query,
    });
  }, []);

  return {
    state,
    handleSelectArea,
    handleSelectIngredients,
    handleSelectCategory,
    handleSearchModeChange,
    handleNameQueryChange,
  };
};

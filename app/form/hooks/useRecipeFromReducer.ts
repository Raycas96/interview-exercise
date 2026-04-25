"use client";
import { useCallback, useReducer } from "react";
import {
  reducer,
  initialState,
  ActionType,
} from "../components/recipe-form/reducer";
import { Area } from "@/app/lib/mealdb/types";

export const useRecipeFromReducer = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

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

  return {
    state,
    handleSelectArea,
    handleSelectIngredients,
    handleSelectCategory,
  };
};

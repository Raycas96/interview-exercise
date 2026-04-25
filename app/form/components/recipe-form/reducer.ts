import { TabName } from "./constants";

export interface Recommendation {
  id: string;
  title: string;
  image: string;
  category: string;
  area: string;
  sourceUrl: string;
}

export enum ActionType {
  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_FIRST_STEP_AREA = "SET_FIRST_STEP_AREA",
  SET_SECOND_STEP_INGREDIENT_QUERY = "SET_SECOND_STEP_INGREDIENT_QUERY",
  SET_SECOND_STEP_SELECTED_INGREDIENT = "SET_SECOND_STEP_SELECTED_INGREDIENT",
  SET_SECOND_STEP_SELECTED_CATEGORY = "SET_SECOND_STEP_SELECTED_CATEGORY",
  RESET_FLOW = "RESET_FLOW",
  CLEAR_ERROR = "CLEAR_ERROR",
}

export type FormReducerAction =
  | {
      type: ActionType.SET_ACTIVE_TAB;
      payload: TabName;
    }
  | {
      type: ActionType.SET_LOADING;
      payload: boolean;
    }
  | {
      type: ActionType.SET_ERROR;
      payload: string;
    }
  | {
      type: ActionType.SET_FIRST_STEP_AREA;
      payload: string;
    }
  | {
      type: ActionType.SET_SECOND_STEP_INGREDIENT_QUERY;
      payload: string;
    }
  | {
      type: ActionType.SET_SECOND_STEP_SELECTED_INGREDIENT;
      payload: string[];
    }
  | {
      type: ActionType.SET_SECOND_STEP_SELECTED_CATEGORY;
      payload: string;
    }
  | {
      type: ActionType.RESET_FLOW;
    }
  | {
      type: ActionType.CLEAR_ERROR;
    };

export interface FormState {
  activeTab: TabName;
  loading: boolean;
  error: string | null;
  firstStep: {
    area: string | null;
  };
  secondStep: {
    ingredientQuery: string | null;
    selectedIngredients: string[];
    selectedCategory: string | null;
  };
}

export const initialState: FormState = {
  activeTab: "Area" as TabName,
  loading: false,
  error: null,
  firstStep: {
    area: null,
  },
  secondStep: {
    ingredientQuery: null,
    selectedIngredients: [],
    selectedCategory: null,
  },
};

export const reducer = (state: FormState, action: FormReducerAction) => {
  switch (action.type) {
    case "SET_ACTIVE_TAB":
      return { ...state, activeTab: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "CLEAR_ERROR":
      return { ...state, error: null };
    case "SET_FIRST_STEP_AREA":
      return {
        ...state,
        firstStep: { ...state.firstStep, area: action.payload },
      };
    case "SET_SECOND_STEP_INGREDIENT_QUERY":
      return {
        ...state,
        secondStep: { ...state.secondStep, ingredientQuery: action.payload },
      };
    case "SET_SECOND_STEP_SELECTED_INGREDIENT":
      return {
        ...state,
        secondStep: {
          ...state.secondStep,
          selectedIngredients: action.payload,
        },
      };
    case "SET_SECOND_STEP_SELECTED_CATEGORY":
      return {
        ...state,
        secondStep: { ...state.secondStep, selectedCategory: action.payload },
      };
    case "RESET_FLOW":
      return {
        ...state,
        activeTab: "Area" as TabName,
        firstStep: { area: null },
        secondStep: {
          ingredientQuery: null,
          selectedIngredients: [],
          selectedCategory: null,
        },
        loading: false,
        error: null,
      };
    default:
      return state;
  }
};

import { TabName } from "./constants";

export interface Recommendation {
  id: string;
  title: string;
  image: string;
  category: string;
  area: string;
}

export enum ActionType {
  SET_ACTIVE_TAB = "SET_ACTIVE_TAB",
  SET_LOADING = "SET_LOADING",
  SET_ERROR = "SET_ERROR",
  SET_SEARCH_MODE = "SET_SEARCH_MODE",
  SET_FIRST_STEP_AREA = "SET_FIRST_STEP_AREA",
  SET_FIRST_STEP_NAME_QUERY = "SET_FIRST_STEP_NAME_QUERY",
  SET_SECOND_STEP_SELECTED_INGREDIENT = "SET_SECOND_STEP_SELECTED_INGREDIENT",
  SET_SECOND_STEP_SELECTED_CATEGORY = "SET_SECOND_STEP_SELECTED_CATEGORY",
  HYDRATE_FROM_QUERY = "HYDRATE_FROM_QUERY",
  RESET_FLOW = "RESET_FLOW",
  CLEAR_ERROR = "CLEAR_ERROR",
}

export type SearchMode = "area" | "name";

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
      type: ActionType.SET_SEARCH_MODE;
      payload: SearchMode;
    }
  | {
      type: ActionType.SET_FIRST_STEP_NAME_QUERY;
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
type HydratePayload = {
  searchMode: SearchMode;
  area: string | null;
  nameQuery: string;
  selectedCategory: string | null;
  selectedIngredients: string[];
};

export type FormReducerHydrateAction = {
  type: ActionType.HYDRATE_FROM_QUERY;
  payload: HydratePayload;
};

export type FullFormReducerAction =
  | FormReducerAction
  | FormReducerHydrateAction;

export interface FormState {
  activeTab: TabName;
  loading: boolean;
  error: string | null;
  firstStep: {
    area: string | null;
    searchMode: SearchMode;
    nameQuery: string;
  };
  secondStep: {
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
    searchMode: "area",
    nameQuery: "",
  },
  secondStep: {
    selectedIngredients: [],
    selectedCategory: null,
  },
};

export const reducer = (state: FormState, action: FullFormReducerAction) => {
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
    case "SET_SEARCH_MODE":
      return {
        ...state,
        activeTab:
          action.payload === "name" ? ("Area" as TabName) : state.activeTab,
        firstStep: {
          ...state.firstStep,
          searchMode: action.payload,
          area: action.payload === "name" ? null : state.firstStep.area,
          nameQuery: action.payload === "area" ? "" : state.firstStep.nameQuery,
        },
        secondStep:
          action.payload === "name"
            ? {
                selectedIngredients: [],
                selectedCategory: null,
              }
            : state.secondStep,
      };
    case "SET_FIRST_STEP_NAME_QUERY":
      return {
        ...state,
        firstStep: { ...state.firstStep, nameQuery: action.payload },
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
    case "HYDRATE_FROM_QUERY":
      return {
        ...state,
        firstStep: {
          area:
            action.payload.searchMode === "area" ? action.payload.area : null,
          searchMode: action.payload.searchMode,
          nameQuery:
            action.payload.searchMode === "name"
              ? action.payload.nameQuery
              : "",
        },
        secondStep:
          action.payload.searchMode === "area"
            ? {
                selectedCategory: action.payload.selectedCategory,
                selectedIngredients: action.payload.selectedIngredients,
              }
            : {
                selectedCategory: null,
                selectedIngredients: [],
              },
      };
    case "RESET_FLOW":
      return {
        ...state,
        activeTab: "Area" as TabName,
        firstStep: {
          area: null,
          searchMode: "area" as SearchMode,
          nameQuery: "",
        },
        secondStep: {
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

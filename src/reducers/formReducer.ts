import type { FormTypes } from "../types";

export type FormActions =
  | { type: "save-form", payload: { newForm: FormTypes } }
  | { type: "set-caloriesId", payload: { id: FormTypes["id"] } }
  | { type: "delete-calorie", payload: { id: FormTypes["id"] } }
  | { type: "restart-app"}

export type FormState = {
  forms: FormTypes[];
  caloriesId: FormTypes["id"];
};

const localStorageActivities = (): FormTypes[] => {
  const calories = localStorage.getItem("calories");
  return calories ? JSON.parse(calories) : [];
};

export const initialState: FormState = {
  forms: localStorageActivities(),
  caloriesId: "",
};

export const formReducer = (
  state: FormState = initialState,
  action: FormActions
) => {
  if (action.type === "save-form") {
    let updateCalories: FormTypes[] = [];

    if (state.caloriesId) {
      updateCalories = state.forms.map((item) =>
        item.id === state.caloriesId ? action.payload.newForm : item
      );
    } else {
      updateCalories = [...state.forms, action.payload.newForm];
    }
    return {
      ...state,
      forms: updateCalories,
      caloriesId: "",
    };
  }

  if (action.type === "set-caloriesId") {
    return {
      ...state,
      caloriesId: action.payload.id,
    };
  }

  if (action.type === "delete-calorie") {
    return {
      ...state,
      forms: state.forms.filter((item) => item.id !== action.payload.id),
    };
  }

  if(action.type === 'restart-app'){
    return {
      forms:[],
      caloriesId:''
    }
  }

  return state;
};

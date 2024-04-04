import { ChangeEvent, Dispatch, FormEvent, useEffect, useState } from "react";
import {v4 as uuidv4} from 'uuid'
import { categories } from "../data/categories";
import type { FormTypes } from "../types";
import { FormActions, FormState } from '../reducers/formReducer';

type FormProps = {
  dispatch: Dispatch<FormActions>;
  state: FormState
};

export const Form = ({ dispatch, state }: FormProps) => {
  const initialState : FormTypes = {
    id: uuidv4(),
    category: 0,
    name: "",
    calories: 0,
  };

  const [form, setForm] = useState<FormTypes>(initialState);

  useEffect(() => {
    if(state.caloriesId){
      const selectedCaloriesId = state.forms.filter(stateCalories => stateCalories.id === state.caloriesId)[0]
      setForm(selectedCaloriesId)

    }
  } , [state.caloriesId])

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>
  ) => {
    const isNumberField = ["category", "calories"].includes(e.target.id);
    setForm({
      ...form,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value,
    });
  };

  const isValidActivity = () => {
    const { name, calories, category } = form;
    return name.trim() !== "" && calories > 0 && category > 0;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "save-form", payload: { newForm: form } });
    setForm({
      ...initialState,
      id: uuidv4()
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 bg-white shadow p-10 rounded-lg"
    >
      <div className="grid grid-cols-1 gap-3">
        <label className="font-bold" htmlFor="category">
          Categoría:
        </label>
        <select
          onChange={handleChange}
          value={form.category}
          id="category"
          className="border border-slate-300 p-2 rounded-lg w-full bg-white"
        >
          {categories.map((item) => {
            return (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            );
          })}
        </select>
      </div>
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">
          Actividad:
        </label>
        <input
          value={form.name}
          onChange={handleChange}
          type="text"
          id="name"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Ej. Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
        />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">
          Calorias:
        </label>
        <input
          type="number"
          id="calories"
          className="border border-slate-300 p-2 rounded-lg"
          placeholder="Calorias. ej. 300 0 500"
          value={form.calories}
          onChange={handleChange}
        />
      </div>

      <input
        disabled={!isValidActivity()}
        type="submit"
        className="disabled:opacity-10 bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer"
        value={form.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"}
      />
    </form>
  );
};

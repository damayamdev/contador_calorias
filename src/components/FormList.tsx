import { Dispatch, useMemo } from "react";
import type { FormTypes } from "../types";
import { categories } from "../data/categories";
import {PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline'
import { FormActions} from "../reducers/formReducer";

type FormListProps = {
  forms: FormTypes[];
  dispatch: Dispatch<FormActions>
};

export const FormList = ({ forms, dispatch }: FormListProps) => {
  const categoryName = useMemo(
    () => (category: FormTypes["category"]) =>
      categories.map((cat) => (cat.id === category ? cat.name : "")),
    [forms]
  );

  const isEmptyCalories = useMemo(() => forms.length === 0, [forms])

  return (
    <>
      <h2 className="text-4xl font-bold text-slate-600 text-center uppercase">
        Comida y Actividades
      </h2>
      {
        isEmptyCalories ? <p className="text-center mt-5">No hay consumo aún....</p> :
      
      forms.map((item) => (
        <div
          key={item.id}
          className="px-5 py-10 bg-white mt-5 flex justify-between shadow"
        >
          <div className="space-y-2 relative">
            <p
              className={`absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold ${
                item.category === 1 ? "bg-lime-500" : "bg-orange-500"
              } `}
            >
              {categoryName(item.category)}
            </p>
            <p className="text-2xl font-bold pt-5">{item.name}</p>
            <p className="font-black text-4xl text-lime-500">
              {item.calories} <span className="ml-1">Calorias</span>
            </p>
          </div>
          <div className="flex items-center gap-5">
              <button onClick={() => dispatch({type: 'set-caloriesId', payload:{id: item.id}})}>
                <PencilSquareIcon className="h-8 w-8 text-gray-800" />
              </button>
              <button onClick={() => dispatch({type: 'delete-calorie', payload:{id: item.id}})}>
                <TrashIcon className="h-8 w-8 text-red-800" />
              </button>
          </div>
        </div>
      ))}
    </>
  );
};

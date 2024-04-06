import { useMemo } from "react";
import { CalorieDisplay } from "./CalorieDisplay";
import { useCalorie } from "../hooks/useCalorie";


export const CalorieTracker = () => {

  const {state} = useCalorie()

  const caloriesConsumed = useMemo(
    () =>
      state.forms.reduce(
        (total, calorie) =>
          calorie.category === 1 ? total + calorie.calories : total,
        0
      ),
    [state.forms]
  );

  const CaloriesBurned = useMemo(
    () =>
      state.forms.reduce(
        (total, calorie) =>
          calorie.category === 2 ? total + calorie.calories : total,
        0
      ),
    [state.forms]
  );

  const netCalories = useMemo(() => caloriesConsumed - CaloriesBurned, [state.forms])

  return (
    <>
      <h2 className="text-4xl font-black text-white text-center">
        Resumen de Calorias
      </h2>
      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={caloriesConsumed} text="Consumidas" />
        <CalorieDisplay calories={CaloriesBurned} text="Ejercicio" />
        <CalorieDisplay calories={netCalories} text="Total" />
      </div>
    </>
  );
};

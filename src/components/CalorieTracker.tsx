import { useMemo } from "react";
import { FormTypes } from "../types";
import { CalorieDisplay } from "./CalorieDisplay";

type CalorieTrackerProps = {
  forms: FormTypes[];
};

export const CalorieTracker = ({ forms }: CalorieTrackerProps) => {
  const caloriesConsumed = useMemo(
    () =>
      forms.reduce(
        (total, calorie) =>
          calorie.category === 1 ? total + calorie.calories : total,
        0
      ),
    [forms]
  );

  const CaloriesBurned = useMemo(
    () =>
      forms.reduce(
        (total, calorie) =>
          calorie.category === 2 ? total + calorie.calories : total,
        0
      ),
    [forms]
  );

  const netCalories = useMemo(() => caloriesConsumed - CaloriesBurned, [forms])

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

import { useContext } from "react";
import { CalorieContext } from './../context/CalorieContext';

export const useCalorie = () => {
    const context = useContext(CalorieContext)
    if (!context) {
        throw new Error("useCalorie must be used within a CalorieProvider")
    }
    return context
}
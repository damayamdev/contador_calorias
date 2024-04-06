import { Dispatch, ReactNode, createContext, useReducer } from "react"
import { FormActions, FormState, formReducer, initialState } from "../reducers/formReducer"

type CalorieProviderProps = {
    children: ReactNode
}

type CalorieContextProps = {
    state: FormState
    dispatch: Dispatch<FormActions>
} 

export const CalorieContext = createContext<CalorieContextProps>(null!)

export const CalorieProvider = ({children}: CalorieProviderProps) => {

    const [state, dispatch] = useReducer(formReducer, initialState)

  return (
    <CalorieContext.Provider value={{
        state,
        dispatch
    }}>
    {children}
    </CalorieContext.Provider>
  )
}

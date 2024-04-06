import { Form } from "./components/Form";
import { useEffect, useMemo } from "react";
import { FormList } from "./components/FormList";
import { CalorieTracker } from "./components/CalorieTracker";
import { useCalorie } from "./hooks/useCalorie";

function App() {
 
  const {state, dispatch} = useCalorie()

  useEffect(() => {
    localStorage.setItem("calories", JSON.stringify(state.forms));
  }, [state.forms]);

  const CanRestartApp = () => useMemo(() => state.forms.length, [state.forms]);

  return (
    <>
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-between">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de Calorias
          </h1>
          <button
            disabled={!CanRestartApp()}
            className="bg-gray-800 disabled:opacity-10 disabled:cursor-default hover:bg-gray-900 p-2 font-bold uppercase text-white cursor-pointer rounded-lg text-sm"
            onClick={() => dispatch({ type: "restart-app" })}
          >
            Reiniciar App
          </button>
        </div>
      </header>
      <section className="bg-lime-500 py-20 px-5">
        <div className="max-w-4xl mx-auto">
          <Form/>
        </div>
      </section>
      <section className="bg-gray-800 py-10">
        <div className="max-w-4xl mx-auto">
          <CalorieTracker />
        </div>
      </section>
      <section className="p-10 mx-auto max-w-4xl">
        <FormList />
      </section>
    </>
  );
}

export default App;

import { useState } from "react";
import useDefineBudget from "../../../hooks/useDefineBudget";

const AddBudget = () => {
  const [budget, setBudget] = useState(0);
  const { defineBudget } = useDefineBudget();

  const handleSubmit = (e) => {
    e.preventDefault();
    defineBudget(budget);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-1">
      <h1 className="text-2xl mb-7 text-white">
        <b>Imposta il tuo budget</b>
      </h1>
      <div className="mt-4">
        <label className="block text-white text-sm font-bold mb-3">
          Quantità:
        </label>
        <input
          type="number"
          value={budget}
          onChange={(e) => setBudget(e.target.value)}
          inputMode="float"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="w-full mt-5 py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-slate-700 transition duration-300"
      >
        <b>Imposta Budget</b>
      </button>
    </form>
  );
};

export default AddBudget;

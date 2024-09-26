import { useState } from "react";
import useDefineBudget from "../../hooks/useDefineBudget";

const AddBudget = () => {
  const [budget, setBudget] = useState(0);
  const { defineBudget } = useDefineBudget();

  const handleSubmit = (e) => {
    e.preventDefault();
    defineBudget(budget);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8 p-1">
      <h1 className="text-3xl mb-7">Aggiungi il tuo budget mensile</h1>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Amount:
          <input
            type="number"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            inputMode="float"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-slate-700 transition duration-300"
      >
        Aggiungi Budget
      </button>
    </form>
  );
};

export default AddBudget;

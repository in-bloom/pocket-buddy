import React, { useState } from "react";
import { useAddTransactions } from "../../../hooks/useAddTransactions";

const AddTransaction = () => {
  const { addTransaction } = useAddTransactions();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Altro");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(amount, description, category, date, "expense");
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory("Altro");
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <h1 className="text-2xl mb-6 text-white">
        <b>Aggiungi una Transazione</b>
      </h1>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="amount"
        >
          Quantità
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-800 leading-tight focus:outline-none focus:shadow-outline"
          inputMode="float"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="description"
        >
          Descrizione
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-800 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="date"
        >
          Data Transazione
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-800 leading-tight focus:outline-none focus:shadow-outline"
          required
        />
      </div>
      <div className="mb-4">
        <label
          className="block text-white text-sm font-bold mb-2"
          htmlFor="category"
        >
          Categoria Transazione
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-indigo-800 leading-tight focus:outline-none focus:shadow-outline"
          required
        >
          <option value="Altro">Altro</option>
          <option value="Cibo">Cibo</option>
          <option value="Shopping">Shopping</option>
          <option value="Trasporti">Trasporti</option>
          <option value="Svago">Svago</option>
          <option value="Viaggi">Viaggi</option>
          <option value="Imprevisti">Imprevisti</option>
        </select>
      </div>
      <button
        type="submit"
        className="w-full py-2 px-4 bg-indigo-500 text-white rounded-lg hover:bg-slate-700 transition duration-300"
      >
        <b>Aggiungi Transazione</b>
      </button>
    </form>
  );
};

export default AddTransaction;

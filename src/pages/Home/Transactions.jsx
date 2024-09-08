import React, { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import useGetTransactions from "../../hooks/useGetTransactions";
import useDeleteTransactions from "../../hooks/useDeleteTransactions";
import DynamicGrid from "./DynamicGrid";

const Transactions = () => {
  const { addTransaction } = useAddTransactions();
  const { transactions } = useGetTransactions();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Spesa Occasionale");
  const { deleteTransaction } = useDeleteTransactions();
  const [typeOfTransaction, setTypeOfTransaction] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(amount, description, category, date, typeOfTransaction);
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory("Spesa Occasionale");
  };

  const handleDelete = async (id) => {
    await deleteTransaction(id);
  };

  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 h-screen">
      <div className="h-10/12 overflow-y-scroll w-full px-8 py-3">
        <form onSubmit={handleSubmit} className="mb-8">
          <h1 className="text-3xl mb-6">Aggiungi una Transazione</h1>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="amount"
            >
              Quantità
            </label>
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              inputMode="float"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Descrizione
            </label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Data Transazione
            </label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="typeoftransaction"
            >
              Tipo di Transazione
            </label>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="expense"
                name="typeoftransaction"
                value="expense"
                checked={typeOfTransaction === "expense" ? true : false}
                onChange={(e) => setTypeOfTransaction(e.target.value)}
                className="mr-2 leading-tight"
              />
              <label htmlFor="expense" className="text-gray-700">
                Spesa
              </label>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="income"
                name="typeoftransaction"
                value="income"
                checked={typeOfTransaction === "income" ? true : false}
                onChange={(e) => setTypeOfTransaction(e.target.value)}
                className="mr-2 leading-tight"
              />
              <label htmlFor="income" className="text-gray-700">
                Guadagno
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="category"
            >
              Categoria Transazione
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
            className="w-full py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-slate-700 transition duration-300"
          >
            Aggiungi Transazione
          </button>
        </form>
        <div>
          <h1 className="text-3xl mb-6">Transazioni</h1>
          {transactions.length > 0 ? (
            <DynamicGrid data={transactions} onDelete={handleDelete} />
          ) : (
            <p>Nessuna transazione trovata.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

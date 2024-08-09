import React, { useState } from "react";
import { useAddTransactions } from "../../hooks/useAddTransactions";
import useGetTransactions from "../../hooks/useGetTransactions";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

const DynamicGrid = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="border-b">Descrizione</th>
            <th className="border-b">Importo</th>
            <th className="border-b">Categoria</th>
            <th className="border-b">Data</th>
            <th className="border-b">Modifica</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr
              key={index}
              data-id={index}
              className="hover:bg-gray-100 text-center"
            >
              <td className="border-b">{item.description}</td>
              <td className="border-b">{item.amount}€</td>
              <td className="border-b">{item.category}</td>
              <td className="border-b">{item.data}</td>
              <td className="border-b">
                <button>
                  <FontAwesomeIcon icon={faEdit} className="mx-2" />
                </button>
                <button>
                  <FontAwesomeIcon icon={faTrash} className="mx-2" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Transactions = () => {
  const { addTransaction } = useAddTransactions();
  const { transactions } = useGetTransactions();
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [category, setCategory] = useState("Spesa Occasionale");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTransaction(amount, description, category, date);
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setCategory("Spesa Occasionale");
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
              <option value="Spesa Fissa">Spesa Fissa</option>
              <option value="Spesa Occasionale">Spesa Occasionale</option>
              <option value="Guadagno Fisso">Guadagno Fisso</option>
              <option value="Guadagno Occasionale">Guadagno Occasionale</option>
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
            <DynamicGrid data={transactions} />
          ) : (
            <p>Nessuna transazione trovata.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;

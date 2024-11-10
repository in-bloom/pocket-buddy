import React, { useState } from "react";
import useGetTransactions from "../../../hooks/useGetTransactions";
import useDeleteTransactions from "../../../hooks/useDeleteTransactions";
import DynamicGrid from "./DynamicGrid";
import AddTransaction from "./AddTransaction";
import AddBudget from "./AddBudget";
import { useMediaQuery } from "react-responsive";

const Transactions = () => {
  const { transactions } = useGetTransactions();
  const { deleteTransaction } = useDeleteTransactions();
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const handleDelete = async (id) => {
    await deleteTransaction(id);
  };

  return isMobile ? (
    <div className="grid-rows-3 grid-cols-1 p-4 z-99 mb-16 w-screen pt-10">
      <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-1 h-64 mb-4">
        <AddBudget className="z-99" />
      </div>
      <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-2 mb-4">
        <AddTransaction />
      </div>
      <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-3 mb-4">
        <h1 className="text-2xl mb-6 text-white">
          <b>Transazioni</b>
        </h1>
        {transactions.length > 0 ? (
          <DynamicGrid data={transactions} onDelete={handleDelete} />
        ) : (
          <p className="text-white">Nessuna transazione trovata.</p>
        )}
      </div>
    </div>
  ) : (
    <div className="grid-rows-2 grid-cols-1 p-4 z-99 w-full h-screen">
      <div className="row-start-1 grid gap-4 grid-cols-2 mb-4">
        <div className="bg-indigo-900 shadow-lg rounded-lg col-start-1 p-4">
          <AddBudget />
        </div>
        <div className="col-start-2 bg-indigo-900 shadow-lg rounded-lg p-4">
          <AddTransaction />
        </div>
      </div>
      <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-2">
        <h1 className="text-2xl mb-6 text-white">
          <b>Transazioni</b>
        </h1>
        {transactions.length > 0 ? (
          <DynamicGrid data={transactions} onDelete={handleDelete} />
        ) : (
          <p className="text-white">Nessuna transazione trovata.</p>
        )}
      </div>
    </div>
  );
};

export default Transactions;

import React, { useState } from "react";
import useGetTransactions from "../../hooks/useGetTransactions";
import useDeleteTransactions from "../../hooks/useDeleteTransactions";
import DynamicGrid from "./DynamicGrid";
import AddTransaction from "./AddTransaction";
import AddBudget from "./AddBudget";

const Transactions = () => {
  const { transactions } = useGetTransactions();
  const { deleteTransaction } = useDeleteTransactions();

  const handleDelete = async (id) => {
    await deleteTransaction(id);
  };

  return (
    <div className="flex flex-col items-center bg-gray-800 justify-center h-screen py-7 pr-5">
      <div className="h-full overflow-y-scroll bg-gray-100 w-full p-10 rounded-lg">
        <div>
          <div className="grid grid-cols-2 gap-6">
            <AddTransaction className="col-start-1" />
            <AddBudget className="col-start-2" />
          </div>
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

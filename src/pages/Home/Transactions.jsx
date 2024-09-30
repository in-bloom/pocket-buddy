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
    <div className="relative w-screen bg-slate-950 flex flex-col justify-center overflow-x-hidden overflow-y-scroll">
      <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 2xl:h-[700px] 2xl:w-[700px]"></div>
      <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))] 2xl:h-[700px] 2xl:w-[700px]"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 z-10"></div>

      <div className="grid-rows-3 grid-cols-1 p-4">
        <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-1 z-49 h-64 mb-4">
          <AddBudget className="z-99" />
        </div>
        <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-2 z-49 mb-4">
          <AddTransaction />
        </div>
        <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-3 z-49 mb-4 md:hidden">
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

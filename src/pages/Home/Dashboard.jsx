import React from "react";
import GraficoCategorie from "./GraficoCategorie";
import useGetTransactions from "../../hooks/useGetTransactions";

const Dashboard = () => {
  const { transactions } = useGetTransactions();

  return (
    <div className="bg-gray-800 h-screen py-7 pr-5 flex justify-center items-center">
      <div className="h-full w-full bg-gray-300 rounded-lg">
        <GraficoCategorie transactions={transactions} />
      </div>
    </div>
  );
};

export default Dashboard;

import React from "react";
import GraficoCategorie from "./GraficoCategorie";
import GraficoMensile from "./GraficoMensile";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetMonthlyExpenses from "../../hooks/useGetMonthlyExpenses";

const Dashboard = () => {
  const { monthlyExpenses } = useGetMonthlyExpenses();

  return (
    <div className="bg-gray-800 h-screen py-7 pr-5 flex justify-center items-center">
      <div className="h-full w-full bg-gray-300 rounded-lg">
        <GraficoCategorie transactions={monthlyExpenses} />
      </div>
    </div>
  );
};

export default Dashboard;

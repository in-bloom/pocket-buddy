import React from "react";
import GraficoCategorie from "./GraficoCategorie";
import GraficoMensile from "./GraficoMensile";
import useGetTransactions from "../../hooks/useGetTransactions";
import useGetMonthlyTransaciton from "../../hooks/useGetMonthlyTransaciton";

const Dashboard = () => {
  const { monthlyExpenses } = useGetMonthlyTransaciton();

  return (
    <div className="bg-gray-800 h-screen py-7 pr-5 flex justify-center items-center">
      <div className="h-full w-full bg-gray-300 rounded-lg flex p-5">
        <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-1/3 h-96 mr-3">
          <GraficoCategorie transactions={monthlyExpenses} />
        </div>
        <div className="bg-gray-100 shadow-lg rounded-lg w-11/12 h-96 ml-3 p-6">
          <GraficoMensile transactions={monthlyExpenses} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

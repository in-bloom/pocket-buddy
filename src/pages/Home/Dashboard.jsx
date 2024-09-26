import React from "react";
import GraficoCategorie from "./GraficoCategorie";
import GraficoMensile from "./GraficoMensile";
import useGetMonthlyTransaciton from "../../hooks/useGetMonthlyTransaciton";
import BarGraph from "./BarGraph";
import Balance from "./Balance";

const Dashboard = () => {
  const now = new Date();
  const { monthlyExpenses } = useGetMonthlyTransaciton(now, 0);
  const { monthlyExpenses: fourMonthExp } = useGetMonthlyTransaciton(now, 3);

  return (
    <div className="bg-gray-800 h-screen py-7 pr-5 flex justify-center items-center">
      <div className="h-full w-full bg-gray-300 rounded-lg grid grid-rows-2 gap-4 p-4">
        <div className="grid grid-cols-8 gap-4 row-start-1">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 col-span-3">
            <Balance transactions={monthlyExpenses} />
          </div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 col-span-5">
            <GraficoMensile transactions={monthlyExpenses} />
          </div>
        </div>
        <div className="grid grid-cols-8 gap-4 row-start-2">
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 col-span-5">
            <BarGraph transactions={fourMonthExp} />
          </div>
          <div className="bg-gray-100 shadow-lg rounded-lg p-6 col-span-3">
            <GraficoCategorie transactions={monthlyExpenses} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

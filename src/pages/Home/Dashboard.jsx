import React from "react";
import GraficoCategorie from "./GraficoCategorie";
import GraficoMensile from "./GraficoMensile";
import useGetMonthlyTransaciton from "../../hooks/useGetMonthlyTransaciton";
import BarGraph from "./BarGraph";
import Balance from "./Balance";
import { useMediaQuery } from "react-responsive";
import useUserInfo from "../../hooks/useUserInfo";

const Dashboard = () => {
  const { userName } = useUserInfo();
  const now = new Date();
  const { monthlyExpenses } = useGetMonthlyTransaciton(now, 0);
  const { monthlyExpenses: fourMonthExp } = useGetMonthlyTransaciton(now, 3);
  const isMobile = useMediaQuery({ maxWidth: 768 });
  return (
    <>
      {isMobile ? (
        <div className="h-full mb-16 w-full">
          <div className="flex justify-between items-center p-5 mt-6">
            <div>
              <h1 className="text-white font-bold text-xl ml-5">Benvenuto!</h1>
              <h1 className="text-white font-bold text-xl ml-5">{userName}</h1>
            </div>
            <img
              src="../../../src/assets/logo in da site.png"
              alt="Logo del Sito"
              className="w-16 h-16"
            />
          </div>

          <div className="grid-cols-1 grid-rows-4 p-4 ">
            <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 row-start-1 h-64 mb-4 z-49">
              <Balance transactions={monthlyExpenses} />
            </div>
            <div className="bg-indigo-900 shadow-lg rounded-lg w-full pl-4 py-4 h-96 mb-4 z-49">
              <GraficoMensile transactions={monthlyExpenses} />
            </div>
            <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 h-96 mb-4 z-49">
              <BarGraph transactions={fourMonthExp} />
            </div>
            <div className="bg-indigo-900 shadow-lg rounded-lg w-full p-4 h-96 z-49">
              <GraficoCategorie transactions={monthlyExpenses} />
            </div>
          </div>
        </div>
      ) : (
        <div className="h-full w-full rounded-lg grid grid-rows-2 gap-4 p-4">
          <div className="grid grid-cols-8 gap-4 row-start-1">
            <div className="bg-indigo-900 shadow-lg rounded-lg p-6 col-span-3">
              <Balance transactions={monthlyExpenses} />
            </div>
            <div className="bg-indigo-900 shadow-lg rounded-lg p-6 col-span-5">
              <GraficoMensile transactions={monthlyExpenses} />
            </div>
          </div>
          <div className="grid grid-cols-8 gap-4 row-start-2">
            <div className="bg-indigo-900 shadow-lg rounded-lg p-6 col-span-5">
              <BarGraph transactions={fourMonthExp} />
            </div>
            <div className="bg-indigo-900 shadow-lg rounded-lg p-6 col-span-3">
              <GraficoCategorie transactions={monthlyExpenses} />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/* <div className="h-full w-full bg-gray-300 rounded-lg grid grid-rows-2 gap-4 p-4">
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
      </div> */

export default Dashboard;

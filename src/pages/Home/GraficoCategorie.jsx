import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const GraficoCategorie = ({ transactions }) => {
  const data = {
    labels: transactions.map((transaction) => transaction.category),
    datasets: [
      {
        label: "Spese",
        data: transactions.map((transaction) =>
          transaction.amount < 0 ? transaction.amount : null
        ),
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Grafico delle Spese Mensili",
      },
    },
  };

  return (
    <div className="bg-gray-100 shadow-lg rounded-lg p-6 w-96">
      <Pie data={data} options={options} />
    </div>
  );
};

export default GraficoCategorie;
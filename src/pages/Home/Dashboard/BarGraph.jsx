import React from "react";
import { getMonth, format, getYear } from "date-fns";
import EChartsReact from "echarts-for-react";
import { useState } from "react";

const BarGraph = ({ transactions }) => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const years = [
    ...new Set(
      transactions.map((transaction) => getYear(new Date(transaction.data)))
    ),
  ];

  const handleYearChange = (event) => {
    setSelectedYear(Number(event.target.value));
  };

  const groupTransactionsByMonth = (transactions) => {
    const groupedTransactions = {};

    transactions.forEach((transaction) => {
      let month = getMonth(new Date(transaction.data)) + 1;
      let anno = getYear(new Date(transaction.data));
      if (selectedYear == anno) {
        if (!groupedTransactions[month]) {
          groupedTransactions[month] = [];
        }
        groupedTransactions[month].push(transaction.amount);
      }
    });
    return groupedTransactions;
  };

  const sumTransactionsByMonth = (groupedTransactions) => {
    const summedTransactions = {};

    for (const month in groupedTransactions) {
      summedTransactions[month] = groupedTransactions[month].reduce(
        (acc, curr) => acc + Number(curr),
        0
      );
    }
    return summedTransactions;
  };

  const getMonthName = (monthNumber) => {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return format(date, "MMMM");
  };

  var data = sumTransactionsByMonth(groupTransactionsByMonth(transactions));
  data = months.map((month) => Number(data[month] || 0).toFixed(2));
  const monthNames = months.map((month) => getMonthName(month));

  const option = {
    xAxis: {
      type: "category",
      data: monthNames,
      lineStyle: {
        color: "white",
      },
      axisLabel: {
        color: "white",
      },
    },
    yAxis: {
      type: "value",
      lineStyle: {
        color: "white",
      },
      axisLabel: {
        color: "white",
        rotate: 45,
      },
    },

    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c}€",
    },
    series: [
      {
        data: Object.values(data),
        type: "bar",
        lineStyle: {
          color: "#e2e8f0",
        },
        itemStyle: {
          color: "#e2e8f0",
        },
      },
    ],
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 40,
        bottom: 7,
      },
    ],
  };

  return (
    <div className="lg:h-full h-72">
      <div className="text-center">
        <h2 className="text-white font-bold lg:text-xl text-lg mb-1">
          Spese totali per mese
        </h2>
        <select
          value={selectedYear}
          onChange={handleYearChange}
          style={{ position: "relative", zIndex: 99 }}
          className="shadow appearance-none border rounded p-1 text-indigo-800 leading-tight focus:outline-none focus:shadow-outline"
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <EChartsReact
        option={option}
        style={{ width: "100%", height: "100%", zIndex: 93 }}
      />
    </div>
  );
};

export default BarGraph;

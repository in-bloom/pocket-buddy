import React from "react";
import { getMonth, format } from "date-fns";
import EChartsReact from "echarts-for-react";

const BarGraph = ({ transactions }) => {
  const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const groupTransactionsByMonth = (transactions) => {
    const groupedTransactions = {};

    transactions.forEach((transaction) => {
      let month = getMonth(new Date(transaction.data)) + 1;
      if (!groupedTransactions[month]) {
        groupedTransactions[month] = [];
      }
      groupedTransactions[month].push(transaction.amount);
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
  data = months.map((month) => data[month] || 0);
  const monthNames = months.map((month) => getMonthName(month));

  const option = {
    title: {
      text: "Spese totali per mese",
      left: "center",
      textStyle: {
        color: "white",
        fontFamily: "Poppins",
      },
    },
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
    <EChartsReact
      option={option}
      style={{ width: "100%", height: "100%", zIndex: 98 }}
    />
  );
};

export default BarGraph;

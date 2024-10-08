import React from "react";
import EChartsReact from "echarts-for-react";
import { startOfMonth, endOfMonth, addDays, format } from "date-fns";

const GraficoMensile = ({ transactions }) => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const exp_per_data = [];
  let cumulative = 0;
  const dates = [];

  for (let i = start; i <= end; i = addDays(i, 1)) {
    const formattedDate = format(i, "yyyy-MM-dd");
    const dailyTransactions = transactions.filter(
      (t) => t.data === String(formattedDate)
    );
    dates.push(String(formattedDate));
    const dailySum = dailyTransactions.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0
    );
    cumulative += dailySum;
    exp_per_data.push(cumulative);
  }

  const filteredDates = dates.filter((date, index) => {
    return transactions.some((t) => t.data === date) || index % 5 === 0;
  });
  const filteredData = exp_per_data.filter((_, index) => {
    return transactions.some((t) => t.data === dates[index]) || index % 5 === 0;
  });

  const option = {
    title: {
      text: "Andamento delle spese",
      left: "center",
      textStyle: {
        color: "white",
        fontFamily: "Poppins",
      },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}: {c}€",
    },
    xAxis: {
      type: "category",
      data: filteredDates,
      lineStyle: {
        color: "white",
        fontFamily: "Poppins",
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} €",
        color: "white",
        rotate: 45,
      },
      lineStyle: {
        color: "white",
        fontFamily: "Poppins",
      },
    },
    series: [
      {
        name: "Spese Cumulative",
        data: filteredData,
        type: "line",
        lineStyle: {
          color: "#ffffff",
          width: 4,
        },
        itemStyle: {
          color: "black",
        },
      },
    ],
    dataZoom: [
      {
        type: "slider",
        start: 0,
        end: 25,
        bottom: 7,
      },
    ],
  };

  return (
    <EChartsReact
      option={option}
      style={{ height: "100%", width: "100%", zIndex: 98 }}
      className="pl-4"
    />
  );
};

export default GraficoMensile;

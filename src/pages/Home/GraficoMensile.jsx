import React from "react";
import EChartsReact from "echarts-for-react";
import { startOfMonth, endOfMonth, addDays, format } from "date-fns";

const GraficoMensile = ({ transactions }) => {
  const start = startOfMonth(new Date());
  const end = endOfMonth(new Date());

  const exp_per_data = [];
  let cumulative = 0;

  for (let i = start; i <= end; i = addDays(i, 1)) {
    const formattedDate = format(i, "yyyy-MM-dd");
    const dailyTransactions = transactions.filter(
      (t) => t.data === String(formattedDate)
    );
    const dailySum = dailyTransactions.reduce(
      (acc, curr) => acc + Number(curr.amount),
      0
    );
    cumulative += dailySum;
    exp_per_data.push(cumulative);
  }

  const option = {
    title: {
      text: "Spese Mensili Cumulative",
      left: "center",
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Spese Cumulative"],
      top: "bottom",
    },
    xAxis: {
      type: "category",
      data: exp_per_data.map((_, index) =>
        format(addDays(start, index), "yyyy-MM-dd")
      ),
      axisLabel: {
        rotate: 45,
        interval: 0,
      },
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "{value} €",
      },
      splitLine: {
        show: true,
      },
    },
    series: [
      {
        name: "Spese Cumulative",
        data: exp_per_data,
        type: "line",
        smooth: true,
        lineStyle: {
          color: "#5470C6",
          width: 3,
        },
        itemStyle: {
          color: "#5470C6",
        },
        areaStyle: {
          color: "rgba(84, 112, 198, 0.2)",
        },
      },
    ],
  };

  return (
    <EChartsReact option={option} style={{ height: "100%", width: "100%" }} />
  );
};

export default GraficoMensile;

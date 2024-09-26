import useGetBudget from "../../hooks/useGetBudget";
import EChartsReact from "echarts-for-react";

const Balance = ({ transactions }) => {
  const { budget } = useGetBudget();
  const spese = transactions.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const bilancio = budget - spese;

  const option = {
    title: {
      text: "Bilancio",
      left: "center",
    },
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -269.99,
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: false,
          itemStyle: {
            borderWidth: 1,
            borderColor: "#464646",
          },
        },
        axisLine: {
          lineStyle: {
            width: 15,
          },
        },
        splitLine: {
          show: false,
          distance: 0,
          length: 10,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
          distance: 50,
        },
        data: [{ value: ((spese / budget) * 100).toFixed(2) }],
        title: {
          fontSize: 14,
        },
        detail: {
          width: 150,
          height: 40,
          fontSize: 14,
          color: "inherit",
          borderColor: "inherit",
          borderRadius: 0,
          borderWidth: 0,
          formatter: `{value}%\nBilancio: €${bilancio}`,
          offsetCenter: [0, "0%"], // Centrare il dettaglio
          rich: {
            value: {
              fontSize: 20,
              lineHeight: 30,
              color: "#000",
              fontWeight: "bold",
            },
            bilancio: {
              fontSize: 16,
              lineHeight: 20,
              color: "#000",
            },
          },
        },
      },
    ],
  };

  return (
    <EChartsReact option={option} style={{ width: "100%", height: "100%" }} />
  );
};

export default Balance;

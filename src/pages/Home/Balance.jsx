import useGetBudget from "../../hooks/useGetBudget";
import EChartsReact from "echarts-for-react";
import { memo } from "react";

const Balance = memo(({ transactions }) => {
  const { budget } = useGetBudget();
  const spese = transactions.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const bilancio = budget - spese;

  const option = {
    series: [
      {
        type: "gauge",
        startAngle: 90,
        endAngle: -269.99,
        radius: "90%",
        center: ["50%", "50%"],
        pointer: {
          show: false,
        },
        progress: {
          show: true,
          overlap: false,
          roundCap: true,
          clip: true,
          itemStyle: {
            borderWidth: 0,
            borderColor: "#yellow",
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
        },
        data: [{ value: ((spese / budget) * 100).toFixed(2) }],
        title: {
          fontSize: 14,
          fontFamily: "Poppins",
        },
        detail: {
          width: 150,
          height: 65,
          fontSize: 18,
          fontFamily: "Poppins",
          color: "white",
          borderColor: "inherit",
          borderRadius: 0,
          borderWidth: 0,
          formatter: `Bilancio: €${bilancio}\nSpseso: {value}%`,
          offsetCenter: [0, "0%"],
          rich: {
            value: {
              fontSize: 20,
              lineHeight: 30,
              color: "#000",
              fontWeight: "bold",
            },
            bilancio: {
              fontSize: 18,
              lineHeight: 20,
              color: "#000",
            },
          },
          markPoint: {
            data: [
              {
                coord: ["value"],
                value: spese,
                symbol: "circle",
                symbolSize: 20,
                itemStyle: {
                  color: "red",
                },
              },
            ],
          },
        },
      },
    ],
  };

  return (
    <EChartsReact option={option} style={{ width: "100%", height: "100%" }} />
  );
});

export default Balance;

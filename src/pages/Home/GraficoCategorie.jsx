import React from "react";
import EChartsReact from "echarts-for-react";
import { useMediaQuery } from "react-responsive";
import { color } from "echarts";

const GraficoCategorie = ({ transactions }) => {
  const isMobile = useMediaQuery({ maxWidth: 768 });

  const data_raw = transactions.reduce((acc, curr) => {
    const category = curr.category || "Altro";
    if (!acc[category]) {
      acc[category] = 0;
    }
    acc[category] += Number(curr.amount);
    return acc;
  }, {});

  const data = Object.keys(data_raw).map((key) => ({
    name: key,
    value: data_raw[key],
  }));

  const option = {
    title: {
      text: "Spesa per Categorie",
      left: "center",
      textStyle: {
        color: "white",
        fontFamily: "Poppins",
      },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}€ <br/> ({d}%)",
      textStyle: {
        fontFamily: "Poppins",
      },
    },
    legend: {
      orient: "vertical",
      bottom: "bottom",
      textStyle: {
        fontFamily: "Poppins",
        color: "white",
      },
    },
    series: [
      {
        name: "Spese per Categoria",
        type: "pie",
        radius: "55%",
        center: ["50%", "50%"],
        data: data,
        itemStyle: {
          normal: {
            color: (params) => {
              const colors = [
                "#B0BEC5",
                "#A5D6A7",
                "#90A4AE",
                "#D7CCC8",
                "#F8BBD0",
                "#FFF9C4",
              ];
              return colors[params.dataIndex % colors.length];
            },
            shadowBlur: isMobile ? 0 : 50,
            shadowColor: isMobile ? "transparent" : "rgb(49, 46, 129, 1)",
          },
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgb(49, 46, 129, 1.9)",
          },
        },
        animationType: "scale",
        animationEasing: "elasticOut",
        animationDelay: function (idx) {
          return Math.random() * 200;
        },
      },
    ],
  };

  return (
    <EChartsReact
      option={option}
      data={data}
      style={{ width: "100%", height: "100%", zIndex: 98 }}
    />
  );
};

export default GraficoCategorie;

import React, { lazy, Suspense } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const fullConfig = resolveConfig(tailwindConfig);

const ContestantsByNumberOfQuestions = () => {
  const numberOfParticipants = [56, 43, 27, 30];
  const percentageOfParticipants = [70, 40, 28, 8];
  const numberOfQuestions = [1, 2, 3, 4];
  const state = {
    series: [
      {
        name: "Percentage",
        data: percentageOfParticipants,
      },
    ],
    options: {
      chart: {
        height: 350,
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          borderRadius: 2,
          columnWidth: "40%",
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number, index: any) {
          return numberOfParticipants[index.dataPointIndex];
        },
        offsetY: -20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: numberOfQuestions,
        labels: {
          show: true,
        },
        position: "bottom",
        axisBorder: {
          show: false,
        },

        crosshairs: {
          fill: {
            type: "gradient",
            gradient: {
              colorFrom: "#D8E3F0",
              colorTo: "#BED1E6",
              stops: [0, 100],
              opacityFrom: 0.4,
              opacityTo: 0.5,
            },
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      yaxis: {
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
          formatter: function (val: number) {
            return Math.floor(val) + "%";
          },
        },
      },
      title: {
        text: "",
        floating: true,
        offsetY: 330,
        style: {
          color: "#444",
        },
      },
      colors: ["#3182CE"],
    },
  };

  return (
    <div id="chart">
      <Chart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ContestantsByNumberOfQuestions;

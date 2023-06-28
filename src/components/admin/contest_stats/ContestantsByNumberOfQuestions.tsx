import React, { lazy, Suspense } from "react";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../../../tailwind.config";
import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
const fullConfig = resolveConfig(tailwindConfig);

interface ContestantsByNumberOfQuestions {
  numberOfParticipants: number[];
  numberOfQuestions: string[];
  totalParticipants: number;
}
const ContestantsByNumberOfQuestions: React.FC<
  ContestantsByNumberOfQuestions
> = ({ numberOfParticipants, numberOfQuestions, totalParticipants }) => {
  const percentageOfParticipants = numberOfParticipants.map(
    (participants: number) =>
      parseFloat(((participants / totalParticipants) * 100).toFixed(2))
  );
  const state = {
    series: [
      {
        name: "Percentage of Partcipants who solved the given amount of question",
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
          borderRadius: 6,
          columnWidth: "30%",
          dataLabels: {
            position: "top", // top, center, bottom
          },
        },
      },
      dataLabels: {
        enabled: true,
        formatter: function (val: number, index: any) {
          return `${numberOfParticipants[index.dataPointIndex]}`;
        },
        offsetY: -30,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },

      xaxis: {
        categories: numberOfQuestions,

        labels: {
          show: true,
          formatter: function (val: string) {
            return (
              Math.floor(parseFloat(val)) +
              `${parseFloat(val) > 1 ? " questions" : " question"}`
            );
          },
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
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
          enabled: false,
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

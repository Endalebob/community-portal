import React, { lazy, Suspense } from "react";

import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ContestantsSolvedPerQuestion = () => {
  const state = {
    series: [
      {
        name: "Contestants Solved",
        data: [56, 43, 44, 20],
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
          borderRadius: 4,
          horizontal: true,
        },
      },
      dataLabels: {
        enabled: true,
      },
      xaxis: {
        categories: ["Problem A", "Problem B", "Problem C", "Problem D"],
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
          formatter: function (val: any) {
            return Math.floor(val) + "%";
          },
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

export default ContestantsSolvedPerQuestion;

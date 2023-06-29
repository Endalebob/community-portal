import dynamic from "next/dynamic";

const Chart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

interface ContestantsSolvedPerQuestionProps {
  numberOfParticipants: number[];
  questions: string[];
  totalParticipants: number;
}

const ContestantsSolvedPerQuestion: React.FC<
  ContestantsSolvedPerQuestionProps
> = ({ numberOfParticipants, questions, totalParticipants }) => {
  const percentageOfParticipants = numberOfParticipants.map((participants) =>
    parseFloat(((participants / totalParticipants) * 100).toFixed(2))
  );

  const state = {
    series: [
      {
        name: "Participants who managed to solve this question",
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
          barHeight: "50%",
          horizontal: true,
          dataLabels: {
            position: "top",

            formatter: function (val: any, index: any) {
              return typeof val === "number" ? Math.floor(val) + "%" : val;
            },
          },
        },
      },
      dataLabels: {
        enabled: true,

        formatter: function (val: any, index: any) {
          return numberOfParticipants[index.dataPointIndex];
        },
        offsetX: 20,
        style: {
          fontSize: "12px",
          colors: ["#304758"],
        },
      },
      yaxis: {
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
          formatter: function (val: any, index: any) {
            return typeof val === "number" ? Math.floor(val) + "%" : val;
          },
        },
      },
      xaxis: {
        categories: questions.map((question) => `Problem ${question}`),
        min: 0,
        max: 100,
        tickAmount: 5,
        labels: {
          style: {
            fontSize: "12px",
            fontWeight: "bold",
          },
          formatter: function (val: any, index: any) {
            return typeof val === "number" ? Math.floor(val) + "%" : val;
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

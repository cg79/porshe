import React from "react";
import { Bar } from "react-chartjs-2";
import { BarChartProps } from "../data-types/data-types";

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const labels = ["January", "February", "March", "April", "May", "June", "July"];

const defaultData: BarChartProps = {
  props: {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: [1, 2, 3],
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Dataset 2",
        data: [7, 8, 9],
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  },
};
const BarChart = (data: BarChartProps) => {
  return <Bar options={options} data={data.props} />;
};

export default BarChart;
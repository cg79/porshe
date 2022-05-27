import React from "react";
// import BarChart from '../../components/chart/bar-chart'
import { BarChartProps } from "../../components/data-types/data-types";
const company_list = require("../../data/companies.json");
import KpiCard from "../../components/kpiCard";

export default function FinancialKpi(props: any) {
  const company = props.data.company || null;
  // change the 0 to the selected company
  const metricsChosen = company?.kpis;

  const defaultBarChartData: BarChartProps = {
    props: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Dataset 1",
          data: [1, 2, 3],
          backgroundColor: "rgba(255, 99, 132, 0.5)",
        },
      ],
    },
  };

  const renderCharts = () => {
    const barChartsData = Object.entries(metricsChosen).map(
      ([key, value], index) => {
        return mapDataset(metricsChosen, index);
      }
    );

    return barChartsData.map((chart): any => {
      return (
        <KpiCard
          title={chart.props.title}
          value={chart.props.value}
          chartData={chart}
        />
      );
    });
  };

  return metricsChosen?
  (
      <div className="company-container wrap">{renderCharts()}</div>
  ):null;
}

const mapDataset = (metrics: any, index: number) => {
  const titles: string[] = Object.keys(metrics);
  const labels = [];
  const datasets: any[] = [];
  for (const [key, value] of Object.entries(metrics[titles[index]].data)) {
    labels.push(key);
    datasets.push(value);
  }
  const chartData = {
    props: {
      labels: labels,
      datasets: [
        {
          label: titles[index],
          data: datasets,
          backgroundColor: "#FFFFFF",
        },
      ],
      value: metrics[titles[index]].value,
      title: metrics[titles[index]].title,
      // options: {
      //     plugins: {
      //         title: {
      //             display: true,
      //             text: 'Custom Chart Title',
      //         },
      //     },
      // },
    },
  };
  return chartData;
};

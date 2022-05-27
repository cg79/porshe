import React from "react";
import BarChart from "../../components/chart/bar-chart";
import { BarChartProps, CompanyProps } from "../../components/data-types/data-types";



export default function FinancialKpi(props: CompanyProps) {

  const company = props.data.company || {};
  
  const defaultBarChartData: BarChartProps = {
    props: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
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

  return (
    <div>
      Financial Kpi
      <BarChart props={defaultBarChartData.props}></BarChart>
    </div>
  );
}

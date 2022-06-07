import React from 'react'
import { Bar } from 'react-chartjs-2'
import { BarChartProps } from '../data-types/data-types'

// export const options = (title:string) = {
//   responsive: true,
//   plugins: {
//     legend: {
//       position: "top" as const,
//     },
//     title: {
//       display: true,
//       text: "Chart.js Bar Chart",
//     },
//   },
// };

const createOptions = (title: string) => {
    return {
        responsive: true,
        plugins: {
            legend: {
                // position: 'top' as const,
                display: false,
            },
            title: {
                display: true,
                text: title,
                color: '#fff',
            },
        },
        scales: {
            x: {
                ticks: {
                    color: '#fff',
                },
            },
            y: {
                ticks: {
                    color: '#fff',
                },
            },
        },
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const BarChart = (data: any) => {
    return <Bar options={createOptions(data.title)} data={data.props} />
}

export default BarChart

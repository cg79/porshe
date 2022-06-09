import React from 'react'
import { Bar, Line } from 'react-chartjs-2'
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
            datalabels: {
                anchor: 'end',
                align: 'top',
                formatter: Math.round,
                font: {
                    weight: 'bold',
                },
            },
        },
        // scales: {
        //     x: {
        //         ticks: {
        //             color: '#fff',
        //         },
        //     },
        //     y: {
        //         ticks: {
        //             color: '#fff',
        //         },
        //     },
        // },
        scales: {
            y: {
                ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value: any, index: any, ticks: any) {
                        return value
                    },
                },
            },
        },
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const BarChart = (data: any) => {
    return <Line options={createOptions(data.title)} data={data.props} />
}

export default BarChart

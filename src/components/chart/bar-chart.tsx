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
        maintainAspectRatio: true,
        plugins: {
            legend: {
                display: false,
            },
            title: {
                display: true,
                text: title,
                color: '#fff',
            },
        },
        layout: {
            padding: {
                left: 30,
            },
        },
        scales: {
            x: {
                grid: {
                    color: 'transparent',
                    borderColor: '#fff',
                },
                ticks: {
                    color: '#9FF9FF',
                },
            },
            y: {
                grid: {
                    color: 'transparent',
                    borderColor: '#fff',
                },
                ticks: {
                    color: '#9FF9FF',
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
    const type = data.type

    return (
        <>
            {type == 'line' ? (
                <Line options={createOptions(data.title)} data={data.props} />
            ) : (
                <Bar options={createOptions(data.title)} data={data.props} />
            )}
        </>
    )
}

export default BarChart

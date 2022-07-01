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

const createOptions = (title: string, isNegative: boolean) => {
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
                // position: isNegative ? 'top' : 'top',
                padding: {
                    bottom: 30,
                },
            },
        },
        layout: {
            padding: {
                left: 30,
                // top: isNegative ? 30 : 0,
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
                    // borderColor: '#fff',
                },
                ticks: {
                    color: '#9FF9FF',
                    callback: function (value: any, index: any, ticks: any) {
                        // return value
                        return null
                    },
                },
            },
        },
    }
}

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July']

const BarChart = (data: any) => {
    const type = data.type
    const isNegative = data.props.datasets[0].data[0] < 0

    return (
        <>
            {type == 'line' ? (
                <Line
                    options={createOptions(data.title, isNegative)}
                    data={data.props}
                />
            ) : (
                <Bar
                    options={createOptions(data.title, isNegative)}
                    data={data.props}
                />
            )}
        </>
    )
}

export default BarChart

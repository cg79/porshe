import React from 'react'
// import BarChart from '../../components/chart/bar-chart'
import { BarChartProps } from '../../components/data-types/data-types'
const company_list = require('../../data/companies.json')
import KpiCard from '../../components/kpiCard'

import Layout from '../../components/layout'

const FinancialKpi = (props: any) => {
    const company = props?.data?.company || null
    // change the 0 to the selected company
    const metricsChosen = company?.kpis

    const renderCharts = () => {
        const barChartsData = Object.entries(metricsChosen).map(
            ([key, value], index) => {
                return mapDataset(metricsChosen, index)
            }
        )

        return barChartsData.map((chart): any => {
            return (
                <div className="chartcolumn">
                    <div className="gridchart">
                        <KpiCard
                            title={chart.props.title}
                            value={chart.props.value}
                            chartData={chart}
                            type={chart.type}
                        />
                    </div>
                </div>
            )
        })
    }

    return metricsChosen ? (
        <Layout>
            <div
                className="company-container wrap"
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
                <div className="gridcontainer">
                    <div className="gridrow">{renderCharts()}</div>
                </div>
            </div>
        </Layout>
    ) : null
}

const formatDate = (date: Date) => {
    const months = [
        'JAN',
        'FEB',
        'MAR',
        'APR',
        'MAY',
        'JUN',
        'JUL',
        'AUG',
        'SEP',
        'OCT',
        'NOV',
        'DEC',
    ]
    let monthName = months[date.getMonth()]
    const isoDate = date.toISOString().substring(5, 7)

    return `${monthName} ${isoDate}`
}

const numberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const mapDataset = (metrics: any, index: number) => {
    const titles: string[] = Object.keys(metrics)
    const labels = []
    const datasets: any[] = []
    const type = metrics[titles[index]].type
    const negatives = []

    for (const [key, value] of Object.entries(metrics[titles[index]].data)) {
        const newValue: any = value
        const formatedDate = formatDate(new Date(key))
        labels.push(formatedDate)
        // if(newValue< 0)
        // {
        //     negatives.push
        // }
        datasets.push(newValue.toFixed(0))
    }

    let bgColors: string[] = []
    labels.forEach((label, index) => {
        if (type == 'line') bgColors.push('#98EEF490')
        else if (index != labels.length - 1) bgColors.push('#fff')
        else bgColors.push('#98EEF4')
    })

    const chartData = {
        props: {
            labels: labels,
            datasets: [
                {
                    label: titles[index],
                    data: datasets,
                    backgroundColor: bgColors,
                    pointStyle: 'circle',
                    pointRadius: 5,
                    pointHoverRadius: 0,
                    pointBackgroundColor: '#ffffff00',
                    borderColor: type == 'bar' ? 'transparent' : '#fff',
                    borderWidth: 0,
                    cubicInterpolationMode: 'monotone',
                    steppedLines: true,
                    fill: 'origin',
                    // backgroundColor:
                    // 'linear-gradient(180deg, #98EEF4 0%, rgba(152, 238, 244, 0) 145.1%);',
                    datalabels: {
                        color: '#fff',
                        anchor: 'end',
                        align: 'top',
                        formatter: function (number: number) {
                            return number
                                .toString()
                                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                        },
                        font: {
                            weight: 'bold',
                        },
                    },
                },
            ],
            value: metrics[titles[index]].value,
            title: metrics[titles[index]].title,
        },
        options: {
            layout: {
                padding: 20,
            },
        },
        type: type,
    }
    return chartData
}

export default FinancialKpi

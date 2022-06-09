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
                <KpiCard
                    title={chart.props.title}
                    value={chart.props.value}
                    chartData={chart}
                />
            )
        })
    }

    return metricsChosen ? (
        <Layout>
            {/* <img
                    src={company.bgimg}
                    style={{
                        width: '100vw',
                        // height: 'auto',
                        position: 'absolute',
                        top: '360px',
                        left: '0',
                        zIndex: '-2',
                    }}
                ></img> */}
            <div
                className="company-container wrap"
                style={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
                {renderCharts()}
            </div>
        </Layout>
    ) : null
}

const mapDataset = (metrics: any, index: number) => {
    const titles: string[] = Object.keys(metrics)
    const labels = []
    const datasets: any[] = []
    for (const [key, value] of Object.entries(metrics[titles[index]].data)) {
        const newValue: any = value
        labels.push(key)
        datasets.push(newValue.toFixed(0))
    }

    let bgColors: string[] = []
    labels.forEach((label, index) => {
        if (index != labels.length - 1) bgColors.push('#fff')
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
                    pointRadius: 8,
                    pointHoverRadius: 12,
                    borderColor: '#fff',
                    borderWidth: 1,
                    cubicInterpolationMode: 'monotone',
                    steppedLines: true,
                    fill: 'origin',
                    // backgroundColor:
                    // 'linear-gradient(180deg, #98EEF4 0%, rgba(152, 238, 244, 0) 145.1%);',
                    datalabels: {
                        color: '#fff',
                    },
                },
            ],
            value: metrics[titles[index]].value,
            title: metrics[titles[index]].title,
        },
        options: {},
    }
    return chartData
}

export default FinancialKpi

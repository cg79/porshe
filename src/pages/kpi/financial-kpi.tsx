import React from 'react'
// import BarChart from '../../components/chart/bar-chart'
import { DivierProps } from '../../components/data-types/data-types'
const company_list = require('../../data/companies.json')
import KpiCard from '../../components/kpiCard'
import styles from "./kpi.module.css";
import Layout from '../../components/layout'

const Divider = (props: DivierProps) => {
    const { children } = props;

    return (
      <div className={styles.dcontainer}>
        <div className={styles.dborder} />
        <span className={styles.dcontent}>
          Custom KPIs
        </span>
        <div className={styles.dborder} />
      </div>
    );
  };

const FinancialKpi = (props: any) => {
    const company = props?.data?.company || null
    // change the 0 to the selected company

    const metricsChosen = company?.kpis;

    // sort by
    //  1) Liquidity
    //  2) Revenue Actual
    //  3) EBITDA
    const metricsSorted: any[] = [];
    if (company?.kpis?.Liquidity) { metricsSorted.push([ "Liquidity", company?.kpis?.Liquidity ]); }
    if (company?.kpis?.REV) { metricsSorted.push([ "REV", company?.kpis?.REV ]); }
    if (company?.kpis?.EBITDA) { metricsSorted.push([ "EBITDA", company?.kpis?.EBITDA ]); }

    if (metricsChosen) {
        Object.entries(metricsChosen).map(([key, value]) => {
            let found = false;
            metricsSorted.map(([sk, sv]) => {
                if (sk == key) {
                    found = true
                }
            })
            if (!found) {
                metricsSorted.push([key, value])
            }
        });
    }

    const renderCharts = () => {
        const barChartsData = metricsSorted.map(
            ([key, value], index) => {
                return mapDataset(metricsSorted, index)
            }
        )

        const baseData = barChartsData.slice(0, 3);

        let allData = baseData.map((chart): any => {
            return (
                <div className="chartcolumn">
                    <div className="gridchart">
                        <KpiCard
                            title={chart.props.title}
                            value={chart.props.value}
                            chartData={chart}
                            type={chart.type}
                            leftdate={chart.props.labels[0]}
                            rightdate={chart.props.labels[chart.props.labels.length-1]}
                        />
                    </div>
                </div>
            )
        })

        if (barChartsData.length > 3) {
            allData.push((
                <Divider>Custom KPIs</Divider>
            ))
            allData.push(barChartsData.slice(3).map((chart): any => {
                return (
                    <div className="chartcolumn">
                        <div className="gridchart">
                            <KpiCard
                                title={chart.props.title}
                                value={chart.props.value}
                                chartData={chart}
                                type={chart.type}
                                leftdate={chart.props.labels[0]}
                                rightdate={chart.props.labels[chart.props.labels.length-1]}
                            />
                        </div>
                    </div>
                )
            }))
        }

        return allData
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
    const isoDate = date.toISOString().substring(2, 4)

    return `${monthName} ${isoDate}`
}

const numberWithCommas = (number: number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

const mapDataset = (metrics: any, index: number) => {
    const labels = []
    const datasets: any[] = []
    const type = metrics[index][1].type
    const negatives = []

    const sortedEntries = Object.entries(metrics[index][1].data).sort((a, b) => a[0].localeCompare(b[0]));

    for (const [key, value] of sortedEntries) {
        const newValue: any = value;
        const formatedDate = formatDate(new Date(key));
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
                    label: metrics[index][0],
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
                        formatter: numberWithCommas,
                        font: {
                            weight: "bold"
                        },
                    },
                },
            ],
            value: metrics[index][1].value,
            title: metrics[index][1].title,
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

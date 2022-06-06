import styles from './style.module.css'
import { BarChartProps } from '../../components/data-types/data-types'
import BarChart from '../../components/chart/bar-chart'

import { Container } from '@mui/material'

type KpiCardProps = {
    title: string
    chartData: BarChartProps
    value: number
}

const KpiCard: React.FC<KpiCardProps> = ({ title, chartData, value }) => {
    return (
        <div className={styles.card}>
            <section className={styles.header}>
                <div className={styles.header__left}>
                    <div className={styles.left__metric}>{title}</div>
                    <div className={styles.left__date}>IAN - JUNE 2022</div>
                </div>
                <div className={styles.header__right}>
                    <div className={styles.right__value}>
                        {chartData.props.datasets[0].data.slice(-1).pop()}
                    </div>
                    <div className={styles.right__date}> / {`JUNE 2022`}</div>
                </div>
            </section>
            <BarChart props={chartData.props} title={title}></BarChart>
        </div>
    )
}

export default KpiCard

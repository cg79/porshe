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
            <BarChart props={chartData.props} title={''}></BarChart>
        </div>
    )
}

export default KpiCard

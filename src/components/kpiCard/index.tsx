import styles from "./style.module.css";
import { BarChartProps } from "../../components/data-types/data-types";
import BarChart from "../../components/chart/bar-chart";

// import { Container } from '@mui/material'

type KpiCardProps = {
  title: string;
  chartData: BarChartProps;
  value: number;
  type: string;
  leftdate?: string;
  rightdate?: string;
};

const KpiCard: React.FC<KpiCardProps> = ({ title, chartData, value, type, leftdate = "", rightdate = "" }) => {
  const rightValueDisplayed: any = chartData.props.datasets[0].data
    .slice(-1)
    .pop();
  return (
    <div className={styles.linebk}>
      <section className={styles.header}>
        <div className={styles.header__left}>
          <div className={styles.left__metric}>{title}</div>
          <div className={styles.left__date}>{leftdate}</div>
        </div>
        <div className={styles.header__right}>
          <div className={styles.right__value}>
            {rightValueDisplayed
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          </div>
          <div className={styles.right__date}> / {rightdate}</div>
        </div>
      </section>
      {/* <div className={styles.chartContainer}> */}
      {/* <div className={styles.padder}></div> */}
      <BarChart
        props={chartData.props}
        title={title}
        type={type}
      ></BarChart>
      {/* </div> */}
    </div>
  )
};

export default KpiCard;

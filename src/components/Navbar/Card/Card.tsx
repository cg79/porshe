import styles from './Card.module.css'

type CardProps = {
    title: string
    headline: string
    description: string
}

const Card: React.FC<CardProps> = (props) => {
    return <div className={styles.card}>test</div>
}

export default Card

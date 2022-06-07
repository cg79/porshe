import Link from 'next/link'
import styles from './Card.module.css'
import { ROUTES } from '../../constants/constants'

type CardProps = {
    company: string
    location: string
    headline: string

    revenue: string
    employee: string
    liquidity: string

    imageSrc: string
    logoSrc: string
    id: string | number
}

type CardInfoProps = {
    title: any
    value: any
}

const CardInfo: React.FC<CardInfoProps> = (props): JSX.Element => {
    return (
        <div>
            <div>{props.title}</div>
            <div className={styles.card__stats__value}>{props.value}</div>
        </div>
    )
}

const Card: React.FC<CardProps> = (props) => {
    const {
        company,
        location,
        headline,
        revenue,
        employee,
        liquidity,
        imageSrc,
        logoSrc,
        id,
    } = props

    console.log('image', imageSrc, 'logo', logoSrc)
    return (
        <Link href={`${ROUTES.KPI}?companyId=${id}`} scroll={false}>
            <div
                className={styles.card}
                style={{
                    backgroundImage: `url(${imageSrc})`,
                }}
            >
                <div className={styles.card__header}>
                    {/* <p>{company}</p> */}
                    <img src={logoSrc}></img>
                    <p>{location}</p>
                </div>
                <div className={styles.card__headline}>
                    <p>{headline}</p>
                </div>
                <div className={styles.card__stats}>
                    <CardInfo title="Revenue" value={revenue} />
                    <CardInfo title="Employee" value={employee} />
                    <CardInfo title="Liquidity" value={liquidity} />
                </div>
            </div>
        </Link>
    )
}

export default Card
5

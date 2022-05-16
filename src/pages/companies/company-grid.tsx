// import { useEffect } from "react";
import { title } from 'process'
import Card from '../../components/Card'
import styles from './Companies.module.css'

type CompanyGridProps = {
    company: string
    location: string
    headline: string
    revenue: string
    employee: string
    liquidity: string
}

// const RenderCompanies: React.FC<CompanyGridProps[]> = (companies) => {
//     return companies.map((item) => {
//         return (
//             <Card
//                 company={item.company}
//                 location={item.location}
//                 headline={item.headline}
//                 revenue={item.revenue}
//                 employee={item.employee}
//                 liquidity={item.liquidity}
//             ></Card>
//         )
//     })
// }

const CompanyGrid: React.FC<CompanyGridProps[]> = (props) => {
    return (
        <section className={styles.cardGrid}>
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
            <Card
                company="FANZONE"
                location="Berlin/GER"
                headline="The fan engagement platform"
                revenue="2M $"
                employee="51"
                liquidity="500K $"
            />
        </section>
    )
}

export default CompanyGrid

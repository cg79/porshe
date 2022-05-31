import React, { useEffect, useState } from 'react'
import { OverviewProps } from '../../components/data-types/data-types'
import Navbar from '../../components/Navbar'
import OverviewCard from '../../components/overview/overview-card'
import { ROUTES } from '../../constants/constants'
import IdentityStore from '../../store/identity-store'
let overview_list = require('../../data/overview.json')
import Router from 'next/router'
import styles from './style.module.css'

export default function Overview(props: any) {
    if (props && props.porsche_user) {
        IdentityStore.setLoggedUser(JSON.parse(props.porsche_user))
    }
    const [name] = useState('Daniel Smith')

    const redirectToCompanies = () => {
        // const route = `${ROUTES.COMPANIES}?companyId=${companyId}`;
        debugger
        Router.push(ROUTES.COMPANIES)
    }

    const [metrics, setMetrics] = useState<any[]>([])

    useEffect(() => {
        setMetrics(overview_list)
        console.log(overview_list)
    }, [])

    return (
        <Navbar>
            <div className="margins1">
                <div className="mt10">
                    <div className="flex font-porsche">
                        <p className={styles.name}>
                            Welcome, <p className={styles.name}>{name}</p>
                        </p>
                        <span style={{ marginLeft: '10px', marginTop: '20px' }}>
                            {IdentityStore.loggedUser?.info()}
                        </span>
                    </div>
                </div>
                <div
                    className="font-porsche white mt10"
                    style={{ fontSize: '19px', fontWeight: '400' }}
                >
                    What forward31 is about, and some info on what the dashboard
                    presents below. We address opportunities that are hidden in
                    plain sight. We challenge the status-quo and dare to dream
                    big. We don’t incubate or accelerate. Founders get majority
                    stake. With our network and assets, they have the unfair
                    advantage.{' '}
                </div>

                <div className="mt10">
                    <div
                        className="mt10 company-container wrap flex-space-between"
                        style={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                        }}
                    >
                        {metrics.map((el: any) => {
                            el.onClick = redirectToCompanies
                            return <OverviewCard props={el}></OverviewCard>
                        })}
                    </div>

                    <div className="mt10">&nbsp;</div>
                </div>
            </div>
        </Navbar>
    )
}

export async function getServerSideProps({ req }: { req: any }) {
    const response = { props: { porsche_user: req.cookies.porsche_user || '' } }

    return response
}

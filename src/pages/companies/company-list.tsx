import { observer } from 'mobx-react-lite'
import store from '../../store/company/CompaniesStore'
import { useEffect, useState } from 'react'
import Router from 'next/router'
import { ROUTES } from '../../constants/constants'
import DataTable from 'react-data-table-component'
import styles from './style.module.css'

const CompanyList = observer(() => {
    const [rows, setRows] = useState([])
    // let rows: GridRowsProp = [];

    useEffect(() => {
        setRows([...store.list])
    }, [])

    const columns = [
        // {
        //   name: "Logo",
        //   // selector: (row: any) => row.name,
        //   // sortable: true,
        //   cell: (row: any) => {
        //     return (
        //       <div>
        //         <img
        //           style={{ maxWidth: "50px" }}
        //           src={
        //             row.logo ||
        //             "https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png"
        //           }
        //         />
        //       </div>
        //     );
        //   },
        // },
        {
            name: 'Company',
            selector: (row: any) => row.name,
            sortable: true,
            cell: (row: any) => {
                return (
                    <div
                        className="flex pointer"
                        onClick={() => onRowClicked(row)}
                    >
                        <div>
                            <img
                                style={{ maxWidth: '50px' }}
                                src={
                                    row.logo ||
                                    'https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png'
                                }
                            />
                        </div>
                        <div className="ml5 capitalize flex flex-column  flex-center-x">
                            {row.name}
                        </div>
                        <div className="ml5">{row.introduction || ''}</div>
                    </div>
                )
            },
        },
        // {
        //   name: "Entrepreneurs",
        //   selector: (row: any) => row.entrepreneurs,
        //   sortable: true,
        // },
        {
            name: 'Headquarters',
            selector: (row: any) => row.location,
            sortable: true,
        },

        {
            name: 'FTE',
            selector: (row: any) => row.kpis?.fte?.value,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.fte?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>{row.kpis?.fte?.value}</span>
                            <span>{row.kpis?.fte?.growth}</span>
                        </div>
                    )
                }

                return null
            },
        },
        {
            name: 'Revenue',
            selector: (row: any) => row.revenue,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.revenue?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>{row.kpis?.revenue?.value} &euro;</span>
                            <span>{row.kpis?.revenue?.growth}</span>
                        </div>
                    )
                }

                return null
            },
        },
        {
            name: 'Liquidity',
            selector: (row: any) => row.kpis?.liquidity?.value,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.liquidity?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>{row.kpis?.liquidity?.value} &euro;</span>
                            <span>{row.kpis?.liquidity?.growth}</span>
                        </div>
                    )
                }

                return null
            },
        },
        {
            name: 'Profit/Loss',
            selector: (row: any) => row.kpis?.profitloss?.value,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.profitloss?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>{row.kpis?.profitloss?.value} &euro;</span>
                            <span>{row.kpis?.profitloss?.growth}</span>
                        </div>
                    )
                }

                return null
            },
        },
        {
            name: 'Gross Cash Burn',
            selector: (row: any) => row.kpis?.grosscash?.value,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.grosscash?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>{row.kpis?.grosscash?.value} &euro;</span>
                            <span>{row.kpis?.grosscash?.growth}</span>
                        </div>
                    )
                }

                return null
            },
        },
    ]

    const redirectToCompanyDetails = (companyId: number) => {
        debugger
        const route = `${ROUTES.KPI}?companyId=${companyId}`
        Router.push(route)
    }

    const onRowClicked = (row: any) => {
        debugger
        redirectToCompanyDetails(row.id)
    }

    return (
        <div style={{ marginTop: '20px' }}>
            <DataTable columns={columns} data={rows} fixedHeader />
        </div>
    )
})

export default CompanyList

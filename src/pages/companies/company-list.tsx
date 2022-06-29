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
                        style={{
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                        onClick={() => onRowClicked(row)}
                    >
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '5x 0',
                            }}
                        >
                            <img
                                style={{ maxWidth: '120px', maxHeight: '40px' }}
                                src={
                                    row.logo ||
                                    'https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png'
                                }
                            />
                        </div>
                        {/* <div
                            className={styles.table__cell}
                            style={{
                                fontWeight: '700',
                                fontSize: '16px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                paddingLeft: '15px',
                            }}
                        >
                            {row.name}
                        </div> */}
                    </div>
                )
            },
        },
        {
            name: '',
            selector: (row: any) => row.location,
            sortable: true,
            cell: (row: any) => {
                if (row.location) {
                    return (
                        <div
                            className={styles.table__cell}
                            style={{
                                fontWeight: '400',
                                fontSize: '14px',
                            }}
                        >
                            {row.introduction}
                        </div>
                    )
                }

                return null
            },
        },

        {
            name: 'Headquarters',
            selector: (row: any) => row.location,
            sortable: true,
            cell: (row: any) => {
                if (row.location) {
                    return (
                        <div
                            className={styles.table__cell}
                            style={{
                                fontWeight: '700',
                                fontSize: '16px',
                            }}
                        >
                            {row.location}
                        </div>
                    )
                }

                return null
            },
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
            name: 'Total Revenue',
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
        {
            name: 'Runway',
            selector: (row: any) => row.kpis?.runway?.value,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.runway?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>{row.kpis?.runway?.value} &euro;</span>
                            <span>{row.kpis?.runway?.growth}</span>
                        </div>
                    )
                }

                return null
            },
        },
        {
            name: 'PIG Convertible Loan',
            selector: (row: any) => row.kpis?.pig_convertible?.value,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.pig_convertible?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>
                                {row.kpis?.pig_convertible?.value} &euro;
                            </span>
                            <span>{row.kpis?.pig_convertible?.growth}</span>
                        </div>
                    )
                }

                return null
            },
        },
        {
            name: 'PIG Ownership Loan',
            selector: (row: any) => row.kpis?.pig_ownership?.value,
            sortable: true,
            cell: (row: any) => {
                if (row.kpis?.pig_ownership?.value) {
                    return (
                        <div className={styles.table__cell}>
                            <span>{row.kpis?.pig_ownership?.value} &euro;</span>
                            <span>{row.kpis?.pig_ownership?.growth}</span>
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

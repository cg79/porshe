import { useEffect, useState } from 'react'
import CompanyGrid from './company-grid'
import store from '../../store/company/CompaniesStore'
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp'
import TableRowsSharpIcon from '@mui/icons-material/TableRowsSharp'
import styles from './style.module.css'
import Layout from '../../components/layout'

export default function Portfolio() {

    useEffect(() => {
        store.load()
    }, [])

    return (
        <>
            <Layout type={2} variant={1}>
                <div className="margins">
                    <div className="flex">
                        <div style={{ marginTop: '20px' }}>
                            <b className="page-description">
                                Overview portofolio
                            </b>
                        </div>
                        <div
                            className={[
                                'flex flex-end',
                                styles.hideonphone,
                            ].join(' ')}
                        >
                            <div
                                className={styles.icon}
                                style={{ marginTop: '15px' }}
                            >
                            </div>
                        </div>
                    </div>

                    <div className="mt10">
                        <CompanyGrid></CompanyGrid>
                    </div>
                </div>
            </Layout>
        </>
    )
}
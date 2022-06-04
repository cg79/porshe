import { useEffect, useState } from 'react'
import CompanyGrid from './company-grid'
import CompanyList from './company-list'
import store from '../../store/company/CompaniesStore'
import GridViewSharpIcon from '@mui/icons-material/GridViewSharp'
import TableRowsSharpIcon from '@mui/icons-material/TableRowsSharp'
import styles from './style.module.css'

export default function RootCompanies() {
    const [showGrid, setShowGrid] = useState(store.showAsGrid)
    const viewAsGrid = () => {
        store.showAsGrid = true
        setShowGrid(true)
    }

    const viewAsList = () => {
        store.showAsGrid = false
        setShowGrid(false)
    }

    useEffect(() => {
        store.load()
    }, [])

    const css1 = showGrid ? 'pointer bold' : 'pointer'
    const css2 = showGrid ? 'pointer ml10' : 'pointer ml10 bold'

    return (
        <>
            <div className="margins">
                <div className={styles.container}>
                    <div className={styles.header}>
                        <span> Overview portofolio, </span>
                        <span>Live companies ({store.list.length})</span>
                    </div>
                    <div className={styles.icon}>
                        <GridViewSharpIcon onClick={viewAsGrid} />
                        <TableRowsSharpIcon onClick={viewAsList} />
                    </div>
                </div>

                <div className="mt10">
                    {showGrid && <CompanyGrid></CompanyGrid>}
                    {!showGrid && <CompanyList></CompanyList>}
                </div>
            </div>
        </>
    )
}

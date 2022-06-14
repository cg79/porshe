import store from '../../store/company/CompaniesStore'
import Router from 'next/router'
import { ROUTES } from '../../constants/constants'
import styles from './company-grid.module.css'

const CompanyGrid = () => {
    const redirectToCompanyDetails = (companyId: number) => {
        const route = `${ROUTES.KPI}?companyId=${companyId}`
        Router.push(route)
    }

    return (
        <div className="company-container wrap" style={{ marginTop: '20px' }}>
            {store.list.map((comp: any) => {
                return (
                    <div className="flex-item company" key={comp['id']}>
                        <img
                            className={styles.image}
                            src={comp['bgimg'] || comp['img']}
                        ></img>

                        <div
                            className="title pointer"
                            onClick={() => redirectToCompanyDetails(comp.id)}
                        >
                            <div
                                className="flex"
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                }}
                            >
                                <img
                                    className="logoImg"
                                    style={{
                                        display: 'block',
                                        maxWidth: '120px',
                                        maxHeight: '100px',
                                        width: 'auto',
                                        height: 'auto',
                                    }}
                                    src={comp['logo']}
                                ></img>

                                {/* <div
                                    className="flex flex-center-x bold uppercase"
                                    style={{
                                        alignItems: 'center',
                                        marginLeft: '15px',
                                        fontSize: '16px',
                                        maxWidth: '150px',
                                    }}
                                >
                                    {comp['name']}
                                </div> */}

                                <div
                                    style={{
                                        marginLeft: '15px',
                                        fontSize: '13px',
                                    }}
                                >
                                    {comp['location']}
                                </div>
                            </div>
                        </div>

                        <div className="revenue">
                            <div className="static">
                                <div className="flex flex-space-between">
                                    <div className="">
                                        <div className="kpi-title font-regular">
                                            Revenue
                                        </div>
                                        <div className="flex flex-center-x metric">
                                            {comp.kpis?.revenue?.value || 'N/A'}{' '}
                                            &euro;
                                        </div>
                                    </div>
                                    <div className="ml5">
                                        <div className="kpi-title font-regular">
                                            Employee
                                        </div>
                                        <div className="flex flex-center-x metric">
                                            {comp.employee || 'N/A'}
                                        </div>
                                    </div>
                                    <div className="ml5">
                                        <div className="kpi-title font-regular">
                                            Liquidity
                                        </div>
                                        <div className="flex flex-center-x metric">
                                            {comp.kpis?.liquidity?.value ||
                                                'N/A'}{' '}
                                            &euro;
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default CompanyGrid

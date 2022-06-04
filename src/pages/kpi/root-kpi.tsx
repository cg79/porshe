import { Box, Tabs, Tab } from '@mui/material'
// import { makeStyles } from "@mui/material";
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import TabPanel from '../../components/tab/tab-panel'
import FinancialKpi from './financial-kpi'
import FoundersStory from './founders-story'
import Router from 'next/router'
import store from '../../store/company/CompaniesStore'
import styles from './kpi.module.css'
import { ROUTES } from '../../constants/constants'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    }
}

export default function RootKPI() {
    const { query } = useRouter()

    const [value, setValue] = useState(0)
    const [company, setCompany] = useState<any>(null)

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        store.load()

        const companyId = (query.companyId || '') as string
        const companyValue = store.list.find((el: any) => el.id == companyId)

        setCompany(companyValue || null)
    }, [])

    // debugger;

    // const useStyles = makeStyles(() => ({
    //   customOne: {
    //      padding: '3rem 15rem',
    //      flexGrow: 1,
    //      backgroundColor: 'red',
    //      fontFamily: 'Open Sans',
    //   },
    //   customTwo: {
    //      padding: '0rem',
    //      color: '#484848',
    //      backgroundColor: 'white',
    //      fontFamily: 'Open Sans',
    //      fontSize: '1rem',
    //  },
    // }));

    // const classes = useStyles;

    const navigateToCompanies = () => {
        Router.push(ROUTES.COMPANIES)
    }

    return (
        <div className="margins" style={{ marginTop: '20px' }}>
            <div
                className={`font-porsche ${styles.backButton}`}
                onClick={navigateToCompanies}
                style={{
                    marginTop: '20px',
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    fontWeight: '400',
                    fontSize: '16px',
                    cursor: 'pointer',
                }}
            >
                <ArrowLeftIcon fontSize="large" />
                <p>BACK TO ALL COMPANIES</p>
            </div>
            <Box sx={{ width: '100%' }} style={{ marginTop: '20px' }}>
                {company && (
                    <div>
                        <div className="flex pointer">
                            <img
                                style={{ maxWidth: '50px' }}
                                src={
                                    company.logo ||
                                    'https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png'
                                }
                            />
                            <div className="ml5" style={{ marginLeft: '10px' }}>
                                {company.name}
                            </div>
                        </div>

                        <div className="ml5 mt10" style={{ marginTop: '20px' }}>
                            {company.description || ''}
                        </div>
                    </div>
                )}

                <Box
                    sx={{
                        borderBottom: 1,
                        borderColor: 'divider',
                        marginTop: '20px',
                    }}
                >
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                        className={styles.porscheTab}
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: 'white',
                                color: 'red',
                                fontFamily: 'Open Sans',
                            },
                        }}
                    >
                        <Tab label="Financial KPI’s" {...a11yProps(0)} />
                        <Tab label="Founders Story" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <FinancialKpi
                        data={{
                            company,
                        }}
                    ></FinancialKpi>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <FoundersStory
                        data={{
                            company,
                        }}
                    ></FoundersStory>
                </TabPanel>
            </Box>
        </div>
    )
}

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
import Tag from '../../components/tag'
import Layout from '../../components/layout'
import { AnimatePresence } from 'framer-motion'

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
    const [tags, setTags] = useState<any[]>([null])

    const [width, setWidth] = useState<number>(1080)

    function handleWindowSizeChange() {
        setWidth(window.innerWidth)
    }
    useEffect(() => {
        setWidth(window.innerWidth)

        window.addEventListener('resize', handleWindowSizeChange)
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange)
        }
    }, [])

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue)
    }

    useEffect(() => {
        store.load()

        const companyId = (query.companyId || '') as string
        const companyValue: any = store.list.find(
            (el: any) => el.id == companyId
        )

        console.log('tags', companyValue.tag)
        const listOfTags = []
        if (companyValue.tags)
            for (const [key, value] of Object.entries(companyValue?.tags)) {
                listOfTags.push(value)
            }
        setTags(listOfTags)

        setCompany(companyValue || null)
    }, [])

    const navigateToCompanies = () => {
        Router.push(ROUTES.COMPANIES)
    }

    const renderTags = (tags: string[]) => {
        return tags.map((tag: string) => {
            return <Tag name={tag} />
        })
    }

    return (
        <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
        >
            <Layout type={1}>
                {company && (
                    <img
                        src={company.bgimg}
                        style={{
                            width: '100vw',
                            height: 'auto',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            zIndex: '-2',
                            opacity: '0.2',
                        }}
                    ></img>
                )}
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
                    <Box
                        sx={{
                            width: '100%',
                            '& .MuiBox-root': {
                                padding: '0px',
                            },
                        }}
                        style={{
                            marginTop: '20px',
                        }}
                    >
                        {width > 768 ? (
                            <>
                                {company && (
                                    <>
                                        <section
                                            style={{
                                                width: '100%',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                            }}
                                        >
                                            <div
                                                className="flex font-porsche"
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}
                                            >
                                                <img
                                                    style={{
                                                        maxWidth: '180px',
                                                        maxHeight: '60px',
                                                    }}
                                                    src={
                                                        company.logo ||
                                                        'https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png'
                                                    }
                                                />
                                                <div
                                                    className="ml5"
                                                    style={{
                                                        marginLeft: '15px',
                                                        fontSize: '25px',
                                                        display: 'flex',
                                                        alignItems: 'flex-end',
                                                        fontWeight: '500',
                                                        lineHeight: '100%',
                                                        height: '100%',
                                                        verticalAlign: 'middle',
                                                        paddingBottom: '35px',
                                                    }}
                                                >
                                                    <span
                                                        style={{
                                                            fontSize: '25px',
                                                            fontWeight: '300',
                                                            // marginLeft: '15px',
                                                            transform:
                                                                'scale(0.7)',
                                                        }}
                                                    >
                                                        {company.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'flex-end',
                                                }}
                                            >
                                                {renderTags(tags)}
                                            </div>
                                        </section>
                                        <div
                                            className="mt10 font-porsche"
                                            style={{ marginTop: '20px' }}
                                        >
                                            {company.shortDescription || ''}
                                        </div>
                                    </>
                                )}
                            </>
                        ) : (
                            <>
                                <section className={styles.headline}>
                                    <div className={styles.headline__logo}>
                                        <img
                                            style={{
                                                maxWidth: '60px',
                                                maxHeight: '60px',
                                                height: 'auto',
                                                // padding: '10px',
                                            }}
                                            src={
                                                company.logo ||
                                                'https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png'
                                            }
                                        />
                                        <span>{company.location}</span>
                                    </div>
                                    <div className={styles.headline__tags}>
                                        {tags.map((tag) => {
                                            return <Tag name={tag} />
                                        })}
                                    </div>
                                </section>
                            </>
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
                                        fontFamily: 'Open Sans',
                                    },
                                }}
                            >
                                <Tab
                                    label="Financial KPI’s"
                                    {...a11yProps(0)}
                                />
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
            </Layout>
        </AnimatePresence>
    )
}

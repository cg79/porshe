import '../../styles/globals.css'
import '../../styles/page.css'
import { NextPage } from 'next'
import React from 'react'

import { CookiesProvider } from 'react-cookie'
import { RouteGuard } from '../components/guard/route-guard'

import { motion, AnimatePresence } from 'framer-motion'

// import {
//     Chart as ChartJS,
//     CategoryScale,
//     LinearScale,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend,
//     LineElement,
//     Point,
// } from 'chart.js'

// ChartJS.register(
//     CategoryScale,
//     LinearScale,
//     LineElement,
//     BarElement,
//     Title,
//     Tooltip,
//     Legend
// )

import ChartDataLabels from 'chartjs-plugin-datalabels'

import {
    Chart as ChartJS,
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
} from 'chart.js'

ChartJS.register(
    ArcElement,
    LineElement,
    BarElement,
    PointElement,
    BarController,
    BubbleController,
    DoughnutController,
    LineController,
    PieController,
    PolarAreaController,
    RadarController,
    ScatterController,
    CategoryScale,
    LinearScale,
    LogarithmicScale,
    RadialLinearScale,
    TimeScale,
    TimeSeriesScale,
    Decimation,
    Filler,
    Legend,
    Title,
    Tooltip,
    SubTitle,
    ChartDataLabels
)

function MyApp({
    Component,
    pageProps,
}: {
    Component: NextPage
    pageProps: any
}) {
    return (
        <AnimatePresence
            exitBeforeEnter
            initial={false}
            onExitComplete={() => window.scrollTo(0, 0)}
        >
            <CookiesProvider>
                {/* <div id="container1"></div>
        <div id="container2"></div> */}

                <div className="bg-element-1"></div>
                <div className="bg-element-2"></div>
                <div style={{ position: 'relative' }}>
                    <div style={{ overflow: 'hidden' }}>
                        <div className="bg-element-3"></div>
                    </div>
                </div>

                <div className="demo-container">
                    {/* <RouteGuard> */}
                    <Component {...pageProps} />
                    {/* </RouteGuard> */}
                </div>
            </CookiesProvider>
        </AnimatePresence>
    )
}

export default MyApp

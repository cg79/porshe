import '../../styles/globals.css'
import '../../styles/page.css'
import { NextPage } from 'next'
import React from 'react'

import { CookiesProvider } from 'react-cookie'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js'
import { RouteGuard } from '../components/guard/route-guard'

import { motion, AnimatePresence } from 'framer-motion'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

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
                <div className="bg-element-3"></div>

                <div className="demo-container">
                    <RouteGuard>
                        <Component {...pageProps} />
                    </RouteGuard>
                </div>
            </CookiesProvider>
        </AnimatePresence>
    )
}

export default MyApp

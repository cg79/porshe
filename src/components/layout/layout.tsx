import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
    children: ReactNode
    type?: number
}

const variants = [
    {
        hidden: { opacity: 0, x: 0, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -100 },
    },
    {
        hidden: { opacity: 0, x: 200, y: 0 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: -200 },
    },
]

const Layout = ({ children, type = 0 }: Props): JSX.Element => (
    <div>
        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants[type]}
            transition={{ type: 'linear' }}
        >
            {children}
        </motion.main>
    </div>
)

export default Layout

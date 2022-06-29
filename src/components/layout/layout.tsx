import React, { ReactNode } from 'react'
import { motion } from 'framer-motion'

type Props = {
    children: ReactNode
    type?: number
    variant?: number
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
    {
        hidden: { opacity: 0, x: 0, y: 400 },
        enter: { opacity: 1, x: 0, y: 0 },
        exit: { opacity: 0, x: 0, y: 0 },
    },
]

const transitions = [
    { type: 'tween', duration: 0.3, ease: 'easeIn' },
    { type: 'tween', duration: 1.5, ease: 'easeIn' },
    { type: 'tween', duration: 0.2, ease: 'easeIn' },
]

const Layout = ({ children, type = 0, variant = 0 }: Props): JSX.Element => (
    <div>
        <motion.main
            initial="hidden"
            animate="enter"
            exit="exit"
            variants={variants[type]}
            transition={transitions[variant]}
        >
            {children}
        </motion.main>
    </div>
)

export default Layout

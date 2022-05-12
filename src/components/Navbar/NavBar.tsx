import { useRouter } from 'next/router'

import Logo from './Logo'
import styles from './NavBar.module.css'
import NavBarButtons from './NavBarButtons'
import { ROUTES } from './NavBarButtons'
import MobileMenu from '../BurgerMenu/MobileMenu'
import { useState, useEffect } from 'react'
// import useWindowDimensions from '../../hooks/WindowDimension'

export type ROUTE__INFO = {
    url: string
    name: string
}

const NavBar = (props: any) => {
    const router = useRouter()

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

    return (
        <>
            {width <= 768 ? (
                <MobileMenu />
            ) : (
                <section className={styles.container}>
                    <nav className={styles.navbar}>
                        <div className={styles.logo}>
                            <Logo />
                        </div>
                        <ul className={styles.items}>
                            {NavBarButtons(ROUTES, router)}
                        </ul>
                    </nav>
                    <span>&nbsp;</span>
                </section>
            )}

            {props.children}
        </>
    )
}
export default NavBar

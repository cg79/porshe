import Link from 'next/link'
import { NextRouter, useRouter } from 'next/router'

import Logo from './Logo'
import styles from './NavBar.module.css'

type ROUTE__INFO = {
    url: string
    name: string
}

const renderNavBarButtons = (buttons: ROUTE__INFO[], router: NextRouter) => {
    return buttons.map((button) => {
        return (
            <li
                className={
                    router.pathname == button.url ? styles.items__active : ''
                }
            >
                <Link href={button.url}>{button.name}</Link>
            </li>
        )
    })
}

const NavBar = (props: any) => {
    const router = useRouter()

    const ROUTES: ROUTE__INFO[] = [
        { url: '/overview', name: 'Overview' },
        { url: '/companies', name: 'Companies' },
        { url: '/support', name: 'Support' },
        { url: '/profile', name: 'Profile' },
    ]

    return (
        <>
            <section className={styles.container}>
                <nav className={styles.navbar}>
                    <div className={styles.logo}>
                        <Logo />
                    </div>
                    <ul className={styles.items}>
                        {renderNavBarButtons(ROUTES, router)}
                    </ul>
                </nav>
                <span>&nbsp;</span>
            </section>
            {props.children}
        </>
    )
}
export default NavBar

import Link from 'next/link'
import { NextRouter } from 'next/router'
import styles from './NavBar.module.css'

import { ROUTE__INFO } from './NavBar'

export const NAVIGATION_ROUTES: ROUTE__INFO[] = [
    { url: '/overview', name: 'Overview' },
    { url: '/companies', name: 'Companies' },
    { url: '/support', name: 'Support' },
    { url: '/profile', name: 'Profile' },
]

const NavBarButtons = (buttons: ROUTE__INFO[], router: NextRouter) => {
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

export default NavBarButtons

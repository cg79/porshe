import Link from 'next/link'
import { useState } from 'react'

import Button from '@mui/material/Button'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import MenuIcon from '@mui/icons-material/Menu'
import styles from './BurgerMenu.module.css'
// import NavBarButtons from '../Navbar/NavBarButtons'
import { useRouter, NextRouter } from 'next/router'

// import { ROUTES } from '../Navbar/NavBarButtons'

import { ROUTE__INFO } from '../Navbar/NavBar'

const ROUTES: ROUTE__INFO[] = [
    { url: '/overview', name: 'Overview' },
    { url: '/companies', name: 'Companies' },
    { url: '/support', name: 'Support' },
]

export default function BurgerMenu() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const router = useRouter()

    const NavBarButtons = (buttons: ROUTE__INFO[], router: NextRouter) => {
        return (
            <div className={styles.menu__items}>
                <div className={styles.menu__profile}>
                    <img
                        className={styles.profile__image}
                        src={
                            'https://t4.ftcdn.net/jpg/03/64/21/11/360_F_364211147_1qgLVxv1Tcq0Ohz3FawUfrtONzz8nq3e.jpg'
                        }
                    ></img>
                    <div className={styles.profile__name}>Daniel Smith</div>
                </div>
                <div className={styles.items__links}>
                    {buttons.map((button) => {
                        return (
                            <li
                                className={
                                    router.pathname == button.url
                                        ? styles.items__active
                                        : ''
                                }
                            >
                                <Link href={button.url} scroll={false}>
                                    {button.name}{' '}
                                </Link>
                            </li>
                        )
                    })}
                </div>
                <div className={styles.items__profileActions}>
                    <li>Profile</li>
                    <li>Sign Out</li>
                </div>
            </div>
        )
    }

    return (
        <div className={styles.mobileMenu}>
            <Button
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <MenuIcon />
            </Button>
            <Menu
                sx={{
                    // your root styles
                    '&': {
                        background: 'red',
                        // your root styles but with higher CSS specificity
                    },
                    '&.MuiListItem-root': {
                        background: 'red',
                        // your root styles but with even higher CSS specificity
                    },
                }}
                className={styles.menu__section}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
                {NavBarButtons(ROUTES, router)}
            </Menu>
        </div>
    )
}

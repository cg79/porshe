import { useRouter } from 'next/router'

import Logo from './Logo'
import styles from './NavBar.module.css'
import NavBarButtons from './NavBarButtons'
import { ROUTES } from './NavBarButtons'
import MobileMenu from '../MobileMenu/MobileMenu'
import { useState, useEffect, useMemo } from 'react'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import PersonAdd from '@mui/icons-material/PersonAdd'
import Settings from '@mui/icons-material/Settings'
import Logout from '@mui/icons-material/Logout'
import Tooltip from '@mui/material/Tooltip'

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

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
    const open = Boolean(anchorEl)
    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const ProfileButton = () => {
        return (
            <li className={`${styles.items}${styles.profile}`}>
                <Tooltip title="Profile" placement="top" arrow>
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
                    </IconButton>
                </Tooltip>
                <Menu
                    elevation={0}
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                        elevation: 0,
                        sx: {
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&:before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                    <MenuItem>
                        <Avatar /> Profile
                    </MenuItem>
                    <Divider />
                    <MenuItem>
                        <ListItemIcon>
                            <Settings fontSize="small" />
                        </ListItemIcon>
                        Settings
                    </MenuItem>
                    <MenuItem>
                        <ListItemIcon>
                            <Logout fontSize="small" />
                        </ListItemIcon>
                        Logout
                    </MenuItem>
                </Menu>
            </li>
        )
    }

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
                            <ProfileButton />
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

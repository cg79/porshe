import { useRouter } from 'next/router'

import Logo from './Logo'
import styles from './NavBar.module.css'
import NavBarButtons from './NavBarButtons'
import Router from 'next/router'
import { NAVIGATION_ROUTES } from './NavBarButtons'
import { ROUTES } from '../../constants/constants'
import MobileMenu from '../MobileMenu'
import { useState, useEffect } from 'react'
// import { useSession, signOut,signIn } from "next-auth/react";
import IdentityStore from '../../store/identity-store'
import { parseCookies } from '../../helpers'

import Amplify from 'aws-amplify'
import awsconfig from '../../aws-exports'
import { NextPage } from 'next'
Amplify.configure(awsconfig)

// import useWindowDimensions from '../../hooks/WindowDimension'

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
import Link from 'next/link'

// const NavBar: NextPage = (props: any) => {
//     const [width, setWidth] = useState<number>(1080)
//     // const x= useSession();
//     // debugger;
//     // console.log(x);
//     // const { data: session, status } = useSession();
//     // const [cookie, setCookie] = useCookies(["user"])

//     //   if (status === "loading") {
//     //     return null;
//     //   }

//     const router = useRouter()

//     function handleWindowSizeChange() {
//         setWidth(window.innerWidth)
//     }
//     useEffect(() => {
//         setWidth(window.innerWidth)

//         window.addEventListener('resize', handleWindowSizeChange)
//         return () => {
//             window.removeEventListener('resize', handleWindowSizeChange)
//         }
//     }, [])

//     const navigateToSignInPage = () => {
//         Router.push(ROUTES.SIGN_IN)
//     }

//     const onSignOut = () => {
//         IdentityStore.logout()

//         fetch('/api/logout', {
//             method: 'post',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({}),
//         }).finally(() => {
//             IdentityStore.logout()
//             Router.push(ROUTES.OVERVIEW)
//         })
//     }

//     const onGoToChangePassword = () => {
//         Router.push(ROUTES.CHANGE_PASSWORD)
//     }

//     return (
//         <>
//             {width <= 768 ? (
//                 <MobileMenu />
//             ) : (
//                 <section className={styles.container}>
//                     <nav className={styles.navbar}>
//                         <div className={styles.logo}>
//                             <Logo />
//                         </div>
//                         <ul className={styles.items}>
//                             {NavBarButtons(NAVIGATION_ROUTES, router)}
//                             {!IdentityStore.loggedUser && (
//                                 <li
//                                     className={
//                                         router.pathname == '/signin'
//                                             ? styles.items__active
//                                             : ''
//                                     }
//                                 >
//                                     <a href="/signin">Sign In</a>
//                                 </li>
//                             )}

//                             {IdentityStore.loggedUser && (
//                                 <li>
//                                     <ul>
//                                         <li
//                                             className={
//                                                 router.pathname == '/signout'
//                                                     ? `${styles.items__active} pointer`
//                                                     : 'pointer'
//                                             }
//                                             onClick={() => onSignOut()}
//                                         >
//                                             Sign Out
//                                         </li>

//                                         <li
//                                             className={
//                                                 router.pathname ==
//                                                 '/changepassword'
//                                                     ? `${styles.items__active} pointer`
//                                                     : 'pointer'
//                                             }
//                                             onClick={() =>
//                                                 onGoToChangePassword()
//                                             }
//                                         >
//                                             Change Password
//                                         </li>
//                                     </ul>
//                                 </li>
//                             )}

//                             {IdentityStore.loggedUser &&
//                                 IdentityStore.loggedUser.info()}
//                             {/* <li onClick={() => navigateToSignInPage()}>Sign In</li> */}
//                             {/* <li onClick={() => onSignOut()}>Sign Out</li> */}
//                         </ul>
//                     </nav>
//                     <span>&nbsp;</span>
//                 </section>
//             )}

//             {props.children}
//         </>
//     )
// }

// NavBar.getInitialProps = async ({ req, res }) => {
//     const data = parseCookies(req)

//     if (res) {
//         if (Object.keys(data).length === 0 && data.constructor === Object) {
//             res.writeHead(301, { Location: '/' })
//             res.end()
//         }
//     }

//     return {
//         data: data && data,
//     }
// }

const NavBar = (props: any) => {
    const router = useRouter()

    // const { data: session, status } = useSession()
    // const [cookie, setCookie] = useCookies(['user'])

    const navigateToSignInPage = () => {
        Router.push(ROUTES.SIGN_IN)
    }

    const onSignOut = () => {
        IdentityStore.logout()

        fetch('/api/logout', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({}),
        }).finally(() => {
            IdentityStore.logout()
            Router.push(ROUTES.OVERVIEW)
        })
    }

    // if (status === 'loading') {
    //     return null
    // }

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

    const ProfileButtons = () => {
        const isLogged = IdentityStore.loggedUser

        return (
            <>
                {isLogged ? (
                    <>
                        <MenuItem>
                            <Avatar /> Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <Link href={ROUTES.PROFILE}>My account</Link>
                        </MenuItem>
                        <MenuItem>
                            <ListItemIcon>
                                <Logout fontSize="small" />
                            </ListItemIcon>
                            <Link
                                href={ROUTES.OVERVIEW}
                                onClick={() => onSignOut()}
                            >
                                Sign Out
                            </Link>
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <MenuItem>
                            <Avatar /> Profile
                        </MenuItem>
                        <Divider />
                        <MenuItem>
                            <ListItemIcon>
                                <Settings fontSize="small" />
                            </ListItemIcon>
                            <Link href={ROUTES.CHANGE_PASSWORD}>Register</Link>
                        </MenuItem>
                    </>
                )}
            </>
        )
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
                    <ProfileButtons />
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
                            {NavBarButtons(NAVIGATION_ROUTES, router)}
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

NavBar.getInitialProps = async ({ req, res }) => {
    const data = parseCookies(req)

    if (res) {
        if (Object.keys(data).length === 0 && data.constructor === Object) {
            res.writeHead(301, { Location: '/' })
            res.end()
        }
    }

    return {
        data: data && data,
    }
}

export default NavBar

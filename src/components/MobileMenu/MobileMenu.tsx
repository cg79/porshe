import * as React from 'react'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import Button from '@mui/material/Button'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import InboxIcon from '@mui/icons-material/MoveToInbox'
import MailIcon from '@mui/icons-material/Mail'
import Avatar from '@mui/material/Avatar'
import MenuIcon from '@mui/icons-material/Menu'
import Typography from '@mui/material/Typography'
import CloseIcon from '@mui/icons-material/Close'
import Link from 'next/link'
import { useRouter } from 'next/router'
import styles from './MobileMenu.module.css'

export default function MobileMenu() {
    const [open, setOpen] = React.useState(false)

    const router = useRouter()

    const list = () => (
        <Box
            sx={{
                width: '85vw',
                display: 'flex',
                height: '100vh',
                flexDirection: 'column',
                // justifyContent: 'flex-start',
                alignItems: 'flex-start',
                paddingTop: '50px',
                paddingLeft: '50px',
                background: 'black',
                color: 'white',
            }}
            onClick={() => setOpen(!open)}
            onKeyDown={() => setOpen(!open)}
        >
            <Avatar
                alt="Remy Sharp"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                sx={{ width: 80, height: 80 }}
            />
            <Typography
                variant="h6"
                gutterBottom
                component="div"
                sx={{ paddingTop: '15px' }}
            >
                Denis Smith
            </Typography>
            <Box
                sx={{
                    height: 60,
                }}
            />
            <List>
                {['Overview', 'Companies', 'Support'].map((text, index) => (
                    <Link href={`/${text.toLowerCase()}`}>
                        <ListItem
                            key={text}
                            disablePadding
                            className={
                                router.pathname == `/${text.toLowerCase()}`
                                    ? styles.active
                                    : ''
                            }
                        >
                            <ListItemButton disableGutters>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        </ListItem>
                    </Link>
                ))}
            </List>
            <Box
                sx={{
                    height: 40,
                }}
            />
            <List>
                {['My Account', 'Sign Out'].map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton disableGutters>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Box>
    )

    return (
        <nav className={styles.mobileMenu}>
            <Button onClick={() => setOpen(!open)}>
                {open ? (
                    <CloseIcon sx={{ color: '#fff', fontSize: 40 }} />
                ) : (
                    <MenuIcon sx={{ color: '#fff', fontSize: 40 }} />
                )}
            </Button>
            <Drawer open={open} onClose={() => setOpen(!open)}>
                {list()}
            </Drawer>
        </nav>
    )
}

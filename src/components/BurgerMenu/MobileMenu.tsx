import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import styles from "./BurgerMenu.module.css";
import Avatar from "@mui/material/Avatar";
import MenuIcon from "@mui/icons-material/Menu";
// import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Logo from "../Navbar/Logo";
import IdentityStore from "../../store/identity-store";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import { Typography } from "@mui/material";

export default function MobileMenu() {
  const [open, setOpen] = React.useState(false);
  const avatarUrl = IdentityStore.loggedUser
    ? IdentityStore.loggedUser.picture
    : "";

  const onSignOut = () => {
    IdentityStore.logout();

    fetch("/api/logout", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    }).finally(() => {
      IdentityStore.logout();
      Router.push(ROUTES.SIGN_IN);
    });
  };

  const list = () => (
    <Box
      sx={{
        width: "85vw",
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        // justifyContent: 'flex-start',
        alignItems: "flex-start",
        paddingTop: "50px",
        paddingLeft: "50px",
        background: "black",
        color: "white",
      }}
      onClick={() => setOpen(!open)}
      onKeyDown={() => setOpen(!open)}
    >
      {avatarUrl && <Avatar src={avatarUrl} sx={{ width: 80, height: 80 }} />}

      <Typography
        variant="h6"
        gutterBottom
        component="div"
        sx={{ paddingTop: "15px" }}
      >
        {IdentityStore.loggedUser && IdentityStore.loggedUser.info()}
      </Typography>
      <Box
        sx={{
          height: 20,
        }}
      />
      <List>
        {["Overview", "Companies", "Support"].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            button
            component="a"
            href={"/" + text.toLowerCase()}
          >
            {/* <ListItemButton disableGutters> */}
            {/* <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon> */}
            <ListItemText primary={text} />
            {/* </ListItemButton> */}
          </ListItem>
        ))}
      </List>
      {/* <Box
        sx={{
          height: 40,
        }}
      /> */}
      <List>
        <ListItem
          key="changepassword"
          disablePadding
          button
          component="a"
          href="/changepassword"
        >
          <ListItemText primary="Change Password" />
        </ListItem>

        <ListItem key="so" disablePadding>
          <ListItemButton onClick={onSignOut} disableGutters>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <nav className={styles.mobileMenu}>
        <div className={styles.logo}>
          <Logo />
        </div>
        <Button onClick={() => setOpen(!open)}>
          {open ? (
            <CloseIcon sx={{ color: "#fff", fontSize: 40 }} />
          ) : (
            <MenuIcon sx={{ color: "#fff", fontSize: 40 }} />
          )}
        </Button>
        <Drawer open={open} onClose={() => setOpen(!open)}>
          {list()}
        </Drawer>
      </nav>
      <span className={styles.bottomline}>&nbsp;</span>
    </div>
  );
}

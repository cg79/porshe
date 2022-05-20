import { useRouter } from "next/router";

import Logo from "./Logo";
import styles from "./NavBar.module.css";
import NavBarButtons from "./NavBarButtons";
import Router from "next/router";
import { NAVIGATION_ROUTES } from "./NavBarButtons";
import { ROUTES } from "../../constants/constants";
import MobileMenu from "../BurgerMenu/MobileMenu";
import { useState, useEffect, useRef } from "react";
// import { useSession, signOut,signIn } from "next-auth/react";
import IdentityStore from "../../store/identity-store";
import { parseCookies } from "../../helpers";

import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";
import { NextPage } from "next";
import { Avatar } from "@mui/material";
// import Avatar from "../avatar/avatar";
Amplify.configure(awsconfig);

// import useWindowDimensions from '../../hooks/WindowDimension'

export type ROUTE__INFO = {
  url: string;
  name: string;
};

const NavBar: NextPage = (props: any) => {
  const [width, setWidth] = useState<number>(1080);
  const [isDropDownOpen, setDropDownOpen] = useState(false);
  const ddContainerRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const toggleDropDown = () => {
    setDropDownOpen(!isDropDownOpen);
  };

  const handleClickOutside = (event: any) => {
    if (
      ddContainerRef.current &&
      !ddContainerRef.current.contains(event.target)
    ) {
      setDropDownOpen(false);
    }
  };

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth(window.innerWidth);

    document.addEventListener("mousedown", handleClickOutside);

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const navigateToSignInPage = () => {
    Router.push(ROUTES.SIGN_IN);
  };

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

  const onGoToChangePassword = () => {
    Router.push(ROUTES.CHANGE_PASSWORD);
  };

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
              {!IdentityStore.loggedUser && (
                <li
                  className={
                    router.pathname == "/signin" ? styles.items__active : ""
                  }
                >
                  <a href="/signin">Sign In</a>
                </li>
              )}

              {IdentityStore.loggedUser && (
                <li>
                  <ul className={styles.sameline}>
                    <li>
                      <Avatar src={IdentityStore.loggedUser.picture}></Avatar>
                    </li>

                    <li>
                      <div
                        className={styles.dropdowncontainer}
                        ref={ddContainerRef}
                      >
                        {IdentityStore.loggedUser && (
                          <div className="pointer" onClick={toggleDropDown}>
                            {IdentityStore.loggedUser.info()}

                            <span className="button1 pointer ml5">&#8595;</span>
                          </div>
                        )}
                        {isDropDownOpen && (
                          <div className={styles.dropdown}>
                            <ul>
                              <li
                                className={
                                  router.pathname == "/changepassword"
                                    ? `${styles.items__active} pointer mt10`
                                    : "pointer mt10"
                                }
                                onClick={() => onGoToChangePassword()}
                              >
                                Change Password
                              </li>
                              <li
                                className={
                                  router.pathname == "/signout"
                                    ? `${styles.items__active} pointer mt10`
                                    : "pointer mt10"
                                }
                                onClick={() => onSignOut()}
                              >
                                Sign Out
                              </li>
                            </ul>
                          </div>
                        )}
                      </div>
                    </li>
                  </ul>
                </li>
              )}
            </ul>
          </nav>
          <span className={styles.bottomline}>&nbsp;</span>
        </section>
      )}

      {props.children}
    </>
  );
};

NavBar.getInitialProps = async ({ req, res }) => {
  const data = parseCookies(req);

  if (res) {
    if (Object.keys(data).length === 0 && data.constructor === Object) {
      res.writeHead(301, { Location: "/" });
      res.end();
    }
  }

  return {
    data: data && data,
  };
};

export default NavBar;

import { useRouter } from "next/router";

import Logo from "./Logo";
import styles from "./NavBar.module.css";
import NavBarButtons from "./NavBarButtons";
import Router from "next/router";
import { NAVIGATION_ROUTES } from "./NavBarButtons";
import { ROUTES } from "../../constants/constants";
import MobileMenu from "../BurgerMenu/MobileMenu";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import IdentityStore from '../../store/identity-store';

import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";
Amplify.configure(awsconfig);

// import useWindowDimensions from '../../hooks/WindowDimension'

export type ROUTE__INFO = {
  url: string;
  name: string;
};

const NavBar = (props: any) => {
  const [width, setWidth] = useState<number>(1080);
  const { data: session, status } = useSession();

//   if (status === "loading") {
//     return null;
//   }

  const router = useRouter();

  function handleWindowSizeChange() {
    setWidth(window.innerWidth);
  }
  useEffect(() => {
    setWidth(window.innerWidth);

    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  const navigateToSignInPage = () =>{
    Router.push(ROUTES.SIGN_IN)
  }

  const onSignOut = () =>{
    signOut();
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
              {!IdentityStore.loggedUser && <div>
                <li onClick={()=> navigateToSignInPage()}>Sign In</li>
              </div>}

              
              {IdentityStore.loggedUser && <div>
                <pre>{JSON.stringify(IdentityStore.loggedUser, null, 2)}</pre>
                <li onClick={()=> onSignOut()}>Sign Out</li>
                </div>}
            </ul>
          </nav>
          <span>&nbsp;</span>
        </section>
      )}

      {props.children}
    </>
  );
};
export default NavBar;

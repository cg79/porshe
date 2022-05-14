import { useRouter } from "next/router";

import Logo from "./Logo";
import styles from "./NavBar.module.css";
import NavBarButtons from "./NavBarButtons";
import Router from "next/router";
import { NAVIGATION_ROUTES } from "./NavBarButtons";
import { ROUTES } from "../../constants/constants";
import MobileMenu from "../BurgerMenu/MobileMenu";
import { useState, useEffect } from "react";
// import { useSession, signOut,signIn } from "next-auth/react";
import IdentityStore from "../../store/identity-store";
import { parseCookies } from "../../helpers";

import Amplify from "aws-amplify";
import awsconfig from "../../aws-exports";
import { NextPage } from "next";
Amplify.configure(awsconfig);

// import useWindowDimensions from '../../hooks/WindowDimension'

export type ROUTE__INFO = {
  url: string;
  name: string;
};

const NavBar: NextPage = (props: any) => {
  const [width, setWidth] = useState<number>(1080);
  // const x= useSession();
  // debugger;
  // console.log(x);
  // const { data: session, status } = useSession();
  // const [cookie, setCookie] = useCookies(["user"])

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
      Router.push(ROUTES.OVERVIEW);
    });
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
                <div>
                  <li 
                  className={
                    router.pathname == '/signin' ? styles.items__active : ''
                  }
                  onClick={() => navigateToSignInPage()}>Sign In</li>
                </div>
              )}

              {IdentityStore.loggedUser && (
                <li 
                className={
                  router.pathname == '/signout' ? styles.items__active : ''
                }
                onClick={() => onSignOut()}>Sign Out</li>
              )}

              {IdentityStore.loggedUser && IdentityStore.loggedUser.info()}
              {/* <li onClick={() => navigateToSignInPage()}>Sign In</li> */}
              {/* <li onClick={() => onSignOut()}>Sign Out</li> */}
            </ul>
          </nav>
          <span>&nbsp;</span>
        </section>
      )}

      {props.children}
    </>
  );
};

export async function getServerSideProps() {
  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  return {
    props: { x: 1 }, // will be passed to the page component as props
  };
}

// NavBar.getServerSideProps=()=> {
//   console.log('DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD')
//   return {
//     props: {x:1}, // will be passed to the page component as props
//   }
// }

NavBar.getInitialProps = async ({ req, res }) => {
  debugger;
  console.log("DDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDDD");
  const data = parseCookies(req);

  console.log(data);

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

// export async function getStaticProps(context: any) {
//   console.log('cccccccccccccccccccccccccc');
//   return {
//     props: {
//      a:7
//     },
//   };
// }

export default NavBar;

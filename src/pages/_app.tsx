import "../../styles/globals.css";
import "../../styles/page.css";
import { NextPage } from "next";

// import { SessionProvider } from "next-auth/react";
import { CookiesProvider } from "react-cookie";

import { withIronSessionSsr } from "iron-session/next";

export const getServerSideProps = withIronSessionSsr(
  async function getServerSideProps({ req }) {
    console.log('AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA');
    const user = req.session.user;

    if (user.admin !== true) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        user: req.session.user,
      },
    };
  },
  {
    cookieName: "myapp_cookiename",
    password: "complex_password_at_least_32_characters_long",
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === "production",
    },
  },
);

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  // if(Component.getInitialProps){
  //   pageProps = await Component.getInitialProps(ctx)
  // }
  // debugger;
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

// MyApp.getInitialProps = async ({Component, ctx}) => {
//   let pageProps = {}
//   if(Component.getInitialProps){
//     pageProps = await Component.getInitialProps(ctx)
//   }
//   return { pageProps }
// }

export default MyApp;

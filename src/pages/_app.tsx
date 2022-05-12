import "../../styles/globals.css";
import "../../styles/page.css";
import { NextPage } from "next";

import { SessionProvider } from "next-auth/react"

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  return (
      <SessionProvider session={pageProps.session} refetchInterval={5 * 60} children={undefined}>  
        <Component {...pageProps} />
      </SessionProvider>
  );
}

export default MyApp;

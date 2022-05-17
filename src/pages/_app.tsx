import "../../styles/globals.css";
import "../../styles/page.css";
import { NextPage } from "next";

import { CookiesProvider } from "react-cookie";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  return (
    <CookiesProvider>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default MyApp;

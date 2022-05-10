import "../../styles/globals.css";
import "../../styles/page.css";
import { NextPage } from "next";

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  return (
      <Component {...pageProps} />
  );
}

export default MyApp;

import "../../styles/globals.css";
import "../../styles/page.css";
import { NextPage } from "next";
import React from "react";

import { CookiesProvider } from "react-cookie";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

function MyApp({
  Component,
  pageProps,
}: {
  Component: NextPage;
  pageProps: any;
}) {
  return (
    <CookiesProvider>
      {/* <div id="container1"></div>
        <div id="container2"></div> */}

      <div className="bg-element-1"></div>
      <div className="bg-element-2"></div>
      <div className="bg-element-3"></div>

      <div className="demo-container">
        <Component {...pageProps} />
      </div>
    </CookiesProvider>
  );
}

export default MyApp;

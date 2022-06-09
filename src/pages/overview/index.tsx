import React, { useEffect, useState } from "react";
// import { OverviewProps } from '../../components/data-types/data-types'
import Navbar from "../../components/Navbar";
import OverviewCard from "../../components/overview/overview-card";
import { ROUTES } from "../../constants/constants";
import IdentityStore from "../../store/identity-store";
let overview_list = require("../../data/overview.json");
import Router from "next/router";
import Layout from "../../components/layout/layout";

// import styles from "./style.module.css";

export default function Overview(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  const redirectToCompanies = () => {
    // const route = `${ROUTES.COMPANIES}?companyId=${companyId}`;
    debugger;
    Router.push(ROUTES.COMPANIES);
  };

  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    setMetrics(overview_list);
  }, []);

  return (
    <Layout>
      <Navbar>
        <div className="margins1">
          <div style={{ marginTop: "40px" }}>
            <div className="flex font-porsche">
              <div className="bold" style={{ fontSize: "2rem" }}>
                Welcome
              </div>
              <span
                style={{
                  marginLeft: "10px",
                  marginTop: "12px",
                  fontSize: "1.4rem",
                }}
              >
                {IdentityStore.loggedUser?.info()}
              </span>
            </div>
          </div>
          <div className="font-porsche white mt10" style={{ fontSize: "19px" }}>
            What forward31 is about, and some info on what the dashboard
            presents below. We address opportunities that are hidden in plain
            sight. We challenge the status-quo and dare to dream big. We don’t
            incubate or accelerate. Founders get majority stake. With our
            network and assets, they have the unfair advantage.{" "}
          </div>

          {/* <div className="gridcontainer">
            <div className="gridrow">
              <div className="gridcolumn">
                <div className="gridcard">
                  <h3>Card 1</h3>
                  <p>Some text</p>
                  <p>Some text</p>
                </div>
              </div>

              <div className="gridcolumn">
                <div className="gridcard">
                  <h3>Card 2</h3>
                  <p>Some text</p>
                  <p>Some text</p>
                </div>
              </div>

              <div className="gridcolumn">
                <div className="gridcard">
                  <h3>Card 3</h3>
                  <p>Some text</p>
                  <p>Some text</p>
                </div>
              </div>

              <div className="gridcolumn">
                <div className="gridcard">
                  <h3>Card 4</h3>
                  <p>Some text</p>
                  <p>Some text</p>
                </div>
              </div>
            </div>
          </div> */}

          <div className="mt10" style={{marginTop:"60px"}}>
            <div className="gridcontainer">
              <div className="gridrow">
                {/* <div className="gridcolumn">
                  <div className="gridcard">
                    <h3>Card 1</h3>
                    <p>Some text</p>
                    <p>Some text</p>
                  </div>
                </div>

                <div className="gridcolumn">
                  <div className="gridcard">
                    <h3>Card 1</h3>
                    <p>Some text</p>
                    <p>Some text</p>
                  </div>
                </div> */}

                {metrics.map((el: any) => {
                  el.onClick = redirectToCompanies;
                  return (
                    <div className="gridcolumn">
                      <div className="gridcard">
                        <OverviewCard props={el}></OverviewCard>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* <div className="mt10 company-container wrap flex-space-between">
              {metrics.map((el: any) => {
                el.onClick = redirectToCompanies;
                return <OverviewCard props={el}></OverviewCard>;
              })}
            </div> */}

            <div className="mt10">&nbsp;</div>
          </div>
        </div>
      </Navbar>
    </Layout>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

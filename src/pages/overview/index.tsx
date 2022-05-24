import React, { useEffect, useState } from "react";
import { OverviewProps } from "../../components/data-types/data-types";
import Navbar from "../../components/Navbar";
import OverviewCard from "../../components/overview/overview-card";
import { ROUTES } from "../../constants/constants";
import IdentityStore from "../../store/identity-store";
let overview_list = require("../../data/overview.json");
import Router from "next/router";

export default function Overview(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  const redirectToCompanies = () => {
    // const route = `${ROUTES.COMPANIES}?companId=${companyId}`;
    debugger;
    Router.push(ROUTES.COMPANIES);
  };

  const [metrics, setMetrics] = useState<any[]>([]);

  useEffect(() => {
    setMetrics(overview_list);
  }, []);

  return (
    <Navbar>
      <div className="presentation">
        <div className="porsche-font white">
          What forward31 is about, and some info on what the dashboard presents
          below. We address opportunities that are hidden in plain sight. We
          challenge the status-quo and dare to dream big. We don’t incubate or
          accelerate. Founders get majority stake. With our network and assets,
          they have the unfair advantage.{" "}
        </div>

        <div className="mt10">
          <div className="mt10 company-container wrap flex-space-between">
            {metrics.map((el: any) => {
              el.onClick = redirectToCompanies;
              return <OverviewCard props={el}></OverviewCard>;
            })}
          </div>
        </div>
      </div>
    </Navbar>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

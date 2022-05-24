import React from "react";
import Navbar from "../../components/Navbar";
import OverviewCard from "../../components/overview/overview-card";
import IdentityStore from "../../store/identity-store";
let company_list = require('../../data/companies.json');

export default function Overview(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

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

        {/* <div className="mt10">
          <OverviewCard></OverviewCard>
        </div> */}
      </div>
    </Navbar>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

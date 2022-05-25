import React from "react";
import Navbar from "../../components/Navbar";
import { SUPPORT_EMAIL } from "../../constants/constants";
import IdentityStore from "../../store/identity-store";

export default function Support(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  return (
    <Navbar>
      <div className="flex flex-column flex-center-y" style={{marginTop:"60px", fontSize:"40px"}}>
        <a href={`mailto:${SUPPORT_EMAIL}`}>Send feedback</a>
      </div>
    </Navbar>
  );
}
export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

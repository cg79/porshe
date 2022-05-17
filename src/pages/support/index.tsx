import React from "react";
import Navbar from "../../components/Navbar";
import IdentityStore from "../../store/identity-store";

export default function Support(props:any) {

  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  return (
    <Navbar>
      <div>support page</div>
    </Navbar>
  );
}
export async function getServerSideProps({ req }:{req:any}) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}
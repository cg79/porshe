// import Company from "../components/company/Company";

import Navbar from "../../components/Navbar";
import RootCompanies from "./root-companies";
import IdentityStore from "../../store/identity-store";

export default function Companies(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  return (
    <Navbar>
      <RootCompanies></RootCompanies>
    </Navbar>
  );
}

export async function getServerSideProps({ req }:{req:any}) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}


import Navbar from "../../components/Navbar";
import IdentityStore from "../../store/identity-store";
import RootKPI from "./root-kpi";

export default function kpi(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  return (
    <Navbar>
      <RootKPI></RootKPI>
    </Navbar>
  );
}

export async function getServerSideProps({ req }:{req:any}) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

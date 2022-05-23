import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import store from "../../store/company/CompaniesStore";
import Button from "../../components/button/button";

// import { CompaniesProps } from "./data-types/data-types";

const CompanyList = observer(() => {
  useEffect(() => {
    store.load();
  }, []);

  return (
    <div>
      HI from Companies
      {/* <Button
        text={"Create New Company"}
        onClick={() => {
          Router.push(ROUTES.COMPANY_CREATE);
        }}
      ></Button> */}
      {store.list.map((comp: any) => {
        return (
          <div className="company" key={comp["_id"]}>
            <img className="image" src={comp["img"]}></img>
            <div className="title">
              <div>{comp["name"]}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default CompanyList;

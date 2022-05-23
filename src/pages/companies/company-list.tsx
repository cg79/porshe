import { observer } from "mobx-react-lite";
import store from "../../store/company/CompaniesStore";
import { useEffect } from "react";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";


// import { CompaniesProps } from "./data-types/data-types";

const CompanyList = observer(() => {
  

  return (
    <div>
      HI from Companies list
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

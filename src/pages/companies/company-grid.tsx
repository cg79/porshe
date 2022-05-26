import store from "../../store/company/CompaniesStore";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";

const CompanyGrid = () => {
  const redirectToCompanyDetails = (companyId: number) => {
    const route = `${ROUTES.KPI}?companId=${companyId}`;
    Router.push(route);
  };

  return (
    <div className="company-container wrap">
      {store.list.map((comp: any) => {
        return (
          <div className="flex-item company" key={comp["id"]}>
            <img className="image" src={comp["img1"] || comp["img"]} style={{width:"350px"}}></img>

            <div
              className="title pointer"
              onClick={() => redirectToCompanyDetails(comp.id)}
            >
              <div className="flex">
                <img
                  className="logoImg"
                  style={{ maxWidth: "70px" }}
                  src={comp["logo"]}
                ></img>

                <div
                  className="flex flex-center-x porsche-font"
                  style={{ marginLeft: "15px", fontSize: "14px" }}
                >
                  {comp["name"]}
                </div>

                <div className="flex"
                  style={{ marginLeft: "15px", fontSize: "10px" }}
                >{comp["location"]}</div>
              </div>
            </div>
            
            <div className="revenue">
              <div className="static">
                <div className="flex flex-space-between">
                  <div className="">
                    <div className="kpi-title">Revenue</div>
                    <div className="flex flex-center-x">
                      {comp["revenue"]} &euro;
                    </div>
                  </div>
                  <div className="ml5">
                    <div className="kpi-title">Employee</div>
                    <div className="flex flex-center-x">{comp["employee"]}</div>
                  </div>
                  <div className="ml5">
                    <div className="kpi-title">Liquidity</div>
                    <div className="flex flex-center-x">
                      {comp["liquidity"]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CompanyGrid;

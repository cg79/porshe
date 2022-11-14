import store from "../../store/company/CompaniesStore";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import styles from "./company-grid.module.css";
import Link from "next/link";

const numberWithCommas = (number: number) => {
  if (number > 999) {
    let numberT = number / 1000;
    if (numberT > 999) {
      let numberM = Math.round(numberT / 100) / 10;
      return numberM + "m";
    }
    return Math.round(numberT * 10) / 10 + "k";
  }
  return number?.toString();
};

const CompanyGrid = () => {
  const redirectToCompanyDetails = (companyId: number) => {
    const route = `${ROUTES.KPI}?companyId=${companyId}`;
    Router.push(route);
  };

  return (
    <div className="company-container wrap" style={{ marginTop: "20px" }}>
      {store.list.map((comp: any) => {
        return (
          <Link key={comp.id} href={`${ROUTES.KPI}?companyId=${comp.id}`}>
            <div
              className="flex-item company"
              key={comp["id"]}
              style={{ cursor: "pointer" }}
            >
              <div className="portfolio-image-wrapper">
                <div className="portfolio-image-uphalfwrapper"></div>

                <img
                  className={styles.image}
                  src={comp["bgimg"] || comp["img"]}
                ></img>

                <div className="portfolio-image-bottomhalfwrapper"></div>
              </div>

              <div
                className="title pointer"
                onClick={() => redirectToCompanyDetails(comp.id)}
              >
                <div
                  className="flex"
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    className="logoImg"
                    style={{
                      display: "block",
                      maxWidth: "120px",
                      maxHeight: "100px",
                      width: "auto",
                      height: "auto",
                    }}
                    src={comp["logo"]}
                  ></img>

                  {/* <div
                                    className="flex flex-center-x bold uppercase"
                                    style={{
                                        alignItems: 'center',
                                        marginLeft: '15px',
                                        fontSize: '16px',
                                        maxWidth: '150px',
                                    }}
                                >
                                    {comp['name']}
                                </div> */}

                  <div
                    style={{
                      marginLeft: "15px",
                      fontSize: "13px",
                    }}
                  >
                    {comp["location"]}
                  </div>
                </div>
              </div>
              <div className="revenue">
                <div className="static">
                  <div className="flex flex-space-between">
                    <div className="">
                      <div className="kpi-title font-regular">Revenue</div>
                      <div className="flex flex-center-x metric">
                        {numberWithCommas(comp.kpis?.REV?.value) || "N/A"}{" "}
                        &euro;
                      </div>
                    </div>
                    <div className="ml5">
                      <div className="kpi-title font-regular">Employees</div>
                      <div className="flex flex-center-x metric">
                        {comp.employee || "N/A"}
                      </div>
                    </div>
                    <div className="ml5">
                      <div className="kpi-title font-regular">Liquidity</div>
                      <div className="flex flex-center-x metric">
                        {numberWithCommas(comp.kpis?.Liquidity?.value) || "N/A"}{" "}
                        &euro;
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default CompanyGrid;

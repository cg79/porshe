import { useEffect, useState } from "react";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import DataTable from "react-data-table-component";
import styles from "./style.module.css";
import { MobileCards } from "./company-card";
import companies from "../../data/companies.json";
import { FilterMobile } from "./filter-mobile";

const thousandsFormatWithCommas = (number: number) => {
  return number
    ? Math.round(number / 1000)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " k"
    : "";
};

const millionsFormatWithCommas = (number: number) => {
  return number
    ? (Math.round(number / 1000 / 10) / 100)
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " m"
    : "";
};

const dynamicFormatWithCommas = (number: number) => {
  if (number > 1000000) {
    return millionsFormatWithCommas(number);
  } else if (number > 1000) {
    return thousandsFormatWithCommas(number);
  } else if (number > 0) {
    return number + " ";
  }
  return "";
};

const CompanyList: any = ({ rows }: {rows:any}) => {
  const columns = [
    {
      name: "Company",
      selector: (row: any) => row.name?.toLowerCase(),
      sortable: true,
      cell: (row: any) => {
        const clasValue = "flex pointer";
        return (
          <div
            className={clasValue}
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => onRowClicked(row)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "5x 0",
              }}
              className="company-info"
            >
              <img
                style={{ maxWidth: "120px", maxHeight: "40px" }}
                src={
                  row.logo ||
                  "https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png"
                }
              />
            </div>
          </div>
        );
      },
    },
    {
      name: "Headquarters",
      selector: (row: any) => row.location,
      sortable: true,
      cell: (row: any) => {
        if (row.exited) {
          return <div className="exited-text">EXITED</div>;
        }
        if (row.location) {
          return (
            <div
              className={styles.table__cell}
              style={{
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              {row.location}
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "FTE",
      selector: (row: any) => row.kpis?.FTE?.value,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }

        if (row.kpis?.FTE?.value) {
          return (
            <div className={styles.table__cell}>
              <span>{row.kpis?.FTE?.value}</span>
              <span>{row.kpis?.FTE?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Revenue",
      selector: (row: any) => row.kpis?.REV?.value,
      sortable: true,
      cell: (row: any) => {
        if (row.exited) {
          return (
            <div className="exited-reason">Reason for exit, {row.reason}</div>
          );
        }
        if (row.kpis?.REV?.value) {
          return (
            <div className={styles.table__cell}>
              <span>
                {dynamicFormatWithCommas(row.kpis?.REV?.value)}
                {row.kpis?.REV?.currency}
              </span>
              <span>{row.kpis?.REV?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Liquidity",
      selector: (row: any) => row.kpis?.Liquidity?.value,
      sortable: true,
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.kpis?.Liquidity?.value) {
          return (
            <div className={styles.table__cell}>
              <span>
                {dynamicFormatWithCommas(row.kpis?.Liquidity?.value)}
                {row.kpis?.Liquidity?.currency}
              </span>
              <span>{row.kpis?.Liquidity?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Profit/Loss",
      selector: (row: any) => row.kpis?.profitloss?.value,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.kpis?.profitloss?.value) {
          return (
            <div className={styles.table__cell}>
              <span>
                {thousandsFormatWithCommas(row.kpis?.profitloss?.value)}{" "}
                {row.kpis?.profitloss?.currency}
              </span>
              <span>{row.kpis?.profitloss?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Gross Cash Burn",
      selector: (row: any) => row.kpis?.grosscash?.value,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.kpis?.grosscash?.value) {
          return (
            <div className={styles.table__cell}>
              <span>
                {thousandsFormatWithCommas(row.kpis?.grosscash?.value)}{" "}
                {row.kpis?.grosscash?.currency}
              </span>
              <span>{row.kpis?.grosscash?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Runway",
      selector: (row: any) => row.Runway,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.Runway) {
          return (
            <div className={styles.table__cell}>
              <span>{row.Runway} </span>
              <span>months</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Convertible Loan",
      selector: (row: any) => row.Loan,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.Loan) {
          return (
            <div className={styles.table__cell}>
              <span>{millionsFormatWithCommas(row.Loan)}EUR</span>
              <span></span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Ownership",
      selector: (row: any) => row.Ownership,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.Ownership) {
          return (
            <div className={styles.table__cell}>
              <span>{row.Ownership}</span>
              <span></span>
            </div>
          );
        }

        return null;
      },
    },
  ];

  const redirectToCompanyDetails = (companyId: number) => {
    debugger;
    const route = `${ROUTES.KPI}?companyId=${companyId}`;
    Router.push(route);
  };

  const onRowClicked = (row: any) => {
    debugger;
    redirectToCompanyDetails(row.id);
  };

  const tabletColumns = [
    {
      name: "Company",
      selector: (row: any) => row.name?.toLowerCase(),
      sortable: true,
      cell: (row: any) => {
        return (
          <div
            className="flex pointer"
            style={{
              alignItems: "center",
              justifyContent: "center",
            }}
            onClick={() => onRowClicked(row)}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                // justifyContent: "center",
                padding: "5x 0",
              }}
            >
              <div className="company-info company-info-w">
                <h3>{row.name.toUpperCase()}</h3>
                <p>{row.description}</p>
              </div>
            </div>
          </div>
        );
      },
      width: "40%",
    },
    {
      name: "Headquarters",
      selector: (row: any) => row.location,
      sortable: true,
      cell: (row: any) => {
        if (row.exited) {
          return <div className="exited-text">EXITED</div>;
        }
        if (row.location) {
          return (
            <div
              className={styles.table__cell}
              style={{
                fontWeight: "700",
                fontSize: "16px",
              }}
            >
              {row.location}
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "FTE",
      selector: (row: any) => row.kpis?.FTE?.value,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.kpis?.FTE?.value) {
          return (
            <div className={styles.table__cell}>
              <span>{row.kpis?.FTE?.value}</span>
              <span>{row.kpis?.FTE?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Revenue",
      selector: (row: any) => row.kpis?.REV?.value,
      sortable: true,
      cell: (row: any) => {
        if (row.exited) {
          return (
            <div className="exited-reason">
              Reason for exit, acquired by another company
            </div>
          );
        }
        if (row.kpis?.REV?.value) {
          return (
            <div className={styles.table__cell}>
              <span>
                {dynamicFormatWithCommas(row.kpis?.REV?.value)}
                {row.kpis?.REV?.currency}
              </span>
              <span>{row.kpis?.REV?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Liquidity",
      selector: (row: any) => row.kpis?.Liquidity?.value,
      sortable: true,
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.kpis?.Liquidity?.value) {
          return (
            <div className={styles.table__cell}>
              <span>
                {dynamicFormatWithCommas(row.kpis?.Liquidity?.value)}
                {row.kpis?.Liquidity?.currency}
              </span>
              <span>{row.kpis?.Liquidity?.growth}</span>
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Runway",
      selector: (row: any) => row.Runway,
      sortable: true,
      width: "auto",
      cell: (row: any) => {
        if (row.exited) {
          return <div></div>;
        }
        if (row.Runway) {
          return (
            <div className={styles.table__cell}>
              <span>{row.Runway} </span>
              <span>months</span>
            </div>
          );
        }

        return null;
      },
    },
  ];

  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  });

  const conditionalRowStyles = [
    {
      when: (row: any) => {
        return row.exited;
      },
      classNames: ["exited"],
    },
  ];

  const updateWidth = () => {
    setWidth(window.innerWidth);
  };

  if (width <= 600) {
    // for (const el of companies) {
      return (
        <div>
          <div style={{ marginTop: "20px" }}>
            {/* <FilterMobile companyList={rows}/> */}
            <MobileCards companyList={rows}/>
          </div>
        </div>
      );
    // }
  }

  if (width <= 1024) {
    return (
      <div style={{ marginTop: "20px" }}>
        <DataTable
          columns={tabletColumns}
          data={rows}
          fixedHeader
          conditionalRowStyles={conditionalRowStyles}
        />
      </div>
    );
  }

  return (
    <div style={{ marginTop: "20px" }}>
      <DataTable
        columns={columns}
        data={rows}
        fixedHeader
        conditionalRowStyles={conditionalRowStyles}
      />
    </div>
  );
};

export default CompanyList;

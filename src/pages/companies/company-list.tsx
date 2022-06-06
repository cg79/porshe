import { observer } from "mobx-react-lite";
import store from "../../store/company/CompaniesStore";
import { useEffect, useState } from "react";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import DataTable from "react-data-table-component";

const CompanyList = observer(() => {
  const [rows, setRows] = useState([]);
  // let rows: GridRowsProp = [];

  useEffect(() => {
    setRows([...store.list]);
  }, []);


  const columns = [
    // {
    //   name: "Logo",
    //   // selector: (row: any) => row.name,
    //   // sortable: true,
    //   cell: (row: any) => {
    //     return (
    //       <div>
    //         <img
    //           style={{ maxWidth: "50px" }}
    //           src={
    //             row.logo ||
    //             "https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png"
    //           }
    //         />
    //       </div>
    //     );
    //   },
    // },
    {
      name: "Company",
      selector: (row: any) => row.name,
      sortable: true,
      cell: (row: any) => {
        return (
          <div className="flex pointer" onClick={()=>onRowClicked(row)}>
            <div>
              <img
                style={{ maxWidth: "50px" }}
                src={
                  row.logo ||
                  "https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png"
                }
              />
            </div>
            <div className="ml5">{row.name}</div>
            <div className="ml5">{row.introduction || ""}</div>
          </div>
        );
      },
    },
    // {
    //   name: "Entrepreneurs",
    //   selector: (row: any) => row.entrepreneurs,
    //   sortable: true,
    // },
    {
      name: "Headquarters",
      selector: (row: any) => row.location,
      sortable: true,
    },

    {
      name: "FTE",
      selector: (row: any) => row.kpis?.fte?.value,
      sortable: true,
      cell: (row: any) => {
        if (row.kpis?.fte?.value) {
          return <div>{row.kpis?.fte?.value || "N/A"} &euro;</div>;
        }

        return null;
      },
    },
    {
      name: "Revenue",
      selector: (row: any) => row.revenue,
      sortable: true,
      cell: (row: any) => {
        if (row.kpis?.revenue?.value) {
          return (
            <div>
              <div style={{ fontWeight: "bold" }}>
                {row.kpis?.revenue?.value} &euro;
              </div>

              {row.revenue_1 && (
                <div style={{ fontSize: "8px" }}>
                  {row.revenue_1 || "no data"}
                </div>
              )}
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Liquidity",
      selector: (row: any) => row.kpis?.liquidity?.value,
      sortable: true,
      cell: (row: any) => {
        if (row.kpis?.liquidity?.value) {
          return (
            <div>
              <div style={{ fontWeight: "bold" }}>
                {row.kpis?.liquidity?.value} &euro;
              </div>

              {row.liquidity_1 && (
                <div style={{ fontSize: "8px" }}>
                  {row.liquidity_1 || "no data"}
                </div>
              )}
            </div>
          );
        }

        return null;
      },
    },
    {
      name: "Employee",
      selector: (row: any) => row.employee,
      sortable: true,
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

  return (
    <div style={{marginTop:"20px"}}>
      <DataTable
        columns={columns}
        data={rows}
        fixedHeader
        
      />
      {/* {store.list.map((comp: any) => {
        return (
          <div className="company" key={comp["_id"]}>
            <img className="image" src={comp["img"]}></img>
            <div className="title">
              <div>{comp["name"]}</div>
            </div>
          </div>
        );
      })} */}
    </div>
  );
});

export default CompanyList;

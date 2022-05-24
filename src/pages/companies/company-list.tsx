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
    {
      name: "Logo",
      // selector: (row: any) => row.name,
      // sortable: true,
      cell:(row:any)=>{
        return (
          <div>
            <img 
            style={{ maxWidth: "150px" }}
            src={row.logo || 'https://img.cppng.com/download/2020-06/32193-8-pepsi-logo-transparent-background.png'} />
          </div>
        )
      }
    },
    {
      name: "Name",
      selector: (row: any) => row.name,
      sortable: true,
    },
    {
      name: "Entrepreneurs",
      selector: (row: any) => row.entrepreneurs,
      sortable: true,
    },
    {
      name: "Headquarters",
      selector: (row: any) => row.location,
      sortable: true,
    },

    {
      name: "Revenue",
      selector: (row: any) => row.revenue,
      sortable: true,
      cell:(row:any)=>{
        return (
          <div>
           <div style={{fontWeight: "bold"}}
        >{row.revenue}</div>

           <div style={{fontSize: "8px"}}>{row.revenue_1 || 'no data'}</div>
          </div>
        )
      }
    },
    {
      name: "Liquidity",
      selector: (row: any) => row.liquidity,
      sortable: true,
    },
    {
      name: "Employee",
      selector: (row: any) => row.employee,
      sortable: true,
    },
  ];

  const redirectToCompanyDetails = (companyId: number) => {
    const route = `${ROUTES.KPI}?companId=${companyId}`;
    Router.push(route);
  };

  const onRowClicked = (row:any)=>{
    debugger;
    redirectToCompanyDetails(row.id);
  }

  return (
    <div>
      <DataTable columns={columns} data={rows} 
        fixedHeader 
        onRowClicked={onRowClicked}
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

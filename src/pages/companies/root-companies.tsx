import { useEffect, useState } from "react";
import CompanyList from "./company-list";
import store from "../../store/company/CompaniesStore";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";
import styles from "./style.module.css";
import Layout from "../../components/layout";

export default function Companies() {
  useEffect(() => {
    store.load();
  }, []);

    const [rows, setRows] = useState([]);

    useEffect(() => {
      setRows([...store.list]);
    }, []);

  return (
    <>
      <Layout type={2} variant={1}>
        <div className="margins">
          <div className="flex">
            <div className="companies-page-description">
              <b className="page-description">Overview portfolio,</b>
              <p>Live companies ({rows.length})</p>
            </div>
            <div className={["flex flex-end", styles.hideonphone].join(" ")}>
              <div className={styles.icon} style={{ marginTop: "15px" }}></div>
            </div>
          </div>

          <div className="mt10">
            <CompanyList rows={rows}></CompanyList>
          </div>
        </div>
      </Layout>
    </>
  );
}

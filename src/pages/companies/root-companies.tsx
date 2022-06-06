import { useEffect, useState } from "react";
import CompanyGrid from "./company-grid";
import CompanyList from "./company-list";
import store from "../../store/company/CompaniesStore";
import GridViewSharpIcon from "@mui/icons-material/GridViewSharp";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";
import styles from "./style.module.css";

export default function RootCompanies() {
  const [showGrid, setShowGrid] = useState(store.showAsGrid);
  const viewAsGrid = () => {
    store.showAsGrid = true;
    setShowGrid(true);
  };

  const viewAsList = () => {
    store.showAsGrid = false;
    setShowGrid(false);
  };

  useEffect(() => {
    store.load();
  }, []);

  const css1 = showGrid ? { color: "gray" } : {};
  const css2 = showGrid ? {}:{color:'gray'};

  return (
    <>
      <div className="margins">
        <div className="flex">
          <div style={{marginTop:"20px"}}>
            <b className="page-description">Overview portofolio,</b>
            <span className="font-regular" style={{fontSize:'1.3rem', marginLeft:'10px'}}>Live companies ({store.list.length})</span>
          </div>
          <div className="flex flex-end">
            <div className={styles.icon} style={{ marginTop: "15px" }}>
              <GridViewSharpIcon style={css1} onClick={viewAsGrid} />
              <TableRowsSharpIcon style={css2} onClick={viewAsList} />
            </div>
          </div>
        </div>

        <div className="mt10">
          {showGrid && <CompanyGrid></CompanyGrid>}
          {!showGrid && <CompanyList></CompanyList>}
        </div>
      </div>
    </>
  );
}

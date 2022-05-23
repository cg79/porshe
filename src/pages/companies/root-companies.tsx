import { useEffect, useState } from "react";
import CompanyGrid from "./company-grid";
import CompanyList from "./company-list";
import store from "../../store/company/CompaniesStore";

export default function RootCompanies() {
  const [showGrid, setShowGrid] = useState(store.showAsGrid);
  const viewAsGrid = () => {
    store.showAsGrid=true;
    setShowGrid(true);
  };

  const viewAsList = () => {
    store.showAsGrid=false;
    setShowGrid(false);
  };

  useEffect(() => {
    store.load();
  }, []);

  const css1 = showGrid ? "pointer bold" : "pointer";
  const css2 = showGrid ? "pointer ml10" : "pointer ml10 bold";

  return (
    <>
      <div className="presentation">
        <div className="flex">
          <div>
            <b>Overview portofolio</b>{" "}
          </div>
          <div className="flex flex-end">
            <div className={css1} onClick={viewAsGrid}>
              &#9783;
            </div>
            <div className={css2} onClick={viewAsList}>
              &#9776;
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

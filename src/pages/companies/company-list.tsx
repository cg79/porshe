import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { CompaniesProps } from "./data-types/data-types";

const CompanyList: React.FC<CompaniesProps> = observer(({ store }) => {

  useEffect(() => {
    store.load();
  }, []);

  return (
    <div>
      HI from Companies
      {store.list.map((comp:any) => {
        return <div key={comp["id"]}>{comp["name"]}</div>;
      })}
    </div>
  );
});

export default CompanyList;
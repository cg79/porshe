
import CompanyList from "./company-list";

export default function RootCompanies() {

  // const store: CompaniesStore = new CompaniesStore();

  return (
    <div className="flex">
       <div className="pointer">&#9783;</div>
       <div className="pointer">&#9776;</div>
      <CompanyList></CompanyList>
    </div>
  );
}

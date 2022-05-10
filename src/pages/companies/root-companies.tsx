
import CompanyList from "./company-list";
import { CompaniesStore } from "./store/CompaniesStore";

export default function RootCompanies() {

  const store: CompaniesStore = new CompaniesStore();

  return (
    <div>
      <CompanyList store={store}></CompanyList>
    </div>
  );
}

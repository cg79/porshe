import CompanyList from './company-list'
// import { CompaniesStore } from "./store/CompaniesStore";
import CompanyGrid from './company-grid'
export default function RootCompanies() {
    // const store: CompaniesStore = new CompaniesStore();

    return (
        <div>
            {/* <CompanyList store={store}></CompanyList> */}
            {/* <CompanyList></CompanyList> */}
            <CompanyGrid></CompanyGrid>
        </div>
    )
}

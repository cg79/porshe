import CompanyList from './company-list'
// import { CompaniesStore } from "./store/CompaniesStore";
import CompanyGrid from './company-grid'
import NavBar from '../../components/Navbar/NavBar'
export default function RootCompanies() {
    // const store: CompaniesStore = new CompaniesStore();

    return (
        <div>
            <CompanyGrid></CompanyGrid>
        </div>
    )
}

// import Company from "../components/company/Company";

import { useRouter } from "next/router"
export default function Companies(){
    const router =useRouter();
    console.log(router.query)
    // return <Company></Company>
    return <div>hi from Companies</div>
}
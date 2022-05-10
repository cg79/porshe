// import Company from "../components/company/Company";

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import httpService from "../../actions/http-service";
// import useSWR from 'swr';

export default function Companies() {
  const router = useRouter();
  console.log(router.query);

  const [companies, setCompanies] = useState([])

  const fetchCompanies = async () => {
    const response = await httpService.get('');
    setCompanies(response)
  }

//   const address = `https://randomuser.me/api/?results=6`;
//   const fetcher = async (url: string) => await axios.get(url).then((res) => res.data);
//   const { data, error } = useSWR(address, fetcher);

  useEffect(()=>{
    fetchCompanies();
  },[])


  // return <Company></Company>
  return <div>
      hi from Companies

      <button onClick={fetchCompanies}>Load companies</button>

      {companies.map(comp => {
        return (
          <div key={comp['id']}>
            {comp['name']}
          </div>
        )
      })}

      </div>
}



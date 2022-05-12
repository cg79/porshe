// import { GetServerSideProps } from "next";
import React from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Card from '../components/Card'
// export default function Index() {
//   return (
//     <>
//       <Page title="Server render" />
//     </>
//   );
// }

export default function Index() {
    //return <div>hi</div>

    console.log(process.env.REACT_APP_API_URL)
    return (
        <Navbar>
            <Link href="/companies" prefetch={false}>
                Companies
            </Link>
            {/* <Card title="da" description="nu" headline="headline" /> */}
        </Navbar>
    )
}

// export default function Index(){
//     return <Link href='/companies' prefetch={false}>Companies</Link>
// }

// export const getServerSideProps: GetServerSideProps = async function getServerSideProps(
//   ctx
// ) {
//   let start = 0;

//   if (ctx.query.start && typeof ctx.query.start === "string") {
//     start = Number(ctx.query.start);
//   }

//   return {
//     props: {
//       hydrationData: {
//         stopwatchStore: {
//           start,
//         },
//       },
//     },
//   };
// };

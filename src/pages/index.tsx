// import { GetServerSideProps } from "next";
import React from "react";
import Link from "next/link"


export default function Index(){
    return <Link href='/companies' prefetch={false}>Companies</Link>
}

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

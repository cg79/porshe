// import { GetServerSideProps } from "next";
import React from "react";
import Link from "next/link"
import { useSession, signIn, signOut } from 'next-auth/react';


export default function Index(){
    const {data, status}= useSession(); 

    debugger;
    if(status==='loading'){
        return null;
    }

   

    if(data){
        return (
            <>
              signed in as {JSON.stringify(data)}
              <button onClick={()=>signIn()}>Sign Out</button>

              <Link href='/companies' prefetch={false}>Companies</Link>
            </>
        )
    }
    return (
        <>
          signed in as {JSON.stringify(data)}
          <button onClick={()=>signOut()}>Sign In</button>

          <Link href='/companies' prefetch={false}>Companies</Link>
        </>
    )
    
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

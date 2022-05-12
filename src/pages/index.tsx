// import { GetServerSideProps } from "next";
import React from "react";
import Link from "next/link"
import { useSession, signIn, signOut } from 'next-auth/react';


export default function Index(){
    const { data: session, status } = useSession()

    if(status==='loading'){
        return null;
    }

    if(session){
        return (
            <>
              signed in as {JSON.stringify(session)}
              <button onClick={()=>signOut()}>Sign Out</button>

              <Link href='/companies' prefetch={false}>Companies</Link>
            </>
        )
    }

    return (
        <>
        <button onClick={() => signIn()}>Sign In</button>
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

// import { GetServerSideProps } from "next";
import React from "react";
import Link from "next/link"
import { useSession, signIn, signOut } from 'next-auth/react';
import Amplify from 'aws-amplify';
import awsconfig from '../aws-exports';
Amplify.configure(awsconfig)



export default function Index(){
    const { data: session, status } = useSession()

    if(status==='loading'){
        
        return null;
    }

    const signIn1=()=>{
        Amplify.Auth.signUp({
            username: 'claudiu',
            password: 'Bufallo1234!'
          })
            .then((val: any) => {
              console.log(val);
              debugger;
            })
            .catch((err:any) => {
              console.log(err);
              debugger;
            });
    //     Amplify.Auth.signIn("asdad", "asdasdasd")
    //   .then((val:any) => {
    //     console.log(val);
    //     debugger;
    //   })
    //   .catch((err:any) => {
    //     console.log(err);
    //     debugger;
    //   });
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
        <button onClick={() => signIn1()}>Sign In</button>
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

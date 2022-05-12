// import { GetServerSideProps } from "next";
import React from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import Amplify from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);

export default function Index() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  const createUser = () => {
    Amplify.Auth.signUp({
      username: "claudiu.gombos@thinslices.com",
      password: "Bufallo1234!",
    })
      .then((val: any) => {
        console.log(val);
        debugger;
      })
      .catch((err: any) => {
        console.log(err);
        debugger;
      });
  };

  const signIn1 = () => {
    Amplify.Auth.signIn({
      username: "claudiu.gombos@thinslices.com",
      password: "Bufallo1234!",
    })
      .then((val: any) => {
        console.log(val);
        debugger;
      })
      .catch((err: any) => {
        console.log(err);
        debugger;
      });
  };

  if (session) {
    return (
      <>
        signed in as {JSON.stringify(session)}
        <button onClick={() => signOut()}>Sign Out</button>
        <Link href="/companies" prefetch={false}>
          Companies
        </Link>
      </>
    );
  }

  return (
    <>
      <button onClick={() => createUser()}>Create User</button>

      <button onClick={() => signIn1()}>Sign In</button>
      <Link href="/companies" prefetch={false}>
        Companies
      </Link>
    </>
  );
}



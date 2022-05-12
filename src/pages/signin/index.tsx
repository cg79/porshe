import React from "react";
import { signIn, getSession } from "next-auth/react";
import { Auth } from "aws-amplify";

export default function SignIn() {
  const triggerSignIn = () => {
    Auth.signUp({
      username: 'claudiu',
      password: 'Bufallo1234!'
    })
      .then((val) => {
        console.log(val);
        debugger;
      })
      .catch((err) => {
        console.log(err);
        debugger;
      });

    // Auth.signIn("asdad", "asdasdasd")
    //   .then((val) => {
    //     console.log(val);
    //     debugger;
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     debugger;
    //   });
  };
  return (
    <button onClick={() => triggerSignIn()}>
      Sign in route page;here we canadd username and passworf
    </button>
  );
}

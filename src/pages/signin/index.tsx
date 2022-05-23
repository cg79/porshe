import React, { useState } from "react";
import { LOADING_SVG, ROUTES } from "../../constants/constants";
import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField, Box } from "@mui/material";
import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
import Router from "next/router";

import styles from "./signin.module.css";
import Logo from "../../components/Navbar/Logo";
import { style } from "@mui/system";

export default function SignIn(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  // const [cookie, setCookie] = useCookies(["user"])

  const [email, setEmail] = useState("");
  const [properEmail, setProperEmail] = useState(false);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEmailChange = (event: any) => {
    const newValue = event.target.value;
    setEmail(newValue);
    setSubmitted(false);
    setErrorMessage("");
    const isProper = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(newValue);
    console.log(newValue.length, "debug");
    setProperEmail(isProper);
  };

  let onPasswordChange = (event: any) => {
    const newValue = event.target.value;
    setPassword(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  const userHasBeenLogged = (jsonAttributes: any) => {
    IdentityStore.setLoggedUser(jsonAttributes);

    const reqBody = {
      porsche_user: JSON.stringify(jsonAttributes),
    };

    fetch("/api/login", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(reqBody),
    }).finally(() => {
      // IdentityStore.setLoggedUser(awsJsonUserAttributes);

      Router.push(ROUTES.OVERVIEW);
    });
  };

  const triggerSignIn = async (event: any) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    Auth.signIn(email, password)
      .then((data) => {
        debugger;
        console.log("date", data);

        // userHasBeenLogged({
        //   name:'Remove_this_code',
        //   email: 'claudiu9379@yahoo.com'
        // });
        // return;

        if (
          data.challengeName === "CUSTOM_CHALLENGE" ||
          data.challengeName === "SMS_MFA" ||
          data.challengeName === "SOFTWARE_TOKEN_MFA"
        ) {
          IdentityStore.tempUser = data;
          Router.push(ROUTES.LOGIN_VERIFICATION);

          // const code = getCodeFromUserInput();
          // const loggedUser = await Auth.confirmSignIn(
          //   data, // Return object from Auth.signIn()
          //   code, // Confirmation code
          //   mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
          // );

          return;
        }

        const awsJsonUserAttributes = data.attributes;
        userHasBeenLogged(awsJsonUserAttributes);

        // getRefreshToken();
      })
      .catch((err) => {
        debugger;
        console.log(err.message);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setLoading(false);
        setSubmitted(true);
      });
  };

  return (
    <div className="page-content">
      <Navbar>
        <div className={styles.da}>
          <Logo />
          <Box
            sx={{
              height: 50,
            }}
          />
          {/* <Label htmlFor="login" text="Login" /> */}

          <TextField
            error={false}
            helperText={
              properEmail === false && email.length > 10
                ? "enter a valid email adress"
                : ""
            }
            label="Email"
            variant="standard"
            name="username"
            value={email}
            disabled={loading}
            onChange={onEmailChange}
            size={"small"}
            sx={{
              width: "16rem",
              minWidth: "200px",
            }}
          />
          <Box
            sx={{
              height: 50,
            }}
          />
          <TextField
            error={false}
            helperText={""}
            label="Password"
            variant="standard"
            name="password"
            type={"password"}
            value={password}
            disabled={loading}
            onChange={onPasswordChange}
            sx={{
              width: "16rem",
              minWidth: "200px",
            }}
          />
          <Box
            sx={{
              height: 50,
            }}
          />
          <Button
            variant="contained"
            onClick={triggerSignIn}
            disabled={!(email && password)}
          >
            Login
          </Button>
        </div>
      </Navbar>
    </div>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

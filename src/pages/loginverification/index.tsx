import React, { useState } from "react";
import {
  BUTTON_STYLE,
  LOADING_SVG,
  ROUTES,
  VERTICAL_DISTANCE,
} from "../../constants/constants";
// import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
// import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
import Router from "next/router";
import Logo from "../../components/Navbar/Logo";
import BackButton from "../../components/back/back-button";

export default function ChangePassword(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  const [code, setCode] = useState("");
  const onCodeChange = (event: any) => {
    const newValue = event.target.value;
    setCode(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // const resendVerificationCode = ()=>{

  //   setLoading(true);
  //   // const code = getCodeFromUserInput();
  //   // const loggedUser = await Auth.confirmSignIn(
  //   //   data, // Return object from Auth.signIn()
  //   //   code, // Confirmation code
  //   //   mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
  //   // );

  //   const userFromSignIn = IdentityStore.tempUser;
  //   Auth.resendConfirmationCode('claudiu9379@yahoo.com')
  //     .then((user) => {
  //       console.log(user);
  //       debugger;
  //     })
  //     .then((data) => {
  //       debugger;
  //       console.log(data);
  //       setErrorMessage("resend sign up");
  //     })
  //     .catch((err) => setErrorMessage(err.message))
  //     .finally(() => {
  //       setLoading(false);
  //       setSubmitted(true);
  //     });
  // }

  const completeLoginWithCodeFlow = async (event: any) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    // const code = getCodeFromUserInput();
    // const loggedUser = await Auth.confirmSignIn(
    //   data, // Return object from Auth.signIn()
    //   code, // Confirmation code
    //   mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    // );

    IdentityStore.initAmplify();

    const userFromSignIn = IdentityStore.tempUser;
    Auth.confirmSignIn(userFromSignIn, code, "SMS_MFA")
      // Auth.confirmSignIn(userFromSignIn, code, 'CUSTOM_CHALLENGE')
      .then((user) => {
        console.log(user);
        debugger;
      })
      .then((data) => {
        console.log(data);
        setErrorMessage("user logged in");

        Auth.currentUserInfo().then((userInfo) => {
          debugger;
          const awsJsonUserAttributes = userInfo.attributes;
          IdentityStore.setLoggedUser(awsJsonUserAttributes);

          const reqBody = {
            porsche_user: JSON.stringify(awsJsonUserAttributes),
          };

          fetch("/api/login", {
            method: "post",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(reqBody),
          }).finally(() => {
            Router.push(ROUTES.OVERVIEW);
          });
        });
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => {
        setLoading(false);
        setSubmitted(true);
      });
  };

  return (
    <div className="page-content">
      <div
        className="flex flex-column flex-center-y"
        style={{ marginTop: "17vh" }}
      >
        <div>
          <Logo />
        </div>

        <div className="bold" style={{ marginTop: "30px" }}>
          Enter the code received on your mobile
        </div>
      </div>

      <div className="flex flex-column flex-center-y">
        {/* <form name="form" onSubmit={triggerSignIn}> */}

        <div className="flex">
          {/* <Label htmlFor="username" text="Code" /> */}
          <TextField
            style={VERTICAL_DISTANCE}
            id="standard-basic"
            label="Code"
            variant="standard"
            name="username"
            value={code}
            disabled={loading}
            onChange={onCodeChange}
          />

          {submitted && !code && (
            <div className="warning">Code is required</div>
          )}
        </div>

        <div className="mt10">
          {/* <label className="lbl">&nbsp;</label> */}

          <div className="flex flex-center mt10">
            <ErrorMessage message={errorMessage}></ErrorMessage>
          </div>

          <Button
            style={VERTICAL_DISTANCE}
            variant="contained"
            onClick={completeLoginWithCodeFlow}
            sx={BUTTON_STYLE}
          >
            NEXT
          </Button>

          {loading && <img src={LOADING_SVG} />}
        </div>

        {/* <Button variant="contained" onClick={resendVerificationCode}>
              Resend Verification code
            </Button> */}

        {/* </form> */}
      </div>

      <div className=" flex flex-center-x" style={{ marginTop: "50px" }}>
        <BackButton></BackButton>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

import React, { useState } from "react";
import {
  LOADING_SVG,
  TEXT_STYLE,
  BUTTON_STYLE,
  VERTICAL_DISTANCE,
} from "../../constants/constants";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
// import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import Logo from "../../components/Navbar/Logo";
import BackButton from "../../components/back/back-button";

export default function ForgotPassword(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  const [email, setEmail] = useState("");
  const onEmailChange = (event: any) => {
    const newValue = event.target.value;
    setEmail(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const triggerForgotPassword = async (event: any) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    IdentityStore.initAmplify();

    Auth.forgotPassword(email)
      .then((data) => {
        IdentityStore.tempUser = {
          usename: email,
        };
        console.log(data);
        debugger;
        setErrorMessage("confirmation code sent");
        Router.push(`${ROUTES.RESET_PASSWORD}?username=${email}`);
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
      </div>
      <div
        className="flex flex-column flex-center-y"
        style={{ marginTop: "5vh" }}
      >
        <div>
          {/* <form name="form" onSubmit={triggerSignIn}> */}

          <div
            className="porsche-font flex bold mt10"
            style={{ fontSize: "22px" }}
          >
            Forgot your password?
          </div>
          <div className="porsche-font flex" style={{ fontSize: "16px" }}>
            We'll send you a recovery code
          </div>
          <div className="flex mt10">
            {/* <Label htmlFor="username" text="Email" /> */}
            {/* <TextField
            id="standard-basic"
            label="Email"
            variant="standard"
            name="username"
            value={email}
            disabled={loading}
            onChange={onEmailChange}
          /> */}

            <TextField
              style={VERTICAL_DISTANCE}
              error={false}
              label="Email"
              variant="standard"
              name="username"
              value={email}
              disabled={loading}
              onChange={onEmailChange}
              size={"small"}
              sx={TEXT_STYLE}
            />

            {submitted && !email && (
              <div className="warning">Email is required</div>
            )}
          </div>

          <div className="mt10">
            {/* <label className="lbl">&nbsp;</label> */}
            {/* <Button variant="contained" onClick={triggerForgotPassword}>
              Forgot Password
            </Button> */}

            <div className="flex flex-center mt10">
              <ErrorMessage message={errorMessage}></ErrorMessage>
            </div>

            <Button
              style={VERTICAL_DISTANCE}
              variant="contained"
              onClick={triggerForgotPassword}
              disabled={!(email.length > 3)}
              sx={BUTTON_STYLE}
            >
              Forgot Password
            </Button>

            {loading && <img src={LOADING_SVG} />}
          </div>

          <div className=" flex flex-center-x" style={{marginTop:"50px"}}>
            <BackButton></BackButton>
          </div>
        </div>
        {/* </form> */}
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

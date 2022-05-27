import React, { useState } from "react";
import {
  BUTTON_STYLE,
  LOADING_SVG,
  TEXT_STYLE,
  VERTICAL_DISTANCE,
} from "../../constants/constants";
// import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
// import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
import Logo from "../../components/Navbar/Logo";
import { useRouter } from "next/router";

export default function ResetPassword(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  const { query } = useRouter();

  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [newpassword, setNewPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  let onPasswordChange = (event: any) => {
    const newValue = event.target.value;
    setPassword(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  let onNewPasswordChange = (event: any) => {
    const newValue = event.target.value;
    setNewPassword(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  const onCodeChange = (event: any) => {
    const newValue = event.target.value;
    setCode(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  const triggerResetPassword = async (event: any) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    debugger;
    // const tempUser = IdentityStore.tempUser;
    debugger;
    const username = (query.username || "") as string;

    if (!username) {
      setErrorMessage("please go again to forgot password flow");
    }

    setLoading(true);

    IdentityStore.initAmplify();
    Auth.forgotPasswordSubmit(username, code, password)
      .then((data) => {
        console.log(data);
        setErrorMessage("password succesfully changed");
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

      <div className="flex flex-column flex-center-y">
        {/* <form name="form" onSubmit={triggerSignIn}> */}

        <div className="flex" style={VERTICAL_DISTANCE}>
          {/* <Label htmlFor="username" text="Code" /> */}
          <TextField
            id="standard-basic"
            label="Code"
            variant="standard"
            name="code"
            value={code}
            disabled={loading}
            onChange={onCodeChange}
            sx={TEXT_STYLE}
          />

          {submitted && !code && (
            <div className="warning">Code is required</div>
          )}
        </div>

        <div className="flex mt10" style={VERTICAL_DISTANCE}>
          {/* <Label htmlFor="oldpassword" text="Password" /> */}
          <TextField
            id="oldpassword-basic"
            label="Password"
            variant="standard"
            name="oldpassword"
            type={"password"}
            value={password}
            disabled={loading}
            onChange={onPasswordChange}
            sx={TEXT_STYLE}
          />
          {submitted && !password && (
            <div className="warning">Password is required</div>
          )}
        </div>

        <div className="flex mt10" style={VERTICAL_DISTANCE}>
          {/* <Label htmlFor="newpassword" text="New Password" /> */}
          <TextField
            id="standard-basic"
            label="New Password"
            variant="standard"
            name="password"
            type={"password"}
            value={newpassword}
            disabled={loading}
            onChange={onNewPasswordChange}
            sx={TEXT_STYLE}
          />
          {submitted && !newpassword && (
            <div className="warning">New Password is required</div>
          )}
        </div>
        <div className="mt10">
          {/* <label className="lbl">&nbsp;</label> */}
          {/* <Button variant="contained" onClick={triggerResetPassword}>
            Set Password
          </Button> */}

          <div className="flex flex-center mt10">
            <ErrorMessage message={errorMessage}></ErrorMessage>
          </div>

          <Button
            style={VERTICAL_DISTANCE}
            variant="contained"
            onClick={triggerResetPassword}
            disabled={!(password.length > 3)}
            sx={BUTTON_STYLE}
          >
            Set Password
          </Button>

          {loading && <img src={LOADING_SVG} />}
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

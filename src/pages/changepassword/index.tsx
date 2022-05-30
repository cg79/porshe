import React, { useState } from "react";
import {
  LOADING_SVG,
  TEXT_STYLE,
  BUTTON_STYLE,
} from "../../constants/constants";
import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
// import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
// import Logo from "../../components/Navbar/Logo";

export default function ChangePassword(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

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

  const triggerChangePassword = async (event: any) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);
    IdentityStore.initAmplify();

    Auth.currentAuthenticatedUser()
      .then((user) => {
        debugger;
        return Auth.changePassword(user, password, newpassword);
      })
      .then((data) => {
        console.log(data);
        setErrorMessage("Password succesfully changed");
      })
      .catch((err) => setErrorMessage(err.message))
      .finally(() => {
        setLoading(false);
        setSubmitted(true);
      });
  };

  return (
    <Navbar>
      <div className="page-content">
        {/* <div
        className="flex flex-column flex-center-y"
        style={{ marginTop: "17vh" }}>
        <div>
          <Logo />
        </div>
      </div> */}

        <div
          className="flex flex-column flex-center-y"
          style={{ marginTop: "65px" }}
        >
          <div className="flex mt10">
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

          <div className="flex mt10" style={{ marginTop: "20px" }}>
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
            {/* <Button variant="contained" onClick={triggerChangePassword}>
              Change Password
            </Button> */}

            <div className="flex flex-center mt10">
              <ErrorMessage message={errorMessage}></ErrorMessage>
            </div>

            <Button
              style={{ marginTop: "15px" }}
              variant="contained"
              onClick={triggerChangePassword}
              disabled={!password || !newpassword}
              sx={BUTTON_STYLE}
            >
              SAVE
            </Button>

            {loading && <img src={LOADING_SVG} />}
          </div>

          {/* </form> */}
        </div>
      </div>
    </Navbar>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

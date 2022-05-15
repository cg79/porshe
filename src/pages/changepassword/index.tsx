import React, { useState } from "react";
import { LOADING_SVG } from "../../constants/constants";
import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";

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

    Auth.currentAuthenticatedUser()
      .then((user) => {
        debugger;
        return Auth.changePassword(user, password, newpassword);
      })
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
    <>
      <Navbar>
        <div className="flex flex-column flex-center-y">
          {/* <form name="form" onSubmit={triggerSignIn}> */}
          

          <div className="flex mt10">
            <Label htmlFor="oldpassword" text="Password" />
            <TextField
              id="oldpassword-basic"
              label="Password"
              variant="standard"
              name="oldpassword"
              type={"password"}
              value={password}
              disabled={loading}
              onChange={onPasswordChange}
            />
            {submitted && !password && (
              <div className="warning">Password is required</div>
            )}
          </div>


          <div className="flex mt10">
            <Label htmlFor="newpassword" text="New Password" />
            <TextField
              id="standard-basic"
              label="New Password"
              variant="standard"
              name="password"
              type={"password"}
              value={newpassword}
              disabled={loading}
              onChange={onNewPasswordChange}
            />
            {submitted && !newpassword && (
              <div className="warning">New Password is required</div>
            )}
          </div>
          <div className="mt10">
            {/* <label className="lbl">&nbsp;</label> */}
            <Button variant="contained" onClick={triggerChangePassword}>
              Change Password
            </Button>

            {loading && <img src={LOADING_SVG} />}
          </div>

          <div className="flex flex-center mt10">
            <ErrorMessage message={errorMessage}></ErrorMessage>
          </div>
          {/* </form> */}
        </div>
      </Navbar>
    </>
  );
}

export async function getServerSideProps({ req, res }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

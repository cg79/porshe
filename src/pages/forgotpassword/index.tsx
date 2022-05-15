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



  const triggerResetPassword = async (event: any) => {
    event.preventDefault();
    if (loading) {
      return;
    }

    setLoading(true);

    Auth.forgotPassword(email)
      .then((user) => {
        debugger;
      })
      .then((data) => {
        console.log(data);
        setErrorMessage("confirmation code sent");
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

          <div className="flex">
            <Label htmlFor="username" text="Email" />
            <TextField
              id="standard-basic"
              label="Email"
              variant="standard"
              name="username"
              value={email}
              disabled={loading}
              onChange={onEmailChange}
            />

            {submitted && !email && (
              <div className="warning">Email is required</div>
            )}
          </div>
          
          <div className="mt10">
            {/* <label className="lbl">&nbsp;</label> */}
            <Button variant="contained" onClick={triggerResetPassword}>
              Reset Password
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

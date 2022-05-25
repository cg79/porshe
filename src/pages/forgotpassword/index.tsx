import React, { useState } from "react";
import { LOADING_SVG } from "../../constants/constants";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
import Router from "next/router";
import { ROUTES } from "../../constants/constants";
import Logo from "../../components/Navbar/Logo";

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
        style={{ marginTop: "17vh" }}>
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
            className="porsche_font flex bold mt10"
            style={{ fontSize: "22px" }}
          >
            Forgot your password?
          </div>
          <div className="porsche_font flex" style={{ fontSize: "16px" }}>
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
              style={{ marginTop: "15px" }}
              error={false}
              label="Email"
              variant="standard"
              name="username"
              value={email}
              disabled={loading}
              onChange={onEmailChange}
              size={"small"}
              sx={{
                width: "20rem",
                minWidth: "300px",
                "& label.Mui-focused": {
                  color: "#D3D3D3",
                },
                "& .MuiInputBase-input": {
                  color: "#d3d3d3",
                },
                "& .MuiInput-underline:after": {
                  borderBottomColor: "#fff",
                },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#D3D3D3",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D3D3D3",
                  },
                  "& .Mui-focused fieldset": {
                    borderColor: "#D3D3D3",
                  },
                },
                "& .MuiInputLabel-root": {
                  color: "#d3d3d3",
                  fontSize: "14px",
                },
              }}
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
              style={{ marginTop: "15px" }}
              variant="contained"
              onClick={triggerForgotPassword}
              disabled={!(email.length > 3)}
              sx={{
                color: "#fff",
                backgroundColor: "#3B5160",
                borderRadius: "75px",
                width: "250px",
                height: "45px",
                "&:hover": {
                  backgroundColor: "#346180",
                },
                ":disabled": {
                  color: "#999999",
                  background: "#e6e6e6",
                  border: "solid 2px transparent",
                },
              }}
            >
              Forgot Password
            </Button>

            {loading && <img src={LOADING_SVG} />}
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

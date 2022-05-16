import React, { useState } from "react";
import { LOADING_SVG, ROUTES } from "../../constants/constants";
import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
import Router from "next/router";

export default function SignIn(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  // const [cookie, setCookie] = useCookies(["user"])

  const [email, setEmail] = useState("claudiu9379@yahoo.com");
  const [phone, setPhone] = useState("+40742917773");
  const [password, setPassword] = useState("1111111a");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEmailChange = (event: any) => {
    const newValue = event.target.value;
    setEmail(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  const onPhoneChange = (event: any) => {
    const newValue = event.target.value;
    setPhone(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  let onPasswordChange = (event: any) => {
    const newValue = event.target.value;
    setPassword(newValue);
    setSubmitted(false);
    setErrorMessage("");
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

        if (
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
          // IdentityStore.setLoggedUser(awsJsonUserAttributes);
        });

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

  const triggerSignUp = () => {
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        phone_number: phone,
      },
    })
      .then((val) => {
        console.log(val);
        setErrorMessage("User succesfully created");
        debugger;
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

          <div className="flex">
            <Label htmlFor="username" text="Phone" />
            <TextField
              id="standard-basic"
              label="Phone"
              variant="standard"
              name="phone"
              value={phone}
              disabled={loading}
              onChange={onPhoneChange}
            />

            {submitted && !phone && (
              <div className="warning">Phone is required</div>
            )}
          </div>

          <div className="flex mt10">
            <Label htmlFor="password" text="Password" />

            {/* <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onPasswordChange}
            /> */}
            <TextField
              id="standard-basic"
              label="Password"
              variant="standard"
              name="password"
              type={"password"}
              value={password}
              disabled={loading}
              onChange={onPasswordChange}
            />
            {submitted && !password && (
              <div className="warning">Password is required</div>
            )}
          </div>

          <div className="mt10">
            {/* <label className="lbl">&nbsp;</label> */}
            <Button variant="contained" onClick={triggerSignIn}>
              Login
            </Button>

            <Button variant="contained" onClick={triggerSignUp}>
              Create
            </Button>

            {loading && <img src={LOADING_SVG} />}
          </div>

          <div>
            {/* <a href="/resetpassword">reset password</a> */}
            <Button href="/forgotpassword">forgot password</Button>
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

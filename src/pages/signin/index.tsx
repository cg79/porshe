import React, { useState } from "react";
import {  ROUTES } from "../../constants/constants";
// import Navbar from "../../components/Navbar";
// import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField, Box, Typography } from "@mui/material";
// import Label from "../../components/label/label";
import IdentityStore from "../../store/identity-store";
import Router from "next/router";

// import { styled } from "@mui/material/styles";
import styles from "./signin.module.css";
import Logo from "../../components/Navbar/Logo";
import Link from "next/link";

export default function SignIn(props: any) {
  if (props && props.porsche_user) {
    IdentityStore.setLoggedUser(JSON.parse(props.porsche_user));
  }

  const [email, setEmail] = useState("");
  // const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  // const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEmailChange = (event: any) => {
    const newValue = event.target.value;
    setEmail(newValue);
    // setSubmitted(false);
    setErrorMessage("");
    // const isProper = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g.test(newValue);
    // setProperEmail(isProper);
  };

  let onPasswordChange = (event: any) => {
    const newValue = event.target.value;
    setPassword(newValue);
    // setSubmitted(false);
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
        // setSubmitted(true);
      });
  };

  return (
    <div className="page-content">
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
              // fontFamily: "Porsche Next"
            },
            // "& .MuiInput-root": {
            //   "&:before": {
            //     borderBottom: "1px solid #fff",
            //   },
            // },
          }}
        />
        <Link href={ROUTES.RESET_PASSWORD}>
          <Typography
            variant="caption"
            gutterBottom
            component="div"
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              width: "16rem",
              minWidth: "300px",
              marginTop: "10px",
              "&:hover": {
                color: " #b5163e",
                cursor: "pointer",
              },
            }}
          >
            Forgot password?
          </Typography>
        </Link>
        <Typography
          variant="caption"
          gutterBottom
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-start",
            width: "16rem",
            minWidth: "320px",
            marginTop: "10px",
            color: "#FF8FAA",
          }}
        >
          {errorMessage}
        </Typography>
        <Box
          sx={{
            height: 50,
          }}
        />
        <Button
          variant="contained"
          onClick={triggerSignIn}
          disabled={!(password.length > 3)}
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
          Login
        </Button>
      </div>
    </div>
  );
}

export async function getServerSideProps({ req }: { req: any }) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

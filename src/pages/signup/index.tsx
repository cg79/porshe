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
  const [avatar, setAvatar] = useState("https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=620&quality=85&auto=format&fit=max&s=21718fb1379918410ea10054db89f665");

  const [password, setPassword] = useState("1111111a");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onAvatarChange = (event: any) => {
    const newValue = event.target.value;
    setAvatar(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

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

  const [code, setCode] = useState("");
  const onCodeChange = (event: any) => {
    const newValue = event.target.value;
    setCode(newValue);
    setSubmitted(false);
    setErrorMessage("");
  };

  

  const triggerSignUp = () => {
    Auth.signUp({
      username: email,
      password,
      attributes: {
        email,
        phone_number: phone,
        picture: avatar,
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

  const triggerConfirmEmail = () => {
    Auth.confirmSignUp(email, code)
      .then((val) => {
        console.log(val);
        setErrorMessage("User confirmed");
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

          <div className="flex mp10">
            <Label htmlFor="avatar" text="Avatar" />
            <TextField
              id="standard-basic"
              label="Code"
              variant="standard"
              name="username"
              value={avatar}
              disabled={loading}
              onChange={onAvatarChange}
            />
            
          </div>

          <div className="mt10">
            {/* <label className="lbl">&nbsp;</label> */}
            <Button variant="contained" onClick={triggerSignUp}>
              Create
            </Button>

            {loading && <img src={LOADING_SVG} />}
          </div>


          <div className="flex">
            <Label htmlFor="username" text="Code" />
            <TextField
              id="standard-basic"
              label="Code"
              variant="standard"
              name="username"
              value={code}
              disabled={loading}
              onChange={onCodeChange}
            />
            
          </div>

          

          <Button variant="contained" onClick={triggerConfirmEmail}>
              Confirmemail
            </Button>
         

          <div className="flex flex-center mt10">
            <ErrorMessage message={errorMessage}></ErrorMessage>
          </div>
          {/* </form> */}


        </div>
      </Navbar>
    </>
  );
}

export async function getServerSideProps({ req }:{req:any}) {
  const response = { props: { porsche_user: req.cookies.porsche_user || "" } };

  return response;
}

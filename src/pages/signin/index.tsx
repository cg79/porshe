import React, { useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { LOADING_SVG } from "../../constants/constants";
import Navbar from "../../components/Navbar";
import ErrorMessage from "../../components/error/error";
import { Auth } from "aws-amplify";
import { Button, TextField } from "@mui/material";
import Label from "../../components/label/label";
import IdentityStore from '../../store/identity-store';

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const onEmailChange = (event: any) => {
    const newValue = event.target.value;
    setEmail(newValue);
    setSubmitted(false);
    setErrorMessage('')
  };

  let onPasswordChange = (event: any) => {
    const newValue = event.target.value;
    setPassword(newValue);
    setSubmitted(false);
    setErrorMessage('')
  };

  const triggerSignIn = async (event: any) => {
    event.preventDefault();
    if(loading){
      return;
    }

    setLoading(true);

    Auth.signIn(email, password)
      .then((val) => {
        console.log(val);
        IdentityStore.setLoggedUser(val);
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

  const triggerSignUp = () => {
    Auth.signUp({
      username: email,
      password,
    })
    .then((val) => {
      console.log(val);
      setErrorMessage('User succesfully created');
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
           
            <Label htmlFor="username"  text="Email"/>
            <TextField id="standard-basic" 
              label="Email" 
              variant="standard" name="username"
              value={email}
              disabled={loading}
              onChange={onEmailChange}/>
            
            {submitted && !email && (
              <div className="warning">Email is required</div>
            )}
          </div>

          <div className="flex mt10">
            <Label htmlFor="password"  text="Password"/>
              
            {/* <input
              type="password"
              className="form-control"
              name="password"
              value={password}
              onChange={onPasswordChange}
            /> */}
             <TextField id="standard-basic" 
              label="Password" 
              variant="standard" 
              name="password"
              type={'password'}
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
            <Button variant="contained" 
              onClick={triggerSignIn}
              >Login</Button>

           
            <Button variant="contained" onClick={triggerSignUp}>Create</Button>

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

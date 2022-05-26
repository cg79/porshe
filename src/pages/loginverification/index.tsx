import React, { useState } from 'react'
import { LOADING_SVG, ROUTES } from '../../constants/constants'
import Navbar from '../../components/Navbar'
import ErrorMessage from '../../components/error/error'
import { Auth } from 'aws-amplify'
import { Button, TextField, Box, Typography } from '@mui/material'
import Label from '../../components/label/label'
import IdentityStore from '../../store/identity-store'
import Router from 'next/router'
import Logo from '../../components/Navbar/Logo'
import styles from './loginverification.module.css'

export default function ChangePassword(props: any) {
    if (props && props.porsche_user) {
        IdentityStore.setLoggedUser(JSON.parse(props.porsche_user))
    }

    const [code, setCode] = useState('')
    const onCodeChange = (event: any) => {
        const newValue = event.target.value
        setCode(newValue)
        setSubmitted(false)
        setErrorMessage('')
    }

    const [errorMessage, setErrorMessage] = useState('')
    const [submitted, setSubmitted] = useState(false)
    const [loading, setLoading] = useState(false)

    // const resendVerificationCode = ()=>{

    //   setLoading(true);
    //   // const code = getCodeFromUserInput();
    //   // const loggedUser = await Auth.confirmSignIn(
    //   //   data, // Return object from Auth.signIn()
    //   //   code, // Confirmation code
    //   //   mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
    //   // );

    //   const userFromSignIn = IdentityStore.tempUser;
    //   Auth.resendConfirmationCode('claudiu9379@yahoo.com')
    //     .then((user) => {
    //       console.log(user);
    //       debugger;
    //     })
    //     .then((data) => {
    //       debugger;
    //       console.log(data);
    //       setErrorMessage("resend sign up");
    //     })
    //     .catch((err) => setErrorMessage(err.message))
    //     .finally(() => {
    //       setLoading(false);
    //       setSubmitted(true);
    //     });
    // }

    const completeLoginWithCodeFlow = async (event: any) => {
        event.preventDefault()
        if (loading) {
            return
        }

        setLoading(true)
        // const code = getCodeFromUserInput();
        // const loggedUser = await Auth.confirmSignIn(
        //   data, // Return object from Auth.signIn()
        //   code, // Confirmation code
        //   mfaType // MFA Type e.g. SMS_MFA, SOFTWARE_TOKEN_MFA
        // );

        const userFromSignIn = IdentityStore.tempUser
        Auth.confirmSignIn(userFromSignIn, code, 'SMS_MFA')
            // Auth.confirmSignIn(userFromSignIn, code, 'CUSTOM_CHALLENGE')
            .then((user) => {
                console.log(user)
                debugger
            })
            .then((data) => {
                console.log(data)
                setErrorMessage('user logged in')

                Auth.currentUserInfo().then((userInfo) => {
                    debugger
                    const awsJsonUserAttributes = userInfo.attributes
                    IdentityStore.setLoggedUser(awsJsonUserAttributes)

                    const reqBody = {
                        porsche_user: JSON.stringify(awsJsonUserAttributes),
                    }

                    fetch('/api/login', {
                        method: 'post',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(reqBody),
                    }).finally(() => {
                        Router.push(ROUTES.OVERVIEW)
                    })
                })
            })
            .catch((err) => setErrorMessage(err.message))
            .finally(() => {
                setLoading(false)
                setSubmitted(true)
            })
    }

    return (
        <>
            <div className="page-content">
                <div className={styles.container}>
                    <Logo />
                    <Box
                        sx={{
                            height: 50,
                        }}
                    />
                    <Typography
                        variant="subtitle1"
                        gutterBottom
                        component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            width: '16rem',
                            minWidth: '420px',
                            marginTop: '10px',
                            color: '#FFF',
                        }}
                    >
                        Enter the 6 digits code received on your mobile
                    </Typography>
                    <Box
                        sx={{
                            height: 50,
                        }}
                    />

                    <TextField
                        id="standard-basic"
                        label={code ? 'Code' : 'Enter 6 digit code received'}
                        variant="standard"
                        name="username"
                        value={code}
                        disabled={loading}
                        onChange={onCodeChange}
                        sx={{
                            width: '20rem',
                            minWidth: '200px',
                            '& label.Mui-focused': {
                                color: '#D3D3D3',
                            },
                            '& .MuiInputBase-input': {
                                color: '#d3d3d3',
                            },
                            '& .MuiInput-underline:after': {
                                borderBottomColor: '#fff',
                            },
                            '& .MuiOutlinedInput-root': {
                                '& fieldset': {
                                    borderColor: '#D3D3D3',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#D3D3D3',
                                },
                                '& .Mui-focused fieldset': {
                                    borderColor: '#D3D3D3',
                                },
                            },
                            '& .MuiInputLabel-root': {
                                color: '#d3d3d3',
                                fontSize: '14px',
                            },
                        }}
                    />

                    {submitted && !code && (
                        <div className="warning">Code is required</div>
                    )}
                    <Typography
                        variant="caption"
                        gutterBottom
                        component="div"
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-start',
                            width: '16rem',
                            minWidth: '320px',
                            marginTop: '10px',
                            color: '#FF8FAA',
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
                        onClick={completeLoginWithCodeFlow}
                        disabled={loading}
                        sx={{
                            color: '#fff',
                            backgroundColor: '#3B5160',
                            borderRadius: '75px',
                            width: '250px',
                            height: '45px',
                            '&:hover': {
                                backgroundColor: '#346180',
                            },
                            ':disabled': {
                                color: '#999999',
                                background: '#e6e6e6',
                                border: 'solid 2px transparent',
                            },
                        }}
                    >
                        Verify code
                    </Button>

                    {/* {loading && <img src={LOADING_SVG} />} */}
                    {/* <ErrorMessage message={errorMessage}></ErrorMessage> */}

                    {/* </form> */}
                </div>
            </div>
        </>
    )
}

export async function getServerSideProps({ req }: { req: any }) {
    const response = { props: { porsche_user: req.cookies.porsche_user || '' } }

    return response
}

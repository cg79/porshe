
import NextAuth from 'next-auth';
import CognitoProvider from "next-auth/providers/cognito";

const createCognitoData=()=>{
    const cognito=  {
        clientId: process.env.COGNITO_CLIENT_ID,
        clientSecret: process.env.COGNITO_CLIENT_SECRET,
        domain:process.env.COGNITO_DOMAIN,
    };

    console.log(cognito)
    return cognito;
}

export default NextAuth({
    providers:[
        CognitoProvider(createCognitoData())
    ],
    debug: true,
})
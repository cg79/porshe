
npm install -g @aws-amplify/cli

delete amplify folder from application

delete src\aws-exports.js

login to aws account

choose region (the used region from create-auth-challenge-lambda file is us-east-1)

amplify configure

amplify init

amplify add auth

note: in case you need to update the existing settings: amplify update auth 

see the settings from image (amplify_add_or_update_auth.png)

execute:amplify push



add the lambda functions from ./lambda-functions directory

test create-auth-challenge-lambda by using a request like:

```
{
    "request":{
        "userAttributes":{
            "email1": "claudiu9379@yahoo.com",
            "phone_number":"+40742917773"
        }
    },
    "response":{
        "test":1
    }
}
```

in case there is a error, please set up the role sns permission (take the role from error message )

update the user pool\triggers with associated lambda functions



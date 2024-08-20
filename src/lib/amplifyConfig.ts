import { Amplify } from "aws-amplify";



Amplify.configure({
  Auth: {
    
    Cognito: {
      userPoolClientId: process.env.NEXT_PUBLIC_AWS_USER_POOL_CLIENT_ID!,
      userPoolId: process.env.NEXT_PUBLIC_AWS_USER_POOL_ID!,
      identityPoolId: process.env.NEXT_PUBLIC_AWS_IDENTITY_POOL_ID!,
      

    },
  },
});

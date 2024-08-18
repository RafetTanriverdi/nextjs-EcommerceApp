"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { signIn } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsmobile from "../../aws-exports";

Amplify.configure(awsmobile)


const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignInClick = () => {
    handleSignIn({ password, email });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full" onClick={handleSignInClick}>
          Sign in
        </Button>
      </CardFooter>
    </Card>
  );
};

type SignUpParameters = {
  password: string;
  email: string;
};

async function handleSignIn({ password, email }: SignUpParameters) {
  try {
    const { isSignedIn, nextStep } = await signIn({
      username: email,
      password,
    });

    console.log(isSignedIn, nextStep);
  } catch (error) {
    console.log("error signing up:", error);
  }
}

export default LoginForm;

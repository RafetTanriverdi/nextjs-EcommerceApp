/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../../../../components/ui/card";
import { Button } from "../../../../../components/ui/button";
import { Input } from "../../../../../components/ui/input";
import { Label } from "../../../../../components/ui/label";
import { fetchAuthSession, signIn } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../../../hooks/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import RTButton from "../../../../../components/PlatformComponent/RTButton";
import RTInput from "../../../../../components/PlatformComponent/RTInput";
import awsmobile from "../../../../../aws-exports";

Amplify.configure(awsmobile);
type SignUpParameters = {
  password: string;
  email: string;
};

const LoginForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const mutation = useMutation({
    mutationKey: ["signIn", email],
    mutationFn: async ({ password, email }: SignUpParameters) => {
      const { isSignedIn, nextStep } = await signIn({
        username: email,
        password,
      });

      const { accessToken } = (await fetchAuthSession()).tokens ?? {};

      if (accessToken) {
        const access = accessToken.toString();

        Cookies.set("accessToken", access, { expires: 1 });
      } else {
        console.error("Access token is undefined");
      }
      router.push("/profile");
       router.refresh();
    },
    onSuccess() {
      toast({
        variant: "default",
        title: "Successfully signed in",
      });
    },
    onError(error) {
      toast({
        variant: "destructive",
        title: ` ${error.message}`,
      });
    },
  });
  console.log(mutation.isPending, "mutation.isPending");

  return (
    <Card className="w-full max-w-sm my-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RTInput.Text
          id="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="johndea@example.com"
          type="email"
        />
        <RTInput.Password
          id="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Please enter your password"
        />
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <RTButton.Action
          text="Sign in"
          className="w-full"
          onClick={() => mutation.mutate({ password, email })}
          loading={mutation.isPending}
        />

        <div>
          <p className="text-center text-sm text-gray-500">
            Don't have an account?
            <RTButton.Link
              onClick={() => router.push("register")}
              className="text-center"
              text="Register"
            />
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;

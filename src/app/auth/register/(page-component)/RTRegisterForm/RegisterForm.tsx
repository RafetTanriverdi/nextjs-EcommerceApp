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
import { signUp } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsmobile from "../../../../../aws-exports";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "../../../../../hooks/use-toast";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import RTButton from "../../../../../components/PlatformComponent/RTButton";
import RTInput from "../../../../../components/PlatformComponent/RTInput";
import { FormField, Form } from "../../../../../components/ui/form";
import { useForm } from "react-hook-form";

Amplify.configure(awsmobile);
type SignUpParameters = {
  username: string;
  password: string;
  email: string;
  phone_number: string;
};

type PostBody = {
  username: string;
  email: string;
  phone: string;
  password: string;
};

const RegisterForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm<PostBody>();

  const mutation = useMutation({
    mutationKey: ["register", email],
    mutationFn: async ({
      username,
      password,
      email,
      phone_number,
    }: SignUpParameters) => {
      const { isSignUpComplete, userId, nextStep } = await signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            phone_number,
            name: username,
          },

          autoSignIn: true,
        },
      });
    },
    onSuccess: () => {
      toast({
        variant: "default",
        title: "Successfully signed in ",
        description: "Please check your email to verify your account",
      });
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: `${error.message}`,
      });
    },
  });

  return (
    <Card className="w-full max-w-sm my-auto">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <RTInput.Text
          id="username"
          label="Username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <RTInput.Text
          id="email"
          type="email"
          label="Email"
          placeholder="m@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <RTInput.Password
          label="Password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
        />

        <RTInput.Text
          id="phoneNumber"
          label="Phone Number"
          type="tel"
          placeholder="+123456789"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
      </CardContent>
      <CardFooter className="flex-col gap-3">
        <RTButton.Action
          className="w-full"
          onClick={() =>
            mutation.mutate({
              username,
              email,
              password,
              phone_number: phoneNumber,
            })
          }
          text="Sign Up"
          loading={mutation.isPending}
        />

        <div>
          <p className="text-center text-sm text-gray-500">
            Already have an account?
            <RTButton.Link text="Login" onClick={() => router.push("login")} />
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default RegisterForm;

"use client";
import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsmobile from "../../aws-exports";
import { useMutation, useQuery } from "@tanstack/react-query";
import axiosInstance from "../../network/httpRequester";
import RTInput from "../../components/PlatformComponent/RTInput";
import { Form, FormField, FormItem } from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "../../components/ui/button";

Amplify.configure(awsmobile);

type PostBody = {
  name: string;
  email: string;
  phone: string;
  address: string;
};

const Profile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axiosInstance.get(`/profile`),
  });

  // Use useForm with the PostBody type
  const form = useForm<PostBody>();

  const mutation = useMutation({
    mutationKey: ["profileUpdate"],
    mutationFn: (values: PostBody) => axiosInstance.patch(`/profile`, values),
  });

  useEffect(() => {
    if (data) {
      form.setValue("name", data.data.name);
      form.setValue("email", data.data.email);
      form.setValue("phone", data.data.phone);
      form.setValue("address", data.data.address);
    }
  }, [data, form]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((values: PostBody) => mutation.mutate(values))}>
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => <RTInput.Text {...field} label="Name" />}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <RTInput.Text
              {...field}
              label="Email"
              readOnly={true} 
            />
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => <RTInput.Text {...field} label="Phone" />}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => <RTInput.Text {...field} label="Address" />}
        />
        <FormItem>
          <Button type="submit">Save</Button>
        </FormItem>
      </form>
    </Form>
  );
};

export default Profile;

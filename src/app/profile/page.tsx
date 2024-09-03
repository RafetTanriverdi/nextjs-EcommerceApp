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
import { ENDPOINT } from "../../network/EndPoint";
import Image from "next/image";

Amplify.configure(awsmobile);

type PostBody = {
  name: string;
  email: string;
  phone: string;
  address: string;
  profilePicture?: string;
  stripeCustomerId?: string;
};

const Profile = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axiosInstance.get(ENDPOINT.PROFILE.GET),
  });

  const form = useForm<PostBody>();

  const mutation = useMutation({
    mutationKey: ["profileUpdate"],
    mutationFn: (values: PostBody) => axiosInstance.patch(ENDPOINT.PROFILE.UPDATE, values),
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      form.setValue("name", data.data.name);
      form.setValue("email", data.data.email);
      form.setValue("phone", data.data.phone);
      form.setValue("address", data.data.address);
    }
  }, [data, form]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleSubmit = async (values: PostBody) => {
    if (selectedFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        values.profilePicture = reader.result as string;
        mutation.mutate({
          ...values,
          stripeCustomerId: data?.data?.customerStripeId,
        });
      };
      reader.readAsDataURL(selectedFile);
    } else {
      mutation.mutate({
        ...values,
        stripeCustomerId: data?.data?.customerStripeId,
      });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <Image
        alt="profile picture"
        src={data?.data?.profilePicture}
        width={200}
        height={200}
        layout="intrinsic" 
        objectFit="cover" 
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => <RTInput.Text {...field} label="Name" />}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <RTInput.Text {...field} label="Email" readOnly={true} />
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
          <input type="file" onChange={handleFileChange} />
        </FormItem>
        <FormItem>
          <Button type="submit">Save</Button>
        </FormItem>
      </form>
    </Form>
  );
};

export default Profile;

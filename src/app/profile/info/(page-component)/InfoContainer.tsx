"use client";
import React, { useState, useEffect } from "react";
import { Amplify } from "aws-amplify";
import awsmobile from "@rt/aws-exports";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@rt/network/httpRequester";
import RTInput from "@rt/components/PlatformComponent/RTInput";
import { Form, FormField, FormItem } from "@rt/components/ui/form";
import { useForm } from "react-hook-form";
import { Button } from "@rt/components/ui/button";
import { ENDPOINT } from "@rt/network/EndPoint";
import Image from "next/image";

Amplify.configure(awsmobile);

type PostBody = {
  name: string;
  email: string;
  phone: string;
  profilePicture?: string;
  stripeCustomerId?: string;
};
const InfoContainer = () => {
  const queryClient = useQueryClient();
  const form = useForm<PostBody>();

  const { data, isLoading, error } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axiosInstance.get(ENDPOINT.PROFILE.GET),
  });

  const mutation = useMutation({
    mutationKey: ["profileUpdate"],
    mutationFn: (values: PostBody) =>
      axiosInstance.patch(ENDPOINT.PROFILE.UPDATE, values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profile"] });
    },
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (data) {
      form.setValue("name", data?.data.name);
      form.setValue("email", data?.data.email);
      form.setValue("phone", data?.data.phone);
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
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <div className="flex flex-col items-center">
          <div className="rounded-full overflow-hidden w-40 h-40 mb-4 border-2 border-gray-300 mt-4">
            <Image
              alt="profile picture"
              src={data?.data?.profilePictureUrl}
              width={160}
              height={160}
              layout="fixed"
              objectFit="cover"
            />
          </div>
        </div>

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

export default InfoContainer;

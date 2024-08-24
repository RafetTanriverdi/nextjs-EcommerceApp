"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { axiosInstance } from "../../../network/httpRequester";
import { useMutation, useQuery } from "@tanstack/react-query";

import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setClientSecret } from "../../../data/redux/clientSecretSlice";
import { ENDPOINT } from "../../../network/EndPoint";

const Page = ({ params }: { params: { productId: string } }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { data, error } = useQuery({
    queryKey: ["productGet", params.productId],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINT.getProduct.replace(":productId", params.productId)
      ),
  });

  const postbody = {
    priceId: data?.data.stripePriceId,
    return_url: "http://localhost:3000/cancel",
    quantity: 3,
  };

  const mutation = useMutation({
    mutationKey: ["buy"],
    mutationFn: () => {
      return axiosInstance.post("/checkout", postbody);
    },
    onError: (error) => {
      console.error("Error during buying:", error);
    },
    onSuccess: (data) => {
      const clientSecret = data.data.session.client_secret;
      dispatch(setClientSecret(clientSecret));
      router.push("/payment");
    },
  });

  return (
    <>
      <div>
        <h1>Product ID: {params.productId}</h1>
        <Button onClick={() => mutation.mutate()}>Buy</Button>
      </div>
    </>
  );
};

export default Page;

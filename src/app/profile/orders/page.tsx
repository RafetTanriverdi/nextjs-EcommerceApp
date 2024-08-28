'use client';
import { useQuery } from "@tanstack/react-query";
import React, { Suspense } from "react";
import axiosInstance from "../../../network/httpRequester";
import { ENDPOINT } from "../../../network/EndPoint";

type Orders = {
  orderId: string;
  amountTotal: number;
  productName: string;
};

const OrdersContianer = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return axiosInstance.get(ENDPOINT.checkout);
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {data?.data.map((e: Orders) => (
        <div key={e.orderId}>
          <h1>{e.productName}</h1>
          <p>{e.amountTotal}</p>
        </div>
      ))}
    </>
  );
};

const orders = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrdersContianer />
    </Suspense>
  );
};

export default orders;

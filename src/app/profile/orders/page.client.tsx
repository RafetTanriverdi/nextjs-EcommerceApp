"use client";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import axiosInstance from "../../../network/httpRequester";
import { ENDPOINT } from "../../../network/EndPoint";
import OrdersCard from "./(page-component)/OrdersCard/OrdersCard";
import PageLoader from "./(page-component)/PageLoader/PageLoader";

const OrdersContianer = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: async () => {
      return axiosInstance.get(ENDPOINT.ORDERS.LIST);
    },
  });

  if (isLoading) {
    return (
      <>
        {[1, 2].map((item: any) => (
          <PageLoader key={item} />
        ))}
      </>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {data?.data
        ?.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )
        .map((item: any) => (
          <OrdersCard key={item.orderId} props={item} />
        ))}
    </>
  );
};

export default OrdersContianer;

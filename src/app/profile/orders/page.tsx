import React from "react";
import OrdersContianer from "./page.client";
import { Metadata } from "next";

export const metadata:Metadata={
  title: "Orders",
  description: "Orders",
};

const Orders = () => {
  return <OrdersContianer />;
};

export default Orders;

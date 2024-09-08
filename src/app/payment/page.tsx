import { Metadata } from "next";
import React from "react";
import Payment from "./(page-component)/PaymentForm";

export const metadata: Metadata = {
  title: "Payment",
  description: "Payment page",
};
const page = () => {
  return <Payment />;
};

export default page;

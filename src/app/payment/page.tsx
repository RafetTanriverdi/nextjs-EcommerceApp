"use client";
import React from "react";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../network/httpRequester";
import { useTheme } from "next-themes";
import './payment.css'

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

const Payment: React.FC = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
const {theme}=useTheme ()
  const postbody = {
    lineItems: cartItems.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    returnUrl: `http://localhost:3000/payment/success`,
    customer: "cus_QliXY4FzUdwBZ1",
  };
  const { data } = useQuery({
    queryKey: ["clientSecret"],
    queryFn: () => axiosInstance.post("/checkout", postbody),
  });
  console.log(data);
  const options = {
    clientSecret: data?.data?.session.client_secret!,
  };

  return (
    <div
      className={`payment-container ${
        theme === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      {data ? (
        <EmbeddedCheckoutProvider stripe={stripePromise} options={options}>
          <EmbeddedCheckout  />
        </EmbeddedCheckoutProvider>
      ) : (
        <div>Failed to initialize payment</div>
      )}
    </div>
  );
};

export default Payment;

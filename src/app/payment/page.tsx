"use client";

import React, { useState, useEffect } from "react";
import {
  CardElement,
  useStripe,
  useElements,
  Elements,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { useQuery, useMutation } from "@tanstack/react-query";
import axiosInstance from "../../network/httpRequester";
import { useTheme } from "next-themes";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "../../components/ui/card";
import { Label } from "@radix-ui/react-label";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { useForm, Controller } from "react-hook-form";
import { Link2, Loader2 } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
);

interface FormValues {
  name: string;
  email: string;
  address: string;
  city: string;
  postalCode: string;
}

const PaymentForm: React.FC = () => {
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const { theme } = useTheme();
  const { control, handleSubmit } = useForm<FormValues>();
  const [promoCode, setPromoCode] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Ensures that the component is client-side rendered
  }, []);

  const postbody = {
    lineItems: cartItems.map((item) => ({
      price: item.priceId,
      quantity: item.quantity,
    })),
    amount: 120,
    customer: "cus_QliXY4FzUdwBZ1",
    customerEmail: "rafet26436@gmail.com",
  };

  const { data } = useQuery({
    queryKey: ["clientSecret"],
    queryFn: () => axiosInstance.post("/checkout", postbody),
  });

  const mutation = useMutation({
    mutationKey: ["buy"],
    mutationFn: async (formData: FormValues) => {
      if (!stripe || !elements) {
        return;
      }

      const cardElement = elements.getElement(CardElement);

      if (!cardElement) {
        return;
      }

      await stripe.confirmCardPayment(data?.data?.clientSecret!, {
        payment_method: {
          card: cardElement,
          billing_details: {
            name: formData.name,
            email: formData.email,
            address: {
              city: formData.city,
              line1: formData.address,
              postal_code: formData.postalCode,
            },
          },
        },
      });
    },
  });

  if (!isClient) {
    return null; // Avoid rendering on the server-side
  }
  const cardElementOptions = {
    style: {
      base: {
        iconColor: "#666EE8",
        color: "#ffffff",
        fontWeight: 400,
        fontFamily: "Arial, sans-serif",
        fontSize: "16px",
        "::placeholder": {
          color: "#ffffff",
        },
      },
      invalid: {
        iconColor: "#E25950",
        color: "#ffffff",
      },
    },
  };
  return (
    <div
      className={`payment-container ${
        theme === "dark" ? "dark-mode" : "light-mode"
      }`}
    >
      <div className="flex flex-wrap justify-between">
        <div className="w-full lg:w-6/12 mb-8 lg:mb-0">
          <Card>
            <CardHeader>
              <CardTitle>Your Cart</CardTitle>
              <CardDescription>
                Review your items and update quantities
              </CardDescription>
            </CardHeader>
            <CardContent>
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between mb-4">
                  <div>{item.productName}</div>
                  <div>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) => {
                        // Implement quantity update logic here
                      }}
                      className="w-16 border rounded"
                    />
                  </div>
                  <div>{`$${(item.price / 100).toFixed(2)}`}</div>
                </div>
              ))}
              <Label htmlFor="promo-code">Promo Code</Label>
              <Input
                id="promo-code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                placeholder="Enter promo code"
              />
            </CardContent>
          </Card>
        </div>

        <div className="w-full lg:w-5/12">
        <Card>
            <CardHeader>
              <CardTitle>Payment Details</CardTitle>
              <CardDescription>Enter your payment information</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit((formData) => mutation.mutate(formData))}>
                <div className="mb-4">
                  <Label htmlFor="name">Name on Card</Label>
                  <Controller
                    control={control}
                    name="name"
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="email">Email</Label>
                  <Controller
                    control={control}
                    name="email"
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="address">Billing Address</Label>
                  <Controller
                    control={control}
                    name="address"
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="city">City</Label>
                  <Controller
                    control={control}
                    name="city"
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Controller
                    control={control}
                    name="postalCode"
                    render={({ field }) => <Input {...field} />}
                  />
                </div>
                <div className="mb-4">
                  <Label htmlFor="card-element">Card Details</Label>
                  <CardElement
                    id="card-element"
                    options={cardElementOptions}
                    className="input-card-element border rounded p-2"
                  />
                </div>
                <Button type="submit" disabled={!stripe}   > 
                  {mutation?.isPending && ( <Loader2 className="mr-2 h-4 w-4 animate-spin" />) }
                  Pay Now
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default function Payment() {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
}

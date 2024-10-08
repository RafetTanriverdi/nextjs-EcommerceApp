"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Amplify } from "aws-amplify";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../network/httpRequester";
import awsmobile from "../../aws-exports";
import ProductCard from "../../components/PlatformComponent/RTProductCart/RTProductCart";
import { ENDPOINT } from "../../network/EndPoint";
import { CartLoader } from "../../components/PlatformComponent/RTProductCart/CartLoader";

type Product = {
  productId: string;
  imageUrls: string[];
  createdAt: string;
  stock: number;
  description: string;
  price: number;
  stripePriceId: string;
  productName: string;
};

Amplify.configure(awsmobile);

const ProductList = () => {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");
  const categoryParams = categoryId ? `?categoryId=${categoryId}` : "";

  const { data, isLoading, error } = useQuery({
    queryKey: ["productsList", categoryParams],
    queryFn: () => axiosInstance.get(ENDPOINT.PRODUCT.LIST + categoryParams),
  });

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center">
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="w-11/12 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
          >
            <CartLoader />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {data?.data?.map((product: Product) => (
        <div
          key={product.productId}
          className="w-11/12 sm:w-1/2 md:w-1/2 lg:w-1/3 xl:w-1/4 p-4"
        >
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
};

export default function Product() {
  return (
    <Suspense>
      <ProductList />
    </Suspense>
  );
}

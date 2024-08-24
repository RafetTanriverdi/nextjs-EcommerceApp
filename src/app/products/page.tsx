"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Amplify } from "aws-amplify";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../network/httpRequester";
import awsmobile from "../../aws-exports";
import { RTSkeleton } from "../../components/RTSkeleton/RTSkeleton";
import ProductCard from "../../components/RTProductCart/RTProductCart";

type Product = {
  productId: string;
  imageUrl: string;
  createdAt: string;
  stock: number;
  description: string;
  price: number;
  stripePriceId: string;
  productName: string;  // `productName` kullanılıyor.
};

Amplify.configure(awsmobile, { ssr: true });

export default function Product() {
  
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryId = searchParams.get('categoryId'); 
  const { data, isLoading, error } = useQuery({
    queryKey: ["productsList"],
    queryFn: () => axiosInstance.get(`/products?categoryId=${categoryId}`),
  });

  if (isLoading) {
    return (
      <div>
        <RTSkeleton />
      </div>
    );
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <div>
      {data?.data?.map((product: Product) => (
        <ProductCard
          key={product.productId}
          product={product}
          onAddToCart={(product) =>
            router.push(`products/${product.productId}`,)
          }
        />
      ))}
    </div>
  );
}

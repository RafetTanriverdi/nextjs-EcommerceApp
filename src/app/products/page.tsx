"use client";

import { useRouter } from "next/navigation";
import { Amplify } from "aws-amplify";
import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../../utils/network/httpRequester";
import awsmobile from "../../aws-exports";
import { RTSkeleton } from "../../components/RTSkeleton/RTSkeleton";
import ProductCard from "../../components/RTProductCart/RTProductCart";

type Product = {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
};

Amplify.configure(awsmobile, { ssr: true });

export default function Product() {
  const router = useRouter();
  const { data, isLoading, error } = useQuery({
    queryKey: ["productsList"],
    queryFn: () => {
      return axiosInstance.get("/products");
    },
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
          onAddToCart={(productId) => router.push(`products/${productId}`)}
        />
      ))}
      <ProductCard
        product={{
          productId: "1",
          name: "Product 1",
          price: 100,
          imageUrl:
            "https://www.kaft.com/static/images/cache/1200/canta_nordhugsulphur_17061_1200_1200.jpg?cacheID=1675926790000",
        }}
        onAddToCart={(productId) => router.push(`products/${productId}`)}
      />
    </div>
  );
}

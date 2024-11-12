"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@rt/components/ui/card";
import { Button } from "@rt/components/ui/button";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../data/redux/cartSlice";
import { ShoppingCart } from "lucide-react";
import { useRouter } from "next/navigation";

interface Product {
  productId: string;
  imageUrls: string[];
  createdAt: string;
  stock: number;
  description: string;
  price: number;
  stripePriceId: string;
  productName: string;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        imageUrl: product.imageUrls[0],
        quantity: 1,
        priceId: product.stripePriceId,
        description: product.description,
        stock: product.stock,
      })
    );
  };

  return (
    <Card className="rounded-lg shadow-md hover:shadow-lg transition-shadow h-full flex flex-col justify-between">
      <CardHeader className="relative">
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrls[0]}
            alt={product.productName}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>
      </CardHeader>
      <CardContent className="flex justify-between  items-center">
        <div>
          <h2 className="text-xl font-semibold">{product.productName}</h2>
          <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
        </div>
        <Button
          variant={"outline"}
          onClick={handleAddToCart}
          disabled={!product?.stock}
        >
          {<ShoppingCart className="w-5 h-5" />}
        </Button>
      </CardContent>
      <CardFooter className="flex flex-col items-center mt-auto">
        {!product?.stock && (
          <p className="text-red-500 text-center  "> Out of Stock </p>
        )}
        
        <Button
          variant="default"
          className="w-full mt-1"
          onClick={() => router.push(`/products/${product.productId}`)}
          disabled={!product?.stock}
        >
          Details
        </Button> 
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

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
import { addToCart } from "../../data/redux/cartSlice";

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

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        productId: product.productId,
        productName: product.productName,
        price: product.price,
        imageUrl: product.imageUrls[0],
        quantity: 1,  // Varsayılan olarak 1 adet eklenir
      })
    );
  };

  return (
    <Card className="rounded-lg shadow-md hover:shadow-lg transition-shadow">
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
      <CardContent>
        <h2 className="text-xl font-semibold">{product.productName}</h2>
        <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button className="w-full mt-4" onClick={handleAddToCart}>
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

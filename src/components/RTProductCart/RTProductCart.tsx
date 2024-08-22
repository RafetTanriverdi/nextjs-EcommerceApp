'use client';

import { useCallback } from "react";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@rt/components/ui/card";
import { Button } from "@rt/components/ui/button";
import Image from "next/image";

interface Product {
  productId: string;
  name: string;
  price: number;
  imageUrl: string;
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product.productId);
  }, [onAddToCart, product.productId]);

  return (
    <Card className="max-w-xs rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold">{product.name}</h2>
        <p className="text-gray-600 mt-2">${product.price.toFixed(2)}</p>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full mt-4"
          onClick={handleAddToCart}
        >
          Sepete Ekle
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;

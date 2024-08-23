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
  imageUrl: string;
  createdAt: string;
  stock: number;
  description: string;
  price: number;
  stripePriceId: string;
  productName: string;  // `productName` kullanılıyor.
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const handleAddToCart = useCallback(() => {
    onAddToCart(product);
  }, [onAddToCart, product]);

  return (
    <Card className="max-w-xs rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="relative w-full h-48">
          <Image
            src={product.imageUrl}
            alt={product.productName}  // `productName` kullanılıyor.
            fill
            className="rounded-t-lg object-cover"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-semibold">{product.productName}</h2>  {/* `productName` kullanılıyor. */}
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

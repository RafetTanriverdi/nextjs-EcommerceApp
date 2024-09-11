"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@rt/components/ui/button";
import { Card, CardContent, CardHeader } from "@rt/components/ui/card";
import { RootState, AppDispatch } from "@rt/app/store";
import { removeFromCart, updateQuantity } from "@rt/data/redux/cartSlice";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Input } from "../../components/ui/input";

interface CartItemProps {
  item: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    description: string;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleUpdateQuantity = (newQuantity: number) => {
    if (newQuantity <= 0) return;
    dispatch(
      updateQuantity({ productId: item.productId, quantity: newQuantity })
    );
  };

  const handleRemoveItem = () => {
    dispatch(removeFromCart(item.productId));
  };

  return (
    <Card className="mb-4">
      <CardHeader className="flex-row justify-between gap-9  items-center ">
        <div
          className="flex gap-3 items-center cursor-pointer"
          onClick={() => router.push(`products/${item.productId}`)}
        >
          <Image
            src={item.imageUrl}
            width={100}
            height={100}
            alt={item.productName}
          />
          <div className="">
            <span className="font-bold">{item.productName}</span>
            <p className="line-clamp-3">{item.description}</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" onClick={handleRemoveItem}>
          Sil
        </Button>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div>
          <h4 className="font-bold">{item.productName}</h4>
          <p>{item.price} TL</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => handleUpdateQuantity(item.quantity - 1)}
          >
            -
          </Button>
          <Input
            value={item.quantity}
            onChange={(e) => handleUpdateQuantity(Number(e.target.value))}
            
          />
          <Button
            size={"sm"}
            variant={"outline"}
            onClick={() => handleUpdateQuantity(item.quantity + 1)}
          >
            +
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Cart = () => {
  const [isClient, setIsClient] = useState(false); // İstemci render edildi mi?
  const cartItems = useSelector((state: RootState) => state.cart.items);

  useEffect(() => {
    setIsClient(true); // İstemci render edildikten sonra isClient'i true yapıyoruz
  }, []);

  // Toplam fiyat hesaplaması, acc ve item tipleri belirtiliyor.
  const total = cartItems.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  // Eğer sunucu tarafında render ediliyorsa boş bir div döndür
  if (!isClient) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem key={item.productId} item={item} />
            ))
          ) : (
            <p>Sepetiniz boş.</p>
          )}
        </div>
        <div className="sticky top-24 self-start">
          <Card>
            <CardHeader>
              <h2 className="font-bold">Sipariş Özeti</h2>
            </CardHeader>
            <CardContent>
              <p>Ürünün Toplamı: {total.toFixed(2)} TL</p>
              <p>Kargo Toplamı: 39,99 TL</p>
              <p>Toplam: {(total + 39.99).toFixed(2)} TL</p>
              <Button className="w-full mt-4">Sepeti Onayla</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Cart;

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
import { Minus, PlusIcon, Trash } from "lucide-react";

interface CartItemProps {
  item: {
    productId: string;
    productName: string;
    price: number;
    quantity: number;
    imageUrl: string;
    description: string;
    stock: number;
  };
}

const CartItem = ({ item }: CartItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [inputValue, setInputValue] = useState<string>(String(item.quantity));

  const handleUpdateQuantity = (newQuantity: string) => {
    if (newQuantity === "") {
      setInputValue("");
      return;
    }
    const parsedValue = parseInt(newQuantity, 10);
    if (
      isNaN(parsedValue) ||
      parsedValue <= 0 ||
      parsedValue > 100 ||
      parsedValue > item.stock
    ) {
      setInputValue("");
      return;
    }

    setInputValue(String(parsedValue));
    dispatch(
      updateQuantity({ productId: item.productId, quantity: parsedValue })
    );
  };

  const handleBlur = () => {
    if (inputValue === "" || parseInt(inputValue, 10) <= 0) {
      setInputValue("1");
      handleUpdateQuantity("1");
    }
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
          <div>
            <span className="font-bold">{item.productName}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 gap-20">
          <div className="flex items-center gap-2">
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => handleUpdateQuantity(String(item.quantity - 1))}
              disabled={item.quantity === 1}
            >
              {<Minus className="w-4 h-4" />}
            </Button>
            <Input
              className="w-14 text-center"
              value={inputValue}
              onChange={(e) => handleUpdateQuantity(e.target.value)}
              onBlur={handleBlur}
            />
            <Button
              size={"sm"}
              variant={"outline"}
              onClick={() => handleUpdateQuantity(String(item.quantity + 1))}
              disabled={item.quantity === item.stock}
            >
              {<PlusIcon className="w-4 h-4" />}
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => dispatch(removeFromCart(item.productId))}
          >
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div>
          <p className="line-clamp-3">{item.description}</p>
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

  const total = cartItems.reduce(
    (acc: number, item: { price: number; quantity: number }) =>
      acc + item.price * item.quantity,
    0
  );

  if (!isClient) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className=" col-span-1 md:col-span-2">
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

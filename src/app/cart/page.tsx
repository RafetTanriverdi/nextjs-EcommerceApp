'use client'
import { useState } from 'react';
import { Button } from '@rt/components/ui/button';
import { Card, CardContent, CardHeader } from '@rt/components/ui/card';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <Card className="mb-4">
      <CardHeader className="flex justify-between items-center">
        <span className="font-bold">{item.seller}</span>
        <Button variant="ghost" size="sm" onClick={() => onRemove(item.id)}>
          Sil
        </Button>
      </CardHeader>
      <CardContent className="flex justify-between items-center">
        <div>
          <h4 className="font-bold">{item.name}</h4>
          <p>{item.price} TL</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</Button>
          <span>{item.quantity}</span>
          <Button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</Button>
        </div>
      </CardContent>
    </Card>
  );
};

const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Pandora Çift Taraflı Parlatma Bezi', seller: 'Pandora', price: 217.24, quantity: 1 },
    { id: 2, name: 'Pandora Moments Kalp Kilitli Zincir Bileklik', seller: 'Pandora', price: 2498.76, quantity: 1 },
    { id: 3, name: 'Pandora Moments Kalp Kilitli Zincir Bileklik', seller: 'Pandora', price: 2498.76, quantity: 1 },
    { id: 4, name: 'Pandora Moments Kalp Kilitli Zincir Bileklik', seller: 'Pandora', price: 2498.76, quantity: 1 },
    { id: 5, name: 'Pandora Moments Kalp Kilitli Zincir Bileklik', seller: 'Pandora', price: 2498.76, quantity: 1 },
    { id: 6, name: 'Pandora Moments Kalp Kilitli Zincir Bileklik', seller: 'Pandora', price: 2498.76, quantity: 1 },
    { id: 7, name: 'Ally Lightning Dönüştürücü', seller: 'BYANTEP', price: 140.04, quantity: 1 },
    { id: 8, name: 'Ally Lightning Dönüştürücü', seller: 'BYANTEP', price: 140.04, quantity: 1 },
    { id: 9, name: 'Ally Lightning Dönüştürücü', seller: 'BYANTEP', price: 140.04, quantity: 1 },
    { id: 10, name: 'Ally Lightning Dönüştürücü', seller: 'BYANTEP', price: 140.04, quantity: 1 },
    { id: 11, name: 'Ally Lightning Dönüştürücü', seller: 'BYANTEP', price: 140.04, quantity: 1 },
    { id: 12, name: 'Ally Lightning Dönüştürücü', seller: 'BYANTEP', price: 140.04, quantity: 1 },
  ]);

  const handleUpdateQuantity = (id, newQuantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          {items.map((item) => (
            <CartItem
              key={item.id}
              item={item}
              onUpdateQuantity={handleUpdateQuantity}
              onRemove={handleRemoveItem}
            />
          ))}
        </div>
        <div className="sticky top-24 self-start">
          <Card>
            <CardHeader>
              <h2 className="font-bold ">Sipariş Özeti</h2>
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

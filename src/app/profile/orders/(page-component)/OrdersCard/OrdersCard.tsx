"use client";
import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../../../components/ui/card";
import { Label } from "../../../../../components/ui/label";
import dayjs from "dayjs";
import { Button } from "../../../../../components/ui/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { PackageOpen } from "lucide-react";
import { Separator } from "../../../../../components/ui/separator";

interface OrderDetails {
  orderId: string;
  products: Array<{
    productImage: string[];
    productName: string;
    quantity: string;
    productPrice: string;
  }>;
  amountTotal: number;
  createdAt: string;
  shipping: {
    name: string;
    phone: string;
    address: {
      city: string;
      postal_code: string;
      line1: string;
      line2: string;
      country: string;
      state: string;
      phone: string;
      name: string;
    };
  };
  currentStatus: string;

}
const OrdersCard = ({ props }: { props: OrderDetails }) => {
  const router = useRouter();
  return (
    <Card className="m-3">
      <CardHeader className="flex-row justify-between bg-gray-100 dark:bg-zinc-800 grid grid-cols-2 md:grid-cols-4">
        <div>
          <Label className="text-base">Order Date</Label>
          <p className="text-sm">
            {dayjs(props.createdAt).format("MMMM,DD/YYYY")}
          </p>
        </div>
        <div className="text-right md:text-center">
          <Label className="text-base">Recipient</Label>
          <p className="text-sm">{props?.shipping?.name}</p>
        </div>
        <div className="text-left md:text-center">
          <Label className="text-base">Total </Label>
          <p className="text-sm">$ {(props.amountTotal / 100).toFixed(2)}</p>
        </div>
        <div className="text-right md:text-end  align-bottom ">
          <Button
            size={"sm"}
            onClick={() => router.push(`orders/${props.orderId}`)}
          >
            View Details
          </Button>
        </div>
      </CardHeader>
      <CardContent className="md:m-4 md:p-3 p-1">
        {props.products.map((product, index) => (
          <div
            key={index}
            className=" items-center grid grid-cols-2 md:grid-cols-4 border-2 p-2 m-1 md:m-2 rounded-lg"
          >
            <div className=" flex items-center ">
              <Image
                className="my-2 "
                key={index}
                src={product.productImage[0]}
                alt="product"
                width={75}
                height={75}
              />
              <div className="ml-2">
                <Label className=" md:text-lg md:font-bold">Product</Label>
                <p className="text-sm">{product.productName}</p>
              </div>
            </div>
            <div className=" flex justify-end md:block md:justify-normal">
              <div>
                <Label className="md:text-lg  md:font-bold">
                  {" "}
                  Estimated Delivery{" "}
                </Label>
                <p className="text-sm">{dayjs().format("MMMM,DD/YYYY")}</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <PackageOpen className="h-9 w-9 text-amber-500" />
              <div className="">
                <Label className="md:text-lg  md:font-bold">Order Status</Label>
                <p className="text-amber-500 text-sm">{props?.currentStatus}</p>
              </div>
            </div>
            <div className="  flex justify-end md:block md:justify-normal" >
              <div>
                <Label className="md:text-lg md:font-bold">Price</Label>
                <p className="text-sm">
                  {product.quantity} x{" $ "}
                  {product.productPrice} = ${" "}
                  {(
                    parseInt(product.productPrice) * parseInt(product.quantity)
                  ).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default OrdersCard;

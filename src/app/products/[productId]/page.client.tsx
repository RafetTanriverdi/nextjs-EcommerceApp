"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import axiosInstance from "../../../network/httpRequester";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { ENDPOINT } from "../../../network/EndPoint";
import Image from "next/image";
import { addToCart } from "../../../data/redux/cartSlice";
import { RootState } from "../../store";
import { Input } from "../../../components/ui/input";
import PageLoader from "./(page-component)/Loader/PageLoader";

interface ProductData {
  productId: string;
  imageUrls: string[];
  createdAt: string;
  stock: number;
  description: string;
  price: number;
  stripePriceId: string;
  productName: string;
}

interface ApiResponse {
  data: ProductData;
}

interface PageProps {
  params: {
    productId: string;
  };
}

const PageContainer: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state?.cart.items);
  const [selectedImage, setSelectedImage] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);

  const { data, error, isLoading } = useQuery<ApiResponse>({
    queryKey: ["productGet", params.productId],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINT.PRODUCT.GET.replace(":productId", params.productId)
      ),
  });

  const handleAddToCart = () => {
    if (data?.data) {
      const { imageUrls, ...productDetails } = data.data;
      const imageUrl = imageUrls[0];
      const priceId = data.data.stripePriceId;
      dispatch(addToCart({ ...productDetails, imageUrl, quantity, priceId }));
    }
  };

  if (isLoading) return <PageLoader />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 flex flex-col items-center">
          <div className="w-full h-96 relative mb-4">
            <Image
              src={`${data?.data?.imageUrls[selectedImage]}`}
              alt={`${data?.data?.productName}`}
              layout="responsive"
              width={500}
              height={500}
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto">
            {data?.data.imageUrls.map((url, index) => (
              <div
                key={index}
                className={`cursor-pointer border ${
                  selectedImage === index ? "border-black" : "border-gray-300"
                } rounded-lg overflow-hidden w-20 h-20`}
                onClick={() => setSelectedImage(index)}
              >
                <Image
                  src={url}
                  alt={`${data?.data.productName} - ${index + 1}`}
                  layout="responsive"
                  width={80}
                  height={80}
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
        </div>

        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold">{data?.data.productName}</h1>
            <p className="text-gray-600 mt-4">{data?.data.description}</p>
            <p className="text-2xl font-semibold mt-4">
              ${data?.data.price.toFixed(2)}
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="quantity" className="font-medium">
                Amount:
              </label>
              <Input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                min="1"
                className="w-16 text-center border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex gap-4">
              <Button className="w-full md:w-auto" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                className="w-full md:w-auto"
                variant="secondary"
                onClick={() => {
                  handleAddToCart(), router.push("/cart");
                }}
              >
                Buy Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageContainer;

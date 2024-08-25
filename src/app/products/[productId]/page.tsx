"use client";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import { axiosInstance } from "../../../network/httpRequester";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setClientSecret } from "../../../data/redux/clientSecretSlice";
import { ENDPOINT } from "../../../network/EndPoint";
import Image from "next/image";
import { addToCart } from "../../../data/redux/cartSlice";

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

const Page: React.FC<PageProps> = ({ params }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState<number>(0); // Görsel geçişi için state
  const [quantity, setQuantity] = useState<number>(1); // Miktar için state

  const { data, error } = useQuery<ApiResponse>({
    queryKey: ["productGet", params.productId],
    queryFn: () =>
      axiosInstance.get(
        ENDPOINT.getProduct.replace(":productId", params.productId)
      ),
  });

  const postbody = {
    priceId: data?.data.stripePriceId,
    return_url: "http://localhost:3000/cancel",
    quantity,
  };

  const handleAddToCart = () => {
    if (data?.data) {
      const { imageUrls, ...productDetails } = data.data;
      const imageUrl = imageUrls[0]; 
  
      dispatch(addToCart({ ...productDetails, imageUrl, quantity }));
    }
  };
  

  const mutation = useMutation({
    mutationKey: ["buy"],
    mutationFn: () => {
      return axiosInstance.post("/checkout", postbody);
    },
    onError: (error) => {
      console.error("Error during buying:", error);
    },
    onSuccess: (data) => {
      const clientSecret = data.data.session.client_secret;
      dispatch(setClientSecret(clientSecret));
      router.push("/payment");
    },
  });

  if (!data) return <p>Loading...</p>;

  return (
    <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
      {/* Sol Taraf: Ürün Görseli */}
      <div className="md:w-1/2 flex flex-col items-center">
        <div className="w-full h-96 relative mb-4">
          <Image
            src={data?.data.imageUrls[selectedImage]}
            alt={data?.data.productName}
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

      {/* Sağ Taraf: Ürün Detayları */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold">{data?.data.productName}</h1>
          <p className="text-gray-600 mt-4">{data?.data.description}</p>
          <p className="text-2xl font-semibold mt-4">${data?.data.price.toFixed(2)}</p>
        </div>

        {/* Miktar Seçimi ve Butonlar */}
        <div className="mt-6 flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <label htmlFor="quantity" className="font-medium">
              Miktar:
            </label>
            <input
              type="number"
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              min="1"
              className="w-16 text-center border border-gray-300 rounded-md"
            />
          </div>
          <div className="flex gap-4">
            <Button className="w-full md:w-auto" onClick={handleAddToCart}>
              Sepete Ekle
            </Button>
            <Button
              className="w-full md:w-auto"
              variant="secondary"
              onClick={() => mutation.mutate()}
            >
              Satın Al
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;

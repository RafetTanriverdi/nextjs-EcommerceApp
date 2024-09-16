import { Metadata, ResolvingMetadata } from "next";
import PageContainer from "./page.client";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../../../network/httpRequester";
import { ENDPOINT } from "../../../network/EndPoint";

interface PageProps {
  params: {
    productId: string;
  };
}

export async function generateMetadata(
  { params }: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const productId = params.productId;
  try {
    const response = await axiosInstance.get(
      `${ENDPOINT.PRODUCT.GET.replace(":productId", productId)}`
    );
    const product = response.data;

    return {
      title: `${product.productName} | Buy Now`,
      description: product.description,
   
    };
  } catch (error) {
    console.error("Failed to fetch product data:", error);
    return {
      title: "Product Not Found",
      description: "No product details available",
    };
  }
}

const Page = ({ params }: PageProps) => {
  return <PageContainer params={params} />;
};

export default Page;

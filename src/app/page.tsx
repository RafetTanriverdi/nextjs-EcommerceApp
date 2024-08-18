'use client';

import { useRouter } from "next/navigation";
import ProductCard from "../components/RTProductCart/RTProductCart";
import { Amplify } from "aws-amplify";
import awsExports from "../aws-exports";

Amplify.configure(awsExports)
export default function Home() {
const router=useRouter();
  return (
    <div>
      <ProductCard
        product={{
          id: "1",
          name: "Product 1",
          price: 100,
          imageUrl: "https://www.kaft.com/static/images/cache/1200/canta_nordhugsulphur_17061_1200_1200.jpg?cacheID=1675926790000",
        }}
        onAddToCart={(productId) => router.push(`products/${productId}`)}
      
      />
    </div>
  );
}

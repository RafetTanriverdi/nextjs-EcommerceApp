import React from "react";
import { Button } from "../../../components/ui/button";

const page = ({ params }: { params: { productId: string } }) => {
  return (
    <>
      <div>
        <h1>Product ID: {params.productId}</h1>
        <Button >Buy</Button>
      </div>
    </>
  );
};

export default page;

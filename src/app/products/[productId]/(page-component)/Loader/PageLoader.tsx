import React from "react";
import { Skeleton } from "../../../../../components/ui/skeleton";

const PageLoader = () => {
  return (
    <div className="flex gap-9 h-[calc(100vh-4rem)] ">
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-1/2 ">
          <Skeleton className="w-full h-3/5  " />
        </div>
        <div className="w-full md:w-1/2  ">
          <Skeleton className=" w-32 h-12 mb-10" />
          <Skeleton className=" h-32 mb-10" />
          <Skeleton className=" w-32 h-12 mb-28" />
          <Skeleton className=" w-48 h-12 mb-8" />
          <div className="flex gap-3">
            <Skeleton className=" w-32 h-12 mb-8" />
            <Skeleton className=" w-32 h-12 mb-8" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;

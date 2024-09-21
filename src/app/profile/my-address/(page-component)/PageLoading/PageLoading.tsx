import React from "react";
import { Skeleton } from "../../../../../components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../../../components/ui/card";
import { Separator } from "../../../../../components/ui/separator";

const CardSkeleton = () => {
  return (
    <Card>
      <CardHeader className="flex-row justify-between">
        <div>
          <Skeleton className=" h-8 w-36" />
        </div>
        <div className="flex gap-3">
          <Skeleton className=" h-8 w-8" />
          <Skeleton className=" h-8 w-8" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between">
          <Skeleton className=" h-6  w-20" />
          <Skeleton className=" h-6 w-20" />
        </div>
        <Separator className="my-4" />
        <div>
          <Skeleton className=" h-6 mb-3 w-36" />
        </div>
        <div>
          <Skeleton className=" h-6 mb-3 w-36" />
        </div>
        <div>
          <Skeleton className=" h-6 mb-3 w-36" />
        </div>
        <div>
          <Skeleton className=" h-6 mb-3 w-36" />
        </div>
        <div>
          <Skeleton className=" h-6 mb-3 w-36" />
        </div>
      </CardContent>
    </Card>
  );
};

const PageLoading = () => {
  return (
    <div className="">
      <Skeleton className=" h-8 m-3 w-36" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-5 justify-center m-3">
      {[1,2,3,4,5,6,7,8].map((item) => (
        <CardSkeleton key={item} />
        ))}
      </div>
    </div>
  );
};

export default PageLoading;

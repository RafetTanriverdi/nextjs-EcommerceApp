import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "../../../../../components/ui/card";
import { Skeleton } from "../../../../../components/ui/skeleton";

const ContentLoader = () => {
  return (
    <div className=" items-center grid grid-cols-2 md:grid-cols-4 border-2 p-2 m-1 md:m-2 rounded-lg">
      <div className=" flex items-center ">
        <Skeleton className="w-20 h-20 " />
        <div className="ml-2 ">
          <Skeleton className="w-24 h-6 mb-2" />
          <Skeleton className="w-36 h-5  " />
        </div>
      </div>
      <div className=" flex justify-end md:block md:justify-normal">
        <div>
          <Skeleton className="w-24 h-6 mb-2" />
          <Skeleton className="w-36 h-5  " />
        </div>
      </div>
      <div className="flex gap-2 items-center">
        <Skeleton className="h-11 w-11" />
        <div className="">
          <Skeleton className="w-24 h-6 mb-2" />
          <Skeleton className="w-36 h-5  " />
        </div>
      </div>
      <div className="  flex justify-end md:block md:justify-normal">
        <div>
          <Skeleton className="w-24 h-6 mb-2" />
          <Skeleton className="w-36 h-5  " />
        </div>
      </div>
    </div>
  );
};

const PageLoader = () => {
  return (
    <Card className="m-3">
      <CardHeader className="  bg-gray-100  dark:bg-zinc-800 grid grid-cols-2 md:grid-cols-4">
        <div className="">
          <Skeleton className="w-24 h-6   mb-2 bg-gray-300 dark:bg-zinc-600" />
          <Skeleton className="w-36 h-5 bg-gray-300 dark:bg-zinc-600  " />
        </div>
        <div className=" mx-auto">
          <Skeleton className="w-24 h-6 mb-2 bg-gray-300 dark:bg-zinc-600 mx-auto" />
          <Skeleton className="w-36 h-5 bg-gray-300 dark:bg-zinc-600 " />
        </div>
        <div className=" mx-auto">
          <Skeleton className="w-24 h-6 mb-2 bg-gray-300 dark:bg-zinc-600 mx-auto" />
          <Skeleton className="w-36 h-5 bg-gray-300 dark:bg-zinc-600 " />
        </div>

        <div className="flex justify-end">
          <Skeleton className="w-32 h-8 bg-gray-300 dark:bg-zinc-600  my-auto" />
        </div>
      </CardHeader>
      <CardContent className="md:m-4 md:p-3 p-1">
        {[1, 2, 3, 4].map((item) => (
          <ContentLoader key={item  } />
        ))}
      </CardContent>
    </Card>
  );
};

export default PageLoader;

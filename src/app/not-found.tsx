"use client";
import { Button } from "@rt/components/ui/button";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const router = useRouter();

  const goBackHome = () => {
    router.push("/products");
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center p-6">
      <div className="text-center space-y-8 max-w-lg mx-auto">
        <div className="pt-8">
          <h1 className="text-8xl font-extrabold text-gray-700">404</h1>
          <p className="text-xl text-gray-500 mt-4">
            Oops! The page you&apos;re looking for doesn&apos;t exist.
          </p>
        </div>

        <div className="px-6 ">
          <p className="text-lg text-gray-500">
            Maybe it was removed, or you mistyped the URL. Let&apos;s get you
            back on track!
          </p>
        </div>

        <div>
          <Button
            onClick={goBackHome}
            className="mt-3 mx-auto px-8  rounded-lg flex items-center justify-center  transition-colors duration-300"
          >
            <ArrowLeft className="mr-2 h-5 w-5" />
            Go Back Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;

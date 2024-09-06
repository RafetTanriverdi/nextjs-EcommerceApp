"use client";
import { Button } from "@rt/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@rt/components/ui/card";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

const NotFoundPage = () => {
  const router = useRouter();

  const goBackHome = () => {
    router.push("/"); // Ana sayfaya yönlendirme
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center text-white p-6">
      <div className="text-center space-y-8">
        <Card className="bg-transparent  border-none">
          <CardHeader className="pt-8">
            <CardTitle className="text-8xl font-extrabold text-gray-600">
              404
            </CardTitle>
            <p className="text-xl text-gray-500 mt-4">
              Oops! The page you're looking for doesn't exist.
            </p>
          </CardHeader>
          <CardContent className="px-8 py-8 ">
            <p className="text-lg text-gray-500">
              Maybe it was removed, or you mistyped the URL. Let's get you back
              on track!
            </p>
            <Button
              onClick={goBackHome}
              className="mt-6 mx-auto px-8 py-3 rounded-lg flex items-center justify-center transition-colors duration-300"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back Home
            </Button>
          </CardContent>
        </Card>
        
      </div>
    </div>
  );
};

export default NotFoundPage;

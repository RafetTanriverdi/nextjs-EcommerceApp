import { Skeleton } from "../ui/skeleton";
import { Card, CardHeader, CardContent, CardFooter } from "@rt/components/ui/card";

export function RTSkeleton() {
  return (
    <Card className="rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="relative">
        <Skeleton className="w-full h-48 rounded-t-lg" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="h-4 w-1/2 mt-2 rounded-md" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-10 w-full mt-4 rounded-md" />
      </CardFooter>
    </Card>
  );
}

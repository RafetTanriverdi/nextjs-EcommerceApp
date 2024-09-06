"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  CircleUser,
  Menu,
  Moon,
  Package2,
  ShoppingCart,
  Sun,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@rt/components/ui/sheet";
import { Button } from "@rt/components/ui/button";
import { Badge } from "@rt/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@rt/components/ui/dropdown-menu";
import { usePathname, useRouter } from "next/navigation";
import { signOut } from "aws-amplify/auth";
import { Amplify } from "aws-amplify";
import awsmobile from "../../../aws-exports";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { RootState } from "../../../app/store";
import { useTheme } from "next-themes";
import Image from "next/image";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDPOINT } from "../../../network/EndPoint";
import axiosInstance from "../../../network/httpRequester";
import RTButton from "../RTButton";

Amplify.configure(awsmobile);

const routes = [
  { name: "Home", href: "/products" },
  { name: "Orders", href: "/orders" },
  { name: "Categories", href: "/categories" },
  { name: "Settings", href: "/settings" },
];

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["profile"],
    queryFn: () => axiosInstance.get(ENDPOINT.PROFILE.GET),
  });

  const cartItems = useSelector((state: RootState) => state?.cart.items);
  const [hasMounted, setHasMounted] = useState(false);
  const { setTheme, theme } = useTheme();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  const isLogedIn = Cookies.get("accessToken") || null;
  const handleLogout = async () => {
    try {
      await signOut();
      Cookies.remove("accessToken");
      router.push("/auth/login");
      router.refresh();
      queryClient.removeQueries();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="#"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Package2 className="h-6 w-6" />
            <span className="sr-only">Acme Inc</span>
          </Link>
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={` transition-colors hover:text-foreground ${
                pathname === route.href
                  ? "text-foreground font-bold"
                  : "text-muted-foreground"
              }`}
            >
              {route.name}
            </Link>
          ))}
        </nav>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <nav className="grid gap-6 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">Acme Inc</span>
              </Link>
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={route.href}
                  className={`text-muted-foreground hover:text-foreground ${
                    pathname === route.href ? "text-foreground font-bold" : ""
                  }`}
                >
                  {route.name}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-4 ml-auto">
          {hasMounted && theme === "dark" ? (
            <Moon onClick={() => setTheme("light")} />
          ) : (
            <Sun onClick={() => setTheme("dark")} />
          )}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="relative">
                <Button variant="outline" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
                {hasMounted && cartItems.length > 0 && (
                  <Badge
                    variant="outline"
                    className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2 bg-black text-white text-xs px-2 py-1 rounded-full"
                  >
                    {cartItems.length}
                  </Badge>
                )}
              </div>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-64 p-2">
              <div className="p-2">
                <h4 className="font-bold">Sepet Özeti</h4>
                {cartItems.length > 0 ? (
                  <>
                    {cartItems?.map((item) => (
                      <div
                        key={item.productId}
                        className="flex justify-between"
                      >
                        <span>{item.productName}</span>
                        <span>${item?.price.toFixed(2)}</span>
                      </div>
                    ))}
                    <Button
                      variant="default"
                      className="w-full mt-2"
                      onClick={() => router.push("/cart")}
                    >
                      Sepete Git
                    </Button>
                  </>
                ) : (
                  <p>Sepetiniz boş</p>
                )}
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              {isLogedIn ? (
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  {data?.data?.profilePictureUrl ? (
                    <div className="rounded-full overflow-hidden w-10 h-10 border border-gray-300">
                      <Image
                        alt="profile picture"
                        src={data?.data?.profilePictureUrl}
                        width={40}
                        height={40}
                        objectFit="cover" // Change to cover to fill the circle
                        layout="fixed"
                      />
                    </div>
                  ) : (
                    <CircleUser className="h-5 w-5" />
                  )}
                </Button>
              ) : (
                <RTButton.Action
                  onClick={() => router.push("/auth/login")}
                  text="Sign In"
                  size="sm"
                />
              )}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => router.push("/profile")}>
                My Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => router.push("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    </>
  );
};

"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Home,
  LineChart,
  MapPinCheck,
  ShoppingCart,
  Users,
} from "lucide-react";

const profileRoutes = [
  {
    icon: <Home className="h-4 w-4" />,
    name: "Dashboard",
    href: "/profile/info",
  },
  {
    icon: <ShoppingCart className="h-4 w-4" />,
    name: "Orders",
    href: "/profile/orders",
  },
  {
    icon: <MapPinCheck className="h-4 w-4" />,
    name: "My Address",
    href: "/profile/my-address",
  },
  {
    icon: <Users className="h-4 w-4" />,
    name: "Customers",
    href: "/profile/customers",
  },
  {
    icon: <LineChart className="h-4 w-4" />,
    name: "Analytics",
    href: "/profile/analytics",
  },
];

export const SideBar = () => {
  const pathname = usePathname();
  const active = pathname.split("/")[2];
  return (
    <div className=" border-r bg-muted/40 w-full min-h-[calc(100vh-4rem)] max-h-[calc(100vh-4rem)] sticky top-16 ">
      <div className="flex h-full max-h-max flex-col gap-2 ">
        <div className="flex-1">
          <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
            {profileRoutes.map((route) => (
              <>
                <Link
                  href={route.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                    active === route.href.split("/")[2]
                      ? "bg-muted text-primary"
                      : ""
                  }`}
                >
                  {route.icon}
                  {route.name}
                </Link>
              </>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

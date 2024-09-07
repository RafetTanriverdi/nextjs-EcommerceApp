"use client";
import React from "react";
import { SideBar } from "./(page-component)/RTSidebar/SideBar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../components/ui/breadcrumb";
import Link from "next/link";

const Layout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const pathname = usePathname();
  const piecesOfPathname = pathname.split("/");

  const formatPathname = (str: string) => {
    if (str.includes("-")) {
      return str
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
    }
    return str.charAt(0).toUpperCase() + str.slice(1); // Normal segmentler için sadece baş harfi büyüt
  };

  return (
    <>
      {!!piecesOfPathname[2] && (
        <Breadcrumb className="block md:hidden">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href={`/${piecesOfPathname[1]}`}>
                  {formatPathname(piecesOfPathname[1])}
                </Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />

            <BreadcrumbItem>
              <BreadcrumbPage>
                {formatPathname(piecesOfPathname[2])}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      )}
      <div className="grid  w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden md:grid">
          <SideBar />
        </div>
        <div className="flex flex-col">{children}</div>
      </div>
    </>
  );
};

export default Layout;

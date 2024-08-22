"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/RTHeader/Header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <head>
          <link rel="icon" href="/favicon.ico" sizes="any"></link>
        </head>
        <html lang="en">
          <body className={inter.className}>
            <Header />
            {children}
        <ReactQueryDevtools initialIsOpen={false} />
          </body>
        </html>
      </QueryClientProvider>
    </>
  );
}

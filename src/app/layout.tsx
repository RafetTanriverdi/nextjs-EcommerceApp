"use client";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/PlatformComponent/RTHeader/Header";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";
import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider } from "../components/ThemeProvider/theme-provider";
import { Toaster } from "../components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <head>
        
        <link rel="icon" href="/favicon.ico" sizes="any"></link>
      </head>
      
      <html lang="en">
        <body className={inter.className}>
          <QueryClientProvider client={queryClient}>
            <Provider store={store}>
              <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
              >
                <Header />
                {children}
                <Toaster   />
              </ThemeProvider>
            </Provider>
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
        </body>
      </html>
    </>
  );
}

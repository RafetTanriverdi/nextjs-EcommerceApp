import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "../components/RTHeader/Header";
import awsmobile from "../aws-exports";
import { Amplify } from "aws-amplify";

const inter = Inter({ subsets: ["latin"] });

Amplify.configure(awsmobile, { ssr: true });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any"></link>
      </head>
      <html lang="en">
        <body className={inter.className}>
          <Header />
          {children}
        </body>
      </html>
    </>
  );
}

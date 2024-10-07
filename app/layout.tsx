import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Providers from "@/components/Providers";
import Header from "@/components/header/Header";
import { Footer } from "./page";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Deby Hotel",
  description: "By Makhosi Ncube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <div className="w-full min-h-screen text-gray-200 bg-gray-800">
          <ToastContainer/>
          <Header/>
          {children}
          <Footer/>
        </div>

        </Providers>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"
import Providers from "@/components/Providers";
import Navbar from "@/components/header/Menu";

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
  icons: {
    icon: '/hotelfront.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="shortcut icon" href="/hotelfront.jpg" type="image/x-icon" />
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Providers>
        <div className="w-full min-h-screen text-gray-200 bg-gray-800">
        <ToastContainer  theme="colored" />
          <Navbar/>
          {children}
        </div>

        </Providers>
      </body>
    </html>
  );
}

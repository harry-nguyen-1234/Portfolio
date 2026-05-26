import "./globals.css";
import { Montserrat, Poppins } from "next/font/google";
import type { Metadata } from "next";
import { userAgent } from "next/server";
import { headers } from 'next/headers';
import CanvasWrapper from "@/components/CanvasWrapper";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
})

const poppins = Poppins({
  variable: '--font-poppins',
  weight: '400',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: "Harry Nguyen",
  description: "Harry Nguyen's software development portfolio",
};

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });

  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} h-full antialiased scrollbar-gutter-stable`}>
      <body className="h-full flex flex-col">
        {device.type !== 'mobile' && <CanvasWrapper />}
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

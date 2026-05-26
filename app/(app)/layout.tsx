import "./globals.css";
import { Montserrat, Poppins } from "next/font/google";
import { HiOutlineCode, HiOutlineHome } from "react-icons/hi";
import { FiGithub, FiLinkedin } from "react-icons/fi";
import type { Metadata } from "next";
import { userAgent } from "next/server";
import Link from "next/link";
import { headers } from 'next/headers';
import CircleLink from "@/components/CircleLink";
import CanvasWrapper from "@/components/CanvasWrapper";

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
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col mx-auto w-full max-w-screen-2xl px-6">
        {device.type !== 'mobile' && <CanvasWrapper />}
        <header className="py-8 flex justify-between">
          <Link className="hyperlink text-lg p-4 -ml-4 flex items-center gap-2" href='/'>
            <HiOutlineHome className="size-6" />
            <span className="hyperlink-text">Home</span>
          </Link>
          <nav>
            <Link className="hyperlink text-lg p-4 flex items-center gap-2" href='/projects'>
              <HiOutlineCode className="size-6" />
              <span className="hyperlink-text">Projects</span>
            </Link>
          </nav>
        </header>
        {children}
        <footer className="py-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
          © Harry Nguyen 2026
          <div className="flex justify-end gap-4">
            {/* Social media links */}
            <CircleLink ariaLabel="Visit Harry's GitHub website" href="https://github.com/harry-nguyen-1234?tab=repositories">
              <FiGithub className="size-5" />
            </CircleLink>
            <CircleLink ariaLabel="Visit Harry's LinkedIn page" href="https://www.linkedin.com/in/harrynguyen2024/">
              <FiLinkedin className="size-5" />
            </CircleLink>
          </div>
        </footer>
      </body>
    </html>
  );
}

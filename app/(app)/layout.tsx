import "./globals.css";
import clsx from "clsx";
import { Montserrat, Poppins } from "next/font/google";
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import config from '@payload-config';
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

  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} h-full antialiased px-6`}>
      <body className="min-h-full flex flex-col mx-auto w-full max-w-screen-2xl">
        <CanvasWrapper />
        <header className="py-8 flex justify-between">
          <Link className="hyperlink text-lg p-4 -ml-4 flex items-center gap-2" href='/'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
            </svg>
            <span className="hyperlink-text">Home</span>
          </Link>
          <nav>
            <Link className="hyperlink text-lg p-4 flex items-center gap-2" href='/projects'>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3-4.5 16.5" />
              </svg>
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
              <svg className="size-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                </path>
              </svg>
            </CircleLink>
            <CircleLink ariaLabel="Visit Harry's LinkedIn page" href="https://www.linkedin.com/in/harrynguyen2024/">
              <svg className="size-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </CircleLink>
          </div>
        </footer>
      </body>
    </html>
  );
}

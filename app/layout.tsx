import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";

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
  description: "Harry Nguyen's front-end development portfolio",
};

export default function RootLayout({ children, }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} h-full antialiased px-6`}>
      <body className="min-h-full flex flex-col mx-auto w-full max-w-screen-xl">
        <header className="py-8 flex justify-between">
          <p>Logo</p>
          <nav>
            <Link href='/projects'>Projects</Link>
          </nav>
        </header>
        {children}
        <footer className="py-8 flex justify-between">© Harry Nguyen 2026</footer>
      </body>
    </html>
  );
}

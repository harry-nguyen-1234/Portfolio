import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import GithubLink from "@/components/github-link";
import LinkedinLink from "@/components/linkedin-link";

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
      <body className="min-h-full flex flex-col mx-auto w-full max-w-screen-2xl">
        <header className="py-8 flex justify-between">
          <Link href='/'>Home</Link>
          <nav>
            <Link className="hyperlink text-lg p-4 -mr-4" href='/projects'>
              <span>Projects</span>
            </Link>
          </nav>
        </header>
        {children}
        <footer className="py-8 flex flex-col justify-between gap-4 sm:flex-row">
          © Harry Nguyen 2026
          <div className="flex justify-end gap-4">
            <GithubLink />
            <LinkedinLink />
          </div>
        </footer>
      </body>
    </html>
  );
}

import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import { headers } from 'next/headers';
import { getPayload } from 'payload';
import config from '@payload-config';
import CircleLink from "@/components/CircleLink";

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

export default async function RootLayout({ children, }: { children: React.ReactNode }) {
  const payload = await getPayload({ config });
  const { user } = await payload.auth({ headers: await headers() })

  return (
    <html lang="en" className={`${montserrat.variable} ${poppins.variable} h-full antialiased px-6`}>
      <body className="min-h-full flex flex-col mx-auto w-full max-w-screen-2xl">
        <header className="py-8 flex justify-between">
          <Link href='/'>Home</Link>
          <nav>
            <Link className="hyperlink text-lg p-4 -mr-4" href='/projects'>
              <span className="hyperlink-text">Projects</span>
            </Link>
            {user &&
              <Link className="hyperlink text-lg p-4 -mr-4" href='/admin'>
                <span className="hyperlink-text">Admin</span>
              </Link>
            }
          </nav>
        </header>
        {children}
        <footer className="py-8 flex flex-col justify-between gap-4 sm:flex-row">
          © Harry Nguyen 2026
          <div className="flex justify-end gap-4">
            {/* Social media links */}
            <CircleLink ariaLabel="Visit Harry's GitHub website" href="https://github.com/harry-nguyen-1234?tab=repositories">
              <svg focusable="false" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path
                  d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22">
                </path>
              </svg>
            </CircleLink>
            <CircleLink ariaLabel="Visit Harry's LinkedIn page" href="https://www.linkedin.com/in/harrynguyen2024/">
              <svg focusable="false" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
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

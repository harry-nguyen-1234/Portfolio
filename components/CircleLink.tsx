import Link from "next/link";
import { UrlObject } from "url";

export default function CircleLink({ href, ariaLabel, children }: { href: string | UrlObject, ariaLabel: string, children: React.ReactNode }) {
  return <Link aria-label={ariaLabel} className="hover:bg-foreground hover:text-background hover:border-foreground transition-colors duration-200 flex items-center justify-center rounded-full border-2 h-8 w-8" href={href} target="_blank">{children}</Link>
}
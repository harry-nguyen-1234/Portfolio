import Link from "next/link";
import { HiOutlineCode, HiOutlineHome } from "react-icons/hi";

export default function Header() {
  return <header className="py-8 flex justify-between">
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
  </header>;
}
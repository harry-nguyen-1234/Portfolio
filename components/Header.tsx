'use client'

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { HiOutlineCode, HiOutlineHome, HiOutlineMenu, HiOutlineX } from "react-icons/hi";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home', icon: <HiOutlineHome className="size-6" /> },
    { href: '/projects', label: 'Projects', icon: <HiOutlineCode className="size-6" /> },
  ];

  return <header className="py-4 sm:py-8 px-6 flex justify-center sticky top-0 z-10 bg-background/90">
    <div className="flex justify-end w-full max-w-screen-2xl">
      {/* Desktop nav menu */}
      <nav className="hidden sm:flex justify-between w-full" aria-label="desktop-navigation">
        {navLinks.map(({ href, label, icon }) => (
          <Link
            key={href}
            className="hyperlink text-lg py-4 px-6 flex items-center gap-2"
            href={href}
          >
            {icon}
            <span className="hyperlink-text">{label}</span>
          </Link>
        ))}
      </nav>
      <button
        className="sm:hidden p-1 ml-auto rounded-full border-foreground border-2"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label={menuOpen ? 'Close menu' : 'Open menu'}
      >
        <AnimatePresence mode="wait" initial={false}>
          {menuOpen ? (
            <motion.div
              key="close"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <HiOutlineX className="size-6" />
            </motion.div>
          ) : (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.1 }}
            >
              <HiOutlineMenu className="size-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </button>

      {/* mobile nav */}
      <AnimatePresence>
        {
          menuOpen &&
          <motion.nav key="mobile-nav"
            className="sm:hidden fixed top-17 left-0 right-0 flex flex-col bg-surface z-20"
            initial={{ opacity: 0, scale: 0.8, transformOrigin: 'top' }}
            animate={{ opacity: 1, scale: 1, transformOrigin: 'top' }}
            exit={{ opacity: 0, scale: 0.8, transformOrigin: 'top' }}
            transition={{ duration: 0.2 }}
            aria-label="mobile-navigation"
          >
            {navLinks.map(({ href, label, icon }) => (
              <Link
                key={href}
                className="text-lg py-4 px-6 flex items-center gap-2 active:bg-surface-sunken"
                href={href}
                onClick={() => setMenuOpen(false)}
              >
                {icon}
                <span>{label}</span>
              </Link>
            ))}
          </motion.nav>
        }
      </AnimatePresence>
    </div>
  </header>;
}
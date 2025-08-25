"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const nav = [
  { href: "/#features", label: "Features" },
  { href: "/#how-it-works", label: "How It Works" },
  { href: "/#loan-info", label: "Loan Info" },
  { href: "/#testimonials", label: "Testimonials" },
  { href: "/#contact", label: "Contact" },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);

  // helper: close menu and scroll smoothly
  const handleNavClick = (id: string) => {
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:py-4">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-bold tracking-tight text-blue-700">
            LoanVerify.<span className="text-gray-900">AI</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((n) => (
            <button
              key={n.href}
              onClick={() => handleNavClick(n.href)}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              {n.label}
            </button>
          ))}
        </nav>

        {/* Actions (desktop) */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={() => handleNavClick("#otp")}
            className="text-sm text-gray-700 hover:text-gray-900"
          >
            Log in
          </button>
          <Button
            onClick={() => handleNavClick("#otp")}
            className="rounded-xl"
          >
            Get Started
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex rounded-md p-2 md:hidden"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-white md:hidden">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {nav.map((n) => (
              <button
                key={n.href}
                onClick={() => handleNavClick(n.href)}
                className="rounded-md px-2 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
              >
                {n.label}
              </button>
            ))}
            <div className="mt-2 flex flex-col gap-2">
              <button
                onClick={() => handleNavClick("#otp")}
                className="text-sm text-gray-700 hover:text-gray-900"
              >
                Log in
              </button>
              <Button
                onClick={() => handleNavClick("#otp")}
                className="rounded-xl w-full"
              >
                Get Started
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PiggyBank, Menu, X } from "lucide-react";

const PublicNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 w-full border-b border-gray-200 bg-white/80 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100 text-emerald-600">
            <PiggyBank className="h-6 w-6" />
          </span>
          <span className="text-xl font-semibold tracking-tight text-gray-900">
            FamLedger
          </span>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          <Link
            href="/login"
            className="text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="inline-flex items-center rounded-lg bg-indigo-600 px-3.5 py-2 text-sm font-medium text-white transition-colors hover:bg-indigo-700"
          >
            Get started free
          </Link>
        </div>

        <button
          className="md:hidden rounded-md p-2 text-gray-600 hover:bg-gray-100"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {isOpen && (
        <div className="border-t border-gray-200 bg-white px-4 pb-4 pt-3 md:hidden">
          <Link
            href="/login"
            className="block rounded-md px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            onClick={() => setIsOpen(false)}
          >
            Log in
          </Link>
          <Link
            href="/register"
            className="mt-1 block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-medium text-white hover:bg-indigo-700"
            onClick={() => setIsOpen(false)}
          >
            Get started free
          </Link>
        </div>
      )}
    </header>
  );
};

export default PublicNav;

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { PiggyBank } from "lucide-react";

const PublicNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="w-full border-b border-gray-200 bg-white">
      <nav className="max-w-7xl mx-auto flex items-center justify-between px-4 py-4">
        {/* Logo */}
        <div className="flex flex-row gap-3 items-center">
          <PiggyBank
            height={50}
            width={50}
            color="white"
            className="bg-blue-600 rounded-2xl p-2"
          />
          <Link href="/" className="text-2xl font-semibold text-gray-800">
            FamLedger
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/login" className="text-gray-600 hover:text-black">
            Login
          </Link>

          <Link
            href="/register"
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden block" onClick={() => setIsOpen(!isOpen)}>
          <div className="space-y-1.5">
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </div>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3">
          <Link href="/login" className="block text-gray-700">
            Login
          </Link>

          <Link
            href="/register"
            className="block w-full text-center px-4 py-2 rounded-lg bg-blue-600 text-white"
          >
            Get Started
          </Link>
        </div>
      )}
    </header>
  );
};

export default PublicNavbar;

"use client";

import React, { useEffect, useState } from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

function MainLayout({ children }: { children: React.ReactNode }) {
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

  const openMobileNav = () => setIsMobileNavOpen(true);
  const closeMobileNav = () => setIsMobileNavOpen(false);

  // Lock body scroll while the mobile drawer is open.
  useEffect(() => {
    if (isMobileNavOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMobileNavOpen]);

  return (
    // Sidebar (lg+) + scrollable main column. Each page owns its own padding.
    <div className="flex h-screen bg-gray-50">
      <SideBar isMobileOpen={isMobileNavOpen} onCloseMobile={closeMobileNav} />

      <div className="flex flex-1 flex-col overflow-y-auto">
        <NavBar onOpenMobileNav={openMobileNav} />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;

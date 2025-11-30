"use client";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { navItems } from "./SideBar";
import { useAppSelector } from "@/app/hooks/useAuth";

function NavBar() {
  const pathName = usePathname();
  const user = useAppSelector((state) => state.auth.user);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Use consistent defaults for initial render (server and first client render)
  const currentPageName = isClient 
    ? navItems.find((n) => n.href === pathName)?.name || "Dashboard"
    : "Dashboard";
  
  const displayUserName = isClient ? (user?.name || "") : "";

  return (
    <div>
      {/* Top Navigation Bar / Header */}
      <header className="sticky top-0 z-10 flex items-center justify-between p-4 bg-white border-b shadow-sm">
        <div>
          <h1 className="text-xl font-semibold">{currentPageName}</h1>
          <h2 className="text-sm font-normal text-gray-500">
            {displayUserName ? `Welcome Back ${displayUserName}` : "Welcome Back"}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-5 h-5 text-gray-500 cursor-pointer"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>

          {/* Notification Icon */}
          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500 cursor-pointer"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            <span className="absolute top-0 right-0 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </div>

          {/* User Profile / Family */}
          <div className="flex items-center space-x-2">
            <div className="text-right">
              <div className="text-sm font-semibold">{displayUserName || "User"}</div>
              <div className="text-xs text-gray-500">
                {isClient && user?.familyName ? `${user.familyName} Family` : "Family"}
              </div>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
              {(displayUserName?.[0] || "U").toUpperCase()}
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default NavBar;

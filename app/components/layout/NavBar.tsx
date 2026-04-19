"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, LogOut, Mail, Settings, User } from "lucide-react";
import { navItems } from "./SideBar";
import { useAppDispatch, useAppSelector } from "@/app/hooks/useAuth";
import { logoutUser } from "@/app/services/slices/authSlice";

const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const roleBadgeClass = (role?: string) => {
  const r = role?.toLowerCase() ?? "";
  if (r === "admin" || r === "administrator") {
    return "bg-amber-50 text-amber-800 border-amber-200";
  }
  return "bg-slate-100 text-slate-700 border-slate-200";
};

const roleLabel = (role?: string) => {
  const r = role?.toLowerCase() ?? "";
  if (r === "admin" || r === "administrator") return "Admin";
  return "Member";
};

function NavBar() {
  const pathName = usePathname();
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();

  const [isClient, setIsClient] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setIsMenuOpen(false);
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isMenuOpen]);

  const activeItem = navItems.find((n) => n.href === pathName);
  const pageTitle = isClient ? activeItem?.name ?? "Dashboard" : "Dashboard";

  const firstName = isClient && user?.name ? user.name.split(" ")[0] : "";
  const displayUserName = isClient ? user?.name ?? "" : "";
  const initial = (displayUserName?.[0] || "U").toUpperCase();

  // Dashboard gets the warm greeting; other pages get the route description.
  const subtitle = (() => {
    if (!isClient) return "";
    if (pathName === "/dashboard") {
      return firstName
        ? `${getTimeGreeting()}, ${firstName} — here's how your family is tracking this month.`
        : `${getTimeGreeting()} — here's how your family is tracking this month.`;
    }
    return activeItem?.description ?? "";
  })();

  const handleLogout = () => {
    setIsMenuOpen(false);
    dispatch(logoutUser());
    router.push("/login");
  };

  return (
    <header className="sticky top-0 z-20 flex items-center justify-between gap-4 px-6 py-4 bg-white border-b shadow-sm">
      <div className="min-w-0">
        <h1 className="text-xl font-semibold text-gray-900 truncate">
          {pageTitle}
        </h1>
        {subtitle && (
          <p className="text-sm text-gray-500 truncate">{subtitle}</p>
        )}
      </div>

      <div className="flex items-center gap-3 shrink-0" ref={menuRef}>
        <button
          type="button"
          onClick={() => setIsMenuOpen((prev) => !prev)}
          className="flex items-center gap-2 rounded-full border border-gray-200 bg-white p-1 pr-3 hover:bg-gray-50 transition-colors"
          aria-haspopup="menu"
          aria-expanded={isMenuOpen}
        >
          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-sm">
            {initial}
          </div>
          <div className="hidden sm:flex flex-col items-start leading-tight">
            <span className="text-sm font-semibold text-gray-800 max-w-[140px] truncate">
              {displayUserName || "User"}
            </span>
            <span className="text-xs text-gray-500 max-w-[140px] truncate">
              {isClient && user?.familyName
                ? `${user.familyName} Family`
                : "Family"}
            </span>
          </div>
          <ChevronDown
            className={`h-4 w-4 text-gray-400 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </button>

        {isMenuOpen && (
          <div
            role="menu"
            className="absolute right-6 top-full mt-2 w-72 rounded-xl border border-gray-200 bg-white shadow-lg overflow-hidden z-30"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                {initial}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {displayUserName || "User"}
                </p>
                <p className="text-xs text-gray-500 truncate flex items-center gap-1">
                  <Mail className="h-3 w-3 shrink-0" aria-hidden />
                  <span className="truncate">{user?.email ?? "—"}</span>
                </p>
                <span
                  className={`mt-1 inline-block rounded-md border px-2 py-0.5 text-[11px] font-medium ${roleBadgeClass(
                    user?.role
                  )}`}
                >
                  {roleLabel(user?.role)}
                </span>
              </div>
            </div>

            {user?.familyName && (
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                  Family
                </p>
                <p className="text-sm text-gray-800 truncate">
                  {user.familyName} Family
                </p>
              </div>
            )}

            <div className="py-1">
              <Link
                href="/members"
                onClick={() => setIsMenuOpen(false)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                role="menuitem"
              >
                <User className="h-4 w-4 text-gray-500" />
                Family members
              </Link>
              <button
                type="button"
                disabled
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-gray-400 cursor-not-allowed"
                role="menuitem"
                title="Coming soon"
              >
                <Settings className="h-4 w-4" />
                Settings
                <span className="ml-auto text-[10px] uppercase tracking-wide text-gray-400">
                  Soon
                </span>
              </button>
            </div>

            <div className="border-t border-gray-100 py-1">
              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                role="menuitem"
              >
                <LogOut className="h-4 w-4" />
                Log out
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default NavBar;

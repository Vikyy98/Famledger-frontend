"use client";

import {
  PiggyBank,
  LayoutDashboard,
  DollarSign,
  Wallet,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";

export interface NavItem {
  name: string;
  href: string;
  /** Subtitle shown in the top navbar for this route. */
  description: string;
  Icon: React.ComponentType<{ className?: string }>;
}

export const navItems: NavItem[] = [
  {
    name: "Dashboard",
    href: "/dashboard",
    description: "Your family's money at a glance",
    Icon: LayoutDashboard,
  },
  {
    name: "Income",
    href: "/income",
    description: "Track and manage family income",
    Icon: DollarSign,
  },
  {
    name: "Expenses",
    href: "/expense",
    description: "Track and manage family expenses",
    Icon: Wallet,
  },
  {
    name: "Members",
    href: "/members",
    description: "Manage your family members",
    Icon: Users,
  },
];

interface SideBarProps {
  /** Whether the mobile drawer is currently open. Ignored at lg+ where the
   *  sidebar is always visible as a fixed column. */
  isMobileOpen?: boolean;
  onCloseMobile?: () => void;
}

function SideBar({ isMobileOpen = false, onCloseMobile }: SideBarProps) {
  const activePath = usePathname();

  // Close the drawer when navigating to a new route on mobile.
  useEffect(() => {
    onCloseMobile?.();
    // We intentionally want this to fire when the pathname changes, not when
    // onCloseMobile identity changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePath]);

  return (
    <>
      {/* Mobile backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-gray-900/40 backdrop-blur-sm transition-opacity lg:hidden ${
          isMobileOpen
            ? "opacity-100"
            : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
        aria-hidden
      />

      {/* Sidebar panel: drawer on mobile, static column on lg+ */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform lg:static lg:z-auto lg:translate-x-0 ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-4 py-4">
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 ring-1 ring-emerald-100 text-emerald-600">
              <PiggyBank className="h-5 w-5" />
            </span>
            <span className="text-lg font-semibold tracking-tight text-gray-900">
              FamLedger
            </span>
          </Link>

          <button
            type="button"
            className="rounded-md p-1.5 text-gray-500 hover:bg-gray-100 hover:text-gray-900 lg:hidden"
            onClick={onCloseMobile}
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 pb-4 pt-2">
          {navItems.map((item) => {
            const isActive = item.href === activePath;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-indigo-50 text-indigo-700 ring-1 ring-indigo-100"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
                onClick={onCloseMobile}
              >
                <item.Icon
                  className={`h-5 w-5 ${
                    isActive ? "text-indigo-600" : "text-gray-400"
                  }`}
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

export default SideBar;

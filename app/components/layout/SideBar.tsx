"use client";

import {
  PiggyBank,
  LayoutDashboard,
  DollarSign,
  Wallet,
  Users,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

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

function SideBar() {
  const activePath = usePathname();

  return (
    <div className="flex flex-col justify-between w-64 h-full p-4 bg-white border-r shadow-lg">
      <div className="flex items-center p-2 mb-8 space-x-2">
        <PiggyBank className="w-8 h-8 text-blue-600" />
        <span className="text-xl font-bold text-gray-800">FamLedger</span>
      </div>

      <aside className="flex flex-col flex-1 gap-1">
        {navItems.map((item) => {
          const isActive = item.href === activePath;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center space-x-3 p-3 text-sm font-medium rounded-lg transition-colors ${
                isActive
                  ? "bg-blue-500 text-white shadow-md"
                  : "text-gray-600 hover:bg-gray-100"
              }`}
            >
              <item.Icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </aside>
    </div>
  );
}

export default SideBar;

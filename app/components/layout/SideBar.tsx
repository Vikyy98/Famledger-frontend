"use client";

// common/SideBar.tsx
import {
  PiggyBank,
  LayoutDashboard,
  DollarSign,
  Wallet,
  Target,
  FileText,
  Landmark,
  Scale,
  Users,
  Settings,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

// Define the navigation items
export const navItems = [
  { name: "Dashboard", href: "/dashboard", Icon: LayoutDashboard },
  { name: "Income", href: "/income", Icon: DollarSign },
  { name: "Expenses", href: "/expense", Icon: Wallet },
  { name: "Goals", href: "/goals", Icon: Target },
  { name: "Reports", href: "/reports", Icon: FileText },
  { name: "Assets", href: "/assets", Icon: Landmark },
  { name: "Liabilities", href: "/liabilities", Icon: Scale },
  { name: "Members", href: "/members", Icon: Users },
];

function SideBar() {
  // NOTE: For a real app, you'd use 'useRouter' here to check the current path
  const activePath = usePathname(); // Placeholder for active link

  return (
    <div className="flex flex-col justify-between w-64 h-full p-4 bg-white border-r shadow-lg">
      {/* Logo Section */}
      <div className="flex items-center p-2 mb-8 space-x-2">
        <PiggyBank className="w-8 h-8 text-blue-600" size={32} />
        <span className="text-xl font-bold text-gray-800">FamLedger</span>
      </div>

      {/* Navigation Links */}
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

      {/* Settings / Footer Area */}
      <div className="pt-4 border-t">
        <div className="flex items-center p-3 mt-4 space-x-3 text-sm font-medium text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
          <Settings className="w-5 h-5" />
          <span>Settings</span>
        </div>
      </div>
    </div>
  );
}

export default SideBar;

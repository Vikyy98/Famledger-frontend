import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    // Sidebar (256px) + scrollable main column. Each page owns its own padding
    // (via its top-level wrapper) so section spacing can flex per route.
    <div className="flex h-screen bg-gray-50">
      <SideBar />

      <div className="flex-1 overflow-y-auto">
        <NavBar />
        <main>{children}</main>
      </div>
    </div>
  );
}

export default MainLayout;

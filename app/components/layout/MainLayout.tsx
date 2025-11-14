import React from "react";
import SideBar from "./SideBar";
import NavBar from "./NavBar";

function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    // Grid: Sidebar (256px wide) and Main Content (rest of the screen)
    <div className="flex h-screen bg-gray-50">
      <SideBar />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <NavBar />
        {/* Welcome Text and Main Content */}
        <div className="p-6">
          <main>{children}</main>
        </div>
      </div>
    </div>
  );
}

export default MainLayout;

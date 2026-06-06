"use client";

import { useState } from "react";
import Sidebar from "@/components/navegation/Sidebar";
import BottomTab from "@/components/navegation/BottonTab";

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative flex flex-col min-h-screen bg-gray-100">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="flex-1 pb-14">
        {children}
      </main>

      <div className="fixed bottom-0 left-0 right-0 z-30">
        <BottomTab onMenuClick={() => setSidebarOpen(true)} />
      </div>
    </div>
  );
}

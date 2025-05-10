"use client";

import React from "react";
import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background min-h-screen text-white font-sans">
      <Sidebar />
      <main className="flex-1 ml-64 px-6 py-10">
        {children}
      </main>
    </div>
  );
}

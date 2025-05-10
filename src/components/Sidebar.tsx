"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import {
  FiHome,
  FiImage,
  FiLink,
  FiDollarSign,
  FiMessageCircle,
  FiUsers,
  FiSettings,
  FiEye,
  FiLogOut,
} from "react-icons/fi";

// Updated nav items
const navItems = [
  { label: "Dashboard", href: "/dashboard", icon: FiHome },
  { label: "Media", href: "/dashboard/media", icon: FiImage },
  { label: "Links", href: "/dashboard/links", icon: FiLink },
  { label: "Earnings", href: "/dashboard/earnings", icon: FiDollarSign },
  { label: "Messaging", href: "/dashboard/messaging", icon: FiMessageCircle },
  { label: "Referrals", href: "/dashboard/referrals", icon: FiUsers },
  { label: "Settings", href: "/dashboard/settings", icon: FiSettings },
  { label: "Preview", href: "/dashboard/preview", icon: FiEye }, // ✅ Added Preview
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-black border-r border-neutral-800 flex flex-col justify-between p-6 fixed top-0 left-0 z-50">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 mb-10 text-white text-2xl font-bold">
          <div className="w-6 h-6 rounded-full bg-white" />
          <span className="tracking-tight">LunaLink</span>
        </div>

        {/* Navigation */}
        <nav className="flex flex-col gap-2">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={clsx("sidebar-link", isActive && "sidebar-link-active")}
              >
                <Icon className="text-lg" />
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Logout */}
      <button
        onClick={() => signOut(auth)}
        className="flex items-center gap-3 text-sm text-neutral-400 hover:text-white hover:bg-neutral-800 px-4 py-2 rounded-md transition-all"
      >
        <FiLogOut className="text-lg" />
        Log out
      </button>
    </aside>
  );
}

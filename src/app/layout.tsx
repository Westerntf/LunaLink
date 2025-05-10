// src/app/layout.tsx
import "@/styles/globals.css"; // ✅ THIS IS CRUCIAL
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "LunaLink",
  description: "Creator monetization platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}

"use client";

import "./globals.css";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(true);

  // Halaman auth (tanpa sidebar)
  const isAuthPage = pathname === "/" || pathname.startsWith("/signup");

  const itemClass =
    "flex items-center gap-2 hover:bg-white/10 p-2 rounded transition";

  return (
    <html>
      <body className={isAuthPage ? "min-h-screen" : "flex h-screen overflow-hidden"}>
        {isAuthPage ? (
          // LOGIN / SIGNUP: hanya tampilkan konten, sidebar tidak ada
          <main className="min-h-screen">{children}</main>
        ) : (
          <>
            {/* SIDEBAR */}
            <aside
              className={`
                bg-gradient-to-b from-gray-700 to-gray-500 text-white
                transition-all duration-300
                ${open ? "w-56" : "w-16"}
              `}
            >
              {/* HEADER SIDEBAR */}
              <div className="flex items-center justify-between p-4 border-b border-white/20">
                {open && <h2 className="font-bold text-lg">Cemerlang</h2>}

                <button
                  onClick={() => setOpen(!open)}
                  className="text-white text-xl"
                  aria-label="Toggle sidebar"
                >
                  ☰
                </button>
              </div>

              {/* MENU */}
              <nav className="p-4 space-y-2">
                <Link href="/dashboard" className={itemClass}>
                  <span>🏠</span>
                  {open && <span>Dashboard</span>}
                </Link>

                <Link href="/dashboard/jadwal" className={itemClass}>
                  <span>🗓️</span>
                  {open && <span>Jadwal</span>}
                </Link>

                <Link href="/dashboard/pelanggan" className={itemClass}>
                  <span>👤</span>
                  {open && <span>Pelanggan</span>}
                </Link>

                <Link href="/dashboard/kurir" className={itemClass}>
                  <span>🛵</span>
                  {open && <span>Kurir</span>}
                </Link>

                <Link href="/dashboard/kurir/notifikasi" className={itemClass}>
                  <span>🔔</span>
                  {open && <span>Notifikasi</span>}
                </Link>
              </nav>
            </aside>

            {/* MAIN CONTENT */}
            <main className="flex-1 bg-gray-100 p-6 overflow-y-auto">
              {children}
            </main>
          </>
        )}
      </body>
    </html>
  );
}

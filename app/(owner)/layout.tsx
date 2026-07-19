// sidebar needed for all the pages of owner

// In Next.js, you can use a special layout.tsx file to create UI that is shared between multiple pages.

'use client'

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import Link from "next/link";
import { usePathname } from "next/navigation"
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Boxes,
  TriangleAlert,
  LogOut
} from "lucide-react";

const navLinks = [
    { href: "/owner/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/owner/inventory", label: "Inventory", icon: Boxes },
    { href: "/owner/alerts",    label: "Alerts", icon: TriangleAlert},
]

export default function OwnerLayout({ children } : { children: React.ReactNode }) {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        await authClient.signOut();
        router.push("/login")
    }

    return (
        <div className="flex min-h-screen">
            {/* Sidebar */}
            {/* "w-64 bg-white border-r border-gray-200 flex flex-col" */}
            <aside className={`${open ? "w-64" : "w-20"} transition-all duration-300 bg-black border-r border-white/15 flex flex-col`}>
                {/* Top Section */}
                <div className="p-4 border-b border-white/15">

                    <div className={`flex items-center ${open ? "justify-between" : "justify-center"}`}>

            {open && (
                <div>
                    <h1 className="text-xl font-bold text-white">
                        ShelfPing
                    </h1>

                    <p className="text-xs text-gray-500 mt-1">
                        Shop Owner Panel
                    </p>
                </div>
            )}

            <Button
                variant="default"
                className="text-white hover:bg-white/10"
                size="icon"
                onClick={() => setOpen(!open)}
                >
                {open ? (
                    <PanelLeftClose className="h-5 w-5" />
                ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                )}
            </Button>

        </div>

        </div>

                {/* Nav Links */}
                <nav className="flex-1 p-4 space-y-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`flex items-center ${open ? "justify-start px-4" : "justify-center"} py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                                pathname === link.href ? open
                                ? "bg-white/10 text-white" : "text-white"
                                : "text-zinc-500 hover:bg-white/5 hover:text-white"
                            }`}
                        >
                            <div className="flex gap-2">
                                <link.icon className="h-5 w-5 shrink-0" />
                                {open && link.label}
                            </div>
                        </Link>
                    ))}
                </nav>

                {/* Logout */}
                <div className="p-4 border-t border-white/15">
                    <Button
                        onClick={handleLogout}
                        variant="ghost"
                        className="w-full justify-start text-red-400 hover:bg-red-500/10 hover:text-red-300"
                    >
                        <LogOut className="h-5 w-5"/>
                        {open && (<span>Logout</span>)}
                    </Button>
                </div>

            </aside>

            {/* Main Content */}
            <main className="flex-1 p-8 overflow-y-auto bg-black">
                {children}
            </main>

        </div>
    );
}

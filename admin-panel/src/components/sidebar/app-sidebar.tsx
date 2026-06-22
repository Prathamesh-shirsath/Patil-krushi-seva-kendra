"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    LayoutDashboard,
    Package,
    FolderTree,
    Building2,
    ShoppingCart,
    Users,
    Star,
    ImageIcon,
    BadgePercent,
    Mail,
    MessageSquare,
    Shield,
    BarChart3,
    Settings,
} from "lucide-react";

const sections = [
    {
        title: "MANAGE",
        items: [
            { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
            { name: "Products", href: "/products", icon: Package },
            { name: "Categories", href: "/categories", icon: FolderTree },
            { name: "Brands", href: "/brands", icon: Building2 },
            { name: "Orders", href: "/orders", icon: ShoppingCart },
            { name: "Customers", href: "/customers", icon: Users },
            { name: "Reviews", href: "/reviews", icon: Star },
        ],
    },
    {
        title: "MARKETING",
        items: [
            { name: "Banners", href: "/banners", icon: ImageIcon },
          /*  { name: "Coupons", href: "/coupons", icon: BadgePercent },
            { name: "Newsletter", href: "/newsletter", icon: Mail },
            { name: "Bulk SMS", href: "/bulk-sms", icon: MessageSquare },*/
        ],
    },
    {
        title: "SETTINGS",
        items: [
            { name: "Users", href: "/users", icon: Shield },
            { name: "Reports", href: "/reports", icon: BarChart3 },
            { name: "Settings", href: "/settings", icon: Settings },
        ],
    },
];

export default function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="flex h-screen w-72 flex-col bg-gradient-to-b from-[#052e16] via-[#14532d] to-[#052e16] text-white">

            {/* Logo */}
            <div className="border-b border-green-900 px-6 py-6">
                <h1 className="text-3xl font-bold text-green-400">
                    Patil Krushi
                </h1>

                <p className="mt-1 text-sm text-green-100">
                    Seva Kendra Admin
                </p>
            </div>

            {/* Menu */}
            <div className="flex-1 overflow-y-auto px-4 py-5">

                {sections.map((section) => (
                    <div key={section.title} className="mb-8">

                        <p className="mb-3 px-3 text-xs font-bold tracking-widest text-green-400 uppercase">
                            {section.title}
                        </p>

                        <div className="space-y-1">

                            {section.items.map((item) => {
                                const Icon = item.icon;

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`flex items-center gap-3 rounded-2xl px-4 py-3 transition-all duration-300
                    ${pathname === item.href
                                                ? "bg-emerald-600 shadow-lg"
                                                : "hover:bg-green-900"
                                            }`}
                                    >
                                        <Icon size={18} />

                                        <span>{item.name}</span>
                                    </Link>
                                );
                            })}

                        </div>
                    </div>
                ))}

            </div>

            {/* User */}
            <div className="border-t border-green-900 p-5">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold">
                        PP
                    </div>

                    <div>
                        <p className="font-semibold">
                            Pratham Patil
                        </p>

                        <p className="text-sm text-green-200">
                            Super Admin
                        </p>
                    </div>

                </div>

            </div>

        </aside>
    );
}
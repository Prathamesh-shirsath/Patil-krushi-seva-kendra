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
    Shield,
    BarChart3,
    Settings,
    ChevronRight,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    useSidebar,
} from "@/components/ui/sidebar";

const sections = [
    {
        title: "MANAGE",
        items: [
            {
                name: "Dashboard",
                href: "/dashboard",
                icon: LayoutDashboard,
            },
            {
                name: "Products",
                href: "/products",
                icon: Package,
            },
            {
                name: "Categories",
                href: "/categories",
                icon: FolderTree,
            },
            {
                name: "Brands",
                href: "/brands",
                icon: Building2,
            },
            {
                name: "Orders",
                href: "/orders",
                icon: ShoppingCart,
            },
            {
                name: "Customers",
                href: "/customers",
                icon: Users,
            },
            {
                name: "Reviews",
                href: "/reviews",
                icon: Star,
            },
        ],
    },

    {
        title: "MARKETING",
        items: [
            {
                name: "Banners",
                href: "/banners",
                icon: ImageIcon,
            },
        ],
    },

    {
        title: "SETTINGS",
        items: [
            {
                name: "Users",
                href: "/users",
                icon: Shield,
            },
            {
                name: "Reports",
                href: "/reports",
                icon: BarChart3,
            },
            {
                name: "Settings",
                href: "/settings",
                icon: Settings,
            },
        ],
    },
];

export default function AppSidebar() {
    const pathname = usePathname();

    const { state } = useSidebar();

    const collapsed = state === "collapsed";

    return (
        <Sidebar
            variant="sidebar"
            collapsible="icon"
            className="border-r border-slate-800"
        >
            <SidebarHeader className="border-b border-green-900 px-5 py-6">

                <div className="flex items-center gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-500 text-lg font-bold text-white shadow-lg">
                        PK
                    </div>

                    {!collapsed && (
                        <div>

                            <h2 className="text-lg font-bold text-white">
                                Patil Krushi
                            </h2>

                            <p className="text-xs text-green-200">
                                Admin Panel
                            </p>

                        </div>
                    )}

                </div>

            </SidebarHeader>

            <SidebarContent className="bg-gradient-to-b from-[#052e16] via-[#14532d] to-[#052e16] px-3 py-5">

                {sections.map((section) => (
                    <div key={section.title} className="mb-8">

                        {!collapsed && (
                            <p className="mb-3 px-3 text-xs font-semibold tracking-widest text-green-300 uppercase">
                                {section.title}
                            </p>
                        )}

                        <div className="space-y-1">

                            {section.items.map((item) => {
                                const Icon = item.icon;

                                const active =
                                    pathname === item.href ||
                                    pathname.startsWith(item.href + "/");

                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`
                      group
                      flex
                      items-center
                      gap-3
                      rounded-2xl
                      px-4
                      py-3
                      transition-all
                      duration-300

                      ${active
                                                ? "bg-green-500 text-white shadow-lg"
                                                : "text-green-100 hover:bg-green-800/60 hover:text-white"
                                            }
                    `}
                                    >
                                        <Icon
                                            size={20}
                                            className="shrink-0"
                                        />

                                        {!collapsed && (
                                            <>
                                                <span className="flex-1 font-medium">
                                                    {item.name}
                                                </span>

                                                {active && (
                                                    <ChevronRight
                                                        size={16}
                                                    />
                                                )}
                                            </>
                                        )}
                                    </Link>
                                );
                            })}

                        </div>

                    </div>
                ))}

            </SidebarContent>

            <SidebarFooter className="border-t border-green-900 bg-[#052e16] p-4">

                <div className="flex items-center gap-3">

                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-green-500 font-bold text-white">
                        PP
                    </div>

                    {!collapsed && (
                        <div className="min-w-0">

                            <p className="truncate text-sm font-semibold text-white">
                                Pratham Patil
                            </p>

                            <p className="text-xs text-green-200">
                                Super Admin
                            </p>

                        </div>
                    )}

                </div>

            </SidebarFooter>

        </Sidebar>
    );
}
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
import { useSidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

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

function SidebarContent({ onClose }: { onClose?: () => void }) {
  const pathname = usePathname();

  return (
    <div className="flex h-full w-full flex-col bg-[#072d1a] text-slate-200 select-none">
      {/* Brand Header */}
      <div className="flex items-center justify-between px-5 py-5 border-b border-[#0f4a2b]/60">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
            <Sprout className="h-6 w-6" />
          </div>
          <div className="min-w-0">
            <h1 className="text-base font-bold text-white tracking-tight leading-tight truncate">
              Patil
            </h1>
            <p className="text-[11px] font-medium text-emerald-300 truncate">
              Krushi Seva Kendra
            </p>
            <p className="text-[10px] text-emerald-400/80">Admin Panel</p>
          </div>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="lg:hidden rounded-lg p-1 text-slate-400 hover:bg-[#0c4025] hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-6 scrollbar-thin scrollbar-thumb-emerald-900">
        {sections.map((section) => (
          <div key={section.title} className="space-y-1">
            <p className="px-3 text-[10px] font-bold tracking-wider text-emerald-400/70 uppercase">
              {section.title}
            </p>

            <div className="space-y-0.5 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={onClose}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2 text-xs font-semibold transition-all duration-200 ${
                      isActive
                        ? "bg-[#115e34] text-white shadow-sm font-bold"
                        : "text-slate-300 hover:bg-[#0c4025] hover:text-white"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 shrink-0 transition-colors ${
                        isActive
                          ? "text-emerald-300"
                          : "text-slate-400 group-hover:text-emerald-300"
                      }`}
                    />
                    <span className="truncate">{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Support Badge */}
      <div className="p-3 border-t border-[#0f4a2b]/60">
        <div className="rounded-xl bg-[#0b3d23] p-3 border border-[#135732] flex items-center justify-between gap-2 shadow-xs hover:bg-[#0d4729] transition cursor-pointer">
          <div className="flex items-center gap-2 min-w-0">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-900/60 text-emerald-300">
              <HelpCircle className="h-4 w-4" />
            </div>
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-white truncate">Need Help?</p>
              <p className="text-[10px] text-emerald-300 truncate">Contact Support</p>
            </div>
          </div>
          <ArrowRight className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
        </div>
      </div>
    </div>
  );
}

export default function AppSidebar() {
  const { openMobile, setOpenMobile } = useSidebar();

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
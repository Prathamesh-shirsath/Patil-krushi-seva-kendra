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
  Ticket,
  Mail,
  FileText,
  Copy,
  MessageSquare,
  Shield,
  Settings,
  BarChart3,
  Sprout,
  HelpCircle,
  ArrowRight,
  X,
} from "lucide-react";
import { useSidebar } from "@/components/ui/sidebar";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";

const sections = [
  {
    title: "MAIN",
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
      { name: "Coupons", href: "/coupons", icon: Ticket },
      { name: "Newsletter", href: "/newsletter", icon: Mail },
    ],
  },
  {
    title: "CONTENT",
    items: [
      { name: "Blog Posts", href: "/blog", icon: FileText },
      { name: "Pages", href: "/pages", icon: Copy },
      { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
    ],
  },
  {
    title: "SETTINGS",
    items: [
      { name: "Users", href: "/users", icon: Shield },
      { name: "Settings", href: "/settings", icon: Settings },
      { name: "Reports", href: "/reports", icon: BarChart3 },
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

  return (
    <>
      {/* Desktop Sidebar (lg screens) */}
      <aside className="sticky top-0 h-screen w-64 shrink-0 hidden lg:flex flex-col bg-[#072d1a] border-r border-[#0d4026] shadow-xl z-30">
        <SidebarContent />
      </aside>

      {/* Mobile Drawer (small screens) */}
      <Sheet open={openMobile} onOpenChange={setOpenMobile}>
        <SheetContent side="left" className="w-72 p-0 bg-[#072d1a] border-r border-[#0d4026] text-slate-200 [&>button]:hidden">
          <SheetHeader className="sr-only">
            <SheetTitle>Admin Menu</SheetTitle>
          </SheetHeader>
          <SidebarContent onClose={() => setOpenMobile(false)} />
        </SheetContent>
      </Sheet>
    </>
  );
}
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
} from "lucide-react";

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

  return (<Sidebar
  collapsible="offcanvas"
  className="border-r border-green-900 bg-gradient-to-b from-[#052e16] via-[#14532d] to-[#052e16] text-white"
>

  {/* Logo */}

  <SidebarHeader className="border-b border-green-900 px-6 py-6">

    <h1 className="text-3xl font-bold text-green-400">
      Patil Krushi
    </h1>

    <p className="mt-1 text-sm text-green-100">
      Seva Kendra Admin
    </p>

  </SidebarHeader>

  {/* Menu */}

  <SidebarContent>

    {sections.map((section) => (

      <SidebarGroup key={section.title}>

        <SidebarGroupLabel className="px-3 text-xs font-bold uppercase tracking-widest text-green-400">
          {section.title}
        </SidebarGroupLabel>

        <SidebarGroupContent>

          <SidebarMenu>{section.items.map((item) => {
  const Icon = item.icon;

  return (
    <SidebarMenuItem key={item.name}>

      <SidebarMenuButton
        asChild
        isActive={pathname === item.href}
        className="
          h-11
          rounded-xl
          text-white
          hover:bg-green-900
          hover:text-white
          data-[active=true]:bg-emerald-600
          data-[active=true]:text-white
          data-[active=true]:shadow-lg
        "
      >
        <Link
          href={item.href}
          className="flex items-center gap-3"
        >
          <Icon className="h-5 w-5" />

          <span>{item.name}</span>
        </Link>

      </SidebarMenuButton>

    </SidebarMenuItem>
  );
})}

          </SidebarMenu>

        </SidebarGroupContent>

      </SidebarGroup>

    ))}

  </SidebarContent>  <SidebarFooter className="border-t border-green-900 p-5">

    <div className="flex items-center gap-3">

      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-lg font-bold">
        PP
      </div>

      <div>
        <p className="font-semibold text-white">
          Pratham Patil
        </p>

        <p className="text-sm text-green-200">
          Super Admin
        </p>
      </div>

    </div>

  </SidebarFooter>

</Sidebar>

  );
}
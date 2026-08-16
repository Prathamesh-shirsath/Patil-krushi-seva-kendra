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
  Sprout,
  HelpCircle,
  ArrowRight,
} from "lucide-react";

import {
  Sidebar,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarContent,
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

  const {
    state,
    isMobile,
    setOpenMobile,
  } = useSidebar();

  const collapsed =
    state === "collapsed";


  const handleNavigation = () => {
    if (isMobile) {
      setOpenMobile(false);
    }
  };


  return (
    <Sidebar
      side="left"
      variant="sidebar"
      collapsible="icon"
      className="border-r border-green-950"
    >

      {/* ================= HEADER ================= */}

      <SidebarHeader
        className="
                    border-b
                    border-green-900/70
                    bg-[#072d1a]
                    px-4
                    py-5
                "
      >

        <div className="flex items-center gap-3">

          {/* Logo */}

          <div
            className="
                            flex
                            h-11
                            w-11
                            shrink-0
                            items-center
                            justify-center
                            rounded-xl
                            bg-emerald-600
                            text-white
                            shadow-lg
                        "
          >
            <Sprout className="h-6 w-6" />
          </div>


          {/* Brand */}

          {!collapsed && (
            <div className="min-w-0">

              <h1
                className="
                                    truncate
                                    text-base
                                    font-bold
                                    leading-tight
                                    tracking-tight
                                    text-white
                                "
              >
                Patil
              </h1>

              <p
                className="
                                    truncate
                                    text-[11px]
                                    font-medium
                                    text-emerald-300
                                "
              >
                Krushi Seva Kendra
              </p>

              <p
                className="
                                    text-[10px]
                                    text-emerald-400/80
                                "
              >
                Admin Panel
              </p>

            </div>
          )}

        </div>

      </SidebarHeader>


      {/* ================= MENU ================= */}

      <SidebarContent
        className="
                    bg-[#072d1a]
                    px-2
                    py-4
                "
      >

        {sections.map((section) => (

          <SidebarGroup
            key={section.title}
            className="px-1 py-0 mb-5"
          >

            {/* Section title */}

            {!collapsed && (
              <SidebarGroupLabel
                className="
                                    mb-2
                                    px-3
                                    text-[10px]
                                    font-bold
                                    uppercase
                                    tracking-widest
                                    text-emerald-400/70
                                "
              >
                {section.title}
              </SidebarGroupLabel>
            )}


            <SidebarGroupContent>

              <SidebarMenu>

                {section.items.map((item) => {

                  const Icon =
                    item.icon;


                  const isActive =
                    pathname === item.href ||
                    pathname.startsWith(
                      `${item.href}/`
                    );


                  return (

                    <SidebarMenuItem
                      key={item.name}
                    >

                      <SidebarMenuButton
                        asChild
                        isActive={
                          isActive
                        }
                        tooltip={
                          collapsed
                            ? item.name
                            : undefined
                        }
                        className="
                                                    h-11
                                                    rounded-xl
                                                    px-3
                                                    text-sm
                                                    font-medium
                                                    text-green-100
                                                    hover:bg-green-900/70
                                                    hover:text-white
                                                    data-[active=true]:bg-emerald-600
                                                    data-[active=true]:text-white
                                                    data-[active=true]:shadow-md
                                                "
                      >

                        <Link
                          href={
                            item.href
                          }
                          onClick={
                            handleNavigation
                          }
                        >

                          <Icon
                            className="
                                                            h-5
                                                            w-5
                                                            shrink-0
                                                        "
                          />


                          {!collapsed && (
                            <>
                              <span className="truncate">
                                {
                                  item.name
                                }
                              </span>


                              {isActive && (
                                <ChevronRight
                                  className="
                                                                        ml-auto
                                                                        h-4
                                                                        w-4
                                                                    "
                                />
                              )}
                            </>
                          )}

                        </Link>

                      </SidebarMenuButton>

                    </SidebarMenuItem>

                  );
                })}

              </SidebarMenu>

            </SidebarGroupContent>

          </SidebarGroup>

        ))}

      </SidebarContent>


      {/* ================= FOOTER ================= */}

      <SidebarFooter
        className="
                    border-t
                    border-green-900/70
                    bg-[#052e16]
                    p-3
                "
      >

        {/* Support */}

        {!collapsed && (

          <div
            className="
                            mb-3
                            rounded-xl
                            border
                            border-green-800
                            bg-[#0b3d23]
                            p-3
                        "
          >

            <div className="flex items-center gap-2">

              <div
                className="
                                    flex
                                    h-8
                                    w-8
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-lg
                                    bg-emerald-900
                                    text-emerald-300
                                "
              >

                <HelpCircle
                  className="h-4 w-4"
                />

              </div>


              <div className="min-w-0 flex-1">

                <p
                  className="
                                        truncate
                                        text-[11px]
                                        font-bold
                                        text-white
                                    "
                >
                  Need Help?
                </p>

                <p
                  className="
                                        truncate
                                        text-[10px]
                                        text-emerald-300
                                    "
                >
                  Contact Support
                </p>

              </div>


              <ArrowRight
                className="
                                    h-4
                                    w-4
                                    shrink-0
                                    text-emerald-400
                                "
              />

            </div>

          </div>

        )}


        {/* Admin */}

        <div
          className="
                        flex
                        items-center
                        gap-3
                        rounded-xl
                        px-2
                        py-2
                    "
        >

          <div
            className="
                            flex
                            h-10
                            w-10
                            shrink-0
                            items-center
                            justify-center
                            rounded-full
                            bg-emerald-600
                            text-sm
                            font-bold
                            text-white
                        "
          >
            PP
          </div>


          {!collapsed && (

            <div className="min-w-0">

              <p
                className="
                                    truncate
                                    text-sm
                                    font-semibold
                                    text-white
                                "
              >
                Pratham Patil
              </p>

              <p
                className="
                                    truncate
                                    text-xs
                                    text-green-200
                                "
              >
                Super Admin
              </p>

            </div>

          )}

        </div>

      </SidebarFooter>

    </Sidebar>
  );
}
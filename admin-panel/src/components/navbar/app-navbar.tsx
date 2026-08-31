"use client";

import {
  Bell,
  Search,
  Moon,
  Sun,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppNavbar() {
  const [dark, setDark] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const router = useRouter();

  // =====================================================
  // ADMIN LOGOUT
  // =====================================================

  const handleLogout = async () => {
    if (isLoggingOut) return;

    try {
      setIsLoggingOut(true);

      const response = await fetch(
        "http://localhost:5000/api/admin-auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Logout failed."
        );
      }

      // Redirect to login
      router.replace("/login");

      // Refresh router state
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Something went wrong while logging out."
      );
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header
      className="
        sticky
        top-0
        z-50
        flex
        h-20
        items-center
        justify-between
        border-b
        border-slate-200
        bg-white/80
        backdrop-blur-xl
        px-4
        md:px-6
        lg:px-8
      "
    >
      {/* LEFT */}
      <div className="flex items-center gap-4">
        <SidebarTrigger className="rounded-xl" />

        <div className="relative hidden md:block">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={18}
          />

          <Input
            placeholder="Search products, orders, customers..."
            className="
              h-11
              w-[260px]
              rounded-2xl
              border-slate-200
              pl-11
              shadow-sm
              focus-visible:ring-green-600
              lg:w-[340px]
            "
          />
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-2 lg:gap-4">

        {/* Theme */}
        <Button
          variant="ghost"
          size="icon"
          className="
            h-11
            w-11
            rounded-full
            hover:bg-slate-100
          "
          onClick={() => setDark(!dark)}
        >
          {dark ? (
            <Sun size={19} />
          ) : (
            <Moon size={19} />
          )}
        </Button>

        {/* Notification */}
        <Button
          variant="ghost"
          size="icon"
          className="
            relative
            h-11
            w-11
            rounded-full
            hover:bg-slate-100
          "
        >
          <Bell size={19} />

          <span
            className="
              absolute
              right-3
              top-3
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </Button>

        {/* Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="
                flex
                h-auto
                items-center
                gap-3
                rounded-2xl
                px-2
                py-1.5
                hover:bg-slate-100
              "
            >
              <Avatar className="h-11 w-11">
                <AvatarFallback className="bg-green-600 font-bold text-white">
                  PP
                </AvatarFallback>
              </Avatar>

              <div className="hidden text-left lg:block">
                <p className="text-sm font-semibold text-slate-900">
                  Pratham Patil
                </p>

                <p className="text-xs text-slate-500">
                  Super Admin
                </p>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            className="w-56"
          >
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* LOGOUT */}
            <DropdownMenuItem
              disabled={isLoggingOut}
              onClick={handleLogout}
              className="cursor-pointer text-red-600 focus:text-red-600"
            >
              <LogOut className="mr-2 h-4 w-4" />

              {isLoggingOut ? "Logging out..." : "Logout"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
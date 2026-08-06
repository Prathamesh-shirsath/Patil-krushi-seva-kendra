"use client";

import { Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppNavbar() {
  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200/80 bg-white/95 backdrop-blur px-4 sm:px-6">
      {/* Left: Mobile sidebar trigger & Search */}
      <div className="flex items-center gap-3 flex-1 max-w-xl">
        <SidebarTrigger className="lg:hidden">
          <Menu className="h-5 w-5 text-slate-600" />
        </SidebarTrigger>

        {/* Search */}
        <div className="relative w-full max-w-md flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Search anything..."
            className="h-9 w-full rounded-xl border-slate-200 bg-slate-50/70 pl-9 pr-14 text-xs focus-visible:bg-white focus-visible:ring-emerald-600"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none hidden md:inline-flex h-5 select-none items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-mono text-[10px] font-medium text-slate-500 shadow-2xs">
            Ctrl + K
          </kbd>
        </div>
      </div>

      {/* Right: Notifications & Profile */}
      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200/80 bg-white text-slate-600 hover:bg-slate-50 transition shadow-2xs"
          aria-label="Notifications"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] font-bold text-white shadow-xs">
            1
          </span>
        </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              type="button"
              className="flex items-center gap-2.5 rounded-xl border border-slate-200/80 p-1 pr-3 hover:bg-slate-50 transition shadow-2xs"
            >
              <Avatar className="h-8 w-8 rounded-lg border border-emerald-200">
                <AvatarFallback className="bg-emerald-100 text-emerald-800 font-bold text-xs">
                  AU
                </AvatarFallback>
              </Avatar>
              <div className="text-left hidden min-[480px]:block">
                <p className="text-xs font-bold text-slate-800 leading-tight">Admin User</p>
                <p className="text-[10px] font-medium text-slate-500">Super Admin</p>
              </div>
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-lg">
            <DropdownMenuItem className="cursor-pointer text-xs font-semibold">
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs font-semibold">
              System Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer text-xs font-semibold text-red-600">
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
"use client";

import {
    Bell,
    Moon,
    Search,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

import {
    Avatar,
    AvatarFallback,
} from "@/components/ui/avatar";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AppNavbar() {
    return (
        <header className="sticky top-0 z-40 flex h-20 items-center justify-between border-b bg-white px-4 lg:px-8">

            {/* Left */}
            <div className="flex items-center gap-4">

                {/* Mobile Sidebar Toggle */}
                <SidebarTrigger />

                {/* Search */}
                <div className="relative hidden md:block">
                    <Search
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        size={18}
                    />

                    <Input
                        placeholder="Search anything..."
                        className="w-[280px] rounded-2xl pl-10"
                    />
                </div>
            </div>

            {/* Right */}
            <div className="flex items-center gap-2 lg:gap-4">

                {/* Dark Mode */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="rounded-full"
                >
                    <Moon size={18} />
                </Button>

                {/* Notification */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full"
                >
                    <Bell size={18} />

                    <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>

                {/* Profile */}
                <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                        <Button
                            variant="ghost"
                            className="rounded-full p-0"
                        >
                            <Avatar className="h-11 w-11">
                                <AvatarFallback>
                                    PP
                                </AvatarFallback>
                            </Avatar>
                        </Button>

                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                        <DropdownMenuItem>
                            Profile
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            Settings
                        </DropdownMenuItem>

                        <DropdownMenuItem>
                            Logout
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>
        </header>
    );
}
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

    return (
        <div
            className="
                flex
                h-16
                w-full
                items-center
                justify-between
                gap-2
                bg-white/90
                px-3
                sm:h-18
                sm:px-4
                md:h-20
                md:px-6
                lg:px-8
            "
        >

            {/* LEFT */}

            <div className="flex min-w-0 items-center gap-2 sm:gap-4">

                <SidebarTrigger
                    className="
                        h-10
                        w-10
                        shrink-0
                        rounded-xl
                        hover:bg-slate-100
                    "
                />

                {/* SEARCH */}

                <div className="relative hidden sm:block">

                    <Search
                        className="
                            absolute
                            left-4
                            top-1/2
                            h-[18px]
                            w-[18px]
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <Input
                        placeholder="Search products, orders, customers..."
                        className="
                            h-10
                            w-[220px]
                            rounded-2xl
                            border-slate-200
                            bg-white
                            pl-11
                            text-sm
                            shadow-sm
                            focus-visible:ring-emerald-600
                            md:h-11
                            md:w-[300px]
                            lg:w-[360px]
                        "
                    />

                </div>

            </div>


            {/* RIGHT */}

            <div
                className="
                    flex
                    shrink-0
                    items-center
                    gap-1
                    sm:gap-2
                    lg:gap-4
                "
            >

                {/* MOBILE SEARCH */}

                <Button
                    variant="ghost"
                    size="icon"
                    className="
                        h-10
                        w-10
                        rounded-full
                        sm:hidden
                    "
                >
                    <Search className="h-[18px] w-[18px]" />
                </Button>


                {/* THEME */}

                <Button
                    variant="ghost"
                    size="icon"
                    className="
                        h-10
                        w-10
                        rounded-full
                        hover:bg-slate-100
                        sm:h-11
                        sm:w-11
                    "
                    onClick={() => setDark(!dark)}
                >
                    {dark ? (
                        <Sun className="h-[18px] w-[18px]" />
                    ) : (
                        <Moon className="h-[18px] w-[18px]" />
                    )}
                </Button>


                {/* NOTIFICATION */}

                <Button
                    variant="ghost"
                    size="icon"
                    className="
                        relative
                        h-10
                        w-10
                        rounded-full
                        hover:bg-slate-100
                        sm:h-11
                        sm:w-11
                    "
                >
                    <Bell className="h-[18px] w-[18px]" />

                    <span
                        className="
                            absolute
                            right-2.5
                            top-2.5
                            h-2
                            w-2
                            rounded-full
                            bg-red-500
                        "
                    />
                </Button>


                {/* PROFILE */}

                <DropdownMenu>

                    <DropdownMenuTrigger asChild>

                        <Button
                            variant="ghost"
                            className="
                                h-auto
                                rounded-2xl
                                px-1
                                py-1
                                hover:bg-slate-100
                                sm:px-2
                                sm:py-1.5
                            "
                        >

                            <Avatar className="h-9 w-9 sm:h-11 sm:w-11">

                                <AvatarFallback
                                    className="
                                        bg-emerald-600
                                        font-bold
                                        text-white
                                    "
                                >
                                    PP
                                </AvatarFallback>

                            </Avatar>


                            <div
                                className="
                                    ml-2
                                    hidden
                                    text-left
                                    md:block
                                "
                            >

                                <p
                                    className="
                                        text-sm
                                        font-semibold
                                        text-slate-900
                                    "
                                >
                                    Pratham Patil
                                </p>

                                <p
                                    className="
                                        text-xs
                                        text-slate-500
                                    "
                                >
                                    Super Admin
                                </p>

                            </div>

                        </Button>

                    </DropdownMenuTrigger>


                    <DropdownMenuContent
                        align="end"
                        sideOffset={8}
                        className="w-56 rounded-xl"
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

                        <DropdownMenuItem className="text-red-600">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>

                    </DropdownMenuContent>

                </DropdownMenu>

            </div>

        </div>
    );
}
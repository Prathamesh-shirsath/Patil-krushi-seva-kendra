"use client";

import { useState } from "react";

import {
    User,
    MapPin,
    Heart,
    Package,
    LogOut,
    Menu,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";
import { ProfileSection } from "@/app/profile/page";

interface Props {
    active: ProfileSection;
    onChange: (value: ProfileSection) => void;
}

export default function ProfileSidebar({
    active,
    onChange,
}: Props) {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = (value: ProfileSection) => {
        onChange(value);
        setIsOpen(false);
    };

    return (
        <>
            {/* =====================================================
                MOBILE MENU BUTTON
            ====================================================== */}
            <div className="w-full lg:hidden">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsOpen(true)}
                    className="
                        flex
                        h-12
                        w-full
                        items-center
                        justify-between
                        rounded-2xl
                        border-slate-200
                        bg-white
                        px-4
                        shadow-sm
                        transition-all
                        hover:bg-slate-50
                    "
                >
                    <div className="flex items-center gap-3">
                        <div
                            className="
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                bg-green-100
                                text-green-700
                            "
                        >
                            <User className="h-5 w-5" />
                        </div>

                        <div className="text-left">
                            <p className="text-sm font-bold text-slate-900">
                                My Account
                            </p>

                            <p className="text-xs text-slate-500">
                                Manage your profile
                            </p>
                        </div>
                    </div>

                    <Menu className="h-5 w-5 text-slate-700" />
                </Button>
            </div>

            {/* =====================================================
                MOBILE BACKDROP
            ====================================================== */}
            {isOpen && (
                <div
                    className="
                        fixed
                        inset-0
                        z-[90]
                        bg-black/40
                        backdrop-blur-sm
                        lg:hidden
                    "
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* =====================================================
                MOBILE LEFT DRAWER
            ====================================================== */}
            <div
                className={`
                    fixed
                    left-0
                    top-0
                    z-[100]
                    h-dvh
                    w-[290px]
                    max-w-[85vw]
                    transform
                    transition-transform
                    duration-300
                    ease-out
                    lg:hidden
                    ${
                        isOpen
                            ? "translate-x-0"
                            : "-translate-x-full"
                    }
                `}
            >
                <Card
                    className="
                        flex
                        h-full
                        flex-col
                        overflow-hidden
                        rounded-none
                        border-0
                        border-r
                        border-slate-200
                        bg-white
                        shadow-2xl
                    "
                >
                    {/* =================================================
                        DRAWER HEADER
                    ================================================== */}
                    <div
                        className="
                            flex
                            items-center
                            justify-between
                            border-b
                            border-slate-100
                            bg-gradient-to-r
                            from-green-50
                            to-emerald-50
                            px-5
                            py-5
                        "
                    >
                        <div>
                            <h2 className="text-lg font-black text-slate-900">
                                My Account
                            </h2>

                            <p className="mt-0.5 text-xs text-slate-500">
                                Manage your account
                            </p>
                        </div>

                        <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsOpen(false)}
                            className="
                                h-9
                                w-9
                                rounded-xl
                                hover:bg-white
                            "
                        >
                            <X className="h-5 w-5" />
                        </Button>
                    </div>

                    {/* =================================================
                        MOBILE MENU
                    ================================================== */}
                    <div className="flex-1 overflow-y-auto p-4">
                        <div className="space-y-2">
                            {/* My Profile */}
                            <Button
                                type="button"
                                variant="ghost"
                                className={`
                                    h-11
                                    w-full
                                    justify-start
                                    rounded-xl
                                    ${
                                        active === "profile"
                                            ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                            : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                    }
                                `}
                                onClick={() =>
                                    handleChange("profile")
                                }
                            >
                                <User className="mr-3 h-4 w-4" />
                                My Profile
                            </Button>

                            {/* Addresses */}
                            <Button
                                type="button"
                                variant="ghost"
                                className={`
                                    h-11
                                    w-full
                                    justify-start
                                    rounded-xl
                                    ${
                                        active === "addresses"
                                            ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                            : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                    }
                                `}
                                onClick={() =>
                                    handleChange("addresses")
                                }
                            >
                                <MapPin className="mr-3 h-4 w-4" />
                                My Addresses
                            </Button>

                            {/* Wishlist */}
                            <Button
                                type="button"
                                variant="ghost"
                                className={`
                                    h-11
                                    w-full
                                    justify-start
                                    rounded-xl
                                    ${
                                        active === "wishlist"
                                            ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                            : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                    }
                                `}
                                onClick={() =>
                                    handleChange("wishlist")
                                }
                            >
                                <Heart className="mr-3 h-4 w-4" />
                                Wishlist
                            </Button>

                            {/* Orders */}
                            <Button
                                type="button"
                                variant="ghost"
                                className={`
                                    h-11
                                    w-full
                                    justify-start
                                    rounded-xl
                                    ${
                                        active === "orders"
                                            ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                            : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                    }
                                `}
                                onClick={() =>
                                    handleChange("orders")
                                }
                            >
                                <Package className="mr-3 h-4 w-4" />
                                My Orders
                            </Button>

                            <Separator className="my-5" />

                            {/* Logout */}
                            <Button
                                type="button"
                                variant="destructive"
                                className="
                                    h-11
                                    w-full
                                    justify-start
                                    rounded-xl
                                    bg-red-50
                                    text-red-600
                                    hover:bg-red-100
                                    hover:text-red-700
                                "
                            >
                                <LogOut className="mr-3 h-4 w-4" />
                                Logout
                            </Button>
                        </div>
                    </div>

                    {/* =================================================
                        DRAWER FOOTER
                    ================================================== */}
                    <div
                        className="
                            border-t
                            border-slate-100
                            bg-slate-50
                            px-5
                            py-4
                        "
                    >
                        <p className="text-center text-[11px] text-slate-400">
                            Patil Krushi Seva Kendra
                        </p>
                    </div>
                </Card>
            </div>

            {/* =====================================================
                DESKTOP SIDEBAR
            ====================================================== */}
            <div className="hidden w-full lg:block">
                <Card
                    className="
                        w-full
                        rounded-2xl
                        border
                        border-slate-200
                        bg-white
                        p-4
                        shadow-sm
                    "
                >
                    <h2 className="mb-4 text-lg font-bold text-slate-900">
                        My Account
                    </h2>

                    <Separator className="mb-4" />

                    <div className="space-y-2">
                        {/* My Profile */}
                        <Button
                            type="button"
                            variant="ghost"
                            className={`
                                h-11
                                w-full
                                justify-start
                                rounded-xl
                                ${
                                    active === "profile"
                                        ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                        : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                }
                            `}
                            onClick={() =>
                                onChange("profile")
                            }
                        >
                            <User className="mr-3 h-4 w-4" />
                            My Profile
                        </Button>

                        {/* Addresses */}
                        <Button
                            type="button"
                            variant="ghost"
                            className={`
                                h-11
                                w-full
                                justify-start
                                rounded-xl
                                ${
                                    active === "addresses"
                                        ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                        : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                }
                            `}
                            onClick={() =>
                                onChange("addresses")
                            }
                        >
                            <MapPin className="mr-3 h-4 w-4" />
                            My Addresses
                        </Button>

                        {/* Wishlist */}
                        <Button
                            type="button"
                            variant="ghost"
                            className={`
                                h-11
                                w-full
                                justify-start
                                rounded-xl
                                ${
                                    active === "wishlist"
                                        ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                        : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                }
                            `}
                            onClick={() =>
                                onChange("wishlist")
                            }
                        >
                            <Heart className="mr-3 h-4 w-4" />
                            Wishlist
                        </Button>

                        {/* Orders */}
                        <Button
                            type="button"
                            variant="ghost"
                            className={`
                                h-11
                                w-full
                                justify-start
                                rounded-xl
                                ${
                                    active === "orders"
                                        ? "bg-green-600 text-white shadow-md hover:bg-green-700 hover:text-white"
                                        : "text-slate-700 hover:bg-green-50 hover:text-green-700"
                                }
                            `}
                            onClick={() =>
                                onChange("orders")
                            }
                        >
                            <Package className="mr-3 h-4 w-4" />
                            My Orders
                        </Button>

                        <Separator className="my-4" />

                        {/* Logout */}
                        <Button
                            type="button"
                            variant="ghost"
                            className="
                                h-11
                                w-full
                                justify-start
                                rounded-xl
                                bg-red-50
                                text-red-600
                                hover:bg-red-100
                                hover:text-red-700
                            "
                        >
                            <LogOut className="mr-3 h-4 w-4" />
                            Logout
                        </Button>
                    </div>
                </Card>
            </div>
        </>
    );
}
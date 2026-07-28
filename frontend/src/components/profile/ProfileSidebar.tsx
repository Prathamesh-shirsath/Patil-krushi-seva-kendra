"use client";

import {
    User,
    MapPin,
    Heart,
    Package,
    LogOut,
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
    return (
        <Card className="sticky top-24 h-fit p-4">
            <h2 className="mb-4 text-lg font-semibold">
                My Account
            </h2>

            <Separator className="mb-4" />

            <div className="space-y-2">

                <Button
                    variant={active === "profile" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onChange("profile")}
                >
                    <User className="mr-2 h-4 w-4" />
                    My Profile
                </Button>

                <Button
                    variant={active === "addresses" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onChange("addresses")}
                >
                    <MapPin className="mr-2 h-4 w-4" />
                    My Addresses
                </Button>

                <Button
                    variant={active === "wishlist" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onChange("wishlist")}
                >
                    <Heart className="mr-2 h-4 w-4" />
                    Wishlist
                </Button>

                <Button
                    variant={active === "orders" ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => onChange("orders")}
                >
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                </Button>

                <Separator className="my-4" />

                <Button
                    variant="destructive"
                    className="w-full justify-start"
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                </Button>
            </div>
        </Card>
    );
}
"use client";

import { useState } from "react";
import ProfileSidebar from "@/components/profile/ProfileSidebar";
import { Card } from "@/components/ui/card";
import ProfileForm from "@/components/profile/ProfileForm";
import AddressList from "@/components/profile/AddressList";

export type ProfileSection =
    | "profile"
    | "addresses"
    | "wishlist"
    | "orders";

export default function ProfilePage() {
    const [section, setSection] =
        useState<ProfileSection>("profile");

    return (
        <main className="container mx-auto px-4 py-8">
            <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
                <ProfileSidebar
                    active={section}
                    onChange={setSection}
                />

                <Card className="min-h-[650px] p-6">
                    {section === "profile" && (
                        <>
                            <h2 className="mb-6 text-2xl font-bold">
                                My Profile
                            </h2>

                            <ProfileForm />
                        </>
                    )}

                    {section === "addresses" && <AddressList />}

                    {section === "wishlist" && (
                        <>
                            <h2 className="text-2xl font-bold">
                                Wishlist
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                Your favourite products.
                            </p>
                        </>
                    )}

                    {section === "orders" && (
                        <>
                            <h2 className="text-2xl font-bold">
                                My Orders
                            </h2>

                            <p className="mt-2 text-muted-foreground">
                                View your previous orders.
                            </p>
                        </>
                    )}
                </Card>
            </div>
        </main>
    );
}
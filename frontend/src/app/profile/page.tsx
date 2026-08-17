"use client";

import { useState } from "react";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileForm from "@/components/profile/ProfileForm";
import AddressList from "@/components/profile/AddressList";
import OrdersList from "@/components/profile/OrdersList";

import { Card } from "@/components/ui/card";

export type ProfileSection =
  | "profile"
  | "addresses"
  | "wishlist"
  | "orders";

export default function ProfilePage() {
  const [section, setSection] =
    useState<ProfileSection>("profile");

  return (
    <main className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div className="mx-auto max-w-[1600px] px-4 py-8 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[300px_1fr]">

          {/* Left Sidebar */}
          <ProfileSidebar
            active={section}
            onChange={setSection}
          />

          {/* Right Content */}
          <div className="space-y-6">

            {/* Premium Profile Banner */}
            <div className="relative overflow-hidden rounded-[32px] border border-green-100 bg-gradient-to-r from-green-100 via-white to-green-50 p-8 shadow-xl">
              
              <div className="relative z-10 max-w-2xl">
                
                <span className="inline-flex rounded-full bg-green-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm">
                  Premium Member
                </span>

                <h1 className="mt-5 text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  My Profile
                </h1>

                <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  Manage your personal information, addresses,
                  wishlist and orders in one place.
                </p>

              </div>

              {/* Decorative Effects */}
              <div className="absolute -right-16 -top-16 h-72 w-72 rounded-full bg-green-200/40 blur-3xl" />

              <div className="absolute -bottom-20 right-32 h-52 w-52 rounded-full bg-emerald-200/30 blur-3xl" />

              <div className="absolute right-10 top-10 hidden h-20 w-20 rounded-full border border-green-200/50 sm:block" />
            </div>

            {/* Main Content Card */}
            <Card className="rounded-[30px] border-0 bg-white p-5 shadow-xl sm:p-8">

              {/* Profile */}
              {section === "profile" && (
                <ProfileForm />
              )}

              {/* Addresses */}
              {section === "addresses" && (
                <AddressList />
              )}

              {/* Wishlist */}
              {section === "wishlist" && (
                <div className="min-h-[500px]">
                  <h2 className="text-3xl font-black text-slate-900">
                    Wishlist
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Your favourite agricultural products.
                  </p>
                </div>
              )}

              {/* Orders */}
              {section === "orders" && (
                <OrdersList />
              )}

            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
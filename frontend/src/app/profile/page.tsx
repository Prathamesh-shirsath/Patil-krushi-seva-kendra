"use client";

import { useState } from "react";

import ProfileSidebar from "@/components/profile/ProfileSidebar";
import ProfileForm from "@/components/profile/ProfileForm";
import AddressList from "@/components/profile/AddressList";

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

            {/* Premium Banner */}

            <div
              className="
                relative
                overflow-hidden
                rounded-[32px]
                border
                border-green-100
                bg-gradient-to-r
                from-green-100
                via-white
                to-green-50
                p-8
                shadow-xl
              "
            >

              <div className="max-w-2xl">

                <span className="rounded-full bg-green-600 px-4 py-1 text-xs font-semibold text-white">
                  Premium Member
                </span>

                <h1 className="mt-5 text-4xl font-bold text-slate-900">
                  My Profile
                </h1>

                <p className="mt-3 text-lg text-slate-600">
                  Manage your personal information, addresses,
                  wishlist and orders in one place.
                </p>

              </div>

              <div
                className="
                  absolute
                  -right-16
                  -top-16
                  h-72
                  w-72
                  rounded-full
                  bg-green-200/30
                  blur-3xl
                "
              />

            </div>

            {/* Main Card */}

            <Card className="rounded-[30px] border-0 bg-white p-8 shadow-xl">

              {section === "profile" && <ProfileForm />}

              {section === "addresses" && (
                <AddressList />
              )}

              {section === "wishlist" && (

                <div>

                  <h2 className="text-3xl font-bold">
                    Wishlist
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Your favourite agricultural products.
                  </p>

                </div>

              )}

              {section === "orders" && (

                <div>

                  <h2 className="text-3xl font-bold">
                    My Orders
                  </h2>

                  <p className="mt-2 text-slate-500">
                    Track all your previous and current orders.
                  </p>

                </div>

              )}

            </Card>

          </div>

        </div>

      </div>

    </main>
  );
}
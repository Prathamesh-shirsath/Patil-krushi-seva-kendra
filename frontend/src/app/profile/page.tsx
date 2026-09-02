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
    <main className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-green-50 via-white to-emerald-50">
      <div
        className="
          mx-auto
          w-full
          max-w-[1600px]
          px-3
          py-4
          sm:px-5
          sm:py-6
          lg:px-8
          lg:py-8
        "
      >
        {/* =====================================================
            PROFILE DASHBOARD LAYOUT
        ====================================================== */}
        <div
          className="
            grid
            w-full
            grid-cols-1
            gap-5
            lg:grid-cols-[270px_minmax(0,1fr)]
            lg:gap-6
            xl:grid-cols-[290px_minmax(0,1fr)]
            xl:gap-8
          "
        >
          {/* =====================================================
              LEFT SIDEBAR
          ====================================================== */}
          <aside
            className="
              w-full
              min-w-0
              lg:sticky
              lg:top-24
              lg:self-start
              lg:max-h-[calc(100vh-120px)]
              lg:overflow-y-auto
              lg:pr-1
              lg:[scrollbar-width:none]
              [&::-webkit-scrollbar]:hidden
            "
          >
            <div
              className="
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:shadow-md
                sm:rounded-3xl
              "
            >
              <ProfileSidebar
                active={section}
                onChange={setSection}
              />
            </div>
          </aside>

          {/* =====================================================
              RIGHT CONTENT
          ====================================================== */}
          <section
            className="
              min-w-0
              w-full
              space-y-5
              sm:space-y-6
            "
          >
            {/* ===================================================
                PREMIUM PROFILE BANNER
            ==================================================== */}
            <div
              className="
                relative
                min-h-[220px]
                w-full
                overflow-hidden
                rounded-2xl
                border
                border-green-100
                bg-gradient-to-br
                from-green-100
                via-white
                to-emerald-50
                p-5
                shadow-lg
                sm:min-h-[250px]
                sm:rounded-3xl
                sm:p-7
                md:p-8
                lg:min-h-[270px]
              "
            >
              {/* Content */}
              <div
                className="
                  relative
                  z-10
                  max-w-2xl
                "
              >
                {/* Badge */}
                <span
                  className="
                    inline-flex
                    items-center
                    rounded-full
                    bg-green-600
                    px-3
                    py-1
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wide
                    text-white
                    shadow-sm
                    sm:px-4
                    sm:py-1.5
                    sm:text-xs
                  "
                >
                  Premium Member
                </span>

                {/* Heading */}
                <h1
                  className="
                    mt-3
                    text-2xl
                    font-black
                    tracking-tight
                    text-slate-900
                    sm:mt-4
                    sm:text-4xl
                    md:text-5xl
                  "
                >
                  My Profile
                </h1>

                {/* Description */}
                <p
                  className="
                    mt-2
                    max-w-xl
                    text-sm
                    leading-6
                    text-slate-600
                    sm:mt-3
                    sm:text-base
                    sm:leading-7
                    md:text-lg
                  "
                >
                  Manage your personal information, addresses,
                  wishlist and orders in one place.
                </p>
              </div>

              {/* =================================================
                  DECORATIVE BACKGROUND
              ================================================== */}

              {/* Top Right Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-40
                  w-40
                  rounded-full
                  bg-green-200/40
                  blur-3xl
                  sm:-right-20
                  sm:-top-20
                  sm:h-64
                  sm:w-64
                  md:h-72
                  md:w-72
                "
              />

              {/* Bottom Right Glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-16
                  right-4
                  h-32
                  w-32
                  rounded-full
                  bg-emerald-200/30
                  blur-3xl
                  sm:-bottom-20
                  sm:right-20
                  sm:h-48
                  sm:w-48
                  md:right-32
                  md:h-52
                  md:w-52
                "
              />

              {/* Circle */}
              <div
                className="
                  pointer-events-none
                  absolute
                  right-4
                  top-4
                  hidden
                  h-16
                  w-16
                  rounded-full
                  border
                  border-green-200/50
                  sm:right-8
                  sm:top-8
                  sm:block
                  sm:h-20
                  sm:w-20
                  md:right-12
                  md:top-10
                  md:h-24
                  md:w-24
                "
              />

              {/* Small Circle */}
              <div
                className="
                  pointer-events-none
                  absolute
                  bottom-6
                  right-20
                  hidden
                  h-5
                  w-5
                  rounded-full
                  bg-green-300/40
                  sm:block
                  md:right-40
                "
              />
            </div>

            {/* ===================================================
                MAIN CONTENT CARD
            ==================================================== */}
            <Card
              className="
                w-full
                min-w-0
                overflow-hidden
                rounded-2xl
                border
                border-slate-200/80
                bg-white
                p-4
                shadow-lg
                transition-all
                duration-300
                sm:rounded-3xl
                sm:p-6
                md:p-8
                lg:p-9
              "
            >
              {/* =================================================
                  PROFILE
              ================================================== */}
              {section === "profile" && (
                <div className="w-full min-w-0">
                  <ProfileForm />
                </div>
              )}

              {/* =================================================
                  ADDRESSES
              ================================================== */}
              {section === "addresses" && (
                <div className="w-full min-w-0">
                  <AddressList />
                </div>
              )}

              {/* =================================================
                  WISHLIST
              ================================================== */}
              {section === "wishlist" && (
                <div
                  className="
                    min-h-[300px]
                    w-full
                    min-w-0
                    sm:min-h-[400px]
                  "
                >
                  <h2
                    className="
                      text-2xl
                      font-black
                      tracking-tight
                      text-slate-900
                      sm:text-3xl
                    "
                  >
                    Wishlist
                  </h2>

                  <p
                    className="
                      mt-2
                      text-sm
                      leading-6
                      text-slate-500
                      sm:text-base
                    "
                  >
                    Your favourite agricultural products.
                  </p>
                </div>
              )}

              {/* =================================================
                  ORDERS
              ================================================== */}
              {section === "orders" && (
                <div className="w-full min-w-0">
                  <OrdersList />
                </div>
              )}
            </Card>
          </section>
        </div>
      </div>
    </main>
  );
}
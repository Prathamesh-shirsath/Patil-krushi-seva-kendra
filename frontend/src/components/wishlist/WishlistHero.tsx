"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Heart,
  Home,
  ShoppingBag,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export default function WishlistHero() {
  return (
    <section className="relative overflow-hidden border-b bg-gradient-to-br from-green-50 via-white to-emerald-100">

      {/* Background Blur */}
      <div className="absolute -left-24 top-0 h-72 w-72 rounded-full bg-green-300/20 blur-3xl" />
      <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-12 md:px-8 lg:py-20">

        {/* Breadcrumb */}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6 flex flex-wrap items-center gap-2 text-sm text-gray-500"
        >
          <Home className="h-4 w-4" />

          <Link
            href="/"
            className="transition hover:text-green-700"
          >
            Home
          </Link>

          <ArrowRight className="h-4 w-4" />

          <span className="font-semibold text-green-700">
            Wishlist
          </span>
        </motion.div>

        <div className="grid items-center gap-10 lg:grid-cols-2">

          {/* Left */}

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">

              <Sparkles className="h-4 w-4" />

              Premium Wishlist

            </div>

            <h1 className="text-4xl font-black leading-tight text-gray-900 md:text-5xl xl:text-6xl">

              Save Products

              <span className="block bg-gradient-to-r from-green-700 via-lime-600 to-emerald-500 bg-clip-text text-transparent">

                You Love 🌿

              </span>

            </h1>

            <p className="mt-6 max-w-xl text-lg leading-8 text-gray-600">

              Keep all your favourite fertilizers, pesticides,
              seeds and farming essentials in one beautiful place.
              Add them to your cart anytime with a single click.

            </p>

            <div className="mt-10 flex flex-wrap gap-4">

              <Link
                href="/shop"
                className="rounded-xl bg-green-700 px-7 py-4 font-semibold text-white transition hover:bg-green-800"
              >
                Continue Shopping
              </Link>

              <button className="rounded-xl border border-green-600 bg-white px-7 py-4 font-semibold text-green-700 transition hover:bg-green-50">

                Share Wishlist

              </button>

            </div>
          </motion.div>

          {/* Right */}

          <motion.div
            initial={{ opacity: 0, scale: .8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="grid grid-cols-2 gap-5"
          >

            <StatCard
              icon={<Heart />}
              number="24"
              title="Saved Products"
              color="rose"
            />

            <StatCard
              icon={<ShoppingBag />}
              number="₹18,450"
              title="Wishlist Value"
              color="green"
            />

            <StatCard
              icon={<Sparkles />}
              number="8"
              title="Offers Available"
              color="amber"
            />

            <StatCard
              icon={<ShoppingBag />}
              number="5"
              title="Back In Stock"
              color="blue"
            />

          </motion.div>

        </div>

      </div>

    </section>
  );
}

type CardProps = {
  icon: React.ReactNode;
  number: string;
  title: string;
  color: "green" | "rose" | "amber" | "blue";
};

function StatCard({
  icon,
  number,
  title,
  color,
}: CardProps) {
  const colors = {
    green:
      "from-green-500 to-emerald-500",

    rose:
      "from-rose-500 to-pink-500",

    amber:
      "from-yellow-500 to-orange-500",

    blue:
      "from-sky-500 to-cyan-500",
  };

  return (
    <div className="rounded-3xl border bg-white/90 p-6 shadow-lg backdrop-blur">

      <div
        className={`mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${colors[color]} text-white`}
      >
        {icon}
      </div>

      <h3 className="text-3xl font-black">

        {number}

      </h3>

      <p className="mt-2 text-gray-500">

        {title}

      </p>

    </div>
  );
}
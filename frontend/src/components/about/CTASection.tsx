
"use client";

import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative overflow-hidden py-24">
      
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-700 via-green-600 to-emerald-500" />

      {/* Decorative Circles */}
      <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />
      <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 text-center">

        <span className="inline-block rounded-full bg-white/20 px-5 py-2 text-white font-semibold">
          🌱 READY TO GROW?
        </span>

        <h2 className="mt-6 text-4xl md:text-6xl font-extrabold text-white">
          Ready To Grow Better Crops?
        </h2>

        <p className="mt-5 max-w-3xl mx-auto text-lg text-white/90">
          Explore our premium agricultural products and expert
          farming solutions designed to help farmers achieve
          higher productivity and better harvests.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex flex-wrap justify-center gap-4">

          <Link
            href="/products"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-white
              px-8
              py-4
              font-semibold
              text-green-700
              shadow-xl
              hover:scale-105
              transition-all
            "
          >
            Shop Products
            <ArrowRight className="h-5 w-5" />
          </Link>

          <Link
            href="/contact"
            className="
              inline-flex
              items-center
              gap-2
              rounded-xl
              border-2
              border-white
              px-8
              py-4
              font-semibold
              text-white
              hover:bg-white
              hover:text-green-700
              transition-all
            "
          >
            Contact Us
            <Phone className="h-5 w-5" />
          </Link>

        </div>

      </div>
    </section>
  );
}


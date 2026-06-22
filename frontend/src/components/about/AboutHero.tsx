
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Phone, Leaf } from "lucide-react";

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#f8fcf5] via-white to-[#eef8e8]">
      
      {/* Background Effects */}
      <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-green-200/20 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-72 w-72 rounded-full bg-yellow-200/20 blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 lg:py-24">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left Content */}
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-700">
              <Leaf className="h-4 w-4" />
              ABOUT US
            </div>

            <h1 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold leading-tight text-gray-900">
              Quality Seeds, Fertilizers &
              <span className="block text-green-700">
                Pesticides Under One Roof
              </span>
            </h1>

            <h2 className="mt-5 text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800">
              Patil Krushi Seva Kendra
            </h2>

            <p className="mt-5 max-w-2xl text-base md:text-lg leading-7 md:leading-8 text-gray-600">
              Empowering farmers with quality agricultural products,
              modern farming solutions and expert guidance to achieve
              better yields and sustainable growth.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center gap-2 rounded-xl bg-green-600 px-5 py-3 md:px-6 md:py-4 font-semibold text-white shadow-lg hover:bg-green-700 transition"
              >
                Explore Products
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center gap-2 rounded-xl border-2 border-green-600 px-5 py-3 md:px-6 md:py-4 font-semibold text-green-700 hover:bg-green-50 transition"
              >
                Contact Us
                <Phone className="h-5 w-5" />
              </Link>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="rounded-full bg-white px-4 py-2 text-sm md:text-base shadow">
                🌱 100% Genuine Products
              </div>

              <div className="rounded-full bg-white px-4 py-2 text-sm md:text-base shadow">
                🚚 Fast Delivery
              </div>

              <div className="rounded-full bg-white px-4 py-2 text-sm md:text-base shadow">
                👨‍🌾 Expert Guidance
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 h-28 w-28 md:h-40 md:w-40 rounded-full bg-green-200 blur-3xl opacity-40" />
            <div className="absolute -bottom-6 -left-6 h-28 w-28 md:h-40 md:w-40 rounded-full bg-yellow-200 blur-3xl opacity-40" />

            <div className="overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/about/about2.jpg"
                alt="Patil Krushi Seva Kendra"
                width={1200}
                height={800}
                priority
                className="
                  w-full
                  h-[280px]
                  sm:h-[350px]
                  md:h-[450px]
                  lg:h-[550px]
                  object-cover
                  transition-transform
                  duration-700
                  hover:scale-105
                "
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}


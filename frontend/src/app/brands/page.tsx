"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Sprout, Award, Globe, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BRANDS_LIST = [
  {
    name: "Syngenta",
    slug: "syngenta",
    tagline: "Trusted Agriculture Leader",
    description: "Syngenta is a global leader in agricultural innovation, helping farmers grow healthier crops with advanced seeds, crop protection solutions, and digital farming technologies.",
    productsCount: "120+",
    experience: "30+ Years",
    logo: "/logo.jpeg",
    featuredColor: "border-green-500/20 bg-emerald-50/10",
  },
  {
    name: "IFFCO",
    slug: "iffco",
    tagline: "India's Leading Fertilizer Cooperative",
    description: "The Indian Farmers Fertiliser Cooperative Limited is one of India's biggest cooperative societies which is wholly owned by Indian Cooperatives.",
    productsCount: "80+",
    experience: "50+ Years",
    logo: "/logo.jpeg",
    featuredColor: "border-slate-200 bg-white",
  },
  {
    name: "Yara",
    slug: "yara",
    tagline: "Knowledge Grows",
    description: "Yara International ASA is a Norwegian chemical company. Its largest business area is the production of nitrogen fertilizer, nitrate, ammonia, urea and other nitrogen-based chemicals.",
    productsCount: "60+",
    experience: "25+ Years",
    logo: "/logo.jpeg",
    featuredColor: "border-slate-200 bg-white",
  },
  {
    name: "KRIBHCO",
    slug: "kribhco",
    tagline: "Cooperative for Farmer Growth",
    description: "Krishak Bharati Cooperative Limited is a multi-state cooperative society which manufactures fertilizer, mainly urea, ammonia, bio-fertilizers and seeds.",
    productsCount: "45+",
    experience: "40+ Years",
    logo: "/logo.jpeg",
    featuredColor: "border-slate-200 bg-white",
  },
  {
    name: "Coromandel",
    slug: "coromandel",
    tagline: "Pioneering Crop Nutrition",
    description: "Coromandel International Limited is an Indian company focused on fertilizers, crop protection chemicals and specialty nutrients, serving millions of farmers.",
    productsCount: "55+",
    experience: "60+ Years",
    logo: "/logo.jpeg",
    featuredColor: "border-slate-200 bg-white",
  },
  {
    name: "Dhanuka",
    slug: "dhanuka",
    tagline: "Better Technology, Better Yield",
    description: "Dhanuka Agritech Limited manufactures a wide range of agro-chemicals like herbicides, fungicides, insecticides and plant growth regulators.",
    productsCount: "40+",
    experience: "35+ Years",
    logo: "/logo.jpeg",
    featuredColor: "border-slate-200 bg-white",
  },
];

export default function BrandsOverviewPage() {
  return (
    <main className="bg-slate-50/50 min-h-screen text-slate-800 pb-16">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-[1500px] px-4 py-3 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-900 font-semibold">Brands</span>
        </div>
      </div>

      {/* Header section */}
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest bg-green-100/60 px-3 py-1 rounded-full">
            Authorized Partners
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-3">
            Top Agricultural Brands
          </h1>
          <p className="text-sm text-slate-500 mt-3 leading-relaxed">
            We partner with the world's most trusted agricultural manufacturers to bring you 100% original, certified seeds, crop protection solutions, and fertilizers.
          </p>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {BRANDS_LIST.map((brand) => (
            <Card
              key={brand.slug}
              className={`rounded-2xl border hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${brand.featuredColor}`}
            >
              <CardContent className="p-6 sm:p-8 flex flex-col justify-between h-full min-h-[300px]">
                <div className="flex-1">
                  {/* Brand Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-12 w-12 rounded-xl bg-white p-1.5 flex items-center justify-center shadow-sm shrink-0 border border-slate-100">
                      <Image
                        src={brand.logo}
                        alt={brand.name}
                        width={50}
                        height={50}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-slate-900 leading-tight">
                        {brand.name}
                      </h2>
                      <span className="text-[10px] sm:text-xs font-semibold text-green-700">
                        {brand.tagline}
                      </span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium line-clamp-4 mt-2">
                    {brand.description}
                  </p>
                </div>

                {/* Stats strip */}
                <div className="grid grid-cols-2 gap-4 py-4 my-4 border-t border-b border-slate-100/80">
                  <div className="flex items-center gap-2">
                    <Sprout className="h-4 w-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-none text-slate-800">{brand.productsCount}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Products</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Award className="h-4 w-4 text-emerald-600 shrink-0" />
                    <div>
                      <p className="text-xs font-bold leading-none text-slate-800">{brand.experience}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">Experience</p>
                    </div>
                  </div>
                </div>

                {/* Explore button */}
                <Link href={`/brands/${brand.slug}`}>
                  <Button className="w-full h-11 rounded-xl bg-green-700 hover:bg-green-800 text-white font-semibold text-xs transition duration-300">
                    Explore Brand Products
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  );
}

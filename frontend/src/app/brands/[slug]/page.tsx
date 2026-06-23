"use client";

import { use, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ChevronRight,
  ShieldCheck,
  Truck,
  Headphones,
  RefreshCw,
  Award,
  Tag,
  Star,
  Heart,
  ShoppingCart,
  LayoutGrid,
  List,
  Bug,
  Sprout,
  Leaf,
  Wheat,
  Globe,
  Users,
  ExternalLink,
  Flame,
  ArrowRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import ProductCard from "@/components/common/ProductCard";

// Brand mock data structure
interface BrandDetail {
  name: string;
  slug: string;
  tagline: string;
  trustedBadge: string;
  logo: string;
  description: string;
  stats: {
    products: string;
    experience: string;
    countries: string;
    trustRating: string;
  };
  features: string[];
  about: string;
  officialWebsite: string;
  categories: {
    name: string;
    count: number;
    icon: any;
  }[];
  products: {
    id: number;
    name: string;
    category: string;
    price: number;
    originalPrice: number;
    rating: number;
    reviews: number;
    image: string;
    badge?: string;
  }[];
}

const BRAND_DATA: Record<string, BrandDetail> = {
  syngenta: {
    name: "Syngenta",
    slug: "syngenta",
    tagline: "Global leader in agricultural innovation and science.",
    trustedBadge: "Trusted Agriculture Leader",
    logo: "/logo.jpeg", // Using existing logo as a nice visual fallback
    description: "Syngenta is a global leader in agricultural innovation, helping farmers grow healthier crops with advanced seeds, crop protection solutions, and digital farming technologies.",
    stats: {
      products: "120+ Products",
      experience: "30+ Years in India",
      countries: "100+ Countries",
      trustRating: "Trusted by Millions of Farmers",
    },
    features: [
      "Innovative Solutions",
      "High Quality",
      "Better Yield",
      "Farmer Trusted",
    ],
    about: "Syngenta is committed to bringing plant potential to life through world-class science and innovation. From crop protection to seeds and digital solutions, Syngenta empowers farmers to increase productivity and profitability while protecting the planet.",
    officialWebsite: "https://www.syngenta.co.in",
    categories: [
      { name: "Insecticides", count: 18, icon: Bug },
      { name: "Fungicides", count: 24, icon: Sprout },
      { name: "Herbicides", count: 16, icon: Leaf },
      { name: "Seeds", count: 22, icon: Sprout },
      { name: "Plant Growth Regulators", count: 8, icon: Wheat },
      { name: "Bio Solutions", count: 12, icon: ShieldCheck },
    ],
    products: [
      {
        id: 101,
        name: "Amistar Top 325 SC 1L",
        category: "Fungicide",
        price: 1250,
        originalPrice: 1600,
        rating: 4.6,
        reviews: 120,
        image: "/Products/fertilizer_bottle.png",
        badge: "Bestseller",
      },
      {
        id: 102,
        name: "Virtako 40 WG 100gm",
        category: "Insecticide",
        price: 850,
        originalPrice: 1050,
        rating: 4.5,
        reviews: 85,
        image: "/Products/fertilizer_bag.png",
        badge: "New",
      },
      {
        id: 103,
        name: "Ridomil Gold MZ 68 WG 1Kg",
        category: "Fungicide",
        price: 950,
        originalPrice: 1200,
        rating: 4.7,
        reviews: 98,
        image: "/Products/fertilizer_bag.png",
        badge: "Popular",
      },
      {
        id: 104,
        name: "Score 250 EC 1L",
        category: "Fungicide",
        price: 780,
        originalPrice: 980,
        rating: 4.4,
        reviews: 76,
        image: "/Products/fertilizer_bottle.png",
      },
      {
        id: 105,
        name: "Actara 25 WG 250gm",
        category: "Insecticide",
        price: 650,
        originalPrice: 820,
        rating: 4.6,
        reviews: 64,
        image: "/Products/fertilizer_bag.png",
      },
      {
        id: 106,
        name: "Touchdown 50 SL 1L",
        category: "Herbicide",
        price: 1050,
        originalPrice: 1300,
        rating: 4.5,
        reviews: 50,
        image: "/Products/fertilizer_bottle.png",
      },
    ],
  },
};

const defaultBrand: BrandDetail = {
  name: "Agri Brand",
  slug: "generic",
  tagline: "Leading provider of farming solutions and products.",
  trustedBadge: "Quality Verified Brand",
  logo: "/logo.jpeg",
  description: "Providing farmers with verified agricultural products for sustainable cultivation, crop nutrition, and maximum field potential.",
  stats: {
    products: "50+ Products",
    experience: "15+ Years in India",
    countries: "10+ Countries",
    trustRating: "Trusted by Farmers Nationwide",
  },
  features: [
    "Reliable Support",
    "Lab Tested",
    "High Efficacy",
    "Cost Effective",
  ],
  about: "We partner with local and global leaders to deliver top-tier crop solutions, fertilizers, and modern equipment tailored to maximize farm productivity.",
  officialWebsite: "https://www.google.com",
  categories: [
    { name: "Fertilizers", count: 12, icon: Wheat },
    { name: "Seeds", count: 15, icon: Sprout },
    { name: "Farming Tools", count: 8, icon: Leaf },
  ],
  products: [
    {
      id: 201,
      name: "Generic Crop Booster 1L",
      category: "Fertilizers",
      price: 499,
      originalPrice: 650,
      rating: 4.5,
      reviews: 32,
      image: "/Products/fertilizer_bottle.png",
      badge: "Bestseller",
    },
    {
      id: 202,
      name: "Standard Soil Nutrient 5kg",
      category: "Fertilizers",
      price: 899,
      originalPrice: 1100,
      rating: 4.4,
      reviews: 21,
      image: "/Products/fertilizer_bag.png",
    },
  ],
};

const trustBenefits = [
  { title: "100% Original Products", icon: ShieldCheck },
  { title: "Best Price Guaranteed", icon: Tag },
  { title: "Expert Support", icon: Headphones },
  { title: "Fast & Safe Delivery", icon: Truck },
  { title: "Easy Returns 7 Days Policy", icon: RefreshCw },
];

const chooseReasons = [
  {
    title: "Advanced Innovation",
    description: "Cutting-edge research for better crop solutions",
    icon: Flame,
  },
  {
    title: "Higher Productivity",
    description: "Solutions that improve yield and quality",
    icon: Award,
  },
  {
    title: "Sustainable Farming",
    description: "Environment-friendly and sustainable solutions",
    icon: Leaf,
  },
  {
    title: "Farmer Centric",
    description: "Designed to meet real farmers' needs",
    icon: Users,
  },
  {
    title: "Global Expertise",
    description: "Backed by global knowledge and local understanding",
    icon: Globe,
  },
];

export default function BrandDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const router = useRouter();
  const slug = resolvedParams.slug.toLowerCase();

  const brand = BRAND_DATA[slug] || {
    ...defaultBrand,
    name: resolvedParams.slug.charAt(0).toUpperCase() + resolvedParams.slug.slice(1),
    slug: resolvedParams.slug,
  };

  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handleCategoryClick = (categoryName: string) => {
    // Navigate to shop page pre-filtered with brand and category
    router.push(`/shop?brand=${encodeURIComponent(brand.name)}&category=${encodeURIComponent(categoryName)}`);
  };

  return (
    <main className="bg-slate-50/50 min-h-screen text-slate-800">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-100">
        <div className="mx-auto max-w-[1500px] px-4 py-3 sm:px-6 lg:px-8 text-xs text-slate-500 flex items-center gap-1.5 font-medium">
          <Link href="/" className="hover:text-green-700 transition">Home</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <Link href="/brands" className="hover:text-green-700 transition">Brands</Link>
          <ChevronRight className="h-3.5 w-3.5 text-slate-300" />
          <span className="text-slate-900 font-semibold">{brand.name}</span>
        </div>
      </div>

      {/* Brand Hero Showcase */}
      <section className="mx-auto max-w-[1500px] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative w-full rounded-3xl overflow-hidden bg-white shadow-md border border-slate-100">
          
          <div className="grid lg:grid-cols-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14 text-slate-800 flex flex-col h-full justify-between">
              <div>
                {/* Brand Logo & Name Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-2xl bg-white p-1.5 flex items-center justify-center shadow-sm border border-slate-100">
                    <Image
                      src={brand.logo}
                      alt={brand.name}
                      width={100}
                      height={100}
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none text-slate-900">
                      {brand.name}
                    </h1>
                    <span className="inline-flex items-center gap-1 mt-1.5 px-2.5 py-0.5 rounded-full text-[10px] sm:text-xs font-bold bg-green-50 text-green-700 border border-green-200">
                      🌱 {brand.trustedBadge}
                    </span>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-slate-500 max-w-xl font-medium leading-relaxed mt-4">
                  {brand.description}
                </p>
              </div>

              {/* Stats Indicators Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-8 border-t border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0 border border-green-100">
                    <Sprout className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none text-slate-900">{brand.stats.products}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Products</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0 border border-green-100">
                    <Award className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none text-slate-900">{brand.stats.experience}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">In India</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0 border border-green-100">
                    <Globe className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none text-slate-900">{brand.stats.countries}</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Countries</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-50 flex items-center justify-center text-green-700 shrink-0 border border-green-100">
                    <Users className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-bold leading-none text-slate-900">Trusted by</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-1">Millions</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Photo Area */}
            <div className="lg:col-span-5 relative w-full h-[280px] sm:h-[350px] lg:h-full min-h-[350px] overflow-hidden">
              <Image
                src={slug === "syngenta" ? "/banners/syngenta_hero.png" : "/banners/fertilizer_banner.png"}
                alt={`${brand.name} Product Showcase`}
                fill
                className="object-cover object-center scale-100 hover:scale-102 transition duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent lg:bg-gradient-to-r lg:from-white/10 lg:to-transparent" />

              {/* Bottom Feature Tags Strip */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/75 backdrop-blur-sm py-3 px-4 flex flex-wrap gap-x-6 gap-y-2 justify-center">
                {brand.features.map((feature, i) => (
                  <span
                    key={feature}
                    className="inline-flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold text-emerald-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Trust points banner */}
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="bg-emerald-50/50 rounded-2xl border border-emerald-100/50 py-4 px-6 md:px-10">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-y-4 gap-x-2 text-slate-700 font-semibold">
            {trustBenefits.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex items-center gap-3 justify-start md:justify-center">
                  <div className="h-9 w-9 rounded-full bg-emerald-100/60 flex items-center justify-center text-emerald-800 shrink-0">
                    <Icon className="h-4 w-4 stroke-[2.5]" />
                  </div>
                  <span className="text-xs tracking-wide text-slate-800 leading-snug">
                    {item.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* About & Official Website Section */}
      <section className="mx-auto max-w-[1500px] px-4 py-4 sm:px-6 lg:px-8">
        <Card className="rounded-2xl border border-slate-200/60 bg-white p-6 md:p-8 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 mb-3">
                About {brand.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {brand.about}
              </p>
            </div>
            <div>
              <a
                href={brand.officialWebsite}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-green-200 text-xs font-bold text-green-700 hover:bg-green-50 transition shadow-sm bg-white shrink-0"
              >
                Visit {brand.name} Official Website
                <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </Card>
      </section>

      {/* Shop by Category Section */}
      <section className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900">
              Shop by Category ({brand.name})
            </h2>
            <p className="text-xs text-slate-500 mt-1">Select crop-care types custom-filtered for this brand</p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-xs font-bold text-green-700 hover:text-green-800 transition"
          >
            View All Categories
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {brand.categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <button
                key={cat.name}
                onClick={() => handleCategoryClick(cat.name)}
                className="group flex flex-col items-center justify-center p-5 rounded-2xl border border-slate-200/60 bg-white hover:border-green-300 hover:shadow-md transition-all duration-300 text-center"
              >
                <div className="h-12 w-12 rounded-full bg-green-50 text-green-700 flex items-center justify-center mb-3 group-hover:scale-110 transition duration-300 shrink-0">
                  <Icon className="h-6 w-6 stroke-[1.8]" />
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-800 leading-tight">
                  {cat.name}
                </h3>
                <span className="text-[10px] sm:text-xs text-slate-400 font-medium mt-1">
                  {cat.count} Products
                </span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Brand Products Catalog */}
      <section className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        <div className="border-t border-slate-200/60 pt-8">
          
          {/* Catalog Header Controls */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900">
                {brand.name} Products ({brand.products.length}+)
              </h2>
            </div>
            
            <div className="flex items-center justify-between sm:justify-end gap-3">
              <div className="flex items-center gap-2">
                <label className="text-xs font-bold text-slate-500" htmlFor="brand-sort">
                  Sort By:
                </label>
                <select
                  id="brand-sort"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="h-9 rounded-lg border border-slate-200 bg-white px-3 text-xs font-bold text-slate-700 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                >
                  <option value="popularity">Popularity</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Top Rated</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "grid" ? "bg-green-700 text-white shadow-sm" : "border border-slate-200 text-slate-400 hover:bg-slate-50"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg transition ${
                    viewMode === "list" ? "bg-green-700 text-white shadow-sm" : "border border-slate-200 text-slate-400 hover:bg-slate-50"
                  }`}
                  aria-label="List view"
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Product Cards List/Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-5">
            {brand.products.map((prod) => (
              <ProductCard
                key={prod.id}
                name={prod.name}
                price={prod.price}
                originalPrice={prod.originalPrice}
                image={prod.image}
                category={prod.category}
                brand={brand.name}
                rating={prod.rating}
                reviewCount={prod.reviews}
                badge={prod.badge}
              />
            ))}
          </div>

          {/* View All Button */}
          <div className="flex items-center justify-center mt-10">
            <Link href={`/shop?brand=${encodeURIComponent(brand.name)}`}>
              <Button
                variant="outline"
                className="h-12 px-8 rounded-xl border-slate-200 hover:border-green-600 text-slate-700 hover:text-green-700 transition font-semibold text-xs shadow-sm bg-white"
              >
                View All {brand.products.length}+ Products
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

        </div>
      </section>

      {/* Why Farmers Choose Section */}
      <section className="bg-emerald-950/5 flex flex-col items-center py-12 px-4 sm:px-6 lg:px-8 border-t border-emerald-900/5 mt-8">
        <div className="mx-auto max-w-[1500px] w-full text-center">
          <span className="text-[10px] font-bold text-green-700 uppercase tracking-widest bg-green-100/60 px-3 py-1 rounded-full">
            Our Promise
          </span>
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 mt-3 mb-10">
            Why Farmers Choose {brand.name}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 text-left">
            {chooseReasons.map((reason) => {
              const Icon = reason.icon;
              return (
                <div
                  key={reason.title}
                  className="bg-white p-6 rounded-2xl border border-slate-200/50 hover:shadow-md transition duration-300"
                >
                  <div className="h-10 w-10 rounded-xl bg-green-50 text-green-700 flex items-center justify-center mb-4 shrink-0">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 mb-1.5 leading-snug">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed font-medium">
                    {reason.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

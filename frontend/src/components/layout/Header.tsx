"use client";

import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BRAND_IMAGE } from "@/lib/image-fallbacks";
import { usePathname } from "next/navigation";
import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Categories", href: "/categories" },
  { name: "Brands", href: "/brands" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export default function Header() {
  const pathname = usePathname();
  return (
    <>
      {/* Top Bar */}
      <div className="bg-green-700 text-white text-[11px] sm:text-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex items-center justify-between gap-3">
          <span>🚚 Free Delivery Above ₹499</span>

          <span className="hidden md:block">
            🌱 Quality Agricultural Products
          </span>

          <span>📞 +91 9209061629</span>
        </div>
      </div>

      <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur">
       <div className="w-full px-3 sm:px-4 lg:px-10">
        <div className="flex h-20 items-center gap-2 sm:h-24 sm:gap-4 lg:gap-6">
            
            {/* Logo */}
            <Link
              href="/"
              className="flex min-w-0 flex-1 shrink items-center gap-2 sm:gap-3 lg:flex-none"
            >
              <Image
                src={DEFAULT_BRAND_IMAGE}
                alt="Patil Krushi Seva Kendra"
               width={72}
               height={62}
                className="h-11 w-11 shrink-0 rounded-full object-cover sm:h-16 sm:w-16 lg:h-[72px] lg:w-[72px]"
              />

              <div className="min-w-0">
                <h1 className="max-w-[110px] text-[10px] font-bold leading-tight text-green-700 min-[360px]:max-w-[138px] min-[390px]:max-w-[160px] sm:max-w-none sm:text-sm md:text-base lg:text-lg">
                  Patil Krushi Seva Kendra
                </h1>

              <p className="hidden md:block text-xs text-gray-500">
                  Agricultural Products & Solutions
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
         <nav className="hidden lg:flex items-center gap-5">
          <div className="hidden lg:flex items-center gap-6 ml-auto"></div>
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-green-600 ${
                  pathname === item.href
                  ? "text-green-600 border-b-2 border-green-600 pb-0.5"
                  : "text-gray-700"
                   }`}
                  >
                  {item.name}
                </Link>
              ))}
            </nav>

           
            {/* Search Bar */}
<div className="hidden lg:flex flex-1 max-w-xl">
  <div className="relative w-full">
    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

    <Input
      placeholder="Search seeds, fertilizers, pesticides..."
      className="
        h-11
        pl-10
        rounded-full
        border-green-200
        focus-visible:ring-green-500
        shadow-sm
        hover:shadow-md
        transition-all
      "
    />
  </div>
</div>

            {/* Right Side */}
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Button
  variant="ghost"
  size="icon"
  className="hidden h-11 w-11 sm:inline-flex md:hidden"
>
  <Search className="h-5 w-5" />
</Button>
              
              {/* Wishlist */}
              <Button
                variant="ghost"
                size="icon"
                className="relative hidden h-11 w-11 sm:inline-flex"
              >
                <Heart className="h-5 w-5" />

                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>

              {/* Login */}
                <Link href="/login">
               <Button className="hidden md:flex items-center gap-2 rounded-full bg-green-600 hover:bg-green-700 text-white px-5 h-10 shadow-md hover:shadow-lg transition-all">
               <User className="h-4 w-4" />
                Login
               </Button>
               </Link>

              {/* Cart */}
              <Button
  variant="ghost"
  size="icon"
  className="
    relative
    h-11
    w-11
    hover:bg-red-50
    hover:text-red-500
    transition-all
  "
>
                <ShoppingCart className="h-5 w-5" />

                <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Button>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-11 w-11 lg:hidden"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
<SheetContent side="left" className="w-[280px] px-4">
  <div className="mt-8 flex flex-col gap-5">
    {navLinks.map((item) => (
      <Link
        key={item.name}
        href={item.href}
        className="
          text-lg
          font-medium
          hover:text-green-600
        "
      >
        {item.name}
      </Link>
    ))}
  </div>

  {/* Mobile Login Button */}
  <div className="pt-4 border-t mt-4 flex justify-center">
     <Link href="/login">
  <Button
    className="
      w-[220px]
      bg-green-600
      hover:bg-green-700
      rounded-full
    "
  >
    <User className="mr-2 h-4 w-4" />
    Login
  </Button>
     </Link>   
</div>
</SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search */}
         
        </div>
      </header>
    </>
  );
}

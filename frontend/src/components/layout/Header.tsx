"use client";

import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BRAND_IMAGE } from "@/lib/image-fallbacks";
import { usePathname, useRouter } from "next/navigation";

import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
} from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

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
  const router = useRouter();

  const { user, loading, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
    router.replace("/");
    router.refresh();
  };

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

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="w-full px-3 sm:px-6 lg:px-10">
          <div className="flex h-16 sm:h-20 lg:h-22 items-center justify-between gap-2 sm:gap-4 lg:gap-6">

            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <Image
                src={DEFAULT_BRAND_IMAGE}
                alt="Patil Krushi Seva Kendra"
                width={72}
                height={72}
                priority
                className="h-10 w-10 sm:h-14 sm:w-14 lg:h-[60px] lg:w-[60px] shrink-0 rounded-full object-cover border border-green-200 shadow-2xs"
              />

              <div className="min-w-0">
                <h1 className="text-xs min-[380px]:text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight text-green-700 tracking-tight">
                  Patil Krushi Seva Kendra
                </h1>

                <p className="hidden md:block text-xs text-gray-500 font-medium">
                  Agricultural Products & Solutions
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}

            <nav className="hidden lg:flex items-center gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-green-600 ${pathname === item.href
                      ? "text-green-600 border-b-2 border-green-600 pb-0.5"
                      : "text-gray-700"
                    }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Search */}

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

            {/* Right Side Starts Here */}

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

              

              <Button
                variant="ghost"
                size="icon"
                className="hidden h-11 w-11 sm:inline-flex md:hidden"
              >
                <Search className="h-5 w-5" />
              </Button>
              {/* Wishlist */}
              <Link href="/wishlist">
                <Button
                  variant="ghost"
                  size="icon"
                  className="
      relative
      hidden
      h-11
      w-11
      sm:inline-flex
      hover:bg-red-50
      hover:text-red-500
      transition-all
    "
                  aria-label="Wishlist"
                >
                  <Heart className="h-5 w-5" />

                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs font-bold text-white">
                    0
                  </span>
                </Button>
              </Link>

              {/* Login / User */}

              {!loading && (
                user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="hidden md:flex items-center gap-2 rounded-full"
                      >
                        <User className="h-4 w-4" />

                        {user.name || user.phone}
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end">

                      <DropdownMenuItem asChild>
                        <Link href="/profile">
                          My Profile
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/orders">
                          My Orders
                        </Link>
                      </DropdownMenuItem>

                      {user.role === "ADMIN" && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin">
                            Admin Dashboard
                          </Link>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={handleLogout}
                      >
                        Logout
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button className="hidden md:flex items-center gap-2 rounded-full bg-green-600 hover:bg-green-700 text-white px-5 h-10 shadow-md hover:shadow-lg transition-all">
                      <User className="h-4 w-4" />
                      Login
                    </Button>
                  </Link>
                )
              )}

              {/* Cart */}

              <Link href="/cart">
                <Button
                  variant="ghost"
                  size="icon"
                  className="
      relative
      h-11
      w-11
      hover:bg-green-50
      hover:text-green-600
      transition-all
    "
                  aria-label="View Cart"
                >
                  <ShoppingCart className="h-5 w-5" />

                  <span className="absolute -top-1 -right-1 bg-green-600 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                    5
                  </span>
                </Button>
              </Link>

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
                        className="text-lg font-medium hover:text-green-600"
                      >
                        {item.name}
                      </Link>
                    ))}

                    <Link
                      href="/wishlist"
                      className="text-lg font-medium hover:text-green-600"
                    >
                      ❤️ Wishlist
                    </Link>
                  </div>

                  <div className="pt-4 border-t mt-4 flex flex-col items-center gap-3">
                    {user ? (
                      <>
                        <Link href="/profile" className="w-full">
                          <Button variant="outline" className="w-full">
                            My Profile
                          </Button>
                        </Link>

                        <Link href="/orders" className="w-full">
                          <Button variant="outline" className="w-full">
                            My Orders
                          </Button>
                        </Link>

                        {user.role === "ADMIN" && (
                          <Link href="/admin" className="w-full">
                            <Button variant="outline" className="w-full">
                              Admin Dashboard
                            </Button>
                          </Link>
                        )}

                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </>
                    ) : (
                      <Link href="/login" className="w-full">
                        <Button
                          className="
              w-full
              bg-green-600
              hover:bg-green-700
              rounded-full
            "
                        >
                          <User className="mr-2 h-4 w-4" />
                          Login
                        </Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>

            </div>
          </div>

          {/* Mobile Search Bar */}
          <div className="pb-2.5 pt-0.5 lg:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <Input
                placeholder="Search seeds, fertilizers, pesticides..."
                className="h-9 pl-9 text-xs rounded-full border-green-200 focus-visible:ring-green-500 shadow-2xs"
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
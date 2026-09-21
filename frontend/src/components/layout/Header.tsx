"use client";

import Image from "next/image";
import Link from "next/link";
import { DEFAULT_BRAND_IMAGE } from "@/lib/image-fallbacks";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  Menu,
  Search,
  ShoppingCart,
  User,
  Heart,
  Languages,
} from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";

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
  { key: "home", href: "/" },
  { key: "shop", href: "/shop" },
  { key: "categories", href: "/categories" },
  { key: "brands", href: "/brands" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
] as const;

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  "http://localhost:5000/api";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const { user, loading, logout } = useAuth();
  const { locale, setLocale, t } = useLanguage();

  const [wishlistCount, setWishlistCount] = useState(0);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  const [cartCount, setCartCount] = useState(0);
  const [cartLoading, setCartLoading] = useState(false);

  // =========================================================
  // FETCH WISHLIST COUNT
  // =========================================================

  const fetchWishlistCount = useCallback(async () => {
    if (!user) {
      setWishlistCount(0);
      setWishlistLoading(false);
      return;
    }

    try {
      setWishlistLoading(true);

      const response = await fetch(
        `${API_URL}/wishlist`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        setWishlistCount(0);
        return;
      }

      const result = await response.json();

      const wishlist = Array.isArray(result?.data)
        ? result.data
        : [];

      setWishlistCount(wishlist.length);
    } catch (error) {
      console.error(
        "Header wishlist count error:",
        error
      );

      setWishlistCount(0);
    } finally {
      setWishlistLoading(false);
    }
  }, [user]);

  // =========================================================
  // FETCH CART COUNT
  // =========================================================

  const fetchCartCount = useCallback(async () => {
    if (!user) {
      setCartCount(0);
      setCartLoading(false);
      return;
    }

    try {
      setCartLoading(true);

      const response = await fetch(
        `${API_URL}/cart/count`,
        {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        }
      );

      if (!response.ok) {
        setCartCount(0);
        return;
      }

      const result = await response.json();

      if (result?.success) {
        setCartCount(
          Number(result?.data?.count ?? 0)
        );
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error(
        "Header cart count error:",
        error
      );

      setCartCount(0);
    } finally {
      setCartLoading(false);
    }
  }, [user]);

  // =========================================================
  // INITIAL LOAD
  // =========================================================

  useEffect(() => {
    if (loading) return;

    fetchWishlistCount();
    fetchCartCount();
  }, [
    loading,
    fetchWishlistCount,
    fetchCartCount,
  ]);

  // =========================================================
  // INSTANT WISHLIST UPDATE
  // =========================================================

  useEffect(() => {
    const handleWishlistUpdated = () => {
      fetchWishlistCount();
    };

    window.addEventListener(
      "wishlist-updated",
      handleWishlistUpdated
    );

    return () => {
      window.removeEventListener(
        "wishlist-updated",
        handleWishlistUpdated
      );
    };
  }, [fetchWishlistCount]);

  // =========================================================
  // INSTANT CART UPDATE
  // =========================================================

  useEffect(() => {
    const handleCartUpdated = () => {
      fetchCartCount();
    };

    window.addEventListener(
      "cart-updated",
      handleCartUpdated
    );

    return () => {
      window.removeEventListener(
        "cart-updated",
        handleCartUpdated
      );
    };
  }, [fetchCartCount]);

  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      setWishlistCount(0);
      setCartCount(0);

      router.replace("/");
      router.refresh();
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="bg-green-700 text-white text-[11px] sm:text-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <span className="min-w-0 flex-1 basis-full sm:basis-auto sm:flex-none">
            🚚 {t.header.freeDelivery}
          </span>

          <span className="hidden min-w-0 md:block md:flex-1 md:text-center">
            🌱 {t.header.qualityProducts}
          </span>

          <span className="shrink-0">
            📞 +91 9209061629
          </span>
        </div>
      </div>

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 backdrop-blur-md shadow-2xs">
        <div className="w-full px-3 sm:px-6 lg:px-10">

          <div className="flex h-16 sm:h-20 lg:h-22 items-center justify-between gap-2 sm:gap-4 lg:gap-6">

            {/* =================================================
                LOGO
            ================================================= */}

            <Link
              href="/"
              className="flex items-center gap-2 sm:gap-3 shrink-0"
            >
              <Image
                src={DEFAULT_BRAND_IMAGE}
                alt={t.header.logoAlt}
                width={72}
                height={72}
                priority
                className="h-10 w-10 sm:h-14 sm:w-14 lg:h-[60px] lg:w-[60px] shrink-0 rounded-full object-cover border border-green-200 shadow-2xs"
              />

              <div className="min-w-0">
                <h1 className="text-xs min-[380px]:text-sm sm:text-base md:text-lg lg:text-xl font-bold leading-tight text-green-700 tracking-tight">
                  {t.header.brandName}
                </h1>

                <p className="hidden md:block text-xs text-gray-500 font-medium">
                  {t.header.tagline}
                </p>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav className="hidden lg:flex items-center gap-4 xl:gap-5">
              {navLinks.map((item) => (
                <Link
                  key={item.key}
                  href={item.href}
                  className={`text-sm font-medium transition-colors hover:text-green-600 whitespace-normal text-center leading-snug ${pathname === item.href
                      ? "text-green-600 border-b-2 border-green-600 pb-0.5"
                      : "text-gray-700"
                    }`}
                >
                  {t.navigation[item.key]}
                </Link>
              ))}
            </nav>

            {/* =================================================
                DESKTOP SEARCH
            ================================================= */}

            <div className="hidden lg:flex flex-1 max-w-xl">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />

                <Input
                  placeholder={t.header.searchPlaceholder}
                  aria-label={t.header.searchLabel}
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

            {/* =================================================
                RIGHT SIDE
            ================================================= */}

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">

              {/* Mobile Search */}

              <Button
                variant="ghost"
                size="icon"
                className="hidden h-11 w-11 sm:inline-flex md:hidden"
                aria-label={t.common.search}
              >
                <Search className="h-5 w-5" />
              </Button>

              {/* Language */}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="hidden h-10 gap-1.5 rounded-full px-2.5 text-xs font-semibold lg:flex"
                    aria-label={t.language.label}
                  >
                    <Languages className="h-4 w-4" />

                    {locale === "en"
                      ? t.language.english
                      : t.language.marathi}
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end">
                  <DropdownMenuItem
                    onSelect={() => setLocale("en")}
                    className={
                      locale === "en"
                        ? "bg-green-50 font-semibold text-green-700"
                        : ""
                    }
                  >
                    {t.language.english}
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    onSelect={() => setLocale("mr")}
                    className={
                      locale === "mr"
                        ? "bg-green-50 font-semibold text-green-700"
                        : ""
                    }
                  >
                    {t.language.marathi}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* =================================================
                  WISHLIST
              ================================================= */}

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
                  aria-label={t.wishlist.label}
                >
                  <Heart
                    className={`h-5 w-5 ${wishlistCount > 0
                        ? "fill-red-500 text-red-500"
                        : ""
                      }`}
                  />

                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      flex
                      h-5
                      min-w-5
                      px-1
                      items-center
                      justify-center
                      rounded-full
                      bg-red-500
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    {wishlistLoading
                      ? "..."
                      : wishlistCount}
                  </span>
                </Button>
              </Link>

              {/* =================================================
                  LOGIN / USER
              ================================================= */}

              {!loading &&
                (user ? (
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
                          {t.account.profile}
                        </Link>
                      </DropdownMenuItem>

                      <DropdownMenuItem asChild>
                        <Link href="/orders">
                          {t.orders.list.purchaseHistory}
                        </Link>
                      </DropdownMenuItem>

                      {user.role === "ADMIN" && (
                        <DropdownMenuItem asChild>
                          <Link href="/admin">
                            {t.account.adminDashboard}
                          </Link>
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={handleLogout}
                      >
                        {t.account.logout}
                      </DropdownMenuItem>

                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login">
                    <Button
                      className="
                        hidden
                        md:flex
                        items-center
                        gap-2
                        rounded-full
                        bg-green-600
                        hover:bg-green-700
                        text-white
                        px-5
                        h-10
                        shadow-md
                        hover:shadow-lg
                        transition-all
                      "
                    >
                      <User className="h-4 w-4" />

                      {t.account.login}
                    </Button>
                  </Link>
                ))}

              {/* =================================================
                  CART
              ================================================= */}

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
                  aria-label={t.cart.label}
                >
                  <ShoppingCart className="h-5 w-5" />

                  <span
                    className="
                      absolute
                      -top-1
                      -right-1
                      flex
                      h-5
                      min-w-5
                      px-1
                      items-center
                      justify-center
                      rounded-full
                      bg-green-600
                      text-xs
                      font-bold
                      text-white
                    "
                  >
                    {cartLoading
                      ? "..."
                      : cartCount}
                  </span>
                </Button>
              </Link>

              {/* =================================================
                  MOBILE MENU
              ================================================= */}

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

                <SheetContent
                  side="left"
                  className="w-[280px] px-4"
                >
                  <div className="mt-8 flex flex-col gap-5">

                    {navLinks.map((item) => (
                      <Link
                        key={item.key}
                        href={item.href}
                        className="text-lg font-medium hover:text-green-600"
                      >
                        {t.navigation[item.key]}
                      </Link>
                    ))}

                    <div className="border-t pt-4">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        {t.language.label}
                      </p>

                      <div
                        className="mt-2 grid grid-cols-2 gap-2"
                        role="group"
                        aria-label={t.language.label}
                      >
                        <button
                          type="button"
                          onClick={() => setLocale("en")}
                          aria-pressed={locale === "en"}
                          className={`min-h-11 rounded-lg border px-3 text-sm font-semibold transition-colors ${locale === "en"
                              ? "border-green-700 bg-green-50 text-green-700"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {t.language.english}
                        </button>

                        <button
                          type="button"
                          onClick={() => setLocale("mr")}
                          aria-pressed={locale === "mr"}
                          className={`min-h-11 rounded-lg border px-3 text-sm font-semibold transition-colors ${locale === "mr"
                              ? "border-green-700 bg-green-50 text-green-700"
                              : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }`}
                        >
                          {t.language.marathi}
                        </button>
                      </div>
                    </div>

                    {/* Mobile Wishlist */}

                    <Link
                      href="/wishlist"
                      className="flex items-center justify-between text-lg font-medium hover:text-green-600"
                    >
                      <span className="flex items-center gap-2">
                        <Heart
                          className={`h-5 w-5 ${wishlistCount > 0
                              ? "fill-red-500 text-red-500"
                              : ""
                            }`}
                        />

                        {t.wishlist.label}
                      </span>

                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-xs font-bold text-white">
                        {wishlistLoading
                          ? "..."
                          : wishlistCount}
                      </span>
                    </Link>

                    {/* Mobile Cart */}

                    <Link
                      href="/cart"
                      className="flex items-center justify-between text-lg font-medium hover:text-green-600"
                    >
                      <span className="flex items-center gap-2">
                        <ShoppingCart className="h-5 w-5" />

                        {t.cart.label}
                      </span>

                      <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-green-600 px-1.5 text-xs font-bold text-white">
                        {cartLoading
                          ? "..."
                          : cartCount}
                      </span>
                    </Link>
                  </div>

                  {/* Mobile User Section */}

                  <div className="pt-4 border-t mt-4 flex flex-col items-center gap-3">
                    {user ? (
                      <>
                        <Link
                          href="/profile"
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            className="w-full"
                          >
                            {t.account.profile}
                          </Button>
                        </Link>

                        <Link
                          href="/orders"
                          className="w-full"
                        >
                          <Button
                            variant="outline"
                            className="w-full"
                          >
                            {t.orders.list.purchaseHistory}
                          </Button>
                        </Link>

                        {user.role === "ADMIN" && (
                          <Link
                            href="/admin"
                            className="w-full"
                          >
                            <Button
                              variant="outline"
                              className="w-full"
                            >
                              {t.account.adminDashboard}
                            </Button>
                          </Link>
                        )}

                        <Button
                          variant="destructive"
                          className="w-full"
                          onClick={handleLogout}
                        >
                          {t.account.logout}
                        </Button>
                      </>
                    ) : (
                      <Link
                        href="/login"
                        className="w-full"
                      >
                        <Button
                          className="
                            w-full
                            bg-green-600
                            hover:bg-green-700
                            rounded-full
                          "
                        >
                          <User className="mr-2 h-4 w-4" />

                          {t.account.login}
                        </Button>
                      </Link>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* =====================================================
              MOBILE SEARCH
          ===================================================== */}

          <div className="pb-2.5 pt-0.5 lg:hidden">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />

              <Input
                placeholder={t.header.searchPlaceholder}
                aria-label={t.header.searchLabel}
                className="
                  h-9
                  pl-9
                  text-xs
                  rounded-full
                  border-green-200
                  focus-visible:ring-green-500
                  shadow-2xs
                "
              />
            </div>
          </div>

        </div>
      </header>
    </>
  );
}
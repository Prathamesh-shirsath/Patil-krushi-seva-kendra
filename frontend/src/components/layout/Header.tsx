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
  ChevronDown,
} from "lucide-react";

import { useAuth } from "@/providers/AuthProvider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
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
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

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

      const response = await fetch(`${API_URL}/wishlist`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        setWishlistCount(0);
        return;
      }

      const result = await response.json();

      const wishlist = Array.isArray(result?.data) ? result.data : [];

      setWishlistCount(wishlist.length);
    } catch (error) {
      console.error("Header wishlist count error:", error);
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

      const response = await fetch(`${API_URL}/cart/count`, {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        setCartCount(0);
        return;
      }

      const result = await response.json();

      if (result?.success) {
        setCartCount(Number(result?.data?.count ?? 0));
      } else {
        setCartCount(0);
      }
    } catch (error) {
      console.error("Header cart count error:", error);
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
  }, [loading, fetchWishlistCount, fetchCartCount]);

  // =========================================================
  // INSTANT WISHLIST UPDATE
  // =========================================================

  useEffect(() => {
    const handleWishlistUpdated = () => {
      fetchWishlistCount();
    };

    window.addEventListener("wishlist-updated", handleWishlistUpdated);

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

    window.addEventListener("cart-updated", handleCartUpdated);

    return () => {
      window.removeEventListener("cart-updated", handleCartUpdated);
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
  // ACTIVE NAV
  // =========================================================

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }

    return pathname.startsWith(href);
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <>
      {/* =====================================================
          TOP BAR
      ===================================================== */}

      <div className="border-b border-green-800 bg-green-700 text-white">
        <div className="mx-auto flex min-h-8 max-w-[1600px] items-center justify-center px-3 sm:px-6 lg:px-8">
          <div className="flex w-full items-center justify-center gap-3 text-[10px] font-medium tracking-wide sm:justify-between sm:text-xs md:text-sm">
            {/* Delivery */}
            <span className="flex items-center gap-1.5">
              <span aria-hidden="true">🚚</span>
              <span>{t.header.freeDelivery}</span>
            </span>

            {/* Quality */}
            <span className="hidden items-center gap-1.5 sm:flex">
              <span aria-hidden="true">🌱</span>
              <span>{t.header.qualityProducts}</span>
            </span>

            {/* Phone */}
            <a
              href="tel:+919209061629"
              className="hidden items-center gap-1.5 whitespace-nowrap transition-opacity hover:opacity-85 md:flex"
            >
              <span aria-hidden="true">📞</span>
              <span>+91 9209061629</span>
            </a>
          </div>
        </div>
      </div>

      {/* =====================================================
          MAIN HEADER
      ===================================================== */}

      <header className="sticky top-0 z-50 border-b border-gray-200/80 bg-white/95 shadow-sm backdrop-blur-xl">
        <div className="mx-auto w-full max-w-[1600px] px-3 sm:px-5 md:px-6 lg:px-8 xl:px-10">
          {/* =================================================
              MAIN ROW
          ================================================= */}

          <div className="flex min-h-16 items-center justify-between gap-2 sm:min-h-[72px] md:gap-3 lg:min-h-20 xl:gap-5">
            {/* =================================================
                LOGO / BRAND
            ================================================= */}

            <Link
              href="/"
              className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-2.5 lg:gap-3"
            >
              <Image
                src={DEFAULT_BRAND_IMAGE}
                alt={t.header.logoAlt}
                width={64}
                height={64}
                priority
                className="
                  h-9 w-9
                  rounded-full
                  border border-green-200
                  object-cover
                  shadow-sm
                  sm:h-11 sm:w-11
                  md:h-12 md:w-12
                  lg:h-14 lg:w-14
                "
              />

              <div className="min-w-0 max-w-[130px] sm:max-w-[180px] md:max-w-[220px] lg:max-w-[250px]">
                <h1
                  className="
                    truncate
                    text-[11px]
                    font-extrabold
                    leading-tight
                    tracking-tight
                    text-green-700
                    min-[380px]:text-xs
                    sm:text-sm
                    md:text-base
                    lg:text-lg
                    xl:text-xl
                  "
                >
                  {t.header.brandName}
                </h1>

                <p className="mt-0.5 hidden truncate text-[10px] font-medium text-gray-500 md:block lg:text-xs">
                  {t.header.tagline}
                </p>
              </div>
            </Link>

            {/* =================================================
                DESKTOP NAVIGATION
            ================================================= */}

            <nav className="hidden items-center lg:flex">
              <div className="flex items-center gap-1">
                {navLinks.map((item) => {
                  const active = isActive(item.href);

                  return (
                    <Link
                      key={item.key}
                      href={item.href}
                      className={`
                        rounded-full
                        px-2.5
                        py-2
                        text-[13px]
                        font-semibold
                        transition-all
                        xl:px-3
                        xl:text-sm
                        ${
                          active
                            ? "bg-green-50 text-green-700 shadow-sm"
                            : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                        }
                      `}
                    >
                      {t.navigation[item.key]}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* =================================================
                DESKTOP SEARCH
            ================================================= */}

            <div className="hidden min-w-0 flex-1 lg:flex lg:max-w-[380px] xl:max-w-[470px] 2xl:max-w-[540px]">
              <div className="relative w-full">
                <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                <Input
                  placeholder={t.header.searchPlaceholder}
                  aria-label={t.header.searchLabel}
                  className="
                    h-10
                    w-full
                    rounded-full
                    border-gray-200
                    bg-gray-50
                    pl-10
                    pr-4
                    text-sm
                    shadow-sm
                    placeholder:text-gray-400
                    transition-all
                    hover:border-green-200
                    hover:bg-white
                    focus-visible:border-green-400
                    focus-visible:ring-2
                    focus-visible:ring-green-100
                    xl:h-11
                  "
                />
              </div>
            </div>

            {/* =================================================
                ACTIONS
            ================================================= */}

            <div className="flex shrink-0 items-center gap-0.5 sm:gap-1">
              {/* Language */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    className="
                      hidden
                      h-9
                      gap-1.5
                      rounded-full
                      border-gray-200
                      bg-white
                      px-2.5
                      text-xs
                      font-semibold
                      shadow-sm
                      hover:border-green-200
                      hover:bg-green-50
                      lg:inline-flex
                      xl:h-10
                      xl:px-3
                    "
                    aria-label={t.language.label}
                  >
                    <Languages className="h-4 w-4 text-green-700" />

                    <span className="hidden xl:inline">
                      {locale === "en"
                        ? t.language.english
                        : t.language.marathi}
                    </span>

                    <span className="xl:hidden">
                      {locale === "en" ? "EN" : "MR"}
                    </span>

                    <ChevronDown className="hidden h-3.5 w-3.5 xl:block" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-36"
                >
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

              {/* Wishlist */}
              <Link href="/wishlist" className="shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    relative
                    h-9
                    w-9
                    rounded-full
                    hover:bg-red-50
                    hover:text-red-500
                    sm:h-10
                    sm:w-10
                    md:h-10
                    md:w-10
                  "
                  aria-label={t.wishlist.label}
                >
                  <Heart
                    className={`
                      h-[18px] w-[18px]
                      sm:h-5 sm:w-5
                      ${
                        wishlistCount > 0
                          ? "fill-red-500 text-red-500"
                          : "text-gray-700"
                      }
                    `}
                  />

                  <span
                    className="
                      absolute
                      -right-0.5
                      -top-0.5
                      flex
                      h-4
                      min-w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-red-500
                      px-1
                      text-[9px]
                      font-bold
                      leading-none
                      text-white
                      ring-2
                      ring-white
                      sm:h-5
                      sm:min-w-5
                      sm:text-[10px]
                    "
                  >
                    {wishlistLoading ? "..." : wishlistCount}
                  </span>
                </Button>
              </Link>

              {/* Desktop User */}
              {!loading &&
                (user ? (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="
                          hidden
                          h-9
                          max-w-[150px]
                          items-center
                          gap-1.5
                          rounded-full
                          border-gray-200
                          px-3
                          text-xs
                          font-semibold
                          shadow-sm
                          hover:border-green-200
                          hover:bg-green-50
                          md:flex
                          xl:h-10
                          xl:max-w-[190px]
                          xl:gap-2
                          xl:text-sm
                        "
                      >
                        <User className="h-4 w-4 shrink-0 text-green-700" />

                        <span className="truncate">
                          {user.name || user.phone}
                        </span>
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent
                      align="end"
                      className="w-52"
                    >
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
                        className="cursor-pointer text-red-600"
                        onClick={handleLogout}
                      >
                        {t.account.logout}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                ) : (
                  <Link href="/login" className="hidden md:block">
                    <Button
                      className="
                        h-9
                        rounded-full
                        bg-green-600
                        px-4
                        text-xs
                        font-semibold
                        text-white
                        shadow-sm
                        transition-all
                        hover:bg-green-700
                        hover:shadow-md
                        xl:h-10
                        xl:px-5
                        xl:text-sm
                      "
                    >
                      <User className="mr-1.5 h-4 w-4" />
                      {t.account.login}
                    </Button>
                  </Link>
                ))}

              {/* Cart */}
              <Link href="/cart" className="shrink-0">
                <Button
                  variant="ghost"
                  size="icon"
                  className="
                    relative
                    h-9
                    w-9
                    rounded-full
                    hover:bg-green-50
                    hover:text-green-700
                    sm:h-10
                    sm:w-10
                    md:h-10
                    md:w-10
                  "
                  aria-label={t.cart.label}
                >
                  <ShoppingCart className="h-[18px] w-[18px] sm:h-5 sm:w-5" />

                  <span
                    className="
                      absolute
                      -right-0.5
                      -top-0.5
                      flex
                      h-4
                      min-w-4
                      items-center
                      justify-center
                      rounded-full
                      bg-green-600
                      px-1
                      text-[9px]
                      font-bold
                      leading-none
                      text-white
                      ring-2
                      ring-white
                      sm:h-5
                      sm:min-w-5
                      sm:text-[10px]
                    "
                  >
                    {cartLoading ? "..." : cartCount}
                  </span>
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="
                      h-9
                      w-9
                      rounded-full
                      hover:bg-green-50
                      hover:text-green-700
                      sm:h-10
                      sm:w-10
                      lg:hidden
                    "
                    aria-label="Open menu"
                  >
                    <Menu className="h-5 w-5 sm:h-[22px] sm:w-[22px]" />
                  </Button>
                </SheetTrigger>

                <SheetContent
                  side="left"
                  className="
                    flex
                    w-[86vw]
                    max-w-[360px]
                    flex-col
                    border-r
                    border-green-100
                    bg-white
                    px-4
                    sm:w-[340px]
                  "
                >
                  <SheetHeader className="border-b border-gray-100 pb-4">
                    <SheetTitle className="flex items-center gap-3 text-left">
                      <Image
                        src={DEFAULT_BRAND_IMAGE}
                        alt={t.header.logoAlt}
                        width={50}
                        height={50}
                        className="h-11 w-11 rounded-full border border-green-200 object-cover"
                      />

                      <div className="min-w-0">
                        <span className="block truncate text-sm font-extrabold text-green-700 sm:text-base">
                          {t.header.brandName}
                        </span>

                        <span className="mt-0.5 block text-[10px] font-medium text-gray-500 sm:text-xs">
                          {t.header.tagline}
                        </span>
                      </div>
                    </SheetTitle>
                  </SheetHeader>

                  <div className="flex-1 overflow-y-auto py-4">
                    {/* Navigation */}
                    <div className="space-y-1">
                      {navLinks.map((item) => {
                        const active = isActive(item.href);

                        return (
                          <Link
                            key={item.key}
                            href={item.href}
                            className={`
                              flex
                              min-h-11
                              items-center
                              rounded-xl
                              px-3
                              text-sm
                              font-semibold
                              transition-colors
                              sm:text-[15px]
                              ${
                                active
                                  ? "bg-green-50 text-green-700"
                                  : "text-gray-700 hover:bg-gray-50 hover:text-green-700"
                              }
                            `}
                          >
                            {t.navigation[item.key]}
                          </Link>
                        );
                      })}
                    </div>

                    {/* Language */}
                    <div className="mt-5 border-t border-gray-100 pt-5">
                      <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                        {t.language.label}
                      </p>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          type="button"
                          onClick={() => setLocale("en")}
                          aria-pressed={locale === "en"}
                          className={`
                            min-h-11
                            rounded-xl
                            border
                            px-3
                            text-sm
                            font-semibold
                            transition-colors
                            ${
                              locale === "en"
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }
                          `}
                        >
                          {t.language.english}
                        </button>

                        <button
                          type="button"
                          onClick={() => setLocale("mr")}
                          aria-pressed={locale === "mr"}
                          className={`
                            min-h-11
                            rounded-xl
                            border
                            px-3
                            text-sm
                            font-semibold
                            transition-colors
                            ${
                              locale === "mr"
                                ? "border-green-600 bg-green-50 text-green-700"
                                : "border-gray-200 text-gray-700 hover:bg-gray-50"
                            }
                          `}
                        >
                          {t.language.marathi}
                        </button>
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="mt-5 border-t border-gray-100 pt-5">
                      <div className="space-y-1">
                        <Link
                          href="/wishlist"
                          className="flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-semibold text-gray-700 hover:bg-red-50 hover:text-red-500 sm:text-[15px]"
                        >
                          <span className="flex items-center gap-2.5">
                            <Heart
                              className={`h-5 w-5 ${
                                wishlistCount > 0
                                  ? "fill-red-500 text-red-500"
                                  : ""
                              }`}
                            />
                            {t.wishlist.label}
                          </span>

                          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white">
                            {wishlistLoading ? "..." : wishlistCount}
                          </span>
                        </Link>

                        <Link
                          href="/cart"
                          className="flex min-h-11 items-center justify-between rounded-xl px-3 text-sm font-semibold text-gray-700 hover:bg-green-50 hover:text-green-700 sm:text-[15px]"
                        >
                          <span className="flex items-center gap-2.5">
                            <ShoppingCart className="h-5 w-5" />
                            {t.cart.label}
                          </span>

                          <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-green-600 px-1.5 text-[10px] font-bold text-white">
                            {cartLoading ? "..." : cartCount}
                          </span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Mobile User Section */}
                  <div className="border-t border-gray-100 pt-4">
                    {user ? (
                      <div className="space-y-2">
                        <Link href="/profile" className="block">
                          <Button
                            variant="outline"
                            className="h-11 w-full rounded-xl text-sm font-semibold"
                          >
                            {t.account.profile}
                          </Button>
                        </Link>

                        <Link href="/orders" className="block">
                          <Button
                            variant="outline"
                            className="h-11 w-full rounded-xl text-sm font-semibold"
                          >
                            {t.orders.list.purchaseHistory}
                          </Button>
                        </Link>

                        {user.role === "ADMIN" && (
                          <Link href="/admin" className="block">
                            <Button
                              variant="outline"
                              className="h-11 w-full rounded-xl text-sm font-semibold"
                            >
                              {t.account.adminDashboard}
                            </Button>
                          </Link>
                        )}

                        <Button
                          variant="destructive"
                          className="h-11 w-full rounded-xl text-sm font-semibold"
                          onClick={handleLogout}
                        >
                          {t.account.logout}
                        </Button>
                      </div>
                    ) : (
                      <Link href="/login" className="block">
                        <Button
                          className="
                            h-11
                            w-full
                            rounded-xl
                            bg-green-600
                            text-sm
                            font-semibold
                            text-white
                            hover:bg-green-700
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
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

              <Input
                placeholder={t.header.searchPlaceholder}
                aria-label={t.header.searchLabel}
                className="
                  h-10
                  w-full
                  rounded-xl
                  border-gray-200
                  bg-gray-50
                  pl-10
                  pr-3
                  text-sm
                  shadow-sm
                  placeholder:text-gray-400
                  focus-visible:border-green-400
                  focus-visible:bg-white
                  focus-visible:ring-2
                  focus-visible:ring-green-100
                  sm:h-11
                "
              />
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
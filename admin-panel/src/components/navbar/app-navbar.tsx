"use client";

import {
  Bell,
  Search,
  Moon,
  Sun,
  LogOut,
  Settings,
  User,
} from "lucide-react";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

type AdminProfile = {
  name: string;
  email: string;
  role: string;
};

export default function AppNavbar() {
  const [dark, setDark] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);

  const [adminProfile, setAdminProfile] =
    useState<AdminProfile>({
      name: "",
      email: "",
      role: "ADMIN",
    });

  const router = useRouter();

  // =====================================================
  // GET ADMIN PROFILE
  // =====================================================

  const fetchAdminProfile = async () => {
    try {
      const response = await fetch(
        `${API_URL}/admin/profile`,
        {
          method: "GET",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to load admin profile"
        );
      }

      setAdminProfile({
        name: data.data?.name || "Admin",
        email: data.data?.email || "",
        role: data.data?.role || "ADMIN",
      });
    } catch (error) {
      console.error(
        "Failed to fetch admin profile:",
        error
      );
    }
  };

  // =====================================================
  // LOAD PROFILE
  // =====================================================

  useEffect(() => {
    fetchAdminProfile();

    // Listen for profile changes
    const handleProfileUpdated = () => {
      fetchAdminProfile();
    };

    window.addEventListener(
      "admin-profile-updated",
      handleProfileUpdated
    );

    return () => {
      window.removeEventListener(
        "admin-profile-updated",
        handleProfileUpdated
      );
    };
  }, []);

  // =====================================================
  // GET INITIALS
  // =====================================================

  const getInitials = (name: string) => {
    if (!name) {
      return "AD";
    }

    const words = name
      .trim()
      .split(/\s+/)
      .filter(Boolean);

    if (words.length === 1) {
      return words[0]
        .slice(0, 2)
        .toUpperCase();
    }

    return (
      words[0][0] +
      words[words.length - 1][0]
    ).toUpperCase();
  };

  // =====================================================
  // PROFILE
  // =====================================================

  const handleProfile = () => {
    router.push("/profile");
  };

  // =====================================================
  // SETTINGS
  // =====================================================

  const handleSettings = () => {
    router.push("/settings");
  };

  // =====================================================
  // LOGOUT
  // =====================================================

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);

      const response = await fetch(
        `${API_URL}/admin-auth/logout`,
        {
          method: "POST",
          credentials: "include",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Logout failed"
        );
      }

      router.push("/login");
      router.refresh();
    } catch (error) {
      console.error("Logout error:", error);

      alert("Logout failed. Please try again.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div
      className="
        flex
        h-16
        w-full
        items-center
        justify-between
        gap-2
        bg-white/90
        px-3
        sm:h-18
        sm:px-4
        md:h-20
        md:px-6
        lg:px-8
      "
    >
      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="flex min-w-0 items-center gap-2 sm:gap-4">

        <SidebarTrigger
          className="
            h-10
            w-10
            shrink-0
            rounded-xl
            hover:bg-slate-100
          "
        />

        {/* SEARCH */}

        <div className="relative hidden sm:block">

          <Search
            className="
              absolute
              left-4
              top-1/2
              h-[18px]
              w-[18px]
              -translate-y-1/2
              text-slate-400
            "
          />

          <Input
            placeholder="Search products, orders, customers..."
            className="
              h-10
              w-[220px]
              rounded-2xl
              border-slate-200
              bg-white
              pl-11
              text-sm
              shadow-sm
              focus-visible:ring-emerald-600
              md:h-11
              md:w-[300px]
              lg:w-[360px]
            "
          />

        </div>

      </div>

      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div
        className="
          flex
          shrink-0
          items-center
          gap-1
          sm:gap-2
          lg:gap-4
        "
      >

        {/* MOBILE SEARCH */}

        <Button
          variant="ghost"
          size="icon"
          className="
            h-10
            w-10
            rounded-full
            sm:hidden
          "
        >
          <Search className="h-[18px] w-[18px]" />
        </Button>

        {/* =====================================================
            THEME
        ===================================================== */}

        <Button
          variant="ghost"
          size="icon"
          className="
            h-10
            w-10
            rounded-full
            hover:bg-slate-100
            sm:h-11
            sm:w-11
          "
          onClick={() => setDark(!dark)}
        >
          {dark ? (
            <Sun className="h-[18px] w-[18px]" />
          ) : (
            <Moon className="h-[18px] w-[18px]" />
          )}
        </Button>

        {/* =====================================================
            NOTIFICATION
        ===================================================== */}

        <Button
          variant="ghost"
          size="icon"
          className="
            relative
            h-10
            w-10
            rounded-full
            hover:bg-slate-100
            sm:h-11
            sm:w-11
          "
        >
          <Bell className="h-[18px] w-[18px]" />

          <span
            className="
              absolute
              right-2.5
              top-2.5
              h-2
              w-2
              rounded-full
              bg-red-500
            "
          />
        </Button>

        {/* =====================================================
            PROFILE
        ===================================================== */}

        <DropdownMenu>

          <DropdownMenuTrigger asChild>

            <Button
              variant="ghost"
              className="
                h-auto
                rounded-2xl
                px-1
                py-1
                hover:bg-slate-100
                sm:px-2
                sm:py-1.5
              "
            >

              {/* AVATAR */}

              <Avatar className="h-9 w-9 sm:h-11 sm:w-11">

                <AvatarFallback
                  className="
                    bg-emerald-600
                    font-bold
                    text-white
                  "
                >
                  {getInitials(adminProfile.name)}
                </AvatarFallback>

              </Avatar>

              {/* NAME + ROLE */}

              <div
                className="
                  ml-2
                  hidden
                  text-left
                  md:block
                "
              >

                <p
                  className="
                    max-w-[150px]
                    truncate
                    text-sm
                    font-semibold
                    text-slate-900
                  "
                >
                  {adminProfile.name || "Admin"}
                </p>

                <p
                  className="
                    text-xs
                    text-slate-500
                  "
                >
                  {adminProfile.role === "ADMIN"
                    ? "Super Admin"
                    : adminProfile.role}
                </p>

              </div>

            </Button>

          </DropdownMenuTrigger>

          {/* =====================================================
              DROPDOWN
          ===================================================== */}

          <DropdownMenuContent
            align="end"
            sideOffset={8}
            className="w-56 rounded-xl"
          >

            {/* PROFILE */}

            <DropdownMenuItem
              onClick={handleProfile}
              className="cursor-pointer"
            >
              <User className="mr-2 h-4 w-4" />
              Profile
            </DropdownMenuItem>

            {/* SETTINGS */}

            <DropdownMenuItem
              onClick={handleSettings}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            {/* LOGOUT */}

            <DropdownMenuItem
              onClick={handleLogout}
              disabled={loggingOut}
              className="
                cursor-pointer
                text-red-600
                focus:text-red-600
              "
            >
              <LogOut className="mr-2 h-4 w-4" />

              {loggingOut
                ? "Logging out..."
                : "Logout"}
            </DropdownMenuItem>

          </DropdownMenuContent>

        </DropdownMenu>

      </div>

    </div>
  );
}
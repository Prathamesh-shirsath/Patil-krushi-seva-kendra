"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  Sprout,
  Loader2,
  AlertCircle,
} from "lucide-react";

export default function LoginPage() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/admin-auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.trim(),
            password,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data?.message || "Invalid email or password."
        );
      }

      console.log("Admin login successful:", data);

      // Optional: remember admin email
      if (rememberMe) {
        localStorage.setItem("adminEmail", email.trim());
      } else {
        localStorage.removeItem("adminEmail");
      }

      // Login successful → Dashboard
      router.push("/dashboard");
      router.refresh();
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-hidden bg-slate-50">
      <div className="flex min-h-screen w-full flex-col lg:flex-row">

        {/* ================= LEFT BRANDING ================= */}
        <section
          className="
            relative hidden min-h-screen w-full overflow-hidden
            bg-green-700
            lg:flex lg:w-1/2
            xl:w-[55%]
          "
        >
          {/* Decorative circles */}
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-600/40" />

          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-green-800/40" />

          <div className="relative z-10 flex w-full flex-col justify-center px-10 xl:px-16 2xl:px-24">

            {/* Logo */}
            <div className="mb-8 flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white shadow-lg">
                <Sprout className="h-8 w-8 text-green-700" />
              </div>

              <div>
                <h1 className="text-xl font-extrabold text-white">
                  Patil Krushi
                </h1>

                <p className="text-sm text-green-100">
                  Seva Kendra
                </p>
              </div>
            </div>

            {/* Heading */}
            <div className="max-w-xl">
              <span className="inline-flex rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-green-100 ring-1 ring-white/20">
                Admin Panel
              </span>

              <h2 className="mt-6 text-4xl font-extrabold leading-tight text-white xl:text-5xl 2xl:text-6xl">
                Manage your
                <span className="block text-green-200">
                  agriculture business
                </span>
              </h2>

              <p className="mt-5 max-w-lg text-base leading-7 text-green-50/90 xl:text-lg">
                Manage products, orders, customers, categories and
                everything related to your agricultural marketplace
                from one place.
              </p>
            </div>

            {/* Features */}
            <div className="mt-10 grid max-w-xl grid-cols-3 gap-3">
              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                <p className="text-lg font-bold text-white">
                  Products
                </p>

                <p className="mt-1 text-xs text-green-100">
                  Manage products
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                <p className="text-lg font-bold text-white">
                  Orders
                </p>

                <p className="mt-1 text-xs text-green-100">
                  Track orders
                </p>
              </div>

              <div className="rounded-xl bg-white/10 p-4 backdrop-blur-sm ring-1 ring-white/10">
                <p className="text-lg font-bold text-white">
                  Customers
                </p>

                <p className="mt-1 text-xs text-green-100">
                  Manage users
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================= LOGIN SECTION ================= */}
        <section
          className="
            flex min-h-screen w-full items-center justify-center
            px-4 py-8
            sm:px-6 sm:py-10
            md:px-8
            lg:w-1/2 lg:px-10
            xl:w-[45%] xl:px-16
            2xl:px-24
          "
        >
          <div className="w-full max-w-md">

            {/* Mobile Logo */}
            <div className="mb-8 flex flex-col items-center text-center lg:hidden">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <Sprout className="h-8 w-8 text-green-700" />
              </div>

              <h1 className="mt-3 text-xl font-extrabold text-gray-900">
                Patil Krushi Seva Kendra
              </h1>

              <p className="mt-1 text-sm text-gray-500">
                Admin Panel
              </p>
            </div>

            {/* Header */}
            <div className="mb-7 text-center lg:text-left">
              <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
                Welcome back 👋
              </h2>

              <p className="mt-2 text-sm text-gray-500 sm:text-base">
                Sign in to access your admin dashboard.
              </p>
            </div>

            {/* Login Card */}
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:rounded-3xl sm:p-7 md:p-8">

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* Error */}
                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0" />

                    <p>{error}</p>
                  </div>
                )}

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </label>

                  <div className="relative">
                    <Mail
                      className="
                        pointer-events-none absolute left-3 top-1/2
                        h-5 w-5 -translate-y-1/2 text-gray-400
                      "
                    />

                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="admin@example.com"
                      autoComplete="email"
                      required
                      disabled={loading}
                      className="
                        h-12 w-full rounded-xl border border-slate-200
                        bg-slate-50 pl-11 pr-4 text-sm text-gray-900
                        outline-none transition
                        placeholder:text-gray-400
                        focus:border-green-500 focus:bg-white
                        focus:ring-2 focus:ring-green-500/20
                        disabled:cursor-not-allowed disabled:opacity-60
                      "
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold text-gray-700"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      className="
                        pointer-events-none absolute left-3 top-1/2
                        h-5 w-5 -translate-y-1/2 text-gray-400
                      "
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      required
                      disabled={loading}
                      className="
                        h-12 w-full rounded-xl border border-slate-200
                        bg-slate-50 pl-11 pr-12 text-sm text-gray-900
                        outline-none transition
                        placeholder:text-gray-400
                        focus:border-green-500 focus:bg-white
                        focus:ring-2 focus:ring-green-500/20
                        disabled:cursor-not-allowed disabled:opacity-60
                      "
                    />

                    <button
                      type="button"
                      disabled={loading}
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="
                        absolute right-3 top-1/2
                        -translate-y-1/2 rounded-lg p-1.5
                        text-gray-400 transition
                        hover:bg-gray-100 hover:text-gray-700
                        disabled:cursor-not-allowed
                      "
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Remember + Forgot */}
                <div className="flex items-center justify-between gap-3">
                  <label className="flex cursor-pointer items-center gap-2">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) =>
                        setRememberMe(e.target.checked)
                      }
                      disabled={loading}
                      className="h-4 w-4 rounded border-gray-300 accent-green-600"
                    />

                    <span className="text-xs text-gray-600 sm:text-sm">
                      Remember me
                    </span>
                  </label>

                  <Link
                    href="/forgot-password"
                    className="
                      text-xs font-semibold text-green-700
                      hover:text-green-800 sm:text-sm
                    "
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Login Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="
                    flex h-12 w-full items-center justify-center
                    gap-2 rounded-xl bg-green-700 px-4
                    text-sm font-bold text-white shadow-sm
                    transition-all duration-200
                    hover:bg-green-800 hover:shadow-md
                    active:scale-[0.99]
                    focus:outline-none focus:ring-2
                    focus:ring-green-500 focus:ring-offset-2
                    disabled:cursor-not-allowed
                    disabled:opacity-70
                  "
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>

              {/* Security */}
              <div className="mt-6 border-t border-slate-100 pt-5 text-center">
                <p className="text-xs text-gray-400">
                  🔒 Secure admin access
                </p>
              </div>
            </div>

            {/* Footer */}
            <p className="mt-6 text-center text-xs text-gray-400">
              © {new Date().getFullYear()} Patil Krushi Seva Kendra
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
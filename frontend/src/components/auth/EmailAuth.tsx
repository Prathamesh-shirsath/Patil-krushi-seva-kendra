
"use client";

import { useState } from "react";
import {
    ArrowRight,
    CheckCircle2,
    Eye,
    EyeOff,
    Leaf,
    Loader2,
    Lock,
    Mail,
    ShieldCheck,
    User,
} from "lucide-react";

import { useEmailAuth } from "@/hooks/useEmailAuth";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmailAuth() {
    const [isRegister, setIsRegister] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const {
        loading,
        error,
        success,
        login,
        register,
    } = useEmailAuth();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>
    ) => {
        e.preventDefault();

        if (isRegister) {
            await register(name, email, password);
        } else {
            await login(email, password);
        }
    };

    const toggleMode = () => {
        setIsRegister((prev) => !prev);
        setShowPassword(false);
        setName("");
        setEmail("");
        setPassword("");
    };

    return (
        <div className="relative w-full max-w-6xl overflow-hidden rounded-3xl border border-green-100 bg-white shadow-2xl">
            <div className="grid min-h-[620px] lg:grid-cols-2">

                {/* LEFT BRANDING SECTION */}
                <div className="relative hidden overflow-hidden bg-gradient-to-br from-green-950 via-green-800 to-emerald-600 p-10 text-white lg:flex lg:flex-col lg:justify-between">
                    {/* Decorative Background */}
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-green-400/20 blur-3xl" />
                    <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-lime-300/20 blur-3xl" />

                    <div className="relative z-10">
                        {/* Logo */}
                        <div className="mb-12 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 backdrop-blur">
                                <Leaf className="h-7 w-7 text-lime-200" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold tracking-tight">
                                    Patil
                                </h2>
                                <p className="text-sm text-green-100">
                                    Krushi Seva Kendra
                                </p>
                            </div>
                        </div>

                        <div className="max-w-md">
                            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-lime-200">
                                Farmers' Growth, Our Commitment
                            </p>

                            <h1 className="text-4xl font-bold leading-tight xl:text-5xl">
                                Better Farming,
                                <br />
                                Brighter Tomorrow.
                            </h1>

                            <p className="mt-6 max-w-sm text-base leading-7 text-green-100">
                                Quality agricultural products, reliable
                                service and support for every farmer.
                            </p>
                        </div>

                        {/* Benefits */}
                        <div className="mt-12 space-y-5">
                            {[
                                "Quality agricultural products",
                                "Reliable service and support",
                                "Secure customer experience",
                            ].map((benefit) => (
                                <div
                                    key={benefit}
                                    className="flex items-center gap-3"
                                >
                                    <CheckCircle2 className="h-5 w-5 text-lime-300" />
                                    <span className="text-sm text-green-50">
                                        {benefit}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Bottom Trust */}
                    <div className="relative z-10 mt-12 border-t border-white/20 pt-6">
                        <div className="flex items-center gap-3">
                            <ShieldCheck className="h-8 w-8 text-lime-200" />
                            <div>
                                <p className="text-sm font-semibold">
                                    Secure & Reliable
                                </p>
                                <p className="text-xs text-green-100">
                                    Your trust is our priority
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT AUTH SECTION */}
                <div className="flex items-center justify-center bg-white px-5 py-10 sm:px-10 lg:px-12">
                    <div className="w-full max-w-md">

                        {/* Mobile Logo */}
                        <div className="mb-8 flex items-center justify-center gap-2 lg:hidden">
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                                <Leaf className="h-6 w-6 text-green-700" />
                            </div>

                            <div>
                                <h2 className="font-bold text-green-900">
                                    Patil Krushi Seva Kendra
                                </h2>
                            </div>
                        </div>

                        {/* Login/Register Tabs */}
                        <div className="mb-8 grid grid-cols-2 rounded-xl bg-green-50 p-1">
                            <button
                                type="button"
                                onClick={() => {
                                    if (!loading) {
                                        setIsRegister(false);
                                        setShowPassword(false);
                                    }
                                }}
                                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                                    !isRegister
                                        ? "bg-white text-green-700 shadow-sm"
                                        : "text-gray-500 hover:text-green-700"
                                }`}
                                disabled={loading}
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    if (!loading) {
                                        setIsRegister(true);
                                        setShowPassword(false);
                                    }
                                }}
                                className={`rounded-lg px-4 py-3 text-sm font-semibold transition-all ${
                                    isRegister
                                        ? "bg-white text-green-700 shadow-sm"
                                        : "text-gray-500 hover:text-green-700"
                                }`}
                                disabled={loading}
                            >
                                Create Account
                            </button>
                        </div>

                        {/* Heading */}
                        <div className="mb-8">
                            <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                                <Leaf className="h-6 w-6 text-green-700" />
                            </div>

                            <h2 className="text-3xl font-bold tracking-tight text-gray-900">
                                {isRegister
                                    ? "Create your account"
                                    : "Welcome back!"}
                            </h2>

                            <p className="mt-2 text-sm leading-6 text-gray-500">
                                {isRegister
                                    ? "Join us and manage your agricultural purchases easily."
                                    : "Sign in to continue to Patil Krushi Seva Kendra."}
                            </p>
                        </div>

                        {/* Alerts */}
                        {error && (
                            <Alert
                                variant="destructive"
                                className="mb-5"
                            >
                                <AlertDescription>
                                    {error}
                                </AlertDescription>
                            </Alert>
                        )}

                        {success && (
                            <Alert className="mb-5 border-green-200 bg-green-50 text-green-800">
                                <AlertDescription>
                                    {success}
                                </AlertDescription>
                            </Alert>
                        )}

                        {/* Form */}
                        <form
                            onSubmit={handleSubmit}
                            className="space-y-5"
                        >
                            {/* Name */}
                            {isRegister && (
                                <div className="space-y-2">
                                    <label
                                        htmlFor="name"
                                        className="text-sm font-semibold text-gray-700"
                                    >
                                        Full Name
                                    </label>

                                    <div className="relative">
                                        <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                        <Input
                                            id="name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            placeholder="Enter your full name"
                                            className="h-12 rounded-xl border-gray-200 pl-10 transition focus-visible:border-green-600 focus-visible:ring-green-600"
                                            required
                                            minLength={2}
                                            disabled={loading}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email */}
                            <div className="space-y-2">
                                <label
                                    htmlFor="email"
                                    className="text-sm font-semibold text-gray-700"
                                >
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <Input
                                        id="email"
                                        type="email"
                                        value={email}
                                        onChange={(e) =>
                                            setEmail(e.target.value)
                                        }
                                        placeholder="farmer@example.com"
                                        className="h-12 rounded-xl border-gray-200 pl-10 transition focus-visible:border-green-600 focus-visible:ring-green-600"
                                        required
                                        disabled={loading}
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-semibold text-gray-700"
                                    >
                                        Password
                                    </label>

                                    {!isRegister && (
                                        <button
                                            type="button"
                                            className="text-xs font-medium text-green-700 hover:underline"
                                            onClick={() =>
                                                alert(
                                                    "Password reset will be added soon."
                                                )
                                            }
                                        >
                                            Forgot password?
                                        </button>
                                    )}
                                </div>

                                <div className="relative">
                                    <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />

                                    <Input
                                        id="password"
                                        type={
                                            showPassword
                                                ? "text"
                                                : "password"
                                        }
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        placeholder="Enter your password"
                                        className="h-12 rounded-xl border-gray-200 pl-10 pr-11 transition focus-visible:border-green-600 focus-visible:ring-green-600"
                                        required
                                        minLength={
                                            isRegister ? 8 : 1
                                        }
                                        disabled={loading}
                                    />

                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(
                                                (prev) => !prev
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-green-700"
                                        aria-label={
                                            showPassword
                                                ? "Hide password"
                                                : "Show password"
                                        }
                                        disabled={loading}
                                    >
                                        {showPassword ? (
                                            <EyeOff className="h-5 w-5" />
                                        ) : (
                                            <Eye className="h-5 w-5" />
                                        )}
                                    </button>
                                </div>

                                {isRegister && (
                                    <p className="text-xs text-gray-500">
                                        Password must contain at least
                                        8 characters.
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-12 w-full rounded-xl bg-gradient-to-r from-green-700 to-emerald-600 text-sm font-semibold shadow-lg shadow-green-700/20 transition-all hover:from-green-800 hover:to-emerald-700"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Please wait...
                                    </>
                                ) : (
                                    <>
                                        {isRegister
                                            ? "Create Account"
                                            : "Sign In"}

                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </>
                                )}
                            </Button>

                            {/* Toggle */}
                            <div className="text-center text-sm">
                                <span className="text-gray-500">
                                    {isRegister
                                        ? "Already have an account? "
                                        : "Don't have an account? "}
                                </span>

                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="font-semibold text-green-700 hover:underline"
                                    disabled={loading}
                                >
                                    {isRegister
                                        ? "Login"
                                        : "Create Account"}
                                </button>
                            </div>
                        </form>

                        {/* Security Notice */}
                        <div className="mt-8 flex items-start gap-3 rounded-xl border border-green-100 bg-green-50 p-4">
                            <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-700" />

                            <div>
                                <p className="text-xs font-semibold text-green-800">
                                    Your information is secure
                                </p>

                                <p className="mt-1 text-xs leading-5 text-green-700/80">
                                    We help protect your account information
                                    with secure authentication.
                                </p>
                            </div>
                        </div>

                        {/* Footer */}
                        <p className="mt-6 text-center text-xs text-gray-400">
                            © {new Date().getFullYear()} Patil Krushi Seva Kendra
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
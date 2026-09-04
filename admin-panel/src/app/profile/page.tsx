"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
  ArrowLeft,
  User,
  Mail,
  Phone,
  ShieldCheck,
  Lock,
  Camera,
  Save,
  Eye,
  EyeOff,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

type Profile = {
  id: string;
  name: string;
  email: string;
  phone: string;
  image: string | null;
  role: string;
};

export default function ProfilePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [profile, setProfile] = useState<Profile>({
    id: "",
    name: "",
    email: "",
    phone: "",
    image: null,
    role: "ADMIN",
  });

  const [password, setPassword] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  // =====================================================
  // GET ADMIN PROFILE
  // =====================================================

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError("");

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
            data.message || "Failed to load profile."
          );
        }

        setProfile({
          id: data.data.id,
          name: data.data.name || "",
          email: data.data.email || "",
          phone: data.data.phone || "",
          image: data.data.image || null,
          role: data.data.role || "ADMIN",
        });
      } catch (err) {
        console.error("Profile fetch error:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Failed to load profile."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // =====================================================
  // PROFILE INPUT CHANGE
  // =====================================================

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setProfile((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // PASSWORD INPUT CHANGE
  // =====================================================

  const handlePasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = e.target;

    setPassword((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =====================================================
  // UPDATE PROFILE
  // =====================================================

  const handleProfileSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response = await fetch(
        `${API_URL}/admin/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update profile."
        );
      }

      // Update profile page
      setProfile((prev) => ({
        ...prev,
        ...data.data,
      }));

      // IMPORTANT:
      // Notify navbar that profile has changed
      window.dispatchEvent(
        new Event("admin-profile-updated")
      );

      setMessage(
        "Profile updated successfully!"
      );

      setTimeout(() => {
        setMessage("");
      }, 3000);
    } catch (err) {
      console.error(
        "Profile update error:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update profile."
      );
    } finally {
      setSaving(false);
    }
  };

  // =====================================================
  // PASSWORD UPDATE
  // =====================================================

  const handlePasswordSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    setMessage("");
    setError("");

    if (!password.current) {
      setError(
        "Please enter your current password."
      );
      return;
    }

    if (!password.newPassword) {
      setError(
        "Please enter a new password."
      );
      return;
    }

    if (password.newPassword !== password.confirm) {
      setError(
        "New password and confirm password do not match."
      );
      return;
    }

    // Password API will be connected later
    setMessage(
      "Password API is not connected yet."
    );
  };

  // =====================================================
  // AVATAR INITIALS
  // =====================================================

  const getInitials = (name: string) => {
    if (!name) return "AU";

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
  // LOADING
  // =====================================================

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-green-600" />

          <p className="mt-4 text-sm text-gray-500">
            Loading profile...
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6 lg:p-8">
      <div className="mx-auto max-w-6xl">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-6">

          <button
            type="button"
            onClick={() => router.back()}
            className="
              mb-4
              flex
              items-center
              gap-2
              rounded-xl
              border
              border-gray-200
              bg-white
              px-4
              py-2
              text-sm
              font-medium
              text-gray-700
              shadow-sm
              transition
              hover:bg-gray-50
            "
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <h1 className="text-2xl font-bold text-gray-900">
            My Profile
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage your admin account and profile information
          </p>

        </div>

        {/* =================================================
            SUCCESS MESSAGE
        ================================================= */}

        {message && (
          <div className="mb-6 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm font-medium text-green-700">
            {message}
          </div>
        )}

        {/* =================================================
            ERROR MESSAGE
        ================================================= */}

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">

          {/* =================================================
              PROFILE CARD
          ================================================= */}

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">

            <div className="flex flex-col items-center">

              <div className="relative">

                {profile.image ? (
                  <img
                    src={profile.image}
                    alt={profile.name}
                    className="h-28 w-28 rounded-full object-cover"
                  />
                ) : (
                  <div className="flex h-28 w-28 items-center justify-center rounded-full bg-green-100 text-4xl font-bold text-green-700">
                    {getInitials(profile.name)}
                  </div>
                )}

                <button
                  type="button"
                  className="absolute bottom-0 right-0 flex h-9 w-9 items-center justify-center rounded-full bg-green-600 text-white shadow-md transition hover:bg-green-700"
                  title="Change profile picture"
                >
                  <Camera size={17} />
                </button>

              </div>

              <h2 className="mt-4 text-xl font-semibold text-gray-900">
                {profile.name || "Admin User"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Administrator
              </p>

              <div className="mt-4 flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700">
                <span className="h-2 w-2 rounded-full bg-green-500" />
                Active Account
              </div>

            </div>

            {/* Account Information */}

            <div className="mt-8 space-y-4 border-t border-gray-100 pt-6">

              {/* Role */}

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-gray-100 p-2">
                  <ShieldCheck
                    size={18}
                    className="text-gray-600"
                  />
                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Account Role
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {profile.role}
                  </p>

                </div>

              </div>

              {/* Email */}

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-gray-100 p-2">
                  <Mail
                    size={18}
                    className="text-gray-600"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-xs text-gray-500">
                    Email
                  </p>

                  <p className="truncate text-sm font-medium text-gray-900">
                    {profile.email || "Not available"}
                  </p>

                </div>

              </div>

              {/* Phone */}

              <div className="flex items-center gap-3">

                <div className="rounded-lg bg-gray-100 p-2">
                  <Phone
                    size={18}
                    className="text-gray-600"
                  />
                </div>

                <div>

                  <p className="text-xs text-gray-500">
                    Phone
                  </p>

                  <p className="text-sm font-medium text-gray-900">
                    {profile.phone || "Not available"}
                  </p>

                </div>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SIDE
          ================================================= */}

          <div className="space-y-6 lg:col-span-2">

            {/* =================================================
                PERSONAL INFORMATION
            ================================================= */}

            <form
              onSubmit={handleProfileSubmit}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-green-100 p-3">
                  <User
                    size={20}
                    className="text-green-700"
                  />
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-900">
                    Personal Information
                  </h2>

                  <p className="text-sm text-gray-500">
                    Update your personal account information
                  </p>

                </div>

              </div>

              <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                {/* Name */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Full Name
                  </label>

                  <div className="relative">

                    <User
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleProfileChange}
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                </div>

                {/* Email */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Email Address
                  </label>

                  <div className="relative">

                    <Mail
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleProfileChange}
                      placeholder="Enter email"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                </div>

                {/* Phone */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>

                  <div className="relative">

                    <Phone
                      size={18}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      type="tel"
                      name="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                      placeholder="Enter phone number"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                </div>

              </div>

              {/* Save */}

              <div className="mt-6 flex justify-end">

                <button
                  type="submit"
                  disabled={saving}
                  className="
                    flex
                    items-center
                    gap-2
                    rounded-xl
                    bg-green-600
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-green-700
                    disabled:cursor-not-allowed
                    disabled:opacity-60
                  "
                >

                  <Save size={17} />

                  {saving
                    ? "Saving..."
                    : "Save Changes"}

                </button>

              </div>

            </form>

            {/* =================================================
                CHANGE PASSWORD
            ================================================= */}

            <form
              onSubmit={handlePasswordSubmit}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >

              <div className="mb-6 flex items-center gap-3">

                <div className="rounded-xl bg-green-100 p-3">
                  <Lock
                    size={20}
                    className="text-green-700"
                  />
                </div>

                <div>

                  <h2 className="text-lg font-semibold text-gray-900">
                    Change Password
                  </h2>

                  <p className="text-sm text-gray-500">
                    Keep your administrator account secure
                  </p>

                </div>

              </div>

              <div className="space-y-5">

                {/* Current Password */}

                <div>

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Current Password
                  </label>

                  <div className="relative">

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="current"
                      value={password.current}
                      onChange={handlePasswordChange}
                      placeholder="Enter current password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 pr-12 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(
                          !showPassword
                        )
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>

                </div>

                {/* New Password */}

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      New Password
                    </label>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="newPassword"
                      value={password.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="Enter new password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                  {/* Confirm Password */}

                  <div>

                    <label className="mb-2 block text-sm font-medium text-gray-700">
                      Confirm Password
                    </label>

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="confirm"
                      value={password.confirm}
                      onChange={handlePasswordChange}
                      placeholder="Confirm new password"
                      className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-green-500 focus:bg-white focus:ring-2 focus:ring-green-100"
                    />

                  </div>

                </div>

              </div>

              {/* Update Password */}

              <div className="mt-6 flex justify-end">

                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-gray-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
                >

                  <Lock size={17} />

                  Update Password

                </button>

              </div>

            </form>

          </div>
        </div>
      </div>
    </div>
  );
}
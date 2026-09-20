"use client";

import { useEffect, useMemo, useState } from "react";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { api } from "@/lib/axios";

type Admin = {
    id: string;
    name: string;
    email: string;
    status: "Active" | "Disabled";
    createdAt: string | null;
    lastLoginAt: string | null;
};

export default function ManageAdminsPage() {
    const [admins, setAdmins] = useState<Admin[]>([]);

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    const [search, setSearch] = useState("");

    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const [selectedAdmin, setSelectedAdmin] =
        useState<Admin | null>(null);

    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    // =====================================================
    // LOAD ADMINS
    // =====================================================

    const loadAdmins = async () => {
        try {
            setLoading(true);
            setError("");

            const response = await api.get("/admin/admins");

            setAdmins(response.data?.admins ?? []);
        } catch (err: any) {
            console.error("Load admins error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to load administrators."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAdmins();
    }, []);

    // =====================================================
    // SEARCH
    // =====================================================

    const filteredAdmins = useMemo(() => {
        const query = search.trim().toLowerCase();

        if (!query) {
            return admins;
        }

        return admins.filter(
            (admin) =>
                admin.name.toLowerCase().includes(query) ||
                admin.email.toLowerCase().includes(query)
        );
    }, [admins, search]);

    // =====================================================
    // ADD ADMIN
    // =====================================================

    const handleAddAdmin = async (
        e: React.FormEvent
    ) => {
        e.preventDefault();

        if (
            !newName.trim() ||
            !newEmail.trim() ||
            !newPassword
        ) {
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const response = await api.post("/admin/admins", {
                name: newName.trim(),
                email: newEmail.trim(),
                password: newPassword,
            });

            const createdAdmin = response.data?.admin;

            if (createdAdmin) {
                setAdmins((current) => [
                    ...current,
                    createdAdmin,
                ]);
            } else {
                await loadAdmins();
            }

            setNewName("");
            setNewEmail("");
            setNewPassword("");

            setShowAddModal(false);

            setSuccess("Admin created successfully.");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err: any) {
            console.error("Create admin error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to create administrator."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // ENABLE / DISABLE
    // =====================================================

    const handleToggleStatus = async (admin: Admin) => {
        try {
            setSaving(true);
            setError("");
            setSuccess("");

            const disabled = admin.status === "Active";

            const response = await api.patch(
                `/admin/admins/${admin.id}`,
                {
                    disabled,
                }
            );

            const updatedAdmin = response.data?.admin;

            if (updatedAdmin) {
                setAdmins((current) =>
                    current.map((item) =>
                        item.id === admin.id
                            ? updatedAdmin
                            : item
                    )
                );
            } else {
                await loadAdmins();
            }

            setSuccess(
                disabled
                    ? "Admin disabled successfully."
                    : "Admin enabled successfully."
            );

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err: any) {
            console.error("Toggle admin error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to update administrator."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // DELETE ADMIN
    // =====================================================

    const handleDelete = async () => {
        if (!selectedAdmin) {
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            await api.delete(
                `/admin/admins/${selectedAdmin.id}`
            );

            setAdmins((current) =>
                current.filter(
                    (admin) => admin.id !== selectedAdmin.id
                )
            );

            setSelectedAdmin(null);
            setShowDeleteModal(false);

            setSuccess("Admin deleted successfully.");

            setTimeout(() => {
                setSuccess("");
            }, 3000);
        } catch (err: any) {
            console.error("Delete admin error:", err);

            setError(
                err?.response?.data?.message ||
                "Failed to delete administrator."
            );
        } finally {
            setSaving(false);
        }
    };

    // =====================================================
    // FORMAT DATE
    // =====================================================

    const formatDate = (value: string | null) => {
        if (!value) {
            return "—";
        }

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return date.toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        });
    };

    return (
        <DashboardLayout>
            <div className="space-y-6">
                {/* =================================================
            HEADER
        ================================================= */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Settings</span>
                            <span>/</span>
                            <span className="text-slate-600">
                                Manage Admins
                            </span>
                        </div>

                        <h1 className="mt-2 text-2xl font-bold text-slate-800">
                            Manage Admins
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Manage administrators who have access to the
                            admin panel.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={() => {
                            setError("");
                            setShowAddModal(true);
                        }}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-slate-800 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-700 disabled:opacity-50"
                        disabled={saving}
                    >
                        <span className="text-lg leading-none">
                            +
                        </span>

                        Add Admin
                    </button>
                </div>

                {/* =================================================
            SUCCESS
        ================================================= */}

                {success && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {success}
                    </div>
                )}

                {/* =================================================
            ERROR
        ================================================= */}

                {error && (
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        <span>{error}</span>

                        <button
                            type="button"
                            onClick={() => setError("")}
                            className="text-red-500 hover:text-red-700"
                        >
                            ×
                        </button>
                    </div>
                )}

                {/* =================================================
            STATS
        ================================================= */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Total Admins
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-800">
                            {admins.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Active Admins
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-800">
                            {
                                admins.filter(
                                    (admin) =>
                                        admin.status === "Active"
                                ).length
                            }
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Disabled Admins
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-800">
                            {
                                admins.filter(
                                    (admin) =>
                                        admin.status === "Disabled"
                                ).length
                            }
                        </p>
                    </div>
                </div>

                {/* =================================================
            TABLE
        ================================================= */}

                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                    <div className="flex flex-col gap-4 border-b border-slate-100 p-5 md:flex-row md:items-center md:justify-between">
                        <div>
                            <h2 className="font-semibold text-slate-800">
                                Administrators
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                {filteredAdmins.length} administrator
                                {filteredAdmins.length !== 1
                                    ? "s"
                                    : ""}{" "}
                                found
                            </p>
                        </div>

                        <div className="relative w-full md:w-80">
                            <svg
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                width="18"
                                height="18"
                                viewBox="0 0 24 24"
                                fill="none"
                            >
                                <path
                                    d="M21 21L16.65 16.65M19 11C19 15.4183 15.4183 19 11 19C6.58172 19 3 15.4183 3 11C3 6.58172 6.58172 3 11 3C15.4183 3 19 6.58172 19 11Z"
                                    stroke="currentColor"
                                    strokeWidth="1.8"
                                    strokeLinecap="round"
                                />
                            </svg>

                            <input
                                type="text"
                                value={search}
                                onChange={(e) =>
                                    setSearch(e.target.value)
                                }
                                placeholder="Search admin..."
                                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition focus:border-slate-400 focus:bg-white"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[760px]">
                            <thead>
                                <tr className="border-b border-slate-100 bg-slate-50/70 text-left">
                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Admin
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Email
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Created
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="text-sm text-slate-500">
                                                Loading administrators...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredAdmins.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan={5}
                                            className="px-5 py-14 text-center"
                                        >
                                            <div className="mx-auto max-w-sm">
                                                <h3 className="font-semibold text-slate-700">
                                                    No admins found
                                                </h3>

                                                <p className="mt-1 text-sm text-slate-500">
                                                    Add a new administrator to get
                                                    started.
                                                </p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredAdmins.map((admin) => (
                                        <tr
                                            key={admin.id}
                                            className="border-b border-slate-100 last:border-b-0 hover:bg-slate-50/50"
                                        >
                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-800 text-sm font-semibold text-white">
                                                        {(
                                                            admin.name ||
                                                            admin.email
                                                        )
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <div>
                                                        <p className="font-medium text-slate-800">
                                                            {admin.name ||
                                                                "Unnamed Admin"}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-slate-400">
                                                            Administrator
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-600">
                                                {admin.email}
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${admin.status === "Active"
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-slate-100 text-slate-500"
                                                        }`}
                                                >
                                                    <span
                                                        className={`h-1.5 w-1.5 rounded-full ${admin.status === "Active"
                                                                ? "bg-emerald-500"
                                                                : "bg-slate-400"
                                                            }`}
                                                    />

                                                    {admin.status}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-sm text-slate-500">
                                                {formatDate(admin.createdAt)}
                                            </td>

                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    <button
                                                        type="button"
                                                        disabled={saving}
                                                        onClick={() =>
                                                            handleToggleStatus(
                                                                admin
                                                            )
                                                        }
                                                        className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                                                    >
                                                        {admin.status === "Active"
                                                            ? "Disable"
                                                            : "Enable"}
                                                    </button>

                                                    <button
                                                        type="button"
                                                        disabled={saving}
                                                        onClick={() => {
                                                            setSelectedAdmin(
                                                                admin
                                                            );
                                                            setShowDeleteModal(true);
                                                        }}
                                                        className="rounded-lg border border-red-100 px-3 py-2 text-xs font-medium text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* =====================================================
          ADD ADMIN MODAL
      ===================================================== */}

            {showAddModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-5">
                            <div>
                                <h2 className="text-lg font-semibold text-slate-800">
                                    Add Admin
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Create a new Firebase administrator account.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={() =>
                                    setShowAddModal(false)
                                }
                                className="flex h-9 w-9 items-center justify-center rounded-lg text-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                            >
                                ×
                            </button>
                        </div>

                        <form
                            onSubmit={handleAddAdmin}
                            className="space-y-5 p-6"
                        >
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Full Name
                                </label>

                                <input
                                    type="text"
                                    value={newName}
                                    onChange={(e) =>
                                        setNewName(e.target.value)
                                    }
                                    placeholder="Enter admin name"
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-slate-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Email Address
                                </label>

                                <input
                                    type="email"
                                    value={newEmail}
                                    onChange={(e) =>
                                        setNewEmail(e.target.value)
                                    }
                                    placeholder="admin@example.com"
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-slate-400"
                                    required
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>

                                <input
                                    type="password"
                                    value={newPassword}
                                    onChange={(e) =>
                                        setNewPassword(e.target.value)
                                    }
                                    placeholder="Minimum 6 characters"
                                    minLength={6}
                                    className="h-11 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-700 outline-none focus:border-slate-400"
                                    required
                                />
                            </div>

                            <div className="rounded-xl bg-slate-50 p-4">
                                <p className="text-xs leading-5 text-slate-500">
                                    This account will be created directly in
                                    Firebase Authentication. The password will
                                    not be stored in Prisma or your application
                                    database.
                                </p>
                            </div>

                            <div className="flex gap-3">
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowAddModal(false)
                                    }
                                    disabled={saving}
                                    className="h-11 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="h-11 flex-1 rounded-xl bg-slate-800 text-sm font-semibold text-white hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-50"
                                >
                                    {saving
                                        ? "Creating..."
                                        : "Create Admin"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* =====================================================
          DELETE MODAL
      ===================================================== */}

            {showDeleteModal && selectedAdmin && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-sm">
                    <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
                        <h2 className="text-lg font-semibold text-slate-800">
                            Delete administrator?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            This will permanently remove{" "}
                            <span className="font-semibold text-slate-700">
                                {selectedAdmin.name ||
                                    selectedAdmin.email}
                            </span>{" "}
                            from Firebase Authentication.
                        </p>

                        <p className="mt-2 text-xs text-red-500">
                            This action cannot be undone.
                        </p>

                        <div className="mt-6 flex gap-3">
                            <button
                                type="button"
                                disabled={saving}
                                onClick={() => {
                                    setSelectedAdmin(null);
                                    setShowDeleteModal(false);
                                }}
                                className="h-11 flex-1 rounded-xl border border-slate-200 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                disabled={saving}
                                onClick={handleDelete}
                                className="h-11 flex-1 rounded-xl bg-red-600 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {saving
                                    ? "Deleting..."
                                    : "Delete Admin"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
"use client";

import { useEffect, useMemo, useState } from "react";
import {
    CheckCircle2,
    MapPin,
    Pencil,
    Plus,
    Search,
    Trash2,
    XCircle,
} from "lucide-react";

import DashboardLayout from "@/components/layout/dashboard-layout";
import { api } from "@/lib/axios";

type DeliveryPincode = {
    id: string;
    pincode: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
};

export default function DeliveryPincodesPage() {
    const [pincodes, setPincodes] =
        useState<DeliveryPincode[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [saving, setSaving] =
        useState(false);

    const [search, setSearch] =
        useState("");

    const [showModal, setShowModal] =
        useState(false);

    const [editing, setEditing] =
        useState<DeliveryPincode | null>(null);

    const [pincode, setPincode] =
        useState("");

    const [error, setError] =
        useState("");

    const [success, setSuccess] =
        useState("");

    const [deleteTarget, setDeleteTarget] =
        useState<DeliveryPincode | null>(null);

    const loadPincodes = async () => {
        try {
            setLoading(true);
            setError("");

            const response =
                await api.get(
                    "/admin/delivery-pincodes"
                );

            setPincodes(
                Array.isArray(response.data?.data)
                    ? response.data.data
                    : []
            );
        } catch (err: any) {
            console.error(
                "Load delivery pincodes error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to load delivery pincodes."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadPincodes();
    }, []);

    const filteredPincodes = useMemo(() => {
        const value =
            search.trim().toLowerCase();

        if (!value) {
            return pincodes;
        }

        return pincodes.filter((item) =>
            item.pincode
                .toLowerCase()
                .includes(value)
        );
    }, [pincodes, search]);

    const activeCount =
        pincodes.filter(
            (item) => item.isActive
        ).length;

    const inactiveCount =
        pincodes.filter(
            (item) => !item.isActive
        ).length;

    const openAddModal = () => {
        setEditing(null);
        setPincode("");
        setError("");
        setShowModal(true);
    };

    const openEditModal = (
        item: DeliveryPincode
    ) => {
        setEditing(item);
        setPincode(item.pincode);
        setError("");
        setShowModal(true);
    };

    const handleSave = async () => {
        const normalized =
            pincode.trim();

        if (!/^\d{6}$/.test(normalized)) {
            setError(
                "Please enter a valid 6-digit pincode."
            );
            return;
        }

        try {
            setSaving(true);
            setError("");
            setSuccess("");

            if (editing) {
                await api.patch(
                    `/admin/delivery-pincodes/${editing.id}`,
                    {
                        pincode: normalized,
                    }
                );

                setSuccess(
                    "Delivery pincode updated successfully."
                );
            } else {
                await api.post(
                    "/admin/delivery-pincodes",
                    {
                        pincode: normalized,
                    }
                );

                setSuccess(
                    "Delivery pincode added successfully."
                );
            }

            setShowModal(false);
            setEditing(null);
            setPincode("");

            await loadPincodes();
        } catch (err: any) {
            console.error(
                "Save delivery pincode error:",
                err
            );

            setError(
                err?.response?.data?.message ||
                "Failed to save delivery pincode."
            );
        } finally {
            setSaving(false);
        }
    };

    const handleToggle = async (
        item: DeliveryPincode
    ) => {
        try {
            setError("");
            setSuccess("");

            await api.patch(
                `/admin/delivery-pincodes/${item.id}`,
                {
                    isActive: !item.isActive,
                }
            );

            setPincodes((current) =>
                current.map((pincode) =>
                    pincode.id === item.id
                        ? {
                            ...pincode,
                            isActive:
                                !pincode.isActive,
                        }
                        : pincode
                )
            );

            setSuccess(
                item.isActive
                    ? `${item.pincode} delivery disabled.`
                    : `${item.pincode} delivery enabled.`
            );
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to update pincode status."
            );
        }
    };

    const handleDelete = async () => {
        if (!deleteTarget) {
            return;
        }

        try {
            setSaving(true);
            setError("");

            await api.delete(
                `/admin/delivery-pincodes/${deleteTarget.id}`
            );

            setPincodes((current) =>
                current.filter(
                    (item) =>
                        item.id !== deleteTarget.id
                )
            );

            setSuccess(
                `${deleteTarget.pincode} deleted successfully.`
            );

            setDeleteTarget(null);
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                "Failed to delete pincode."
            );
        } finally {
            setSaving(false);
        }
    };

    const formatDate = (value: string) =>
        new Date(value).toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );

    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Header */}

                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                            <span>Settings</span>
                            <span>/</span>
                            <span className="text-slate-600">
                                Delivery Pincodes
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-3">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                                <MapPin className="h-6 w-6" />
                            </div>

                            <div>
                                <h1 className="text-2xl font-bold text-slate-900">
                                    Delivery Pincodes
                                </h1>

                                <p className="mt-1 text-sm text-slate-500">
                                    Control the pincodes where your store
                                    provides delivery.
                                </p>
                            </div>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={openAddModal}
                        className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700"
                    >
                        <Plus className="h-4 w-4" />
                        Add Pincode
                    </button>
                </div>

                {/* Messages */}

                {success && (
                    <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                        {success}
                    </div>
                )}

                {error && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                        {error}
                    </div>
                )}

                {/* Stats */}

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Total Pincodes
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-900">
                            {pincodes.length}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5">
                        <p className="text-sm text-emerald-700">
                            Active
                        </p>

                        <p className="mt-2 text-2xl font-bold text-emerald-800">
                            {activeCount}
                        </p>
                    </div>

                    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-sm text-slate-500">
                            Inactive
                        </p>

                        <p className="mt-2 text-2xl font-bold text-slate-700">
                            {inactiveCount}
                        </p>
                    </div>
                </div>

                {/* Table */}

                <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h2 className="font-bold text-slate-900">
                                Allowed Delivery Areas
                            </h2>

                            <p className="mt-1 text-xs text-slate-500">
                                Only active pincodes can place orders.
                            </p>
                        </div>

                        <div className="relative w-full sm:w-72">
                            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

                            <input
                                value={search}
                                onChange={(event) =>
                                    setSearch(event.target.value)
                                }
                                placeholder="Search pincode..."
                                className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-sm text-slate-500">
                            Loading delivery pincodes...
                        </div>
                    ) : filteredPincodes.length === 0 ? (
                        <div className="p-12 text-center">
                            <MapPin className="mx-auto h-10 w-10 text-slate-300" />

                            <p className="mt-3 font-semibold text-slate-700">
                                No delivery pincodes found
                            </p>

                            <p className="mt-1 text-sm text-slate-500">
                                Add a pincode to start accepting
                                orders from that location.
                            </p>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full min-w-[700px]">
                                <thead>
                                    <tr className="border-b border-slate-200 bg-slate-50">
                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                            Pincode
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                            Status
                                        </th>

                                        <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                            Added
                                        </th>

                                        <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {filteredPincodes.map(
                                        (item) => (
                                            <tr
                                                key={item.id}
                                                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                                            >
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                                                            <MapPin className="h-4 w-4" />
                                                        </div>

                                                        <span className="font-mono text-sm font-bold text-slate-900">
                                                            {item.pincode}
                                                        </span>
                                                    </div>
                                                </td>

                                                <td className="px-6 py-4">
                                                    <button
                                                        type="button"
                                                        onClick={() =>
                                                            handleToggle(item)
                                                        }
                                                        className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold ${item.isActive
                                                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                                                : "border-slate-200 bg-slate-100 text-slate-500"
                                                            }`}
                                                    >
                                                        {item.isActive ? (
                                                            <CheckCircle2 className="h-3.5 w-3.5" />
                                                        ) : (
                                                            <XCircle className="h-3.5 w-3.5" />
                                                        )}

                                                        {item.isActive
                                                            ? "Active"
                                                            : "Inactive"}
                                                    </button>
                                                </td>

                                                <td className="px-6 py-4 text-sm text-slate-500">
                                                    {formatDate(
                                                        item.createdAt
                                                    )}
                                                </td>

                                                <td className="px-6 py-4">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                openEditModal(item)
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                                                            title="Edit"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() =>
                                                                setDeleteTarget(item)
                                                            }
                                                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-100 text-red-500 hover:bg-red-50 hover:text-red-600"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        )
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>

            {/* Add/Edit Modal */}

            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

                        <h2 className="text-xl font-bold text-slate-900">
                            {editing
                                ? "Edit Delivery Pincode"
                                : "Add Delivery Pincode"}
                        </h2>

                        <p className="mt-1 text-sm text-slate-500">
                            Orders will be accepted only for active
                            pincodes.
                        </p>

                        <div className="mt-6">
                            <label className="text-sm font-semibold text-slate-700">
                                Pincode
                            </label>

                            <input
                                value={pincode}
                                onChange={(event) =>
                                    setPincode(
                                        event.target.value
                                            .replace(/\D/g, "")
                                            .slice(0, 6)
                                    )
                                }
                                placeholder="e.g. 424206"
                                inputMode="numeric"
                                maxLength={6}
                                className="mt-2 h-12 w-full rounded-xl border border-slate-200 px-4 font-mono text-lg outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
                            />
                        </div>

                        {error && (
                            <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                                {error}
                            </div>
                        )}

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setShowModal(false)
                                }
                                className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleSave}
                                disabled={saving}
                                className="h-11 rounded-xl bg-emerald-600 px-5 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50"
                            >
                                {saving
                                    ? "Saving..."
                                    : editing
                                        ? "Update Pincode"
                                        : "Add Pincode"}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Modal */}

            {deleteTarget && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4">
                    <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                            <Trash2 className="h-5 w-5" />
                        </div>

                        <h2 className="mt-5 text-xl font-bold text-slate-900">
                            Delete Pincode?
                        </h2>

                        <p className="mt-2 text-sm leading-6 text-slate-500">
                            Are you sure you want to remove{" "}
                            <strong className="text-slate-800">
                                {deleteTarget.pincode}
                            </strong>
                            ? Customers from this pincode will no
                            longer be able to place orders.
                        </p>

                        <div className="mt-6 flex justify-end gap-3">
                            <button
                                type="button"
                                onClick={() =>
                                    setDeleteTarget(null)
                                }
                                className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700"
                            >
                                Cancel
                            </button>

                            <button
                                type="button"
                                onClick={handleDelete}
                                disabled={saving}
                                className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-50"
                            >
                                {saving
                                    ? "Deleting..."
                                    : "Delete Pincode"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </DashboardLayout>
    );
}
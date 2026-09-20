"use client";

import DashboardLayout from "@/components/layout/dashboard-layout";

import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    ArrowLeft,
    Check,
    CheckCircle2,
    Clock3,
    CreditCard,
    Download,
    Loader2,
    Mail,
    MapPin,
    Package,
    Phone,
    Printer,
    ShoppingBag,
    Truck,
    User,
    XCircle,
} from "lucide-react";

import { api } from "@/lib/axios";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Order } from "@/hooks/use-orders";

/* ============================================================
   CONSTANTS
============================================================ */

const ORDER_STATUSES = [
    "PENDING",
    "CONFIRMED",
    "SHIPPED",
    "DELIVERED",
];

/* ============================================================
   HELPERS
============================================================ */

function formatAmount(
    amount: number | string | null | undefined
) {
    return Number(amount ?? 0).toLocaleString(
        "en-IN",
        {
            maximumFractionDigits: 2,
        }
    );
}

function formatDate(date?: string) {
    if (!date) return "-";

    return new Date(date).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

function formatDateTime(date?: string) {
    if (!date) return "-";

    return new Date(date).toLocaleString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
}

function orderBadge(status: string) {
    switch (status) {
        case "DELIVERED":
            return "border-green-200 bg-green-50 text-green-700";

        case "SHIPPED":
            return "border-blue-200 bg-blue-50 text-blue-700";

        case "CONFIRMED":
            return "border-purple-200 bg-purple-50 text-purple-700";

        case "PENDING":
            return "border-orange-200 bg-orange-50 text-orange-700";

        case "CANCELLED":
            return "border-red-200 bg-red-50 text-red-700";

        default:
            return "border-slate-200 bg-slate-50 text-slate-700";
    }
}

function paymentBadge(status: string) {
    switch (status) {
        case "SUCCESS":
            return "border-green-200 bg-green-50 text-green-700";

        case "PENDING":
            return "border-yellow-200 bg-yellow-50 text-yellow-700";

        case "FAILED":
            return "border-red-200 bg-red-50 text-red-700";

        case "REFUNDED":
            return "border-purple-200 bg-purple-50 text-purple-700";

        default:
            return "border-slate-200 bg-slate-50 text-slate-700";
    }
}

function statusIndex(status: string) {
    return ORDER_STATUSES.indexOf(status);
}

/* ============================================================
   SECTION HEADER
============================================================ */

function SectionHeader({
    icon,
    title,
    description,
}: {
    icon: React.ReactNode;
    title: string;
    description?: string;
}) {
    return (
        <div className="mb-5 flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                {icon}
            </div>

            <div>
                <h2 className="text-sm font-bold text-slate-900">
                    {title}
                </h2>

                {description && (
                    <p className="mt-0.5 text-xs text-slate-500">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}

/* ============================================================
   PAGE
============================================================ */

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const orderId =
        typeof params?.id === "string"
            ? params.id
            : Array.isArray(params?.id)
                ? params.id[0]
                : "";

    const [order, setOrder] =
        useState<Order | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState<string | null>(null);

    const [selectedStatus, setSelectedStatus] =
        useState("");

    const [updating, setUpdating] =
        useState(false);

    const [successMessage, setSuccessMessage] =
        useState("");

    const [errorMessage, setErrorMessage] =
        useState("");

    /* ============================================================
       FETCH ORDER
    ============================================================ */

    const fetchOrder = async () => {
        if (!orderId) return;

        try {
            setLoading(true);
            setError(null);

            const response =
                await api.get(
                    `/orders/admin/${orderId}`
                );

            if (!response.data?.success) {
                throw new Error(
                    response.data?.message ||
                    "Failed to fetch order."
                );
            }

            const fetchedOrder =
                response.data.data;

            setOrder(fetchedOrder);

            setSelectedStatus(
                fetchedOrder.status
            );
        } catch (error: any) {
            console.error(
                "Order details error:",
                error
            );

            setError(
                error?.response?.data?.message ||
                error?.message ||
                "Failed to load order."
            );
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrder();
    }, [orderId]);

    /* ============================================================
       STATUS
    ============================================================ */

    const isFinalStatus =
        order?.status === "DELIVERED" ||
        order?.status === "CANCELLED";

    const statusChanged =
        !!order &&
        selectedStatus !== order.status;

    const currentStatusIndex = useMemo(() => {
        if (!order) return -1;

        return statusIndex(order.status);
    }, [order]);

    /* ============================================================
       UPDATE STATUS
    ============================================================ */

    const handleUpdateStatus =
        async () => {
            if (
                !order ||
                updating ||
                !statusChanged ||
                isFinalStatus
            ) {
                return;
            }

            try {
                setUpdating(true);
                setSuccessMessage("");
                setErrorMessage("");

                const response =
                    await api.put(
                        `/orders/${order.id}/status`,
                        {
                            status: selectedStatus,
                        }
                    );

                if (!response.data?.success) {
                    throw new Error(
                        response.data?.message ||
                        "Failed to update status."
                    );
                }

                const updatedOrder =
                    response.data.data;

                setOrder(updatedOrder);

                setSelectedStatus(
                    updatedOrder.status
                );

                setSuccessMessage(
                    "Order status updated successfully."
                );
            } catch (error: any) {
                console.error(
                    "Status update error:",
                    error
                );

                setSelectedStatus(
                    order.status
                );

                setErrorMessage(
                    error?.response?.data?.message ||
                    error?.message ||
                    "Failed to update order status."
                );
            } finally {
                setUpdating(false);
            }
        };

    /* ============================================================
       PRINT
    ============================================================ */

    const handlePrint = () => {
        window.print();
    };

    const handleInvoice = () => {
        window.print();
    };

    /* ============================================================
       LOADING
    ============================================================ */

    if (loading) {
        return (
            <DashboardLayout>
                <div className="flex min-h-[70vh] items-center justify-center">
                    <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50">
                            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
                        </div>

                        <p className="text-sm font-medium text-slate-500">
                            Loading order details...
                        </p>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    /* ============================================================
       ERROR
    ============================================================ */

    if (error || !order) {
        return (
            <DashboardLayout>
                <div className="mx-auto max-w-3xl p-6 lg:p-8">
                    <div className="rounded-3xl border border-red-200 bg-red-50 p-8 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                            <XCircle className="h-7 w-7 text-red-500" />
                        </div>

                        <h2 className="mt-4 text-xl font-bold text-red-900">
                            Unable to load order
                        </h2>

                        <p className="mt-2 text-sm text-red-600">
                            {error || "Order not found."}
                        </p>

                        <Button
                            onClick={() =>
                                router.push("/orders")
                            }
                            className="mt-6 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Button>
                    </div>
                </div>
            </DashboardLayout>
        );
    }

    const address =
        order.OrderAddress;

    const customerName =
        order.user?.name ||
        address?.fullName ||
        "Guest User";

    const customerPhone =
        order.user?.phone ||
        address?.phone ||
        "-";

    const customerEmail =
        order.user?.email ||
        "-";

    const itemCount =
        order.items?.reduce(
            (total, item) =>
                total +
                Number(item.quantity || 0),
            0
        ) || 0;

    return (
        <DashboardLayout>
            <>
                {/* ======================================================
            PRINT CSS
        ====================================================== */}

                <style jsx global>{`
          @media print {
            body {
              background: white !important;
            }

            aside,
            nav,
            header,
            .no-print {
              display: none !important;
            }

            .print-page {
              max-width: 100% !important;
              margin: 0 !important;
              padding: 20px !important;
            }

            .print-card {
              border: 1px solid #ddd !important;
              box-shadow: none !important;
              break-inside: avoid;
            }

            @page {
              size: A4;
              margin: 12mm;
            }
          }
        `}</style>

                <main className="print-page mx-auto max-w-[1500px] p-4 sm:p-6 lg:p-8">

                    {/* ====================================================
              HEADER
          ==================================================== */}

                    <div className="no-print mb-6">
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            <div className="flex items-start gap-4">
                                <Button
                                    variant="outline"
                                    size="icon"
                                    onClick={() =>
                                        router.push("/orders")
                                    }
                                    className="mt-1 h-10 w-10 shrink-0 rounded-xl"
                                >
                                    <ArrowLeft className="h-4 w-4" />
                                </Button>

                                <div>
                                    <div className="flex flex-wrap items-center gap-3">
                                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-sm">
                                            <ShoppingBag className="h-5 w-5" />
                                        </div>

                                        <div>
                                            <div className="flex flex-wrap items-center gap-2">
                                                <h1 className="text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                                                    Order #
                                                    {order.id
                                                        .slice(-8)
                                                        .toUpperCase()}
                                                </h1>

                                                <Badge
                                                    variant="outline"
                                                    className={`rounded-full px-3 ${orderBadge(
                                                        order.status
                                                    )}`}
                                                >
                                                    {order.status}
                                                </Badge>
                                            </div>

                                            <p className="mt-1 text-sm text-slate-500">
                                                Placed on{" "}
                                                {formatDateTime(
                                                    order.createdAt
                                                )}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <Button
                                    variant="outline"
                                    onClick={handlePrint}
                                    className="rounded-xl"
                                >
                                    <Printer className="mr-2 h-4 w-4" />
                                    Print
                                </Button>

                                <Button
                                    variant="outline"
                                    onClick={handleInvoice}
                                    className="rounded-xl"
                                >
                                    <Download className="mr-2 h-4 w-4" />
                                    Invoice
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* ====================================================
              QUICK STATS
          ==================================================== */}

                    <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Order Total
                            </p>

                            <p className="mt-1 text-xl font-bold text-emerald-700">
                                ₹
                                {formatAmount(
                                    order.grandTotal
                                )}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Items
                            </p>

                            <p className="mt-1 text-xl font-bold text-slate-900">
                                {itemCount}
                            </p>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Payment
                            </p>

                            <Badge
                                variant="outline"
                                className={`mt-1 rounded-full ${paymentBadge(
                                    order.paymentStatus
                                )}`}
                            >
                                {order.paymentStatus}
                            </Badge>
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
                                Method
                            </p>

                            <p className="mt-1 truncate text-sm font-bold text-slate-900">
                                {order.paymentMethod ||
                                    "-"}
                            </p>
                        </div>
                    </div>

                    {/* ====================================================
              STATUS PROGRESS
          ==================================================== */}

                    <section className="no-print mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                        <div className="mb-6 flex items-center justify-between gap-4">
                            <div>
                                <h2 className="text-sm font-bold text-slate-900">
                                    Order Progress
                                </h2>

                                <p className="mt-1 text-xs text-slate-500">
                                    Track the current order journey
                                </p>
                            </div>

                            <Badge
                                variant="outline"
                                className={`rounded-full px-3 ${orderBadge(
                                    order.status
                                )}`}
                            >
                                {order.status}
                            </Badge>
                        </div>

                        {order.status ===
                            "CANCELLED" ? (
                            <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-100">
                                    <XCircle className="h-6 w-6 text-red-600" />
                                </div>

                                <div>
                                    <p className="font-semibold text-red-900">
                                        Order Cancelled
                                    </p>

                                    <p className="mt-1 text-sm text-red-600">
                                        This order is in a final state.
                                    </p>
                                </div>
                            </div>
                        ) : (
                            <div className="overflow-x-auto pb-2">
                                <div className="mx-auto flex min-w-[620px] items-start">
                                    {ORDER_STATUSES.map(
                                        (status, index) => {
                                            const completed =
                                                currentStatusIndex >=
                                                index;

                                            const current =
                                                order.status ===
                                                status;

                                            return (
                                                <div
                                                    key={status}
                                                    className="relative flex flex-1 flex-col items-center"
                                                >
                                                    {index <
                                                        ORDER_STATUSES.length -
                                                        1 && (
                                                            <div
                                                                className={`absolute left-1/2 top-5 h-0.5 w-full ${currentStatusIndex >
                                                                        index
                                                                        ? "bg-emerald-500"
                                                                        : "bg-slate-200"
                                                                    }`}
                                                            />
                                                        )}

                                                    <div
                                                        className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-full border-2 ${completed
                                                                ? "border-emerald-500 bg-emerald-500 text-white"
                                                                : "border-slate-200 bg-white text-slate-300"
                                                            }`}
                                                    >
                                                        {completed ? (
                                                            <Check className="h-5 w-5" />
                                                        ) : (
                                                            <Clock3 className="h-4 w-4" />
                                                        )}
                                                    </div>

                                                    <p
                                                        className={`mt-3 text-xs font-bold ${current
                                                                ? "text-emerald-700"
                                                                : completed
                                                                    ? "text-slate-700"
                                                                    : "text-slate-400"
                                                            }`}
                                                    >
                                                        {status}
                                                    </p>
                                                </div>
                                            );
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </section>

                    {/* ====================================================
              MAIN GRID
          ==================================================== */}

                    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">

                        {/* ==================================================
                LEFT CONTENT
            ================================================== */}

                        <div className="space-y-6">

                            {/* CUSTOMER */}

                            <section className="print-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <SectionHeader
                                    icon={
                                        <User className="h-5 w-5" />
                                    }
                                    title="Customer Information"
                                    description="Customer contact details"
                                />

                                <div className="grid gap-4 md:grid-cols-3">

                                    <div className="rounded-2xl bg-slate-50 p-4 md:col-span-3">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-lg font-bold text-emerald-700">
                                                {customerName
                                                    .charAt(0)
                                                    .toUpperCase()}
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-base font-bold text-slate-900">
                                                    {customerName}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Customer
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-slate-100 p-4">
                                        <p className="text-xs text-slate-400">
                                            Phone
                                        </p>

                                        <p className="mt-2 flex items-center gap-2 text-sm font-semibold text-slate-800">
                                            <Phone className="h-4 w-4 text-emerald-600" />
                                            {customerPhone}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-100 p-4">
                                        <p className="text-xs text-slate-400">
                                            Email
                                        </p>

                                        <p className="mt-2 flex items-center gap-2 break-all text-sm font-semibold text-slate-800">
                                            <Mail className="h-4 w-4 shrink-0 text-emerald-600" />
                                            {customerEmail}
                                        </p>
                                    </div>

                                    <div className="rounded-2xl border border-slate-100 p-4">
                                        <p className="text-xs text-slate-400">
                                            Order ID
                                        </p>

                                        <p className="mt-2 break-all font-mono text-xs font-semibold text-slate-800">
                                            {order.id}
                                        </p>
                                    </div>
                                </div>
                            </section>

                            {/* ADDRESS */}

                            <section className="print-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <SectionHeader
                                    icon={
                                        <MapPin className="h-5 w-5" />
                                    }
                                    title="Delivery Address"
                                    description="Shipping information"
                                />

                                {address ? (
                                    <div className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                                        <p className="font-bold text-slate-900">
                                            {address.fullName}
                                        </p>

                                        <p className="mt-3 text-sm leading-6 text-slate-600">
                                            {address.addressLine}
                                            <br />

                                            {address.village}

                                            {address.taluka
                                                ? `, ${address.taluka}`
                                                : ""}

                                            {address.city
                                                ? `, ${address.city}`
                                                : ""}

                                            <br />

                                            {address.district},{" "}
                                            {address.state} -{" "}
                                            {address.pincode}
                                        </p>

                                        {address.landmark && (
                                            <div className="mt-4 rounded-xl border border-amber-100 bg-amber-50 px-4 py-3">
                                                <p className="text-xs text-amber-800">
                                                    <span className="font-bold">
                                                        Landmark:
                                                    </span>{" "}
                                                    {address.landmark}
                                                </p>
                                            </div>
                                        )}

                                        <div className="mt-4 flex items-center gap-2 border-t border-slate-200 pt-4 text-xs font-medium text-slate-500">
                                            <Phone className="h-4 w-4 text-emerald-600" />
                                            {address.phone}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="rounded-2xl bg-slate-50 p-5 text-sm text-slate-500">
                                        Shipping address is not available.
                                    </div>
                                )}
                            </section>

                            {/* PRODUCTS */}

                            <section className="print-card overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                                <div className="p-5 sm:p-6">
                                    <SectionHeader
                                        icon={
                                            <Package className="h-5 w-5" />
                                        }
                                        title="Ordered Products"
                                        description={`${itemCount} item${itemCount === 1
                                                ? ""
                                                : "s"
                                            } in this order`}
                                    />
                                </div>

                                {order.items &&
                                    order.items.length > 0 ? (
                                    <div className="overflow-x-auto">
                                        <table className="w-full min-w-[650px] text-sm">
                                            <thead>
                                                <tr className="border-y border-slate-200 bg-slate-50">
                                                    <th className="px-6 py-4 text-left text-xs font-bold uppercase tracking-wide text-slate-500">
                                                        Product
                                                    </th>

                                                    <th className="px-6 py-4 text-center text-xs font-bold uppercase tracking-wide text-slate-500">
                                                        Qty
                                                    </th>

                                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                                                        Price
                                                    </th>

                                                    <th className="px-6 py-4 text-right text-xs font-bold uppercase tracking-wide text-slate-500">
                                                        Total
                                                    </th>
                                                </tr>
                                            </thead>

                                            <tbody>
                                                {order.items.map(
                                                    (item) => {
                                                        const name =
                                                            item.productName ||
                                                            item.product?.name ||
                                                            "Product";

                                                        const lineTotal =
                                                            Number(
                                                                item.price
                                                            ) *
                                                            Number(
                                                                item.quantity
                                                            );

                                                        const image =
                                                            item.product
                                                                ?.image;

                                                        return (
                                                            <tr
                                                                key={
                                                                    item.id
                                                                }
                                                                className="border-b border-slate-100 last:border-0"
                                                            >
                                                                <td className="px-6 py-4">
                                                                    <div className="flex items-center gap-3">
                                                                        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">
                                                                            {image ? (
                                                                                <img
                                                                                    src={
                                                                                        image
                                                                                    }
                                                                                    alt={
                                                                                        name
                                                                                    }
                                                                                    className="h-full w-full object-cover"
                                                                                />
                                                                            ) : (
                                                                                <Package className="h-5 w-5 text-slate-300" />
                                                                            )}
                                                                        </div>

                                                                        <div className="min-w-0">
                                                                            <p className="line-clamp-2 font-semibold text-slate-900">
                                                                                {name}
                                                                            </p>

                                                                            <p className="mt-1 text-xs text-slate-400">
                                                                                Product
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </td>

                                                                <td className="px-6 py-4 text-center font-medium text-slate-700">
                                                                    {item.quantity}
                                                                </td>

                                                                <td className="px-6 py-4 text-right text-slate-600">
                                                                    ₹
                                                                    {formatAmount(
                                                                        item.price
                                                                    )}
                                                                </td>

                                                                <td className="px-6 py-4 text-right font-bold text-slate-900">
                                                                    ₹
                                                                    {formatAmount(
                                                                        lineTotal
                                                                    )}
                                                                </td>
                                                            </tr>
                                                        );
                                                    }
                                                )}
                                            </tbody>
                                        </table>
                                    </div>
                                ) : (
                                    <div className="p-8 text-center text-sm text-slate-500">
                                        No products found.
                                    </div>
                                )}
                            </section>

                            {/* ORDER TIMELINE */}

                            <section className="no-print print-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                                <SectionHeader
                                    icon={
                                        <Truck className="h-5 w-5" />
                                    }
                                    title="Order Timeline"
                                    description="Order progress history"
                                />

                                {order.status ===
                                    "CANCELLED" ? (
                                    <div className="flex items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-5">
                                        <XCircle className="h-6 w-6 shrink-0 text-red-600" />

                                        <div>
                                            <p className="font-semibold text-red-900">
                                                Order Cancelled
                                            </p>

                                            <p className="mt-1 text-sm text-red-600">
                                                This order has been cancelled.
                                            </p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-0">
                                        {ORDER_STATUSES.map(
                                            (status, index) => {
                                                const completed =
                                                    currentStatusIndex >=
                                                    index;

                                                const current =
                                                    order.status ===
                                                    status;

                                                return (
                                                    <div
                                                        key={status}
                                                        className="flex gap-4"
                                                    >
                                                        <div className="flex flex-col items-center">
                                                            <div
                                                                className={`flex h-9 w-9 items-center justify-center rounded-full ${completed
                                                                        ? "bg-emerald-100 text-emerald-700"
                                                                        : "bg-slate-100 text-slate-400"
                                                                    }`}
                                                            >
                                                                {completed ? (
                                                                    <CheckCircle2 className="h-5 w-5" />
                                                                ) : (
                                                                    <Clock3 className="h-5 w-5" />
                                                                )}
                                                            </div>

                                                            {index <
                                                                ORDER_STATUSES.length -
                                                                1 && (
                                                                    <div
                                                                        className={`h-10 w-px ${currentStatusIndex >
                                                                                index
                                                                                ? "bg-emerald-300"
                                                                                : "bg-slate-200"
                                                                            }`}
                                                                    />
                                                                )}
                                                        </div>

                                                        <div className="pb-6">
                                                            <p
                                                                className={`font-semibold ${current
                                                                        ? "text-emerald-700"
                                                                        : completed
                                                                            ? "text-slate-800"
                                                                            : "text-slate-400"
                                                                    }`}
                                                            >
                                                                {status}
                                                            </p>

                                                            {current && (
                                                                <p className="mt-1 text-xs text-slate-500">
                                                                    Current status
                                                                </p>
                                                            )}
                                                        </div>
                                                    </div>
                                                );
                                            }
                                        )}
                                    </div>
                                )}
                            </section>
                        </div>

                        {/* ==================================================
                RIGHT SIDEBAR
            ================================================== */}

                        <aside className="space-y-6">

                            {/* PAYMENT */}

                            <section className="print-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                                <SectionHeader
                                    icon={
                                        <CreditCard className="h-5 w-5" />
                                    }
                                    title="Payment Details"
                                    description="Transaction information"
                                />

                                <div className="space-y-3">
                                    <div className="flex items-center justify-between gap-4 rounded-xl bg-slate-50 p-3">
                                        <span className="text-sm text-slate-500">
                                            Status
                                        </span>

                                        <Badge
                                            variant="outline"
                                            className={`rounded-full ${paymentBadge(
                                                order.paymentStatus
                                            )}`}
                                        >
                                            {order.paymentStatus}
                                        </Badge>
                                    </div>

                                    <div className="flex justify-between gap-4 border-b border-slate-100 pb-3">
                                        <span className="text-sm text-slate-500">
                                            Method
                                        </span>

                                        <span className="text-sm font-semibold text-slate-900">
                                            {order.paymentMethod ||
                                                "-"}
                                        </span>
                                    </div>

                                    <div className="flex justify-between gap-4">
                                        <span className="text-sm text-slate-500">
                                            Amount
                                        </span>

                                        <span className="font-bold text-emerald-700">
                                            ₹
                                            {formatAmount(
                                                order.payment
                                                    ?.amount ??
                                                order.grandTotal
                                            )}
                                        </span>
                                    </div>

                                    {order.payment
                                        ?.razorpayPaymentId && (
                                            <div className="border-t border-slate-100 pt-3">
                                                <p className="text-xs text-slate-400">
                                                    Razorpay Payment ID
                                                </p>

                                                <p className="mt-1 break-all font-mono text-xs text-slate-700">
                                                    {
                                                        order.payment
                                                            .razorpayPaymentId
                                                    }
                                                </p>
                                            </div>
                                        )}

                                    {order.payment
                                        ?.transactionId && (
                                            <div className="border-t border-slate-100 pt-3">
                                                <p className="text-xs text-slate-400">
                                                    Transaction ID
                                                </p>

                                                <p className="mt-1 break-all font-mono text-xs text-slate-700">
                                                    {
                                                        order.payment
                                                            .transactionId
                                                    }
                                                </p>
                                            </div>
                                        )}

                                    {order.payment
                                        ?.failureReason && (
                                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs text-red-700">
                                                {
                                                    order.payment
                                                        .failureReason
                                                }
                                            </div>
                                        )}
                                </div>
                            </section>

                            {/* SUMMARY */}

                            <section className="print-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                                <SectionHeader
                                    icon={
                                        <span className="text-base font-bold">
                                            ₹
                                        </span>
                                    }
                                    title="Order Summary"
                                    description="Price breakdown"
                                />

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">
                                            Subtotal
                                        </span>

                                        <span className="font-medium">
                                            ₹
                                            {formatAmount(
                                                order.subTotal
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">
                                            Delivery
                                        </span>

                                        <span className="font-medium">
                                            ₹
                                            {formatAmount(
                                                order.deliveryCharge
                                            )}
                                        </span>
                                    </div>

                                    <div className="flex justify-between text-sm">
                                        <span className="text-slate-500">
                                            Discount
                                        </span>

                                        <span className="font-medium text-emerald-600">
                                            - ₹
                                            {formatAmount(
                                                order.discount
                                            )}
                                        </span>
                                    </div>

                                    <div className="border-t border-dashed border-slate-200 pt-4">
                                        <div className="flex items-end justify-between">
                                            <div>
                                                <p className="text-xs text-slate-400">
                                                    Grand Total
                                                </p>

                                                <p className="mt-1 text-2xl font-bold text-slate-950">
                                                    ₹
                                                    {formatAmount(
                                                        order.grandTotal
                                                    )}
                                                </p>
                                            </div>

                                            {order.paymentStatus ===
                                                "SUCCESS" && (
                                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
                                                        <CheckCircle2 className="h-4 w-4" />
                                                        Paid
                                                    </div>
                                                )}
                                        </div>
                                    </div>
                                </div>
                            </section>

                            {/* STATUS EDITOR */}

                            <section className="no-print sticky top-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

                                <SectionHeader
                                    icon={
                                        <Truck className="h-5 w-5" />
                                    }
                                    title="Update Order"
                                    description="Manage order status"
                                />

                                {isFinalStatus ? (
                                    <div
                                        className={`rounded-2xl border p-4 ${order.status ===
                                                "CANCELLED"
                                                ? "border-red-200 bg-red-50"
                                                : "border-emerald-200 bg-emerald-50"
                                            }`}
                                    >
                                        <div className="flex items-start gap-3">
                                            {order.status ===
                                                "CANCELLED" ? (
                                                <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                                            ) : (
                                                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-600" />
                                            )}

                                            <div>
                                                <p className="text-sm font-semibold text-slate-900">
                                                    Order{" "}
                                                    {order.status.toLowerCase()}
                                                </p>

                                                <p className="mt-1 text-xs text-slate-500">
                                                    Final orders cannot be
                                                    changed.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-3">
                                        <label className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                            Change Status
                                        </label>

                                        <select
                                            value={selectedStatus}
                                            onChange={(event) => {
                                                setSelectedStatus(
                                                    event.target.value
                                                );
                                                setSuccessMessage(
                                                    ""
                                                );
                                                setErrorMessage("");
                                            }}
                                            disabled={updating}
                                            className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-slate-800 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100 disabled:cursor-not-allowed disabled:opacity-60"
                                        >
                                            <option value="PENDING">
                                                Pending
                                            </option>

                                            <option value="CONFIRMED">
                                                Confirmed
                                            </option>

                                            <option value="SHIPPED">
                                                Shipped
                                            </option>

                                            <option value="DELIVERED">
                                                Delivered
                                            </option>

                                            <option value="CANCELLED">
                                                Cancelled
                                            </option>
                                        </select>

                                        <Button
                                            onClick={
                                                handleUpdateStatus
                                            }
                                            disabled={
                                                updating ||
                                                !statusChanged
                                            }
                                            className="h-11 w-full rounded-xl bg-emerald-600 font-semibold hover:bg-emerald-700"
                                        >
                                            {updating ? (
                                                <>
                                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                    Updating...
                                                </>
                                            ) : (
                                                <>
                                                    <Check className="mr-2 h-4 w-4" />
                                                    Update Status
                                                </>
                                            )}
                                        </Button>

                                        {successMessage && (
                                            <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-3 text-xs font-medium text-emerald-700">
                                                <CheckCircle2 className="h-4 w-4 shrink-0" />
                                                {successMessage}
                                            </div>
                                        )}

                                        {errorMessage && (
                                            <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-700">
                                                {errorMessage}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </section>

                            {/* META */}

                            <section className="print-card rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                    Order Information
                                </p>

                                <div className="mt-4 space-y-3">
                                    <div className="flex justify-between gap-4">
                                        <span className="text-xs text-slate-500">
                                            Created
                                        </span>

                                        <span className="text-right text-xs font-medium text-slate-700">
                                            {formatDateTime(
                                                order.createdAt
                                            )}
                                        </span>
                                    </div>

                                    {order.updatedAt && (
                                        <div className="flex justify-between gap-4">
                                            <span className="text-xs text-slate-500">
                                                Last Updated
                                            </span>

                                            <span className="text-right text-xs font-medium text-slate-700">
                                                {formatDateTime(
                                                    order.updatedAt
                                                )}
                                            </span>
                                        </div>
                                    )}

                                    <div className="flex justify-between gap-4">
                                        <span className="text-xs text-slate-500">
                                            Order ID
                                        </span>

                                        <span className="max-w-[190px] truncate font-mono text-right text-[11px] font-medium text-slate-700">
                                            {order.id}
                                        </span>
                                    </div>
                                </div>
                            </section>
                        </aside>
                    </div>

                    {/* ====================================================
              PRINT FOOTER
          ==================================================== */}

                    <div className="hidden print:block">
                        <div className="mt-8 border-t pt-5">
                            <div className="flex justify-between">
                                <div>
                                    <h2 className="text-xl font-bold">
                                        Patil Krushi Seva Kendra
                                    </h2>

                                    <p className="mt-1 text-xs text-slate-500">
                                        Order Invoice
                                    </p>
                                </div>

                                <div className="text-right">
                                    <p className="text-xs text-slate-500">
                                        Order
                                    </p>

                                    <p className="font-semibold">
                                        #{order.id}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* ====================================================
              BOTTOM ACTIONS
          ==================================================== */}

                    <div className="no-print mt-6 flex flex-wrap justify-end gap-3">
                        <Button
                            variant="outline"
                            onClick={handlePrint}
                            className="rounded-xl"
                        >
                            <Printer className="mr-2 h-4 w-4" />
                            Print Order
                        </Button>

                        <Button
                            variant="outline"
                            onClick={handleInvoice}
                            className="rounded-xl"
                        >
                            <Download className="mr-2 h-4 w-4" />
                            Print Invoice
                        </Button>
                    </div>
                </main>
            </>
        </DashboardLayout>
    );
}
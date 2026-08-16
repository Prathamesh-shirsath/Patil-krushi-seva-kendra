"use client";
import DashboardLayout from "@/components/layout/dashboard-layout"; 
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import {
    ArrowLeft,
    Package,
    User,
    MapPin,
    CreditCard,
    Truck,
    Printer,
    Download,
    Phone,
    Mail,
    CheckCircle2,
    Clock3,
    XCircle,
    Loader2,
} from "lucide-react";

import { api } from "@/lib/axios";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Order } from "@/hooks/use-orders";

/* ============================================================
   HELPERS
============================================================ */

function formatAmount(
    amount: number | string | null | undefined
) {
    return Number(amount ?? 0).toLocaleString("en-IN", {
        maximumFractionDigits: 2,
    });
}

function orderBadge(status: string) {
    switch (status) {
        case "DELIVERED":
            return "bg-green-100 text-green-700";

        case "SHIPPED":
            return "bg-blue-100 text-blue-700";

        case "CONFIRMED":
            return "bg-purple-100 text-purple-700";

        case "PENDING":
            return "bg-orange-100 text-orange-700";

        case "CANCELLED":
            return "bg-red-100 text-red-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
}

function paymentBadge(status: string) {
    switch (status) {
        case "SUCCESS":
            return "bg-green-100 text-green-700";

        case "PENDING":
            return "bg-yellow-100 text-yellow-700";

        case "FAILED":
            return "bg-red-100 text-red-700";

        case "REFUNDED":
            return "bg-purple-100 text-purple-700";

        default:
            return "bg-slate-100 text-slate-700";
    }
}

function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
}

function formatDateTime(date: string) {
    return new Date(date).toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    });
}

/* ============================================================
   PAGE
============================================================ */

export default function OrderDetailsPage() {
    const params = useParams();
    const router = useRouter();

    const orderId = params?.id as string;

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
        try {
            setLoading(true);
            setError(null);

            const response =
                await api.get(`/orders/${orderId}`);

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
        if (orderId) {
            fetchOrder();
        }
    }, [orderId]);

    /* ============================================================
       UPDATE STATUS
    ============================================================ */

    const handleUpdateStatus =
        async () => {
            if (
                !order ||
                updating ||
                selectedStatus === order.status
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

    /* ============================================================
       INVOICE
    ============================================================ */

    const handleInvoice = () => {
        window.print();
    };

    /* ============================================================
       LOADING
    ============================================================ */

    if (loading) {
        return (
            <div className="flex min-h-[70vh] items-center justify-center">
                <div className="flex flex-col items-center gap-3">

                    <Loader2 className="h-8 w-8 animate-spin text-green-600" />

                    <p className="text-sm text-slate-500">
                        Loading order details...
                    </p>

                </div>
            </div>
        );
    }

    /* ============================================================
       ERROR
    ============================================================ */

    if (error || !order) {
        return (
            
            <div className="mx-auto max-w-3xl p-6">

                <div className="rounded-2xl border border-red-200 bg-red-50 p-6 text-center">

                    <XCircle className="mx-auto h-10 w-10 text-red-500" />

                    <h2 className="mt-3 text-lg font-semibold text-red-800">
                        Unable to load order
                    </h2>

                    <p className="mt-1 text-sm text-red-600">
                        {error || "Order not found."}
                    </p>

                    <Button
                        onClick={() =>
                            router.push("/orders")
                        }
                        className="mt-5 rounded-xl bg-green-600 hover:bg-green-700"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        Back to Orders
                    </Button>

                </div>

            </div>
        );
    }

    const address =
        order.OrderAddress;

    const isFinalStatus =
        order.status === "DELIVERED" ||
        order.status === "CANCELLED";

    const statusChanged =
        selectedStatus !== order.status;

    /* ============================================================
       TIMELINE
    ============================================================ */

    const statuses = [
        "PENDING",
        "CONFIRMED",
        "SHIPPED",
        "DELIVERED",
    ];

    const currentStatusIndex =
        statuses.indexOf(order.status);

    return (
        <DashboardLayout>
        <>
            {/* ========================================================
          PRINT STYLES
      ======================================================== */}

            <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }

          aside,
          nav,
          header {
            display: none !important;
          }

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

            <main className="print-page mx-auto max-w-7xl p-4 sm:p-6 lg:p-8">

                {/* ======================================================
            TOP HEADER
        ====================================================== */}

                <div className="no-print mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                    <div>

                        <Button
                            variant="ghost"
                            onClick={() =>
                                router.push("/orders")
                            }
                            className="-ml-3 rounded-xl"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Orders
                        </Button>

                        <div className="mt-3">

                            <div className="flex flex-wrap items-center gap-3">

                                <h1 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                                    Order #
                                    {order.id
                                        .slice(-8)
                                        .toUpperCase()}
                                </h1>

                                <Badge
                                    className={orderBadge(
                                        order.status
                                    )}
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

                {/* ======================================================
            INVOICE HEADER - PRINT ONLY
        ====================================================== */}

                <div className="mb-8 hidden print:block">

                    <div className="border-b pb-5">

                        <h1 className="text-3xl font-bold">
                            Patil Krushi Seva Kendra
                        </h1>

                        <p className="mt-1 text-sm text-slate-500">
                            Order Invoice
                        </p>

                    </div>

                    <div className="mt-5 flex justify-between">

                        <div>
                            <p className="text-sm text-slate-500">
                                Order ID
                            </p>

                            <p className="font-semibold">
                                #{order.id}
                            </p>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-slate-500">
                                Order Date
                            </p>

                            <p className="font-semibold">
                                {formatDate(
                                    order.createdAt
                                )}
                            </p>
                        </div>

                    </div>

                </div>

                {/* ======================================================
            STATUS UPDATE BAR
        ====================================================== */}

                <div className="no-print mb-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                        <div>

                            <p className="text-sm font-semibold text-slate-900">
                                Order Status
                            </p>

                            <p className="mt-1 text-xs text-slate-500">
                                Update the current order progress.
                            </p>

                        </div>

                        <div className="flex flex-col gap-2 sm:flex-row">

                            {!isFinalStatus ? (
                                <>
                                    <select
                                        value={selectedStatus}
                                        onChange={(event) => {
                                            setSelectedStatus(
                                                event.target.value
                                            );
                                            setSuccessMessage("");
                                            setErrorMessage("");
                                        }}
                                        disabled={updating}
                                        className="h-10 min-w-[180px] rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-green-500 focus:ring-2 focus:ring-green-100 disabled:opacity-60"
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
                                        className="rounded-xl bg-green-600 hover:bg-green-700"
                                    >
                                        {updating ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Updating...
                                            </>
                                        ) : (
                                            "Update Status"
                                        )}
                                    </Button>
                                </>
                            ) : (
                                <Badge
                                    className={`${orderBadge(
                                        order.status
                                    )} px-4 py-2`}
                                >
                                    {order.status}
                                </Badge>
                            )}

                        </div>

                    </div>

                    {successMessage && (
                        <div className="mt-3 flex items-center gap-2 rounded-xl bg-green-50 p-3 text-sm text-green-700">

                            <CheckCircle2 className="h-4 w-4" />

                            {successMessage}

                        </div>
                    )}

                    {errorMessage && (
                        <div className="mt-3 rounded-xl bg-red-50 p-3 text-sm text-red-700">
                            {errorMessage}
                        </div>
                    )}

                </div>

                {/* ======================================================
            MAIN GRID
        ====================================================== */}

                <div className="grid gap-6 lg:grid-cols-3">

                    {/* ====================================================
              LEFT
          ==================================================== */}

                    <div className="space-y-6 lg:col-span-2">

                        {/* CUSTOMER */}

                        <section className="print-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                                    <User className="h-5 w-5 text-green-600" />
                                </div>

                                <div>

                                    <h2 className="font-semibold text-slate-900">
                                        Customer Information
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Customer details
                                    </p>

                                </div>

                            </div>

                            <div className="grid gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Full Name
                                    </p>

                                    <p className="mt-1 font-medium text-slate-900">
                                        {order.user?.name ||
                                            address?.fullName ||
                                            "Guest User"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Phone
                                    </p>

                                    <p className="mt-1 flex items-center gap-2 font-medium text-slate-900">
                                        <Phone className="h-4 w-4 text-green-600" />
                                        {order.user?.phone ||
                                            address?.phone ||
                                            "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Email
                                    </p>

                                    <p className="mt-1 flex items-center gap-2 break-all font-medium text-slate-900">
                                        <Mail className="h-4 w-4 text-green-600" />
                                        {order.user?.email ||
                                            "-"}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs text-slate-500">
                                        Order ID
                                    </p>

                                    <p className="mt-1 break-all font-medium text-slate-900">
                                        {order.id}
                                    </p>
                                </div>

                            </div>

                        </section>

                        {/* ADDRESS */}

                        <section className="print-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                                    <MapPin className="h-5 w-5 text-green-600" />
                                </div>

                                <div>

                                    <h2 className="font-semibold text-slate-900">
                                        Shipping Address
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Delivery information
                                    </p>

                                </div>

                            </div>

                            {address ? (
                                <div className="rounded-xl bg-slate-50 p-5 text-sm leading-6">

                                    <p className="font-semibold text-slate-900">
                                        {address.fullName}
                                    </p>

                                    <p>
                                        {address.addressLine}
                                    </p>

                                    <p>
                                        {address.village}

                                        {address.taluka
                                            ? `, ${address.taluka}`
                                            : ""}
                                    </p>

                                    {address.city && (
                                        <p>
                                            {address.city}
                                        </p>
                                    )}

                                    <p>
                                        {address.district},{" "}
                                        {address.state}
                                    </p>

                                    <p>
                                        PIN:{" "}
                                        {address.pincode}
                                    </p>

                                    {address.landmark && (
                                        <p>
                                            Landmark:{" "}
                                            {address.landmark}
                                        </p>
                                    )}

                                    <p className="mt-2 font-medium">
                                        Phone:{" "}
                                        {address.phone}
                                    </p>

                                </div>
                            ) : (
                                <div className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">
                                    Shipping address is not available for this order.
                                </div>
                            )}

                        </section>

                        {/* PRODUCTS */}

                        <section className="print-card rounded-2xl border border-slate-200 bg-white shadow-sm">

                            <div className="border-b border-slate-200 p-5 sm:p-6">

                                <div className="flex items-center gap-3">

                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                                        <Package className="h-5 w-5 text-green-600" />
                                    </div>

                                    <div>

                                        <h2 className="font-semibold text-slate-900">
                                            Ordered Products
                                        </h2>

                                        <p className="text-xs text-slate-500">
                                            {order.items?.length || 0} product line(s)
                                        </p>

                                    </div>

                                </div>

                            </div>

                            {order.items &&
                                order.items.length > 0 ? (
                                <div className="overflow-x-auto">

                                    <table className="w-full text-sm">

                                        <thead>
                                            <tr className="border-b border-slate-200 bg-slate-50">

                                                <th className="px-5 py-3 text-left font-semibold">
                                                    Product
                                                </th>

                                                <th className="px-5 py-3 text-center font-semibold">
                                                    Qty
                                                </th>

                                                <th className="px-5 py-3 text-right font-semibold">
                                                    Price
                                                </th>

                                                <th className="px-5 py-3 text-right font-semibold">
                                                    Total
                                                </th>

                                            </tr>
                                        </thead>

                                        <tbody>

                                            {order.items.map(
                                                (item) => (
                                                    <tr
                                                        key={item.id}
                                                        className="border-b border-slate-100 last:border-0"
                                                    >

                                                        <td className="px-5 py-4">

                                                            <p className="font-medium text-slate-900">
                                                                {item.productName ||
                                                                    item.product
                                                                        ?.name ||
                                                                    "Product"}
                                                            </p>

                                                        </td>

                                                        <td className="px-5 py-4 text-center">
                                                            {item.quantity}
                                                        </td>

                                                        <td className="px-5 py-4 text-right">
                                                            ₹
                                                            {formatAmount(
                                                                item.price
                                                            )}
                                                        </td>

                                                        <td className="px-5 py-4 text-right font-semibold">
                                                            ₹
                                                            {formatAmount(
                                                                Number(
                                                                    item.price
                                                                ) *
                                                                item.quantity
                                                            )}
                                                        </td>

                                                    </tr>
                                                )
                                            )}

                                        </tbody>

                                    </table>

                                </div>
                            ) : (
                                <div className="p-6 text-center text-sm text-slate-500">
                                    No products found for this order.
                                </div>
                            )}

                        </section>

                        {/* TIMELINE */}

                        <section className="no-print print-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">

                            <div className="mb-6 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                                    <Truck className="h-5 w-5 text-green-600" />
                                </div>

                                <div>

                                    <h2 className="font-semibold text-slate-900">
                                        Order Timeline
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Current order progress
                                    </p>

                                </div>

                            </div>

                            <div className="space-y-0">

                                {statuses.map(
                                    (status, index) => {

                                        const completed =
                                            currentStatusIndex >=
                                            index;

                                        const isCurrent =
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
                                                                ? "bg-green-100 text-green-700"
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
                                                        statuses.length -
                                                        1 && (
                                                            <div
                                                                className={`h-10 w-px ${currentStatusIndex >
                                                                        index
                                                                        ? "bg-green-300"
                                                                        : "bg-slate-200"
                                                                    }`}
                                                            />
                                                        )}

                                                </div>

                                                <div className="pb-6">

                                                    <p
                                                        className={`font-medium ${isCurrent
                                                                ? "text-green-700"
                                                                : "text-slate-800"
                                                            }`}
                                                    >
                                                        {status}
                                                    </p>

                                                    {isCurrent && (
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

                            {order.status ===
                                "CANCELLED" && (
                                    <div className="mt-2 flex items-center gap-2 rounded-xl bg-red-50 p-4 text-sm text-red-700">

                                        <XCircle className="h-5 w-5" />

                                        This order has been cancelled.

                                    </div>
                                )}

                        </section>

                    </div>

                    {/* ====================================================
              RIGHT SIDEBAR
          ==================================================== */}

                    <div className="space-y-6">

                        {/* PAYMENT */}

                        <section className="print-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <div className="mb-5 flex items-center gap-3">

                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-50">
                                    <CreditCard className="h-5 w-5 text-green-600" />
                                </div>

                                <div>

                                    <h2 className="font-semibold text-slate-900">
                                        Payment Details
                                    </h2>

                                    <p className="text-xs text-slate-500">
                                        Payment information
                                    </p>

                                </div>

                            </div>

                            <div className="space-y-4">

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Method
                                    </span>

                                    <span className="font-medium">
                                        {order.paymentMethod}
                                    </span>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Status
                                    </span>

                                    <Badge
                                        className={paymentBadge(
                                            order.paymentStatus
                                        )}
                                    >
                                        {order.paymentStatus}
                                    </Badge>
                                </div>

                                <div className="flex justify-between gap-4">
                                    <span className="text-sm text-slate-500">
                                        Amount
                                    </span>

                                    <span className="font-semibold">
                                        ₹
                                        {formatAmount(
                                            order.payment?.amount ??
                                            order.grandTotal
                                        )}
                                    </span>
                                </div>

                                {order.payment
                                    ?.razorpayPaymentId && (
                                        <div className="border-t pt-4">

                                            <p className="text-xs text-slate-500">
                                                Razorpay Payment ID
                                            </p>

                                            <p className="mt-1 break-all text-xs font-medium">
                                                {
                                                    order.payment
                                                        .razorpayPaymentId
                                                }
                                            </p>

                                        </div>
                                    )}

                                {order.payment
                                    ?.transactionId && (
                                        <div className="border-t pt-4">

                                            <p className="text-xs text-slate-500">
                                                Transaction ID
                                            </p>

                                            <p className="mt-1 break-all text-xs font-medium">
                                                {
                                                    order.payment
                                                        .transactionId
                                                }
                                            </p>

                                        </div>
                                    )}

                            </div>

                        </section>

                        {/* ORDER SUMMARY */}

                        <section className="print-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-5 font-semibold text-slate-900">
                                Order Summary
                            </h2>

                            <div className="space-y-4">

                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-500">
                                        Subtotal
                                    </span>

                                    <span>
                                        ₹
                                        {formatAmount(
                                            order.subTotal
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-500">
                                        Delivery
                                    </span>

                                    <span>
                                        ₹
                                        {formatAmount(
                                            order.deliveryCharge
                                        )}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-sm text-slate-500">
                                        Discount
                                    </span>

                                    <span className="text-green-600">
                                        - ₹
                                        {formatAmount(
                                            order.discount
                                        )}
                                    </span>
                                </div>

                                <div className="border-t border-slate-200 pt-4">

                                    <div className="flex items-center justify-between">

                                        <span className="font-semibold">
                                            Grand Total
                                        </span>

                                        <span className="text-2xl font-bold text-green-700">
                                            ₹
                                            {formatAmount(
                                                order.grandTotal
                                            )}
                                        </span>

                                    </div>

                                </div>

                            </div>

                        </section>

                        {/* CURRENT STATUS */}

                        <section className="print-card rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">

                            <h2 className="mb-4 font-semibold text-slate-900">
                                Current Status
                            </h2>

                            <div className="rounded-xl bg-slate-50 p-4">

                                <div className="flex items-center justify-between">

                                    <Badge
                                        className={orderBadge(
                                            order.status
                                        )}
                                    >
                                        {order.status}
                                    </Badge>

                                    <span className="text-xs text-slate-500">
                                        {formatDate(
                                            order.updatedAt
                                        )}
                                    </span>

                                </div>

                            </div>

                        </section>

                    </div>

                </div>

                {/* ======================================================
            MOBILE / BOTTOM ACTIONS
        ====================================================== */}

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
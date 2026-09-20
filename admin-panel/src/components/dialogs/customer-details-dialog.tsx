"use client";

import {
    useState,
} from "react";

import {
    MapPin,
    Phone,
    Mail,
    Package,
    X,
    CalendarDays,
    ShoppingBag,
    Printer,
    CreditCard,
    ReceiptText,
} from "lucide-react";

import {
    useCustomerDetails,
} from "@/hooks/use-customers";

import {
    Button,
} from "@/components/ui/button";

import {
    Badge,
} from "@/components/ui/badge";

interface Props {
    customerId:
    | string
    | null;

    open: boolean;

    onOpenChange: (
        open: boolean
    ) => void;
}

export default function CustomerDetailsDialog({
    customerId,
    open,
    onOpenChange,
}: Props) {
    const {
        data: customer,
        isLoading,
        isError,
        refetch,
    } =
        useCustomerDetails(
            customerId ??
            undefined
        );

    const [
        printOpen,
        setPrintOpen,
    ] = useState(false);

    if (!open) {
        return null;
    }

    return (
        <>
            <div
                className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-3 backdrop-blur-sm sm:p-5"
                onMouseDown={(
                    event
                ) => {
                    if (
                        event.target ===
                        event.currentTarget
                    ) {
                        onOpenChange(
                            false
                        );
                    }
                }}
            >

                <div className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-[28px] border border-emerald-100 bg-white shadow-2xl">

                    {/* HEADER */}

                    <div className="shrink-0 border-b border-emerald-100 bg-gradient-to-br from-emerald-50 via-white to-green-50 p-5 sm:p-7">

                        <div className="flex items-start justify-between gap-4">

                            <div className="flex min-w-0 items-center gap-4">

                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-lg font-bold text-emerald-700">

                                    {(customer?.name ||
                                        "CU")
                                        .slice(
                                            0,
                                            2
                                        )
                                        .toUpperCase()}

                                </div>

                                <div className="min-w-0">

                                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                                        Customer Profile
                                    </p>

                                    <h2 className="mt-1 truncate text-2xl font-bold text-slate-900 sm:text-3xl">
                                        {customer?.name ||
                                            "Customer"}
                                    </h2>

                                    <p className="mt-1 text-sm text-slate-500">
                                        Complete profile,
                                        addresses and
                                        order history.
                                    </p>

                                </div>

                            </div>

                            <div className="flex shrink-0 items-center gap-2">

                                {customer &&
                                    !isLoading && (
                                        <Button
                                            variant="outline"
                                            className="rounded-xl border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                                            onClick={() =>
                                                setPrintOpen(
                                                    true
                                                )
                                            }
                                        >
                                            <Printer className="mr-2 h-4 w-4" />
                                            Print
                                        </Button>
                                    )}

                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="rounded-xl"
                                    onClick={() =>
                                        onOpenChange(
                                            false
                                        )
                                    }
                                >
                                    <X className="h-4 w-4" />
                                </Button>

                            </div>

                        </div>

                    </div>

                    {/* BODY */}

                    <div className="min-h-0 flex-1 overflow-y-auto">

                        {isLoading && (
                            <div className="p-16 text-center">

                                <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />

                                <p className="mt-3 text-sm text-slate-500">
                                    Loading customer details...
                                </p>

                            </div>
                        )}

                        {isError && (
                            <div className="p-12 text-center">

                                <p className="font-semibold text-red-600">
                                    Unable to load customer details.
                                </p>

                                <Button
                                    variant="outline"
                                    className="mt-4 rounded-xl"
                                    onClick={() =>
                                        refetch()
                                    }
                                >
                                    Retry
                                </Button>

                            </div>
                        )}

                        {customer &&
                            !isLoading &&
                            !isError && (
                                <div className="space-y-6 p-5 sm:p-7">

                                    {/* BASIC DETAILS */}

                                    <section className="grid gap-4 md:grid-cols-3">

                                        <InfoCard
                                            icon={
                                                <Phone />
                                            }
                                            label="Mobile"
                                            value={
                                                customer.phone ||
                                                "-"
                                            }
                                        />

                                        <InfoCard
                                            icon={
                                                <Mail />
                                            }
                                            label="Email"
                                            value={
                                                customer.email ||
                                                "-"
                                            }
                                        />

                                        <InfoCard
                                            icon={
                                                <CalendarDays />
                                            }
                                            label="Joined"
                                            value={formatDate(
                                                customer.createdAt
                                            )}
                                        />

                                    </section>

                                    {/* SUMMARY */}

                                    <section className="grid grid-cols-2 gap-4 md:grid-cols-4">

                                        <Summary
                                            label="Orders"
                                            value={
                                                customer.totalOrders
                                            }
                                        />

                                        <Summary
                                            label="Total Spent"
                                            value={`₹${Number(
                                                customer.totalSpent
                                            ).toLocaleString(
                                                "en-IN"
                                            )}`}
                                        />

                                        <Summary
                                            label="Addresses"
                                            value={
                                                customer
                                                    .addresses
                                                    .length
                                            }
                                        />

                                        <Summary
                                            label="Reviews"
                                            value={
                                                customer
                                                    ._count
                                                    ?.reviews ??
                                                0
                                            }
                                        />

                                    </section>

                                    {/* ADDRESSES */}

                                    <section>

                                        <SectionTitle
                                            icon={
                                                <MapPin />
                                            }
                                            title="Saved Addresses"
                                        />

                                        {customer
                                            .addresses
                                            .length ===
                                            0 ? (
                                            <Empty text="No saved addresses." />
                                        ) : (
                                            <div className="grid gap-4 md:grid-cols-2">

                                                {customer.addresses.map(
                                                    (
                                                        address
                                                    ) => (
                                                        <div
                                                            key={
                                                                address.id
                                                            }
                                                            className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4"
                                                        >

                                                            <div className="flex items-center justify-between gap-3">

                                                                <p className="font-semibold text-slate-900">
                                                                    {
                                                                        address.fullName
                                                                    }
                                                                </p>

                                                                {address.isDefault && (
                                                                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                                                                        Default
                                                                    </Badge>
                                                                )}

                                                            </div>

                                                            <p className="mt-3 text-sm leading-6 text-slate-700">
                                                                {
                                                                    address.addressLine
                                                                }
                                                            </p>

                                                            <p className="text-sm text-slate-600">
                                                                {
                                                                    address.village
                                                                }

                                                                {address.taluka &&
                                                                    `, ${address.taluka}`}

                                                                {address.city &&
                                                                    `, ${address.city}`}
                                                            </p>

                                                            <p className="text-sm text-slate-600">
                                                                {
                                                                    address.district
                                                                }
                                                                ,{" "}
                                                                {
                                                                    address.state
                                                                }
                                                                {" - "}
                                                                {
                                                                    address.pincode
                                                                }
                                                            </p>

                                                            {address.landmark && (
                                                                <p className="mt-2 text-xs text-slate-500">
                                                                    Landmark:{" "}
                                                                    {
                                                                        address.landmark
                                                                    }
                                                                </p>
                                                            )}

                                                            <p className="mt-2 text-xs text-slate-500">
                                                                Phone:{" "}
                                                                {
                                                                    address.phone
                                                                }
                                                            </p>

                                                        </div>
                                                    )
                                                )}

                                            </div>
                                        )}

                                    </section>

                                    {/* ORDERS */}

                                    <section>

                                        <SectionTitle
                                            icon={
                                                <ShoppingBag />
                                            }
                                            title="Previous Orders"
                                        />

                                        {customer
                                            .orders
                                            .length ===
                                            0 ? (
                                            <Empty text="No orders placed yet." />
                                        ) : (
                                            <div className="space-y-4">

                                                {customer.orders.map(
                                                    (
                                                        order
                                                    ) => (
                                                        <div
                                                            key={
                                                                order.id
                                                            }
                                                            className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"
                                                        >

                                                            <div className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">

                                                                <div>

                                                                    <p className="font-semibold text-slate-900">
                                                                        Order #
                                                                        {
                                                                            order.id
                                                                        }
                                                                    </p>

                                                                    <p className="mt-1 text-xs text-slate-400">
                                                                        {formatDate(
                                                                            order.createdAt
                                                                        )}
                                                                    </p>

                                                                </div>

                                                                <div className="flex flex-wrap items-center gap-2">

                                                                    <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
                                                                        {
                                                                            order.status
                                                                        }
                                                                    </Badge>

                                                                    <span className="font-bold text-slate-900">
                                                                        ₹
                                                                        {Number(
                                                                            order.grandTotal
                                                                        ).toLocaleString(
                                                                            "en-IN"
                                                                        )}
                                                                    </span>

                                                                </div>

                                                            </div>

                                                            <div className="divide-y">

                                                                {order.items.map(
                                                                    (
                                                                        item
                                                                    ) => (
                                                                        <div
                                                                            key={
                                                                                item.id
                                                                            }
                                                                            className="flex items-center justify-between gap-3 py-3"
                                                                        >

                                                                            <div className="flex min-w-0 items-center gap-3">

                                                                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100">
                                                                                    <Package className="h-4 w-4 text-slate-400" />
                                                                                </div>

                                                                                <div className="min-w-0">

                                                                                    <p className="truncate text-sm font-medium text-slate-800">
                                                                                        {
                                                                                            item.productName
                                                                                        }
                                                                                    </p>

                                                                                    <p className="text-xs text-slate-400">
                                                                                        Qty:{" "}
                                                                                        {
                                                                                            item.quantity
                                                                                        }
                                                                                    </p>

                                                                                </div>

                                                                            </div>

                                                                            <p className="shrink-0 text-sm font-semibold">
                                                                                ₹
                                                                                {Number(
                                                                                    item.price
                                                                                ).toLocaleString(
                                                                                    "en-IN"
                                                                                )}
                                                                            </p>

                                                                        </div>
                                                                    )
                                                                )}

                                                            </div>

                                                            <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 border-t pt-3 text-xs text-slate-500">

                                                                <span className="flex items-center gap-1">
                                                                    <CreditCard className="h-3.5 w-3.5" />
                                                                    Payment:{" "}
                                                                    {
                                                                        order.paymentStatus
                                                                    }
                                                                </span>

                                                                <span>
                                                                    Method:{" "}
                                                                    {
                                                                        order.paymentMethod
                                                                    }
                                                                </span>

                                                                {order.payment
                                                                    ?.transactionId && (
                                                                        <span>
                                                                            Transaction:{" "}
                                                                            {
                                                                                order
                                                                                    .payment
                                                                                    .transactionId
                                                                            }
                                                                        </span>
                                                                    )}

                                                            </div>

                                                        </div>
                                                    )
                                                )}

                                            </div>
                                        )}

                                    </section>

                                </div>
                            )}

                    </div>

                </div>
            </div>

            {customer && (
                <CustomerPrintDialog
                    customer={
                        customer
                    }
                    open={
                        printOpen
                    }
                    onOpenChange={
                        setPrintOpen
                    }
                />
            )}
        </>
    );
}

/* ============================================================
   PRINT DIALOG
============================================================ */

function CustomerPrintDialog({
    customer,
    open,
    onOpenChange,
}: {
    customer: any;
    open: boolean;
    onOpenChange: (
        open: boolean
    ) => void;
}) {
    const [
        fields,
        setFields,
    ] = useState({
        name: true,
        mobile: true,
        email: true,
        joined: true,
        addresses: true,
        orders: true,
        payment: false,
    });

    if (!open) {
        return null;
    }

    const toggle =
        (
            key: keyof typeof fields
        ) => {
            setFields(
                (current) => ({
                    ...current,
                    [key]:
                        !current[key],
                })
            );
        };

    const printCustomer =
        () => {
            const printWindow =
                window.open(
                    "",
                    "_blank",
                    "width=900,height=700"
                );

            if (!printWindow) {
                return;
            }

            const selected = fields;

            printWindow.document.write(
                `
<!doctype html>
<html>
<head>
<meta charset="utf-8" />
<title>Customer - ${escapeHtml(
                    customer.name ||
                    "Customer"
                )}</title>

<style>
body {
    font-family: Arial, sans-serif;
    color: #172033;
    padding: 32px;
    line-height: 1.5;
}
h1 {
    margin: 0;
    color: #087f52;
}
h2 {
    margin-top: 28px;
    border-bottom: 2px solid #e6efe9;
    padding-bottom: 8px;
}
.meta {
    color: #64748b;
    margin-top: 5px;
}
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
}
.box {
    border: 1px solid #dce5e1;
    border-radius: 10px;
    padding: 12px;
}
.label {
    font-size: 11px;
    text-transform: uppercase;
    color: #64748b;
    font-weight: bold;
}
.value {
    margin-top: 4px;
    font-weight: 600;
}
.address,
.order {
    border: 1px solid #dce5e1;
    border-radius: 10px;
    padding: 14px;
    margin-bottom: 12px;
}
.order-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #e5e7eb;
    padding-bottom: 8px;
}
.item {
    display: flex;
    justify-content: space-between;
    padding: 7px 0;
    border-bottom: 1px solid #f1f5f9;
}
.small {
    font-size: 12px;
    color: #64748b;
}
@media print {
    body {
        padding: 0;
    }
}
</style>
</head>

<body>

<h1>Patil Krushi Seva Kendra</h1>

<div class="meta">
Customer Information
</div>

<h2>
${escapeHtml(
                    customer.name ||
                    "Customer"
                )}
</h2>

<div class="grid">

${selected.name
                    ? `
<div class="box">
<div class="label">Name</div>
<div class="value">
${escapeHtml(
                        customer.name ||
                        "-"
                    )}
</div>
</div>
`
                    : ""
                }

${selected.mobile
                    ? `
<div class="box">
<div class="label">Mobile</div>
<div class="value">
${escapeHtml(
                        customer.phone ||
                        "-"
                    )}
</div>
</div>
`
                    : ""
                }

${selected.email
                    ? `
<div class="box">
<div class="label">Email</div>
<div class="value">
${escapeHtml(
                        customer.email ||
                        "-"
                    )}
</div>
</div>
`
                    : ""
                }

${selected.joined
                    ? `
<div class="box">
<div class="label">Joined</div>
<div class="value">
${escapeHtml(
                        formatDate(
                            customer.createdAt
                        )
                    )}
</div>
</div>
`
                    : ""
                }

</div>

${selected.addresses
                    ? `
<h2>Addresses</h2>

${customer.addresses
                        ?.map(
                            (
                                address: any
                            ) => `
<div class="address">

<strong>
${escapeHtml(
                                address.fullName ||
                                "-"
                            )}
</strong>

<div>
${escapeHtml(
                                address.addressLine ||
                                ""
                            )}
</div>

<div>
${escapeHtml(
                                address.village ||
                                ""
                            )}
${address.taluka
                                    ? ", " +
                                    escapeHtml(
                                        address.taluka
                                    )
                                    : ""}
${address.city
                                    ? ", " +
                                    escapeHtml(
                                        address.city
                                    )
                                    : ""}
</div>

<div>
${escapeHtml(
                                        address.district ||
                                        ""
                                    )}, ${escapeHtml(
                                        address.state ||
                                        ""
                                    )} - ${escapeHtml(
                                        address.pincode ||
                                        ""
                                    )}
</div>

${address.landmark
                                    ? `<div class="small">Landmark: ${escapeHtml(
                                        address.landmark
                                    )}</div>`
                                    : ""
                                }

<div class="small">
Phone: ${escapeHtml(
                                    address.phone ||
                                    "-"
                                )}
</div>

</div>
`
                        )
                        .join(
                            ""
                        ) ||
                    `<p>No saved addresses.</p>`
                    }

`
                    : ""
                }

${selected.orders
                    ? `
<h2>Previous Orders</h2>

${customer.orders
                        ?.map(
                            (
                                order: any
                            ) => `
<div class="order">

<div class="order-header">

<div>
<strong>
Order #${escapeHtml(
                                order.id
                            )}
</strong>

<div class="small">
${escapeHtml(
                                formatDate(
                                    order.createdAt
                                )
                            )}
</div>
</div>

<div>
<strong>
₹${Number(
                                order.grandTotal
                            ).toLocaleString(
                                "en-IN"
                            )}
</strong>

<div class="small">
${escapeHtml(
                                order.status
                            )}
</div>
</div>

</div>

${order.items
                                    ?.map(
                                        (
                                            item: any
                                        ) => `
<div class="item">

<span>
${escapeHtml(
                                            item.productName ||
                                            "-"
                                        )}
 × ${item.quantity
                                            }
</span>

<strong>
₹${Number(
                                                item.price
                                            ).toLocaleString(
                                                "en-IN"
                                            )}
</strong>

</div>
`
                                    )
                                    .join("")}

${selected.payment
                                    ? `
<div class="small" style="margin-top:10px;">
Payment: ${escapeHtml(
                                        order.paymentStatus ||
                                        "-"
                                    )}
<br/>
Method: ${escapeHtml(
                                        order.paymentMethod ||
                                        "-"
                                    )}
${order.payment
                                        ?.transactionId
                                        ? `<br/>Transaction: ${escapeHtml(
                                            order.payment
                                                .transactionId
                                        )}`
                                        : ""
                                    }
</div>
`
                                    : ""
                                }

</div>
`
                        )
                        .join(
                            ""
                        ) ||
                    `<p>No orders placed yet.</p>`
                    }

`
                    : ""
                }

</body>
</html>
`
            );

            printWindow.document.close();

            printWindow.focus();

            setTimeout(() => {
                printWindow.print();
            }, 300);
        };

    return (
        <div className="fixed inset-0 z-[150] flex items-center justify-center bg-slate-950/60 p-4 backdrop-blur-sm">

            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">

                <div className="flex items-start justify-between gap-4">

                    <div>

                        <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-600">
                            Print Customer
                        </p>

                        <h3 className="mt-1 text-xl font-bold text-slate-900">
                            Choose information
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Select what you want to include in the print.
                        </p>

                    </div>

                    <button
                        type="button"
                        onClick={() =>
                            onOpenChange(
                                false
                            )
                        }
                        className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-900"
                    >
                        <X className="h-5 w-5" />
                    </button>

                </div>

                <div className="mt-6 space-y-2">

                    <PrintOption
                        label="Customer Name"
                        checked={
                            fields.name
                        }
                        onClick={() =>
                            toggle(
                                "name"
                            )
                        }
                    />

                    <PrintOption
                        label="Mobile Number"
                        checked={
                            fields.mobile
                        }
                        onClick={() =>
                            toggle(
                                "mobile"
                            )
                        }
                    />

                    <PrintOption
                        label="Email"
                        checked={
                            fields.email
                        }
                        onClick={() =>
                            toggle(
                                "email"
                            )
                        }
                    />

                    <PrintOption
                        label="Joined Date"
                        checked={
                            fields.joined
                        }
                        onClick={() =>
                            toggle(
                                "joined"
                            )
                        }
                    />

                    <PrintOption
                        label="Saved Address"
                        checked={
                            fields.addresses
                        }
                        onClick={() =>
                            toggle(
                                "addresses"
                            )
                        }
                    />

                    <PrintOption
                        label="Previous Orders"
                        checked={
                            fields.orders
                        }
                        onClick={() =>
                            toggle(
                                "orders"
                            )
                        }
                    />

                    <PrintOption
                        label="Payment / Transaction Details"
                        checked={
                            fields.payment
                        }
                        disabled={
                            !fields.orders
                        }
                        onClick={() =>
                            toggle(
                                "payment"
                            )
                        }
                    />

                </div>

                <div className="mt-6 flex gap-3">

                    <Button
                        variant="outline"
                        className="h-11 flex-1 rounded-xl"
                        onClick={() =>
                            onOpenChange(
                                false
                            )
                        }
                    >
                        Cancel
                    </Button>

                    <Button
                        className="h-11 flex-1 rounded-xl bg-emerald-600 font-semibold hover:bg-emerald-700"
                        onClick={() => {
                            printCustomer();
                            onOpenChange(
                                false
                            );
                        }}
                    >
                        <Printer className="mr-2 h-4 w-4" />
                        Print
                    </Button>

                </div>

            </div>

        </div>
    );
}

function PrintOption({
    label,
    checked,
    disabled,
    onClick,
}: {
    label: string;
    checked: boolean;
    disabled?: boolean;
    onClick: () => void;
}) {
    return (
        <button
            type="button"
            disabled={
                disabled
            }
            onClick={
                onClick
            }
            className={`flex w-full items-center justify-between rounded-xl border p-3 text-left transition ${disabled
                    ? "cursor-not-allowed opacity-40"
                    : "hover:border-emerald-300 hover:bg-emerald-50/50"
                }`}
        >

            <span className="text-sm font-medium text-slate-700">
                {label}
            </span>

            <span
                className={`flex h-5 w-5 items-center justify-center rounded-md border ${checked
                        ? "border-emerald-600 bg-emerald-600"
                        : "border-slate-300 bg-white"
                    }`}
            >
                {checked && (
                    <span className="text-xs font-bold text-white">
                        ✓
                    </span>
                )}
            </span>

        </button>
    );
}

function InfoCard({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">

            <div className="flex items-center gap-2 text-slate-400">

                {icon}

                <span className="text-xs font-bold uppercase tracking-wider">
                    {label}
                </span>

            </div>

            <p className="mt-2 break-all text-sm font-semibold text-slate-800">
                {value}
            </p>

        </div>
    );
}

function Summary({
    label,
    value,
}: {
    label: string;
    value: string | number;
}) {
    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">

            <p className="text-xs text-slate-500">
                {label}
            </p>

            <p className="mt-1 text-xl font-bold text-slate-900">
                {value}
            </p>

        </div>
    );
}

function SectionTitle({
    icon,
    title,
}: {
    icon: React.ReactNode;
    title: string;
}) {
    return (
        <div className="mb-3 flex items-center gap-2">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                {icon}
            </div>

            <h3 className="font-bold text-slate-900">
                {title}
            </h3>

        </div>
    );
}

function Empty({
    text,
}: {
    text: string;
}) {
    return (
        <div className="rounded-2xl border border-dashed border-slate-200 p-8 text-center text-sm text-slate-400">
            {text}
        </div>
    );
}

function formatDate(
    value: string
) {
    return new Date(
        value
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }
    );
}

function escapeHtml(
    value: string
) {
    return value
        .replaceAll(
            "&",
            "&amp;"
        )
        .replaceAll(
            "<",
            "&lt;"
        )
        .replaceAll(
            ">",
            "&gt;"
        )
        .replaceAll(
            '"',
            "&quot;"
        )
        .replaceAll(
            "'",
            "&#039;"
        );
}
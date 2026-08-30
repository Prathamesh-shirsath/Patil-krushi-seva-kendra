"use client";

import {
    CheckCircle2,
    XCircle,
    Package,
    Tag,
    Pencil,
    X,
    CalendarDays,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Category {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    image?: string | null;
    status?: boolean;

    _count?: {
        products?: number;
    };

    createdAt?: string;
    updatedAt?: string;
}

interface Props {
    category: Category | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onEdit?: (category: Category) => void;
}

export default function CategoryViewDialog({
    category,
    open,
    onOpenChange,
    onEdit,
}: Props) {
    if (!open || !category) {
        return null;
    }

    const active =
        category.status !== false;

    const productCount =
        category._count?.products ?? 0;

    function formatDate(
        value?: string
    ) {
        if (!value) return "—";

        const date = new Date(value);

        if (Number.isNaN(date.getTime())) {
            return "—";
        }

        return date.toLocaleDateString(
            "en-IN",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    }

    function handleEdit() {
        onOpenChange(false);

        if (onEdit) {
            onEdit(category);
        }
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-[100]
                flex
                items-center
                justify-center
                bg-slate-950/50
                p-3
                backdrop-blur-sm
                sm:p-5
            "
            onMouseDown={(event) => {
                if (
                    event.target ===
                    event.currentTarget
                ) {
                    onOpenChange(false);
                }
            }}
        >

            <div
                className="
                    relative
                    flex
                    max-h-[94vh]
                    w-full
                    max-w-2xl
                    flex-col
                    overflow-hidden
                    rounded-[28px]
                    border
                    border-emerald-100
                    bg-white
                    shadow-2xl
                "
            >

                {/* ================================================= */}
                {/* HEADER */}
                {/* ================================================= */}

                <div
                    className="
                        relative
                        shrink-0
                        overflow-hidden
                        border-b
                        border-emerald-100
                        bg-gradient-to-br
                        from-emerald-50
                        via-white
                        to-green-50
                    "
                >
                    <div
                        className="
                            absolute
                            -right-10
                            -top-10
                            h-36
                            w-36
                            rounded-full
                            bg-emerald-100/60
                            blur-3xl
                        "
                    />

                    <div className="relative p-5 sm:p-7">

                        {/* Close */}

                        <button
                            type="button"
                            onClick={() =>
                                onOpenChange(false)
                            }
                            className="
                                absolute
                                right-4
                                top-4
                                flex
                                h-9
                                w-9
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-white/90
                                text-slate-500
                                shadow-sm
                                transition
                                hover:text-slate-900
                                sm:right-5
                                sm:top-5
                            "
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>

                        <div className="flex items-start gap-4 pr-10">

                            {/* Image */}

                            {category.image ? (
                                <img
                                    src={
                                        category.image
                                    }
                                    alt={
                                        category.name
                                    }
                                    className="
                                        h-20
                                        w-20
                                        shrink-0
                                        rounded-2xl
                                        border
                                        border-white
                                        bg-white
                                        object-cover
                                        shadow-md
                                        sm:h-24
                                        sm:w-24
                                    "
                                />
                            ) : (
                                <div
                                    className="
                                        flex
                                        h-20
                                        w-20
                                        shrink-0
                                        items-center
                                        justify-center
                                        rounded-2xl
                                        bg-emerald-100
                                        text-xl
                                        font-bold
                                        text-emerald-700
                                        sm:h-24
                                        sm:w-24
                                        sm:text-2xl
                                    "
                                >
                                    {category.name
                                        .slice(0, 2)
                                        .toUpperCase()}
                                </div>
                            )}

                            {/* Title */}

                            <div className="min-w-0">

                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-[0.18em]
                                        text-emerald-600
                                        sm:text-xs
                                    "
                                >
                                    Category Details
                                </p>

                                <h2
                                    className="
                                        mt-1
                                        break-words
                                        text-2xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                        sm:text-3xl
                                    "
                                >
                                    {category.name}
                                </h2>

                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    Complete category information
                                </p>

                                <div className="mt-3">
                                    {active ? (
                                        <Badge
                                            className="
                                                rounded-full
                                                border
                                                border-emerald-200
                                                bg-emerald-100
                                                px-3
                                                py-1
                                                text-emerald-700
                                                hover:bg-emerald-100
                                            "
                                        >
                                            <CheckCircle2 className="mr-1.5 h-3.5 w-3.5" />
                                            Active
                                        </Badge>
                                    ) : (
                                        <Badge
                                            className="
                                                rounded-full
                                                border
                                                border-red-200
                                                bg-red-50
                                                px-3
                                                py-1
                                                text-red-600
                                                hover:bg-red-50
                                            "
                                        >
                                            <XCircle className="mr-1.5 h-3.5 w-3.5" />
                                            Inactive
                                        </Badge>
                                    )}
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                {/* ================================================= */}
                {/* BODY */}
                {/* ================================================= */}

                <div className="min-h-0 flex-1 overflow-y-auto">

                    <div className="space-y-5 p-4 sm:p-7">

                        {/* STATS */}

                        <div className="grid grid-cols-2 gap-3">

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50/70
                                    p-4
                                    sm:p-5
                                "
                            >
                                <div className="flex items-center gap-2 text-slate-500">
                                    <Package className="h-4 w-4" />

                                    <span className="text-xs font-medium sm:text-sm">
                                        Products
                                    </span>
                                </div>

                                <p className="mt-2 text-2xl font-bold text-slate-900">
                                    {productCount}
                                </p>
                            </div>

                            <div
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-slate-50/70
                                    p-4
                                    sm:p-5
                                "
                            >
                                <div className="flex items-center gap-2 text-slate-500">

                                    {active ? (
                                        <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                    ) : (
                                        <XCircle className="h-4 w-4 text-red-500" />
                                    )}

                                    <span className="text-xs font-medium sm:text-sm">
                                        Status
                                    </span>

                                </div>

                                <p
                                    className={`
                                        mt-2
                                        text-lg
                                        font-bold
                                        ${active
                                            ? "text-emerald-700"
                                            : "text-red-600"
                                        }
                                    `}
                                >
                                    {active
                                        ? "Active"
                                        : "Inactive"}
                                </p>
                            </div>

                        </div>

                        {/* DETAILS */}

                        <div
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-slate-200
                                bg-white
                            "
                        >

                            <DetailRow
                                icon={
                                    <Tag className="h-4 w-4" />
                                }
                                label="Category Name"
                                value={
                                    category.name
                                }
                            />

                            <DetailRow
                                icon={
                                    <span className="font-mono text-xs">
                                        #
                                    </span>
                                }
                                label="Slug"
                                value={
                                    category.slug ||
                                    "—"
                                }
                                mono
                            />

                            {/* DESCRIPTION */}

                            <div className="border-b border-slate-200 p-4 sm:p-5">

                                <p
                                    className="
                                        text-[10px]
                                        font-bold
                                        uppercase
                                        tracking-wider
                                        text-slate-400
                                    "
                                >
                                    Description
                                </p>

                                <p
                                    className="
                                        mt-2
                                        text-sm
                                        leading-6
                                        text-slate-600
                                    "
                                >
                                    {category.description?.trim() ||
                                        "No description provided."}
                                </p>

                            </div>

                            {/* CREATED */}

                            {category.createdAt && (
                                <DetailRow
                                    icon={
                                        <CalendarDays className="h-4 w-4" />
                                    }
                                    label="Created"
                                    value={formatDate(
                                        category.createdAt
                                    )}
                                />
                            )}

                        </div>

                    </div>
                </div>

                {/* ================================================= */}
                {/* FOOTER */}
                {/* ================================================= */}

                <div
                    className="
                        shrink-0
                        border-t
                        border-slate-200
                        bg-white
                        p-4
                        sm:p-5
                    "
                >
                    <div className="flex flex-col-reverse gap-3 sm:flex-row">

                        <Button
                            type="button"
                            variant="outline"
                            className="
                                h-11
                                flex-1
                                rounded-xl
                                sm:flex-none
                                sm:px-6
                            "
                            onClick={() =>
                                onOpenChange(false)
                            }
                        >
                            Close
                        </Button>

                        <Button
                            type="button"
                            className="
                                h-11
                                flex-1
                                rounded-xl
                                bg-emerald-600
                                font-semibold
                                text-white
                                shadow-sm
                                hover:bg-emerald-700
                                sm:flex-1
                            "
                            onClick={
                                handleEdit
                            }
                        >
                            <Pencil className="mr-2 h-4 w-4" />
                            Edit Category
                        </Button>

                    </div>
                </div>

            </div>
        </div>
    );
}

/* ============================================================= */
/* DETAIL ROW */
/* ============================================================= */

function DetailRow({
    icon,
    label,
    value,
    mono = false,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    mono?: boolean;
}) {
    return (
        <div className="border-b border-slate-200 p-4 last:border-0 sm:p-5">

            <div
                className="
                    flex
                    items-center
                    gap-2
                    text-[10px]
                    font-bold
                    uppercase
                    tracking-wider
                    text-slate-400
                    sm:text-xs
                "
            >
                {icon}
                {label}
            </div>

            <p
                className={`
                    mt-2
                    break-words
                    text-sm
                    text-slate-700
                    ${mono
                        ? "font-mono"
                        : "font-medium"
                    }
                `}
            >
                {value}
            </p>

        </div>
    );
}
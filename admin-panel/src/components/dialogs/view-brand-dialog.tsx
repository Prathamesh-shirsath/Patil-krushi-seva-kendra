"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

import {
    Calendar,
    Package,
    CheckCircle2,
    Building2,
} from "lucide-react";

interface Props {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    brand: any;
}

export default function ViewBrandDialog({
    open,
    onOpenChange,
    brand,
}: Props) {

    if (!brand) return null;

    return (

        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <DialogContent
                className="
                    w-[95vw]
                    max-w-2xl
                    overflow-hidden
                    rounded-3xl
                    border
                    border-green-100
                    bg-white
                    p-0
                    shadow-2xl
                "
            >

                {/* Header */}

                <div
                    className="
                        bg-gradient-to-r
                        from-green-600
                        to-emerald-600
                        px-6
                        py-5
                        text-white
                    "
                >

                    <DialogHeader>

                        <DialogTitle
                            className="
                                text-xl
                                sm:text-2xl
                                font-bold
                                text-white
                            "
                        >
                            Brand Details
                        </DialogTitle>

                        <DialogDescription className="text-green-100">

                            Complete information about this brand.

                        </DialogDescription>

                    </DialogHeader>

                </div>

                {/* Body */}

                <div
                    className="
                        max-h-[75vh]
                        overflow-y-auto
                        p-6
                        sm:p-8
                        space-y-6
                    "
                >

                    {/* Logo */}

                    <div className="flex justify-center">

                        {brand.logo ? (

                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="
                                    h-24
                                    w-24
                                    sm:h-32
                                    sm:w-32
                                    rounded-3xl
                                    border
                                    border-slate-200
                                    object-cover
                                    shadow-lg
                                "
                            />

                        ) : (

                            <div
                                className="
                                    flex
                                    h-24
                                    w-24
                                    sm:h-32
                                    sm:w-32
                                    items-center
                                    justify-center
                                    rounded-3xl
                                    bg-gradient-to-br
                                    from-green-500
                                    to-emerald-600
                                    text-3xl
                                    sm:text-4xl
                                    font-bold
                                    text-white
                                    shadow-lg
                                "
                            >

                                {brand.name
                                    .slice(0, 2)
                                    .toUpperCase()}

                            </div>

                        )}

                    </div>

                    {/* Brand Name */}

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                        <p className="mb-2 text-sm text-slate-500">
                            Brand Name
                        </p>

                        <div className="flex items-center gap-2">

                            <Building2
                                size={18}
                                className="text-green-600"
                            />

                            <h3 className="text-lg sm:text-xl font-bold text-slate-800">

                                {brand.name}

                            </h3>

                        </div>

                    </div>

                    {/* Description */}

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                        <p className="mb-2 text-sm text-slate-500">

                            Description

                        </p>

                        <p className="text-sm leading-7 text-slate-700">

                            {brand.description ||
                                "No description available."}

                        </p>

                    </div>

                    {/* Stats */}

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                            <div className="mb-3 flex items-center gap-2">

                                <Package
                                    className="text-green-600"
                                    size={18}
                                />

                                <span className="text-sm text-slate-500">

                                    Products

                                </span>

                            </div>

                            <h3 className="text-3xl font-bold text-slate-800">

                                {brand._count?.products || 0}

                            </h3>

                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                            <div className="mb-3 flex items-center gap-2">

                                <CheckCircle2
                                    className="text-green-600"
                                    size={18}
                                />

                                <span className="text-sm text-slate-500">

                                    Status

                                </span>

                            </div>

                            {brand.status ? (

                                <Badge className="rounded-full bg-green-100 px-4 py-1 text-green-700">

                                    Active

                                </Badge>

                            ) : (

                                <Badge className="rounded-full bg-red-100 px-4 py-1 text-red-700">

                                    Inactive

                                </Badge>

                            )}

                        </div>

                    </div>

                    {/* Created */}

                    <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">

                        <div className="mb-2 flex items-center gap-2">

                            <Calendar
                                className="text-green-600"
                                size={18}
                            />

                            <span className="text-sm text-slate-500">

                                Created On

                            </span>

                        </div>

                        <h3 className="font-semibold text-slate-800">

                            {new Date(
                                brand.createdAt
                            ).toLocaleDateString()}

                        </h3>

                    </div>

                </div>

            </DialogContent>

        </Dialog>

    );

}
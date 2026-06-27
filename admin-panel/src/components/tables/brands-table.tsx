"use client";

import { useMemo, useState } from "react";

import {
    useBrands,
    useDeleteBrand,
} from "@/hooks/use-brands";

import AddBrandDialog from "@/components/dialogs/add-brand-dialog";
import EditBrandDialog from "@/components/dialogs/edit-brand-dialog";
import ViewBrandDialog from "@/components/dialogs/view-brand-dialog";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Table,
    TableHeader,
    TableHead,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
    Search,
    Eye,
    Pencil,
    Trash2,
    Package,
    CheckCircle,
    XCircle,
    Building2,
} from "lucide-react";

export default function BrandsTable() {

    const {
        data: brands = [],
        isLoading,
    } = useBrands();

    const deleteMutation =
        useDeleteBrand();

    const [search, setSearch] =
        useState("");

    const [selectedBrand, setSelectedBrand] =
        useState<any>(null);

    const [viewBrand, setViewBrand] =
        useState<any>(null);

    const filteredBrands =
        useMemo(() => {

            const q =
                search.toLowerCase();

            return brands.filter(
                (brand: any) =>
                    brand.name
                        .toLowerCase()
                        .includes(q)
            );

        }, [brands, search]);

    const totalBrands =
        brands.length;

    const activeBrands =
        brands.filter(
            (brand: any) =>
                brand.status
        ).length;

    const inactiveBrands =
        totalBrands -
        activeBrands;

    const totalProducts =
        brands.reduce(
            (
                sum: number,
                brand: any
            ) =>
                sum +
                (brand._count
                    ?.products || 0),
            0
        );

    if (isLoading) {

        return (

            <Card className="rounded-3xl">

                <CardContent className="p-10 text-center">

                    Loading brands...

                </CardContent>

            </Card>

        );

    }

    return (

        <div className="space-y-6">

            {/* Stats */}

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                <StatCard
                    title="Total Brands"
                    value={totalBrands}
                    icon={<Building2 size={24} />}
                />

                <StatCard
                    title="Active Brands"
                    value={activeBrands}
                    icon={<CheckCircle size={24} />}
                />

                <StatCard
                    title="Inactive Brands"
                    value={inactiveBrands}
                    icon={<XCircle size={24} />}
                />

                <StatCard
                    title="Total Products"
                    value={totalProducts}
                    icon={<Package size={24} />}
                />

            </div>

            {/* Search */}

            <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-sm flex flex-col lg:flex-row gap-4">

                <div className="relative flex-1">

                    <Search
                        size={18}
                        className="absolute left-3 top-4 text-slate-400"
                    />

                    <Input
                        value={search}
                        onChange={(e) =>
                            setSearch(
                                e.target.value
                            )
                        }
                        placeholder="Search brands..."
                        className="
                        rounded-2xl
                        border
                        border-slate-200
                        bg-slate-50
                        pl-10
                        pr-4
                        py-3
                        focus:bg-white
                        focus:ring-2
                        focus:ring-green-500
                    "
                    />

                </div>

                <AddBrandDialog />

            </div>

            {/* Table */}

            <div className="overflow-hidden rounded-3xl border border-green-100 bg-white/80 backdrop-blur-md shadow-sm">

                <div className="overflow-x-auto">

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead className="p-5">
                                    Logo
                                </TableHead>

                                <TableHead className="p-5">
                                    Brand
                                </TableHead>

                                <TableHead className="p-5">
                                    Slug
                                </TableHead>

                                <TableHead className="p-5">
                                    Products
                                </TableHead>

                                <TableHead className="p-5">
                                    Status
                                </TableHead>

                                <TableHead className="p-5">
                                    Created
                                </TableHead>

                                <TableHead className="p-5 text-right">
                                    Actions
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>
                            {filteredBrands.map((brand: any) => (

                                <TableRow
                                    key={brand.id}
                                    className="
        border-t
        hover:bg-green-50
        transition-all
        duration-300
    "
                                >

                                    {/* Logo */}

                                    <TableCell className="p-5">

                                        {brand.logo ? (

                                            <img
                                                src={brand.logo}
                                                alt={brand.name}
                                                className="
                    h-12
                    w-12
                    rounded-2xl
                    border
                    border-slate-200
                    shadow-md
                    object-cover
                "
                                            />

                                        ) : (

                                            <div
                                                className="
                    h-12
                    w-12
                    rounded-2xl
                    bg-gradient-to-br
                    from-green-500
                    to-emerald-600
                    text-white
                    shadow-lg
                    flex
                    items-center
                    justify-center
                    font-bold
                "
                                            >
                                                {brand.name
                                                    .slice(0, 2)
                                                    .toUpperCase()}
                                            </div>

                                        )}

                                    </TableCell>

                                    {/* Brand */}

                                    <TableCell className="p-5">

                                        <div>

                                            <p className="font-semibold text-slate-800">
                                                {brand.name}
                                            </p>

                                            <p className="text-sm text-slate-500">
                                                {brand._count?.products || 0} Products
                                            </p>

                                        </div>

                                    </TableCell>

                                    {/* Slug */}

                                    <TableCell className="p-5 text-slate-500">
                                        {brand.slug}
                                    </TableCell>

                                    {/* Products */}

                                    <TableCell className="p-5 font-medium">
                                        {brand._count?.products || 0}
                                    </TableCell>

                                    {/* Status */}

                                    <TableCell className="p-5">

                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-medium ${brand.status
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {brand.status
                                                ? "Active"
                                                : "Inactive"}
                                        </span>

                                    </TableCell>

                                    {/* Created */}

                                    <TableCell className="p-5 text-slate-600">

                                        {new Date(
                                            brand.createdAt
                                        ).toLocaleDateString()}

                                    </TableCell>

                                    {/* Actions */}

                                    <TableCell className="p-5">

                                        <div className="flex justify-end gap-2">

                                            {/* View */}

                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="
                    h-10
                    w-10
                    rounded-xl
                    border-blue-200
                    text-blue-600
                    hover:bg-blue-50
                "
                                                onClick={() =>
                                                    setViewBrand(brand)
                                                }
                                            >
                                                <Eye size={18} />
                                            </Button>

                                            {/* Edit */}

                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="
                    h-10
                    w-10
                    rounded-xl
                    border-green-200
                    text-green-600
                    hover:bg-green-50
                "
                                                onClick={() =>
                                                    setSelectedBrand(
                                                        brand
                                                    )
                                                }
                                            >
                                                <Pencil size={18} />
                                            </Button>

                                            {/* Delete */}

                                            <Button
                                                size="icon"
                                                variant="outline"
                                                className="
                    h-10
                    w-10
                    rounded-xl
                    border-red-200
                    text-red-600
                    hover:bg-red-50
                "
                                                disabled={
                                                    deleteMutation.isPending
                                                }
                                                onClick={() => {

                                                    const confirmDelete =
                                                        window.confirm(
                                                            `Delete ${brand.name}?`
                                                        );

                                                    if (!confirmDelete)
                                                        return;

                                                    deleteMutation.mutate(
                                                        brand.id
                                                    );

                                                }}
                                            >
                                                <Trash2 size={18} />
                                            </Button>

                                        </div>

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </div>

            </div>

            <EditBrandDialog
                open={!!selectedBrand}
                brand={selectedBrand}
                onOpenChange={() =>
                    setSelectedBrand(null)
                }
            />

            <ViewBrandDialog
                open={!!viewBrand}
                brand={viewBrand}
                onOpenChange={() =>
                    setViewBrand(null)
                }
            />

        </div>

    );

}

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: number;
    icon: React.ReactNode;
}) {

    return (

        <div
            className="
            rounded-3xl
            border
            border-slate-100
            bg-white
            p-6
            shadow-sm
            hover:shadow-xl
            transition-all
            duration-300
        "
        >

            <div className="flex items-center justify-between">

                <div>

                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                        {value}
                    </h3>

                </div>

                <div
                    className="
                    h-14
                    w-14
                    rounded-2xl
                    bg-gradient-to-br
                    from-green-500
                    to-emerald-600
                    text-white
                    flex
                    items-center
                    justify-center
                    shadow-lg
                "
                >
                    {icon}
                </div>

            </div>

        </div>

    );

}
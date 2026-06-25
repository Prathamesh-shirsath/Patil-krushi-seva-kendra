"use client";

import { useMemo, useState } from "react";

import {
    useBrands,
    useDeleteBrand,
} from "@/hooks/use-brands";

import AddBrandDialog from "@/components/dialogs/add-brand-dialog";
import EditBrandDialog from "@/components/dialogs/edit-brand-dialog";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Search,
    Eye,
    Pencil,
    Trash2,
} from "lucide-react";

import ViewBrandDialog
    from "@/components/dialogs/view-brand-dialog";


export default function BrandsTable() {
    const {
        data: brands = [],
        isLoading,
    } = useBrands();

    const deleteMutation =
        useDeleteBrand();

    const [search, setSearch] =
        useState("");

    const [
        selectedBrand,
        setSelectedBrand,
    ] = useState<any>(null);

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
    
    
    
    
    
    const [viewBrand, setViewBrand] =
        useState<any>(null);
    
    

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
            <Card>
                <CardContent className="p-10 text-center">
                    Loading brands...
                </CardContent>
            </Card>
        );
    }

    return (
        <div className="space-y-6">

            {/* Stats */}
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">

                <Card className="rounded-3xl">
                    <CardContent className="p-6">
                        <p className="text-sm text-slate-500">
                            Total Brands
                        </p>

                        <h2 className="mt-2 text-3xl font-bold">
                            {totalBrands}
                        </h2>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl">
                    <CardContent className="p-6">
                        <p className="text-sm text-slate-500">
                            Active Brands
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-green-700">
                            {activeBrands}
                        </h2>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl">
                    <CardContent className="p-6">
                        <p className="text-sm text-slate-500">
                            Inactive Brands
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-orange-600">
                            {inactiveBrands}
                        </h2>
                    </CardContent>
                </Card>

                <Card className="rounded-3xl">
                    <CardContent className="p-6">
                        <p className="text-sm text-slate-500">
                            Total Products
                        </p>

                        <h2 className="mt-2 text-3xl font-bold text-blue-600">
                            {totalProducts}
                        </h2>
                    </CardContent>
                </Card>

            </div>

            {/* Search */}
            <Card className="rounded-3xl">
                <CardContent className="flex items-center gap-4 p-5">

                    <div className="relative flex-1">

                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <Input
                            value={search}
                            onChange={(e) =>
                                setSearch(
                                    e.target.value
                                )
                            }
                            placeholder="Search brands..."
                            className="pl-10 rounded-xl"
                        />

                    </div>

                    <AddBrandDialog />

                </CardContent>
            </Card>

            {/* Table */}
            <Card className="rounded-3xl">
                <CardContent className="p-0">

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead>
                                    Logo
                                </TableHead>

                                <TableHead>
                                    Brand
                                </TableHead>

                                <TableHead>
                                    Slug
                                </TableHead>

                                <TableHead>
                                    Products
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                                <TableHead>
                                    Created
                                </TableHead>

                                <TableHead>
                                    Actions
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>

                            {filteredBrands.map(
                                (brand: any) => (

                                    <TableRow
                                        key={brand.id}
                                    >

                                        <TableCell>

                                            {brand.logo ? (

                                                <img
                                                    src={
                                                        brand.logo
                                                    }
                                                    alt={
                                                        brand.name
                                                    }
                                                    className="h-12 w-12 rounded-xl object-cover border"
                                                />

                                            ) : (

                                                <div className="h-12 w-12 rounded-xl bg-green-100 flex items-center justify-center font-bold">
                                                    {brand.name
                                                        .slice(
                                                            0,
                                                            2
                                                        )
                                                        .toUpperCase()}
                                                </div>

                                            )}

                                        </TableCell>

                                        <TableCell className="font-medium">
                                            {brand.name}
                                        </TableCell>

                                        <TableCell>
                                            {brand.slug}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                brand
                                                    ._count
                                                    ?.products
                                            }
                                        </TableCell>

                                        <TableCell>

                                            {brand.status ? (

                                                <Badge className="bg-green-100 text-green-700">
                                                    Active
                                                </Badge>

                                            ) : (

                                                <Badge className="bg-orange-100 text-orange-700">
                                                    Inactive
                                                </Badge>

                                            )}

                                        </TableCell>

                                        <TableCell>

                                            {new Date(
                                                brand.createdAt
                                            ).toLocaleDateString()}

                                        </TableCell>

                                        <TableCell>

                                            <div className="flex gap-2">

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        setViewBrand(brand)
                                                    }
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Button>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    onClick={() =>
                                                        setSelectedBrand(
                                                            brand
                                                        )
                                                    }
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Button>

                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="text-red-600"
                                                    disabled={
                                                        deleteMutation.isPending
                                                    }
                                                    onClick={() => {

                                                        const confirmDelete =
                                                            window.confirm(
                                                                `Delete ${brand.name}?`
                                                            );

                                                        if (
                                                            !confirmDelete
                                                        )
                                                            return;

                                                        deleteMutation.mutate(
                                                            brand.id
                                                        );

                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>

                                            </div>

                                        </TableCell>

                                    </TableRow>

                                )
                            )}

                        </TableBody>

                    </Table>

                </CardContent>
            </Card>

            <EditBrandDialog
                open={!!selectedBrand}
                brand={selectedBrand}
                onOpenChange={() =>
                    setSelectedBrand(
                        null
                    )
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
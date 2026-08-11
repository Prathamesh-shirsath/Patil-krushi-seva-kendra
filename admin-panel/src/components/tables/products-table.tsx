"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
    Eye,
    Pencil,
    Trash2,
    Package2,
} from "lucide-react";

import { useProducts } from "@/hooks/use-products";

import type { Product } from "@/types/product";

import DeleteProductDialog from "@/components/dialogs/delete-product-dialog";
import ProductFilter from "@/components/filters/product-filter";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import {
    Badge,
} from "@/components/ui/badge";

import {
    Button,
} from "@/components/ui/button";

import {
    Skeleton,
} from "@/components/ui/skeleton";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const LIMIT = 10;

function ProductImage({
    image,
    name,
}: {
    image?: string | null;
    name: string;
}) {
    if (!image) {
        return (
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-green-100 text-lg font-semibold text-green-700">
                {name.substring(0, 2).toUpperCase()}
            </div>
        );
    }

    return (
        <Image
            src={image}
            alt={name}
            width={56}
            height={56}
            className="h-14 w-14 rounded-xl border object-cover"
        />
    );
}

function StatusBadge({
    status,
}: {
    status: boolean;
}) {
    return status ? (
        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
            Active
        </Badge>
    ) : (
        <Badge variant="secondary">
            Inactive
        </Badge>
    );
}

function StockBadge({
    stock,
}: {
    stock: number;
}) {
    if (stock <= 0) {
        return (
            <Badge variant="destructive">
                Out of Stock
            </Badge>
        );
    }

    if (stock < 10) {
        return (
            <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100">
                Low Stock
            </Badge>
        );
    }

    return (
        <Badge className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
            In Stock
        </Badge>
    );
}

function TableSkeleton() {
    return (
        <Card>
            <CardContent className="space-y-4 p-6">
                {Array.from({ length: 8 }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="h-14 w-full"
                    />
                ))}
            </CardContent>
        </Card>
    );
}

function EmptyState() {
    return (
        <Card>
            <CardContent className="flex flex-col items-center justify-center py-20">
                <Package2 className="mb-4 h-16 w-16 text-muted-foreground" />

                <h3 className="text-xl font-semibold">
                    No Products Found
                </h3>

                <p className="mt-2 text-muted-foreground">
                    Try changing filters or create your first product.
                </p>

                <Button
                    asChild
                    className="mt-6"
                >
                    <Link href="/products/new">
                        Add Product
                    </Link>
                </Button>
            </CardContent>
        </Card>
    );
}

export default function ProductsTable() {

    const [page, setPage] = useState(1);

    const [search, setSearch] = useState("");

    const [brandId, setBrandId] = useState("all");

    const [categoryId, setCategoryId] = useState("all");

    const [deleteId, setDeleteId] =
        useState<string | null>(null);

    const {
        data,
        isLoading,
    } = useProducts({
        page,
        limit: LIMIT,
        search,
        brandId:
            brandId === "all"
                ? undefined
                : brandId,
        categoryId:
            categoryId === "all"
                ? undefined
                : categoryId,
    });

    useEffect(() => {
        setPage(1);
    }, [
        search,
        brandId,
        categoryId,
    ]);

    const products: Product[] =
        data?.data ?? [];

    const pagination =
        data?.pagination;
    if (isLoading) {
        return <TableSkeleton />;
    }

    if (!products.length) {
        return <EmptyState />;
    }

    return (
        <div className="space-y-6">

            <ProductFilter
                search={search}
                onSearchChange={setSearch}
                brandId={brandId}
                onBrandChange={setBrandId}
                categoryId={categoryId}
                onCategoryChange={setCategoryId}
                onReset={() => {
                    setSearch("");
                    setBrandId("all");
                    setCategoryId("all");
                    setPage(1);
                }}
            />

            <Card>

                <CardContent className="p-0">

                    <Table>

                        <TableHeader>

                            <TableRow>

                                <TableHead className="w-[90px]">
                                    Image
                                </TableHead>

                                <TableHead>
                                    Product
                                </TableHead>

                                <TableHead>
                                    Brand
                                </TableHead>

                                <TableHead>
                                    Category
                                </TableHead>

                                <TableHead>
                                    Pack
                                </TableHead>

                                <TableHead>
                                    Price
                                </TableHead>

                                <TableHead>
                                    Stock
                                </TableHead>

                                <TableHead>
                                    Status
                                </TableHead>

                                <TableHead className="text-right">
                                    Actions
                                </TableHead>

                            </TableRow>

                        </TableHeader>

                        <TableBody>

                            {products.map((product) => (

                                <TableRow
                                    key={product.id}
                                    className="hover:bg-muted/40"
                                >

                                    <TableCell>

                                        <ProductImage
                                            image={product.image}
                                            name={product.name}
                                        />

                                    </TableCell>

                                    <TableCell>

                                        <div className="space-y-1">

                                            <p className="font-semibold">

                                                {product.name}

                                            </p>

                                            <p className="text-xs text-muted-foreground">

                                                {product.slug}

                                            </p>

                                        </div>

                                    </TableCell>

                                    <TableCell>

                                        {product.brandName || "-"}

                                    </TableCell>

                                    <TableCell>

                                        {product.categoryName || "-"}

                                    </TableCell>

                                    <TableCell>

                                        {product.packSize}

                                    </TableCell>

                                    <TableCell>

                                        ₹{" "}
                                        {Number(
                                            product.price
                                        ).toLocaleString("en-IN")}

                                    </TableCell>

                                    <TableCell>

                                        <div className="space-y-1">

                                            <p className="font-medium">
                                                {product.stock ?? 0}
                                            </p>

                                            <StockBadge
                                                stock={product.stock ?? 0}
                                            />

                                        </div>

                                    </TableCell>

                                    <TableCell>

                                        <StatusBadge
                                            status={product.status}
                                        />

                                    </TableCell>

                                    <TableCell>

                                        <div className="flex justify-end gap-2">

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >

                                                <Link
                                                    href={`/products/${product.slug}`}
                                                >

                                                    <Eye className="h-4 w-4" />

                                                </Link>

                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                asChild
                                            >

                                                <Link
                                                    href={`/products/${product.id}/edit`}
                                                >

                                                    <Pencil className="h-4 w-4" />

                                                </Link>

                                            </Button>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    setDeleteId(product.id)
                                                }
                                            >

                                                <Trash2 className="h-4 w-4 text-red-600" />

                                            </Button>

                                        </div>

                                    </TableCell>

                                </TableRow>

                            ))}

                        </TableBody>

                    </Table>

                </CardContent>

            </Card>
            {/* Pagination */}

            {pagination && (

                <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

                    <p className="text-sm text-muted-foreground">

                        Showing{" "}
                        <span className="font-medium">

                            {(pagination.page - 1) * pagination.limit + 1}

                        </span>

                        {" - "}

                        <span className="font-medium">

                            {Math.min(
                                pagination.page * pagination.limit,
                                pagination.total
                            )}

                        </span>

                        {" "}of{" "}

                        <span className="font-medium">

                            {pagination.total}

                        </span>

                        {" "}products

                    </p>

                    <div className="flex items-center gap-2">

                        <Button
                            variant="outline"
                            disabled={pagination.page <= 1}
                            onClick={() =>
                                setPage((prev) => prev - 1)
                            }
                        >
                            Previous
                        </Button>

                        <div className="rounded-md border px-4 py-2 text-sm font-medium">

                            Page {pagination.page} of{" "}
                            {pagination.totalPages}

                        </div>

                        <Button
                            variant="outline"
                            disabled={
                                pagination.page >=
                                pagination.totalPages
                            }
                            onClick={() =>
                                setPage((prev) => prev + 1)
                            }
                        >
                            Next
                        </Button>

                    </div>

                </div>

            )}

            {/* Delete Dialog */}

            <DeleteProductDialog
                open={!!deleteId}
                productId={deleteId}
                onOpenChange={(open) => {
                    if (!open) {
                        setDeleteId(null);
                    }
                }}
            />

        </div>

    );
}
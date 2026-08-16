"use client";

import Image from "next/image";
import Link from "next/link";

import {
    useEffect,
    useState,
} from "react";

import {
    Eye,
    Pencil,
    Trash2,
    Package2,
} from "lucide-react";

import {
    useProducts,
} from "@/hooks/use-products";

import type {
    Product,
} from "@/types/product";

import DeleteProductDialog from "@/components/dialogs/delete-product-dialog";

import ProductFilter from "@/components/filters/product-filter";

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


/* =========================================================
   PRODUCT IMAGE
========================================================= */

function ProductImage({
    image,
    name,
}: {
    image?: string | null;
    name: string;
}) {

    if (!image) {
        return (
            <div
                className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-2xl
                    bg-emerald-50
                    text-sm
                    font-bold
                    text-emerald-700
                    sm:h-14
                    sm:w-14
                    sm:text-lg
                "
            >
                {name
                    .substring(0, 2)
                    .toUpperCase()}
            </div>
        );
    }


    return (
        <div
            className="
                h-12
                w-12
                shrink-0
                overflow-hidden
                rounded-2xl
                border
                border-slate-200
                bg-white
                sm:h-14
                sm:w-14
            "
        >
            <Image
                src={image}
                alt={name}
                width={56}
                height={56}
                className="
                    h-full
                    w-full
                    object-cover
                "
            />
        </div>
    );
}


/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
    status,
}: {
    status: boolean;
}) {

    if (status) {
        return (
            <Badge
                className="
                    whitespace-nowrap
                    rounded-full
                    bg-emerald-100
                    px-3
                    py-1
                    font-medium
                    text-emerald-700
                    hover:bg-emerald-100
                "
            >
                Active
            </Badge>
        );
    }


    return (
        <Badge
            className="
                whitespace-nowrap
                rounded-full
                bg-slate-100
                px-3
                py-1
                font-medium
                text-slate-600
                hover:bg-slate-100
            "
        >
            Inactive
        </Badge>
    );
}


/* =========================================================
   STOCK BADGE
========================================================= */

function StockBadge({
    stock,
}: {
    stock: number;
}) {

    if (stock <= 0) {
        return (
            <Badge
                className="
                    whitespace-nowrap
                    rounded-full
                    bg-red-100
                    px-3
                    py-1
                    font-medium
                    text-red-700
                    hover:bg-red-100
                "
            >
                Out of Stock
            </Badge>
        );
    }


    if (stock < 10) {
        return (
            <Badge
                className="
                    whitespace-nowrap
                    rounded-full
                    bg-orange-100
                    px-3
                    py-1
                    font-medium
                    text-orange-700
                    hover:bg-orange-100
                "
            >
                Low Stock
            </Badge>
        );
    }


    return (
        <Badge
            className="
                whitespace-nowrap
                rounded-full
                bg-emerald-100
                px-3
                py-1
                font-medium
                text-emerald-700
                hover:bg-emerald-100
            "
        >
            In Stock
        </Badge>
    );
}


/* =========================================================
   TABLE SKELETON
========================================================= */

function TableSkeleton() {

    return (
        <div
            className="
                overflow-hidden
                rounded-3xl
                border
                border-emerald-100
                bg-white
                shadow-sm
            "
        >

            <div className="space-y-4 p-4 sm:p-6">

                {Array.from({
                    length: 7,
                }).map((_, index) => (
                    <Skeleton
                        key={index}
                        className="
                            h-14
                            w-full
                            rounded-xl
                        "
                    />
                ))}

            </div>

        </div>
    );
}


/* =========================================================
   EMPTY STATE
========================================================= */

function EmptyState() {

    return (
        <div
            className="
                overflow-hidden
                rounded-3xl
                border
                border-emerald-100
                bg-white
                shadow-sm
            "
        >

            <div
                className="
                    flex
                    min-h-[280px]
                    flex-col
                    items-center
                    justify-center
                    px-5
                    py-12
                    text-center
                    sm:min-h-[320px]
                "
            >

                <div
                    className="
                        flex
                        h-16
                        w-16
                        items-center
                        justify-center
                        rounded-3xl
                        bg-emerald-50
                        sm:h-20
                        sm:w-20
                    "
                >
                    <Package2
                        className="
                            h-8
                            w-8
                            text-emerald-600
                            sm:h-10
                            sm:w-10
                        "
                    />
                </div>


                <h3
                    className="
                        mt-5
                        text-lg
                        font-semibold
                        text-slate-800
                        sm:text-xl
                    "
                >
                    No Products Found
                </h3>


                <p
                    className="
                        mt-2
                        max-w-md
                        text-sm
                        text-slate-500
                    "
                >
                    Try changing your filters or
                    create your first agricultural product.
                </p>


                <Button
                    asChild
                    className="
                        mt-6
                        rounded-2xl
                        bg-emerald-600
                        px-6
                        hover:bg-emerald-700
                    "
                >
                    <Link href="/products/new">
                        Add Product
                    </Link>
                </Button>

            </div>

        </div>
    );
}


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function ProductsTable() {

    const [page, setPage] =
        useState(1);

    const [search, setSearch] =
        useState("");

    const [brandId, setBrandId] =
        useState("all");

    const [categoryId, setCategoryId] =
        useState("all");

    const [deleteId, setDeleteId] =
        useState<string | null>(null);


    const {
        data,
        isLoading,
    } = useProducts({

        page,

        limit: LIMIT,

        search:
            search.trim()
                ? search
                : undefined,

        brandId:
            brandId === "all"
                ? undefined
                : brandId,

        categoryId:
            categoryId === "all"
                ? undefined
                : categoryId,

        includeInactive: true,
    });


    /* =====================================================
       RESET PAGE WHEN FILTER CHANGES
    ===================================================== */

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


    return (
        <div className="w-full min-w-0 space-y-4 sm:space-y-5">

            {/* =================================================
                FILTERS
            ================================================= */}

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


            {/* =================================================
                LOADING
            ================================================= */}

            {isLoading && (
                <TableSkeleton />
            )}


            {/* =================================================
                EMPTY
            ================================================= */}

            {!isLoading &&
                products.length === 0 && (
                    <EmptyState />
                )}


            {/* =================================================
                TABLE
            ================================================= */}

            {!isLoading &&
                products.length > 0 && (
                    <>

                        <div
                            className="
                                w-full
                                min-w-0
                                overflow-hidden
                                rounded-3xl
                                border
                                border-emerald-100
                                bg-white
                                shadow-sm
                            "
                        >

                            {/* IMPORTANT:
                                Only table scrolls on mobile.
                            */}

                            <div
                                className="
                                    w-full
                                    overflow-x-auto
                                "
                            >

                                <Table
                                    className="
                                        min-w-[1050px]
                                    "
                                >

                                    {/* =================================================
                                        HEADER
                                    ================================================= */}

                                    <TableHeader
                                        className="
                                            bg-slate-50
                                        "
                                    >

                                        <TableRow
                                            className="
                                                border-b
                                                border-slate-200
                                                hover:bg-slate-50
                                            "
                                        >

                                            <TableHead
                                                className="
                                                    h-14
                                                    w-[85px]
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Image
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Product
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Brand
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Category
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Pack
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Price
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Stock
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Status
                                            </TableHead>


                                            <TableHead
                                                className="
                                                    h-14
                                                    px-4
                                                    text-right
                                                    text-xs
                                                    font-semibold
                                                    text-slate-700
                                                    sm:h-16
                                                    sm:px-5
                                                    sm:text-sm
                                                "
                                            >
                                                Actions
                                            </TableHead>

                                        </TableRow>

                                    </TableHeader>


                                    {/* =================================================
                                        BODY
                                    ================================================= */}

                                    <TableBody>

                                        {products.map(
                                            (product) => (

                                                <TableRow
                                                    key={
                                                        product.id
                                                    }
                                                    className="
                                                        border-b
                                                        border-slate-100
                                                        transition-colors
                                                        hover:bg-emerald-50/30
                                                    "
                                                >

                                                    {/* IMAGE */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >

                                                        <ProductImage
                                                            image={
                                                                product.image
                                                            }
                                                            name={
                                                                product.name
                                                            }
                                                        />

                                                    </TableCell>


                                                    {/* PRODUCT */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                max-w-[240px]
                                                            "
                                                        >

                                                            <p
                                                                className="
                                                                    truncate
                                                                    font-semibold
                                                                    text-slate-800
                                                                "
                                                            >
                                                                {
                                                                    product.name
                                                                }
                                                            </p>


                                                            <p
                                                                className="
                                                                    mt-1
                                                                    truncate
                                                                    text-xs
                                                                    text-slate-400
                                                                "
                                                            >
                                                                {
                                                                    product.slug
                                                                }
                                                            </p>

                                                        </div>

                                                    </TableCell>


                                                    {/* BRAND */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-sm
                                                            font-medium
                                                            text-slate-600
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >
                                                        {
                                                            product.brandName ||
                                                            "-"
                                                        }
                                                    </TableCell>


                                                    {/* CATEGORY */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-sm
                                                            text-slate-600
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >
                                                        {
                                                            product.categoryName ||
                                                            "-"
                                                        }
                                                    </TableCell>


                                                    {/* PACK */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-sm
                                                            font-medium
                                                            text-slate-700
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >
                                                        {
                                                            product.packSize ||
                                                            "-"
                                                        }
                                                    </TableCell>


                                                    {/* PRICE */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            text-sm
                                                            font-semibold
                                                            text-slate-800
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >
                                                        ₹{" "}
                                                        {Number(
                                                            product.price ?? 0
                                                        ).toLocaleString(
                                                            "en-IN"
                                                        )}
                                                    </TableCell>


                                                    {/* STOCK */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >

                                                        <div className="space-y-1.5">

                                                            <p
                                                                className="
                                                                    text-sm
                                                                    font-semibold
                                                                    text-slate-800
                                                                "
                                                            >
                                                                {Number(
                                                                    product.stock ?? 0
                                                                ).toLocaleString(
                                                                    "en-IN"
                                                                )}
                                                            </p>


                                                            <StockBadge
                                                                stock={Number(
                                                                    product.stock ?? 0
                                                                )}
                                                            />

                                                        </div>

                                                    </TableCell>


                                                    {/* STATUS */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >

                                                        <StatusBadge
                                                            status={
                                                                product.status
                                                            }
                                                        />

                                                    </TableCell>


                                                    {/* ACTIONS */}

                                                    <TableCell
                                                        className="
                                                            px-4
                                                            py-3
                                                            sm:px-5
                                                            sm:py-4
                                                        "
                                                    >

                                                        <div
                                                            className="
                                                                flex
                                                                justify-end
                                                                gap-2
                                                            "
                                                        >

                                                            {/* VIEW */}

                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                asChild
                                                                title="View Product"
                                                                className="
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    rounded-xl
                                                                    border
                                                                    border-blue-100
                                                                    bg-white
                                                                    text-blue-600
                                                                    hover:bg-blue-50
                                                                    hover:text-blue-700
                                                                    sm:h-10
                                                                    sm:w-10
                                                                "
                                                            >

                                                                <Link
                                                                    href={`/products/${product.id}`}
                                                                >
                                                                    <Eye
                                                                        className="
                                                                            h-4
                                                                            w-4
                                                                        "
                                                                    />
                                                                </Link>

                                                            </Button>


                                                            {/* EDIT */}

                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                asChild
                                                                title="Edit Product"
                                                                className="
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    rounded-xl
                                                                    border
                                                                    border-emerald-100
                                                                    bg-white
                                                                    text-emerald-600
                                                                    hover:bg-emerald-50
                                                                    hover:text-emerald-700
                                                                    sm:h-10
                                                                    sm:w-10
                                                                "
                                                            >

                                                                <Link
                                                                    href={`/products/${product.id}/edit`}
                                                                >
                                                                    <Pencil
                                                                        className="
                                                                            h-4
                                                                            w-4
                                                                        "
                                                                    />
                                                                </Link>

                                                            </Button>


                                                            {/* DELETE */}

                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                title="Delete Product"
                                                                onClick={() =>
                                                                    setDeleteId(
                                                                        product.id
                                                                    )
                                                                }
                                                                className="
                                                                    h-9
                                                                    w-9
                                                                    shrink-0
                                                                    rounded-xl
                                                                    border
                                                                    border-red-100
                                                                    bg-white
                                                                    text-red-500
                                                                    hover:bg-red-50
                                                                    hover:text-red-600
                                                                    sm:h-10
                                                                    sm:w-10
                                                                "
                                                            >

                                                                <Trash2
                                                                    className="
                                                                        h-4
                                                                        w-4
                                                                    "
                                                                />

                                                            </Button>

                                                        </div>

                                                    </TableCell>

                                                </TableRow>

                                            )
                                        )}

                                    </TableBody>

                                </Table>

                            </div>

                        </div>


                        {/* =================================================
                            PAGINATION
                        ================================================= */}

                        {pagination && (
                            <div
                                className="
                                    flex
                                    flex-col
                                    gap-3
                                    rounded-3xl
                                    border
                                    border-slate-100
                                    bg-white
                                    p-4
                                    shadow-sm
                                    sm:p-5
                                    md:flex-row
                                    md:items-center
                                    md:justify-between
                                "
                            >

                                <p
                                    className="
                                        text-center
                                        text-sm
                                        text-slate-500
                                        md:text-left
                                    "
                                >
                                    Showing{" "}

                                    <span
                                        className="
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        {pagination.total === 0
                                            ? 0
                                            : (pagination.page - 1) *
                                            pagination.limit +
                                            1}
                                    </span>

                                    {" - "}

                                    <span
                                        className="
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        {Math.min(
                                            pagination.page *
                                            pagination.limit,
                                            pagination.total
                                        )}
                                    </span>

                                    {" "}of{" "}

                                    <span
                                        className="
                                            font-semibold
                                            text-slate-700
                                        "
                                    >
                                        {pagination.total}
                                    </span>

                                    {" "}products
                                </p>


                                <div
                                    className="
                                        flex
                                        w-full
                                        items-center
                                        justify-center
                                        gap-2
                                        md:w-auto
                                    "
                                >

                                    <Button
                                        variant="outline"
                                        disabled={
                                            pagination.page <= 1
                                        }
                                        onClick={() =>
                                            setPage(
                                                (prev) =>
                                                    prev - 1
                                            )
                                        }
                                        className="
                                            rounded-xl
                                            border-slate-200
                                        "
                                    >
                                        Previous
                                    </Button>


                                    <div
                                        className="
                                            whitespace-nowrap
                                            rounded-xl
                                            border
                                            border-slate-200
                                            bg-slate-50
                                            px-3
                                            py-2
                                            text-xs
                                            font-medium
                                            text-slate-700
                                            sm:px-4
                                            sm:text-sm
                                        "
                                    >
                                        Page{" "}
                                        {pagination.page}{" "}
                                        of{" "}
                                        {pagination.totalPages}
                                    </div>


                                    <Button
                                        variant="outline"
                                        disabled={
                                            pagination.page >=
                                            pagination.totalPages
                                        }
                                        onClick={() =>
                                            setPage(
                                                (prev) =>
                                                    prev + 1
                                            )
                                        }
                                        className="
                                            rounded-xl
                                            border-slate-200
                                        "
                                    >
                                        Next
                                    </Button>

                                </div>

                            </div>
                        )}

                    </>
                )}


            {/* =================================================
                DELETE DIALOG
            ================================================= */}

            <DeleteProductDialog
                open={Boolean(deleteId)}
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
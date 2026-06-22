"use client";





import { useProducts } from "@/hooks/use-products";

import type { Product } from "@/types/product";

import {
    CATEGORIES,
    BRANDS,
    TYPES,
    STOCK_STATUSES,
    getStockStatus,
} from "@/lib/products";













import { useState, useMemo } from "react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    Eye,
    Pencil,
    Trash2,
    Search,
    Filter,
    RotateCcw,
    ChevronLeft,
    ChevronRight,
} from "lucide-react";



// ─── Sub-components ───────────────────────────────────────────────

function ProductAvatar({ name }: { name: string }) {
    const palettes = [
        "bg-green-100 text-green-700",
        "bg-emerald-100 text-emerald-700",
        "bg-teal-100 text-teal-700",
        "bg-lime-100 text-lime-700",
        "bg-violet-100 text-violet-700",
    ];
    const palette = palettes[name.charCodeAt(0) % palettes.length];

    return (
        <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl text-xs font-bold ${palette}`}
        >
            {name.slice(0, 2).toUpperCase()}
        </div>
    );
}

function StockCell({ stock }: { stock: number }) {
    const status = getStockStatus(stock);

    const colorMap: Record<typeof status, string> = {
        "In Stock": "text-emerald-600",
        "Low Stock": "text-orange-500",
        "Out of Stock": "text-red-500",
    };

    return (
        <div>
            <p className="text-sm font-semibold text-slate-800">{stock}</p>
            <p className={`text-xs font-medium ${colorMap[status]}`}>{status}</p>
        </div>
    );
}

function StatusBadge({ status }: { status: Product["status"] }) {
    return status === "Active" ? (
        <Badge className="rounded-full border border-emerald-200 bg-emerald-50 text-emerald-700 hover:bg-emerald-50">
            Active
        </Badge>
    ) : (
        <Badge
            variant="secondary"
            className="rounded-full border border-orange-200 bg-orange-50 text-orange-600 hover:bg-orange-50"
        >
            Inactive
        </Badge>
    );
}






// ─── Constants ────────────────────────────────────────────────────

const ITEMS_PER_PAGE = 10;

// ─── Main component ───────────────────────────────────────────────

export default function ProductsTable() {



    const { data: products = [], isLoading } = useProducts();

    

    // Filter state
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All Categories");
    const [brand, setBrand] = useState("All Brands");
    const [type, setType] = useState("All Types");
    const [stockStatus, setStockStatus] = useState("All Status");

    // Pagination & Selection
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] =
        useState<Set<string>>(new Set());

    // Filtered data
    const filtered = useMemo(() => {

        const q = search.toLowerCase();

        return Array.isArray(products)
            ? products.filter((p) => {
                const matchSearch =
                    q === "" ||
                    p.name.toLowerCase().includes(q) ||
                    p.sku.toLowerCase().includes(q);

                const matchCategory =
                    category === "All Categories" ||
                    p.category === category;

                const matchBrand =
                    brand === "All Brands" ||
                    p.brand === brand;

                const matchType =
                    type === "All Types" ||
                    p.type === type;

                const matchStock =
                    stockStatus === "All Status" ||
                    getStockStatus(p.stock) === stockStatus;

                return (
                    matchSearch &&
                    matchCategory &&
                    matchBrand &&
                    matchType &&
                    matchStock
                );
            })
            : [];

    }, [
        products,
        search,
        category,
        brand,
        type,
        stockStatus,
    ]);

    const totalPages = Math.max(
        1,
        Math.ceil(filtered.length / ITEMS_PER_PAGE)
    );

    const currentPage = Math.min(page, totalPages);

    const paginated = filtered.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const allSelected =
        paginated.length > 0 &&
        paginated.every((p) => selectedIds.has(p.id));

    // Loading state
    if (isLoading) {
        return (
            <Card>
                <CardContent className="p-10 text-center">
                    Loading products...
                </CardContent>
            </Card>
        );
    }



    // ── Handlers ──────────────────────────────────────────────────

    function onSearch(value: string) {
        setSearch(value);
        setPage(1);
    }

    function onFilterChange(setter: (v: string) => void) {
        return (v: string) => { setter(v); setPage(1); };
    }

    function resetFilters() {
        setSearch("");
        setCategory("All Categories");
        setBrand("All Brands");
        setType("All Types");
        setStockStatus("All Status");
        setPage(1);
        setSelectedIds(new Set());
    }

    function toggleAll() {
        const next = new Set(selectedIds);
        allSelected
            ? paginated.forEach((p) => next.delete(p.id))
            : paginated.forEach((p) => next.add(p.id));
        setSelectedIds(next);
    }

    function toggleOne(id: string) {
        const next = new Set(selectedIds);
        next.has(id) ? next.delete(id) : next.add(id);
        setSelectedIds(next);
    }

    function goToPage(p: number) {
        setPage(Math.max(1, Math.min(p, totalPages)));
    }

    function pageNumbers(): (number | "…")[] {
        if (totalPages <= 5)
            return Array.from({ length: totalPages }, (_, i) => i + 1);

        const nums: (number | "…")[] = [1];
        if (currentPage > 3) nums.push("…");
        for (
            let i = Math.max(2, currentPage - 1);
            i <= Math.min(totalPages - 1, currentPage + 1);
            i++
        ) nums.push(i);
        if (currentPage < totalPages - 2) nums.push("…");
        nums.push(totalPages);
        return nums;
    }

    // ── Render ────────────────────────────────────────────────────

    return (
        <div className="space-y-4">

            {/* ── Filter bar ───────────────────────────────────── */}
            <Card className="rounded-2xl border-slate-100 shadow-sm">
                <CardContent className="flex flex-wrap items-center gap-3 p-4">

                    <div className="relative min-w-[200px] flex-1">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                            size={15}
                        />
                        <Input
                            value={search}
                            onChange={(e) => onSearch(e.target.value)}
                            placeholder="Search products by name, SKU..."
                            className="rounded-xl pl-9 text-sm"
                        />
                    </div>

                    <Select value={category} onValueChange={onFilterChange(setCategory)}>
                        <SelectTrigger className="w-[160px] rounded-xl text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {CATEGORIES.map((c: string) => (
                                <SelectItem key={c} value={c}>{c}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={brand} onValueChange={onFilterChange(setBrand)}>
                        <SelectTrigger className="w-[140px] rounded-xl text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {BRANDS.map((b: string) => (
                                <SelectItem key={b} value={b}>{b}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={type} onValueChange={onFilterChange(setType)}>
                        <SelectTrigger className="w-[130px] rounded-xl text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {TYPES.map((t: string

                            ) => (
                                <SelectItem key={t} value={t}>{t}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Select value={stockStatus} onValueChange={onFilterChange(setStockStatus)}>
                        <SelectTrigger className="w-[140px] rounded-xl text-sm">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {STOCK_STATUSES.map((s: string) => (
                                <SelectItem key={s} value={s}>{s}</SelectItem>
                            ))}
                        </SelectContent>
                    </Select>

                    <Button
                        variant="outline"
                        className="rounded-xl border-slate-200 text-sm"
                    >
                        <Filter className="mr-2 h-4 w-4" />
                        Filter
                    </Button>

                    <Button
                        variant="ghost"
                        onClick={resetFilters}
                        className="rounded-xl text-sm text-slate-500 hover:text-slate-700"
                    >
                        <RotateCcw className="mr-2 h-4 w-4" />
                        Reset
                    </Button>

                </CardContent>
            </Card>

            {/* ── Table ────────────────────────────────────────── */}
            <Card className="rounded-2xl border-slate-100 shadow-sm">
                <CardContent className="p-0">

                    <div className="overflow-x-auto">
                        <Table>

                            <TableHeader>
                                <TableRow className="bg-slate-50 hover:bg-slate-50">

                                    <TableHead className="w-10 pl-4">
                                        <Checkbox
                                            checked={allSelected}
                                            onCheckedChange={toggleAll}
                                            aria-label="Select all on this page"
                                        />
                                    </TableHead>

                                    {[
                                        "Product",
                                        "SKU",
                                        "Category",
                                        "Brand",
                                        "Price",
                                        "Stock",
                                        "Status",
                                    ].map((h) => (
                                        <TableHead
                                            key={h}
                                            className="text-xs font-semibold uppercase tracking-wider text-slate-500"
                                        >
                                            {h}
                                        </TableHead>
                                    ))}

                                    <TableHead className="pr-4 text-right text-xs font-semibold uppercase tracking-wider text-slate-500">
                                        Actions
                                    </TableHead>

                                </TableRow>
                            </TableHeader>

                            <TableBody>
                                {paginated.length === 0 ? (
                                    <TableRow>
                                        <TableCell
                                            colSpan={9}
                                            className="py-16 text-center text-sm text-slate-400"
                                        >
                                            No products match your filters.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    paginated.map((product) => (
                                        <TableRow
                                            key={product.id}
                                            className="transition-colors hover:bg-slate-50"
                                        >
                                            <TableCell className="pl-4">
                                                <Checkbox
                                                    checked={selectedIds.has(product.id)}
                                                    onCheckedChange={() => toggleOne(product.id)}
                                                    aria-label={`Select ${product.name}`}
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex items-center gap-3">
                                                    <ProductAvatar name={product.name} />
                                                    <div>
                                                        <p className="text-sm font-medium text-slate-800">
                                                            {product.name}
                                                        </p>
                                                        {product.isBestseller && (
                                                            <span className="mt-0.5 inline-block rounded-md bg-yellow-100 px-2 py-0.5 text-xs font-semibold text-yellow-700">
                                                                Bestseller
                                                            </span>
                                                        )}
                                                    </div>
                                                </div>
                                            </TableCell>

                                            <TableCell className="text-sm text-slate-500">
                                                {product.sku}
                                            </TableCell>

                                            <TableCell className="text-sm text-slate-700">
                                                {product.category}
                                            </TableCell>

                                            <TableCell className="text-sm text-slate-700">
                                                {product.brand}
                                            </TableCell>

                                            <TableCell className="text-sm font-semibold text-slate-800">
                                                ₹{product.price.toLocaleString("en-IN")}
                                            </TableCell>

                                            <TableCell>
                                                <StockCell stock={product.stock} />
                                            </TableCell>

                                            <TableCell>
                                                <StatusBadge status={product.status} />
                                            </TableCell>

                                            <TableCell className="pr-4 text-right">
                                                <div className="flex justify-end gap-1">

                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-lg text-slate-400 hover:bg-blue-50 hover:text-blue-600"
                                                        aria-label="View product"
                                                    >
                                                        <Eye className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-lg text-slate-400 hover:bg-emerald-50 hover:text-emerald-600"
                                                        aria-label="Edit product"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </Button>

                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="h-8 w-8 rounded-lg text-slate-400 hover:bg-red-50 hover:text-red-600"
                                                        aria-label="Delete product"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>

                                                </div>
                                            </TableCell>

                                        </TableRow>
                                    ))
                                )}
                            </TableBody>

                        </Table>
                    </div>

                    {/* ── Pagination ── */}
                    <div className="flex items-center justify-between border-t border-slate-100 px-4 py-3">

                        <p className="text-sm text-slate-500">
                            {filtered.length === 0 ? (
                                "No products found"
                            ) : (
                                <>
                                    Showing{" "}
                                    <span className="font-medium text-slate-700">
                                        {(currentPage - 1) * ITEMS_PER_PAGE + 1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-medium text-slate-700">
                                        {Math.min(currentPage * ITEMS_PER_PAGE, filtered.length)}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-medium text-slate-700">
                                        {filtered.length}
                                    </span>{" "}
                                    products
                                </>
                            )}
                        </p>

                        <div className="flex items-center gap-1">

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg border-slate-200"
                                onClick={() => goToPage(currentPage - 1)}
                                disabled={currentPage === 1}
                                aria-label="Previous page"
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>

                            {pageNumbers().map((p, i) =>
                                p === "…" ? (
                                    <span
                                        key={`ellipsis-${i}`}
                                        className="flex h-8 w-8 items-center justify-center text-sm text-slate-400"
                                    >
                                        …
                                    </span>
                                ) : (
                                    <Button
                                        key={p}
                                        size="icon"
                                        variant={p === currentPage ? "default" : "outline"}
                                        className={`h-8 w-8 rounded-lg text-sm ${p === currentPage
                                                ? "bg-green-700 hover:bg-green-800"
                                                : "border-slate-200"
                                            }`}
                                        onClick={() => goToPage(p as number)}
                                        aria-label={`Page ${p}`}
                                        aria-current={p === currentPage ? "page" : undefined}
                                    >
                                        {p}
                                    </Button>
                                ),
                            )}

                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-lg border-slate-200"
                                onClick={() => goToPage(currentPage + 1)}
                                disabled={currentPage === totalPages}
                                aria-label="Next page"
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>

                        </div>
                    </div>

                </CardContent>
            </Card>
        </div>
    );
}

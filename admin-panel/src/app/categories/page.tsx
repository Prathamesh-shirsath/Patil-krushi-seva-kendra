"use client";

import { useMemo, useState } from "react";

import {
    Plus,
    Search,
    Tag,
    CheckCircle2,
    XCircle,
    Package,
    Eye,
    Pencil,
} from "lucide-react";

import DashboardLayout from "@/components/layout/dashboard-layout";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { useCategories } from "@/hooks/use-categories";

import AddCategoryModal from "@/components/dialogs/AddCategoryModal";
import CategoryViewDialog from "@/components/dialogs/category-view-dialog";
import CategoryEditDialog from "@/components/dialogs/category-edit-dialog";

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

export default function CategoriesPage() {
    const {
        data: categoryData,
        isLoading,
        isError,
    } = useCategories();

    const categories: Category[] =
        Array.isArray(categoryData)
            ? categoryData
            : [];

    const [search, setSearch] = useState("");

    const [statusFilter, setStatusFilter] =
        useState("all");

    const [addOpen, setAddOpen] =
        useState(false);

    const [viewCategory, setViewCategory] =
        useState<Category | null>(null);

    const [editCategory, setEditCategory] =
        useState<Category | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Filter categories
    |--------------------------------------------------------------------------
    */

    const filteredCategories = useMemo(() => {
        const keyword =
            search.trim().toLowerCase();

        return categories.filter(
            (category) => {
                const matchesSearch =
                    !keyword ||
                    category.name
                        .toLowerCase()
                        .includes(keyword) ||
                    category.slug
                        .toLowerCase()
                        .includes(keyword);

                const active =
                    category.status !== false;

                const matchesStatus =
                    statusFilter === "all" ||
                    (statusFilter ===
                        "active" &&
                        active) ||
                    (statusFilter ===
                        "inactive" &&
                        !active);

                return (
                    matchesSearch &&
                    matchesStatus
                );
            }
        );
    }, [
        categories,
        search,
        statusFilter,
    ]);

    /*
    |--------------------------------------------------------------------------
    | Statistics
    |--------------------------------------------------------------------------
    */

    const totalCategories =
        categories.length;

    const activeCategories =
        categories.filter(
            (category) =>
                category.status !== false
        ).length;

    const inactiveCategories =
        categories.filter(
            (category) =>
                category.status === false
        ).length;

    const totalProducts =
        categories.reduce(
            (total, category) =>
                total +
                (category._count?.products ??
                    0),
            0
        );

    return (
        <DashboardLayout>
            <div className="min-w-0 space-y-6">

                {/* ================================================= */}
                {/* PAGE HEADER */}
                {/* ================================================= */}

                <Card className="overflow-hidden rounded-3xl border border-emerald-100 bg-white shadow-sm">

                    <div className="bg-gradient-to-br from-emerald-50 via-white to-green-50 p-5 sm:p-7 lg:p-8">

                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                            <div className="min-w-0">

                                <div className="mb-3 flex items-center gap-2">

                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700">
                                        <Tag className="h-5 w-5" />
                                    </div>

                                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-emerald-700 sm:text-xs">
                                        Category Management
                                    </span>

                                </div>

                                <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                                    Categories Management
                                </h1>

                                <p className="mt-2 max-w-2xl text-sm text-slate-500 sm:text-base">
                                    Manage agricultural product
                                    categories, status and
                                    category information.
                                </p>

                            </div>

                            {/* ADD CATEGORY */}

                            <Button
                                type="button"
                                className="
                                    h-11
                                    w-full
                                    rounded-xl
                                    bg-emerald-600
                                    px-5
                                    font-semibold
                                    text-white
                                    shadow-sm
                                    hover:bg-emerald-700
                                    sm:w-auto
                                "
                                onClick={() =>
                                    setAddOpen(true)
                                }
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Category
                            </Button>

                        </div>

                    </div>

                </Card>

                {/* ================================================= */}
                {/* STATISTICS */}
                {/* ================================================= */}

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">

                    <StatCard
                        title="Total Categories"
                        value={
                            totalCategories
                        }
                        subtitle="All categories"
                        icon={Tag}
                        iconClass="bg-emerald-50 text-emerald-600"
                    />

                    <StatCard
                        title="Active Categories"
                        value={
                            activeCategories
                        }
                        subtitle="Currently active"
                        icon={
                            CheckCircle2
                        }
                        iconClass="bg-green-50 text-green-600"
                    />

                    <StatCard
                        title="Inactive Categories"
                        value={
                            inactiveCategories
                        }
                        subtitle="Currently hidden"
                        icon={XCircle}
                        iconClass="bg-red-50 text-red-500"
                    />

                    <StatCard
                        title="Total Products"
                        value={
                            totalProducts
                        }
                        subtitle="Across categories"
                        icon={Package}
                        iconClass="bg-blue-50 text-blue-600"
                    />

                </div>

                {/* ================================================= */}
                {/* FILTER */}
                {/* ================================================= */}

                <Card className="rounded-3xl border border-slate-200 bg-white shadow-sm">

                    <div className="p-4 sm:p-5">

                        <div className="flex flex-col gap-3 md:flex-row">

                            <div className="relative min-w-0 flex-1">

                                <Search
                                    className="
                                        absolute
                                        left-3
                                        top-1/2
                                        h-4
                                        w-4
                                        -translate-y-1/2
                                        text-slate-400
                                    "
                                />

                                <Input
                                    value={search}
                                    onChange={(
                                        event
                                    ) =>
                                        setSearch(
                                            event
                                                .target
                                                .value
                                        )
                                    }
                                    placeholder="Search categories..."
                                    className="
                                        h-11
                                        rounded-xl
                                        border-slate-200
                                        pl-10
                                        focus-visible:border-emerald-500
                                        focus-visible:ring-emerald-100
                                    "
                                />

                            </div>

                            <Select
                                value={
                                    statusFilter
                                }
                                onValueChange={
                                    setStatusFilter
                                }
                            >

                                <SelectTrigger className="h-11 w-full rounded-xl md:w-[180px]">
                                    <SelectValue placeholder="Status" />
                                </SelectTrigger>

                                <SelectContent>

                                    <SelectItem value="all">
                                        All Status
                                    </SelectItem>

                                    <SelectItem value="active">
                                        Active
                                    </SelectItem>

                                    <SelectItem value="inactive">
                                        Inactive
                                    </SelectItem>

                                </SelectContent>

                            </Select>

                        </div>

                    </div>

                </Card>

                {/* ================================================= */}
                {/* LOADING */}
                {/* ================================================= */}

                {isLoading && (
                    <Card className="rounded-3xl border bg-white p-10 text-center">

                        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-emerald-600 border-t-transparent" />

                        <p className="mt-3 text-sm text-slate-500">
                            Loading categories...
                        </p>

                    </Card>
                )}

                {/* ================================================= */}
                {/* ERROR */}
                {/* ================================================= */}

                {isError && (
                    <Card className="rounded-3xl border border-red-200 bg-red-50 p-6">

                        <p className="font-semibold text-red-700">
                            Unable to load categories
                        </p>

                        <p className="mt-1 text-sm text-red-600">
                            Please refresh the page
                            and try again.
                        </p>

                    </Card>
                )}

                {/* ================================================= */}
                {/* CATEGORY TABLE */}
                {/* ================================================= */}

                {!isLoading &&
                    !isError && (
                        <Card className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">

                            {/* DESKTOP */}

                            <div className="hidden overflow-x-auto md:block">

                                <table className="w-full min-w-[800px]">

                                    <thead>

                                        <tr className="border-b bg-slate-50/80">

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Category
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Slug
                                            </th>

                                            <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Products
                                            </th>

                                            <th className="px-5 py-4 text-center text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-right text-xs font-bold uppercase tracking-wider text-slate-500">
                                                Actions
                                            </th>

                                        </tr>

                                    </thead>

                                    <tbody>

                                        {filteredCategories.map(
                                            (
                                                category
                                            ) => {

                                                const isActive =
                                                    category.status !==
                                                    false;

                                                return (
                                                    <tr
                                                        key={
                                                            category.id
                                                        }
                                                        className="
                                                            border-b
                                                            last:border-0
                                                            transition
                                                            hover:bg-emerald-50/30
                                                        "
                                                    >

                                                        {/* CATEGORY */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex items-center gap-3">

                                                                <CategoryImage
                                                                    category={
                                                                        category
                                                                    }
                                                                />

                                                                <div className="min-w-0">

                                                                    <p className="truncate font-semibold text-slate-900">
                                                                        {
                                                                            category.name
                                                                        }
                                                                    </p>

                                                                    <p className="mt-0.5 max-w-[300px] truncate text-xs text-slate-500">
                                                                        {
                                                                            category.description ||
                                                                            "No description provided"
                                                                        }
                                                                    </p>

                                                                </div>

                                                            </div>

                                                        </td>

                                                        {/* SLUG */}

                                                        <td className="px-5 py-4">

                                                            <span className="break-all font-mono text-sm text-slate-500">
                                                                {
                                                                    category.slug
                                                                }
                                                            </span>

                                                        </td>

                                                        {/* PRODUCTS */}

                                                        <td className="px-5 py-4 text-center">

                                                            <span className="font-semibold text-slate-800">
                                                                {
                                                                    category
                                                                        ._count
                                                                        ?.products ??
                                                                    0
                                                                }
                                                            </span>

                                                        </td>

                                                        {/* STATUS */}

                                                        <td className="px-5 py-4 text-center">

                                                            <StatusBadge
                                                                active={
                                                                    isActive
                                                                }
                                                            />

                                                        </td>

                                                        {/* ACTIONS */}

                                                        <td className="px-5 py-4">

                                                            <div className="flex justify-end gap-2">

                                                                <ActionButton
                                                                    label="View category"
                                                                    onClick={() =>
                                                                        setViewCategory(
                                                                            category
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </ActionButton>

                                                                <ActionButton
                                                                    label="Edit category"
                                                                    edit
                                                                    onClick={() =>
                                                                        setEditCategory(
                                                                            category
                                                                        )
                                                                    }
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </ActionButton>

                                                            </div>

                                                        </td>

                                                    </tr>
                                                );
                                            }
                                        )}

                                    </tbody>

                                </table>

                            </div>

                            {/* ================================================= */}
                            {/* MOBILE */}
                            {/* ================================================= */}

                            <div className="divide-y md:hidden">

                                {filteredCategories.map(
                                    (
                                        category
                                    ) => {

                                        const isActive =
                                            category.status !==
                                            false;

                                        return (
                                            <div
                                                key={
                                                    category.id
                                                }
                                                className="p-4"
                                            >

                                                <div className="flex items-start gap-3">

                                                    <CategoryImage
                                                        category={
                                                            category
                                                        }
                                                    />

                                                    <div className="min-w-0 flex-1">

                                                        <div className="flex items-start justify-between gap-2">

                                                            <div className="min-w-0">

                                                                <h3 className="truncate font-semibold text-slate-900">
                                                                    {
                                                                        category.name
                                                                    }
                                                                </h3>

                                                                <p className="mt-1 truncate font-mono text-xs text-slate-400">
                                                                    {
                                                                        category.slug
                                                                    }
                                                                </p>

                                                            </div>

                                                            <StatusBadge
                                                                active={
                                                                    isActive
                                                                }
                                                            />

                                                        </div>

                                                        <div className="mt-3 flex items-center justify-between gap-3">

                                                            <span className="text-sm text-slate-500">
                                                                {
                                                                    category
                                                                        ._count
                                                                        ?.products ??
                                                                    0
                                                                }{" "}
                                                                products
                                                            </span>

                                                            <div className="flex gap-2">

                                                                <ActionButton
                                                                    label="View"
                                                                    onClick={() =>
                                                                        setViewCategory(
                                                                            category
                                                                        )
                                                                    }
                                                                >
                                                                    <Eye className="h-4 w-4" />
                                                                </ActionButton>

                                                                <ActionButton
                                                                    label="Edit"
                                                                    edit
                                                                    onClick={() =>
                                                                        setEditCategory(
                                                                            category
                                                                        )
                                                                    }
                                                                >
                                                                    <Pencil className="h-4 w-4" />
                                                                </ActionButton>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                            </div>
                                        );
                                    }
                                )}

                            </div>

                            {/* EMPTY */}

                            {filteredCategories.length ===
                                0 && (
                                    <div className="px-6 py-16 text-center">

                                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                                            <Tag className="h-6 w-6 text-slate-400" />
                                        </div>

                                        <h3 className="mt-4 font-semibold text-slate-900">
                                            No categories found
                                        </h3>

                                        <p className="mt-1 text-sm text-slate-500">
                                            Try changing
                                            your search
                                            or filter.
                                        </p>

                                        {search ||
                                            statusFilter !==
                                            "all" ? (
                                            <Button
                                                type="button"
                                                variant="outline"
                                                className="mt-4 rounded-xl"
                                                onClick={() => {
                                                    setSearch(
                                                        ""
                                                    );
                                                    setStatusFilter(
                                                        "all"
                                                    );
                                                }}
                                            >
                                                Clear Filters
                                            </Button>
                                        ) : (
                                            <Button
                                                type="button"
                                                className="mt-4 rounded-xl bg-emerald-600 hover:bg-emerald-700"
                                                onClick={() =>
                                                    setAddOpen(
                                                        true
                                                    )
                                                }
                                            >
                                                <Plus className="mr-2 h-4 w-4" />
                                                Add Category
                                            </Button>
                                        )}

                                    </div>
                                )}

                        </Card>
                    )}

                {/* ================================================= */}
                {/* ADD CATEGORY */}
                {/* ================================================= */}

                <AddCategoryModal
                    open={addOpen}
                    onOpenChange={setAddOpen}
                />

                {/* ================================================= */}
                {/* VIEW CATEGORY */}
                {/* ================================================= */}

                <CategoryViewDialog
                    category={
                        viewCategory
                    }
                    open={
                        !!viewCategory
                    }
                    onOpenChange={(
                        open
                    ) => {
                        if (!open) {
                            setViewCategory(
                                null
                            );
                        }
                    }}
                    onEdit={(
                        category
                    ) => {
                        setViewCategory(
                            null
                        );

                        setEditCategory(
                            category
                        );
                    }}
                />

                {/* ================================================= */}
                {/* EDIT CATEGORY */}
                {/* ================================================= */}

                <CategoryEditDialog
                    category={
                        editCategory
                    }
                    open={
                        !!editCategory
                    }
                    onOpenChange={(
                        open
                    ) => {
                        if (!open) {
                            setEditCategory(
                                null
                            );
                        }
                    }}
                />

            </div>
        </DashboardLayout>
    );
}

/* ============================================================= */
/* STAT CARD */
/* ============================================================= */

function StatCard({
    title,
    value,
    subtitle,
    icon: Icon,
    iconClass,
}: {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ElementType;
    iconClass: string;
}) {
    return (
        <Card
            className="
                rounded-3xl
                border
                border-slate-200
                bg-white
                p-5
                shadow-sm
                transition
                hover:-translate-y-0.5
                hover:shadow-md
                sm:p-6
            "
        >

            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">

                    <p className="text-sm font-medium text-slate-500">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                        {value}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                        {subtitle}
                    </p>

                </div>

                <div
                    className={`
                        flex
                        h-12
                        w-12
                        shrink-0
                        items-center
                        justify-center
                        rounded-2xl
                        ${iconClass}
                    `}
                >
                    <Icon className="h-6 w-6" />
                </div>

            </div>

        </Card>
    );
}

/* ============================================================= */
/* CATEGORY IMAGE */
/* ============================================================= */

function CategoryImage({
    category,
}: {
    category: Category;
}) {
    if (!category.image) {
        return (
            <div
                className="
                    flex
                    h-12
                    w-12
                    shrink-0
                    items-center
                    justify-center
                    rounded-xl
                    bg-emerald-50
                    text-sm
                    font-bold
                    uppercase
                    text-emerald-700
                "
            >
                {category.name
                    .slice(0, 2)
                    .toUpperCase()}
            </div>
        );
    }

    return (
        <img
            src={category.image}
            alt={category.name}
            className="
                h-12
                w-12
                shrink-0
                rounded-xl
                border
                border-slate-200
                object-cover
            "
        />
    );
}

/* ============================================================= */
/* STATUS */
/* ============================================================= */

function StatusBadge({
    active,
}: {
    active: boolean;
}) {
    if (active) {
        return (
            <Badge
                className="
                    rounded-full
                    border
                    border-emerald-200
                    bg-emerald-50
                    px-3
                    py-1
                    text-emerald-700
                    hover:bg-emerald-50
                "
            >
                <CheckCircle2 className="mr-1 h-3.5 w-3.5" />
                Active
            </Badge>
        );
    }

    return (
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
            <XCircle className="mr-1 h-3.5 w-3.5" />
            Inactive
        </Badge>
    );
}

/* ============================================================= */
/* ACTION BUTTON */
/* ============================================================= */

function ActionButton({
    children,
    onClick,
    label,
    edit = false,
}: {
    children: React.ReactNode;
    onClick: () => void;
    label: string;
    edit?: boolean;
}) {
    return (
        <Button
            type="button"
            variant="outline"
            size="icon"
            aria-label={label}
            title={label}
            onClick={onClick}
            className={
                edit
                    ? `
                        h-9
                        w-9
                        rounded-xl
                        border-emerald-200
                        text-emerald-600
                        hover:bg-emerald-50
                        hover:text-emerald-700
                    `
                    : `
                        h-9
                        w-9
                        rounded-xl
                        border-blue-200
                        text-blue-600
                        hover:bg-blue-50
                        hover:text-blue-700
                    `
            }
        >
            {children}
        </Button>
    );
}
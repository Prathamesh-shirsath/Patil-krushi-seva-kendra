"use client";

import AddCategoryModal from "@/components/admin/AddCategoryModal";
import DashboardLayout from "@/components/layout/dashboard-layout";

import {
    Search,
    Eye,
    Pencil,
    Trash2,
    Tag,
    Package,
    CheckCircle,
    XCircle,
} from "lucide-react";

const categories = [
    {
        id: 1,
        name: "Seeds",
        slug: "seeds",
        products: 24,
        status: "Active",
    },
    {
        id: 2,
        name: "Fertilizers",
        slug: "fertilizers",
        products: 18,
        status: "Active",
    },
    {
        id: 3,
        name: "Pesticides",
        slug: "pesticides",
        products: 28,
        status: "Active",
    },
    {
        id: 4,
        name: "Organic Products",
        slug: "organic-products",
        products: 15,
        status: "Inactive",
    },
];

export default function CategoriesPage() {
    return (
        <DashboardLayout>
            <div className="space-y-6">

                {/* Header */}
                <div className="rounded-3xl border border-green-100 bg-white/80 backdrop-blur-md p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-800">
                            Categories Management
                        </h1>

                        <p className="mt-1 text-slate-500">
                            Manage all agricultural product categories
                        </p>
                    </div>

                    <AddCategoryModal />
                </div>

                {/* Stats */}
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                    <StatCard
                        title="Total Categories"
                        value="24"
                        icon={<Tag size={24} />}
                    />

                    <StatCard
                        title="Active Categories"
                        value="22"
                        icon={<CheckCircle size={24} />}
                    />

                    <StatCard
                        title="Inactive Categories"
                        value="2"
                        icon={<XCircle size={24} />}
                    />

                    <StatCard
                        title="Total Products"
                        value="120"
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

                        <input
                            placeholder="Search categories..."
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <select className="rounded-2xl border border-slate-200 px-4 py-3">
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Inactive</option>
                    </select>
                </div>

                {/* Table */}
                <div className="overflow-hidden rounded-3xl border border-green-100 bg-white/80 backdrop-blur-md shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead className="bg-slate-50">
                                <tr>
                                    <th className="p-5 text-left text-sm font-semibold">
                                        Category
                                    </th>

                                    <th className="p-5 text-left text-sm font-semibold">
                                        Slug
                                    </th>

                                    <th className="p-5 text-left text-sm font-semibold">
                                        Products
                                    </th>

                                    <th className="p-5 text-left text-sm font-semibold">
                                        Status
                                    </th>

                                    <th className="p-5 text-right text-sm font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {categories.map((category) => (
                                    <tr
                                        key={category.id}
                                        className="border-t hover:bg-green-50 transition-all"
                                    >
                                        <td className="p-5">
                                            <div className="flex items-center gap-3">

                                                <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg">
                                                    <Tag size={20} />
                                                </div>

                                                <div>
                                                    <p className="font-semibold text-slate-800">
                                                        {category.name}
                                                    </p>

                                                    <p className="text-sm text-slate-500">
                                                        {category.products} Products
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="p-5 text-slate-500">
                                            {category.slug}
                                        </td>

                                        <td className="p-5 font-medium">
                                            {category.products}
                                        </td>

                                        <td className="p-5">
                                            <span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${category.status === "Active"
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-red-100 text-red-600"
                                                    }`}
                                            >
                                                {category.status}
                                            </span>
                                        </td>

                                        <td className="p-5">
                                            <div className="flex justify-end gap-2">

                                                <button className="h-10 w-10 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center">
                                                    <Eye size={18} />
                                                </button>

                                                <button className="h-10 w-10 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 flex items-center justify-center">
                                                    <Pencil size={18} />
                                                </button>

                                                <button className="h-10 w-10 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center">
                                                    <Trash2 size={18} />
                                                </button>

                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}

function StatCard({
    title,
    value,
    icon,
}: {
    title: string;
    value: string;
    icon: React.ReactNode;
}) {
    return (
        <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm hover:shadow-xl transition-all">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm text-slate-500">{title}</p>

                    <h3 className="mt-2 text-3xl font-bold text-slate-800">
                        {value}
                    </h3>
                </div>

                <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg">
                    {icon}
                </div>
            </div>
        </div>
    );
}
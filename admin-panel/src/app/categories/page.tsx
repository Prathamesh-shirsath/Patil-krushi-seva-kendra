"use client";

import { useState } from "react";
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
import { useCategories, useUpdateCategory, useDeleteCategory } from "@/hooks/use-categories";
import { Category } from "@/services/category.service";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { toast } from "sonner";

export default function CategoriesPage() {
    const { data: categories = [], isLoading } = useCategories();
    const { mutate: updateCategory, isPending: isUpdating } = useUpdateCategory();
    const { mutate: deleteCategory, isPending: isDeleting } = useDeleteCategory();

    // Local state for Search and Filter
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("All Status");

    // Modal state for View
    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
    const [viewOpen, setViewOpen] = useState(false);

    // Modal state for Edit
    const [editCategory, setEditCategory] = useState<Category | null>(null);
    const [editOpen, setEditOpen] = useState(false);
    const [editName, setEditName] = useState("");
    const [editSlug, setEditSlug] = useState("");
    const [editDescription, setEditDescription] = useState("");
    const [editStatus, setEditStatus] = useState(true);
    const [editImageFile, setEditImageFile] = useState<File | null>(null);
    const [editPreview, setEditPreview] = useState<string | null>(null);

    // Modal state for Delete
    const [deleteId, setDeleteId] = useState<string | null>(null);
    const [deleteOpen, setDeleteOpen] = useState(false);

    // Compute stats
    const totalCategories = categories.length;
    const activeCategories = categories.filter((c) => c.status).length;
    const inactiveCategories = totalCategories - activeCategories;
    // Sum total products from categories if products array or _count exists
    const totalProducts = categories.reduce((sum, c) => {
        const count = c.products?.length || c._count?.products || 0;
        return sum + count;
    }, 0);

    // Filter categories based on search query and status filter
    const filteredCategories = categories.filter((category) => {
        const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            category.slug.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "All Status" ||
            (statusFilter === "Active" && category.status) ||
            (statusFilter === "Inactive" && !category.status);

        return matchesSearch && matchesStatus;
    });

    // Handle Edit Submit
    const handleUpdate = () => {
        if (!editCategory) return;
        if (!editName.trim()) {
            toast.error("Category name is required");
            return;
        }

        const formData = new FormData();
        formData.append("name", editName);
        formData.append("slug", editSlug || editName.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
        formData.append("description", editDescription);
        formData.append("status", String(editStatus));
        if (editImageFile) {
            formData.append("image", editImageFile);
        }

        updateCategory(
            { id: editCategory.id, formData },
            {
                onSuccess: () => {
                    toast.success("Category updated successfully!");
                    setEditOpen(false);
                    setEditCategory(null);
                    setEditImageFile(null);
                    setEditPreview(null);
                },
                onError: (err) => {
                    console.error(err);
                    toast.error("Failed to update category");
                },
            }
        );
    };

    // Handle Delete Confirm
    const handleDelete = () => {
        if (!deleteId) return;

        deleteCategory(deleteId, {
            onSuccess: () => {
                toast.success("Category deleted successfully!");
                setDeleteOpen(false);
                setDeleteId(null);
            },
            onError: (err) => {
                console.error(err);
                toast.error("Failed to delete category");
            },
        });
    };

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
                        value={isLoading ? "..." : String(totalCategories)}
                        icon={<Tag size={24} />}
                    />

                    <StatCard
                        title="Active Categories"
                        value={isLoading ? "..." : String(activeCategories)}
                        icon={<CheckCircle size={24} />}
                    />

                    <StatCard
                        title="Inactive Categories"
                        value={isLoading ? "..." : String(inactiveCategories)}
                        icon={<XCircle size={24} />}
                    />

                    <StatCard
                        title="Total Products"
                        value={isLoading ? "..." : String(totalProducts)}
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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full rounded-2xl border border-slate-200 bg-slate-50 pl-10 pr-4 py-3 focus:bg-white focus:ring-2 focus:ring-green-500 outline-none"
                        />
                    </div>

                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="rounded-2xl border border-slate-200 px-4 py-3 outline-none"
                    >
                        <option value="All Status">All Status</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
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
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="p-10 text-center font-medium text-slate-500">
                                            Loading categories...
                                        </td>
                                    </tr>
                                ) : filteredCategories.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="p-10 text-center font-medium text-slate-500">
                                            No categories found
                                        </td>
                                    </tr>
                                ) : (
                                    filteredCategories.map((category) => {
                                        const prodCount = category.products?.length || category._count?.products || 0;
                                        return (
                                            <tr
                                                key={category.id}
                                                className="border-t hover:bg-green-50 transition-all"
                                            >
                                                <td className="p-5">
                                                    <div className="flex items-center gap-3">
                                                        {category.image ? (
                                                            <img
                                                                src={category.image}
                                                                alt={category.name}
                                                                className="h-12 w-12 rounded-2xl object-cover border shadow-sm"
                                                            />
                                                        ) : (
                                                            <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg">
                                                                <Tag size={20} />
                                                            </div>
                                                        )}

                                                        <div>
                                                            <p className="font-semibold text-slate-800">
                                                                {category.name}
                                                            </p>

                                                            <p className="text-sm text-slate-500">
                                                                {prodCount} Products
                                                            </p>
                                                        </div>
                                                    </div>
                                                </td>

                                                <td className="p-5 text-slate-500">
                                                    {category.slug}
                                                </td>

                                                <td className="p-5 font-medium">
                                                    {prodCount}
                                                </td>

                                                <td className="p-5">
                                                    <span
                                                        className={`px-3 py-1 rounded-full text-sm font-medium ${category.status
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-red-100 text-red-600"
                                                            }`}
                                                    >
                                                        {category.status ? "Active" : "Inactive"}
                                                    </span>
                                                </td>

                                                <td className="p-5">
                                                    <div className="flex justify-end gap-2">

                                                        <button
                                                            onClick={() => {
                                                                setSelectedCategory(category);
                                                                setViewOpen(true);
                                                            }}
                                                            className="h-10 w-10 rounded-xl border border-blue-200 text-blue-600 hover:bg-blue-50 flex items-center justify-center transition-all"
                                                        >
                                                            <Eye size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setEditCategory(category);
                                                                setEditName(category.name);
                                                                setEditSlug(category.slug);
                                                                setEditDescription(category.description || "");
                                                                setEditStatus(category.status);
                                                                setEditPreview(category.image || null);
                                                                setEditOpen(true);
                                                            }}
                                                            className="h-10 w-10 rounded-xl border border-green-200 text-green-600 hover:bg-green-50 flex items-center justify-center transition-all"
                                                        >
                                                            <Pencil size={18} />
                                                        </button>

                                                        <button
                                                            onClick={() => {
                                                                setDeleteId(category.id);
                                                                setDeleteOpen(true);
                                                            }}
                                                            className="h-10 w-10 rounded-xl border border-red-200 text-red-600 hover:bg-red-50 flex items-center justify-center transition-all"
                                                        >
                                                            <Trash2 size={18} />
                                                        </button>

                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {/* View Modal */}
            <Dialog open={viewOpen} onOpenChange={setViewOpen}>
                <DialogContent className="max-w-md rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Category Details</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                            Viewing detailed information about this category.
                        </DialogDescription>
                    </DialogHeader>

                    {selectedCategory && (
                        <div className="space-y-4 mt-2">
                            <div className="flex justify-center">
                                {selectedCategory.image ? (
                                    <img
                                        src={selectedCategory.image}
                                        alt={selectedCategory.name}
                                        className="h-32 w-32 object-contain rounded-2xl border bg-gray-50 p-2 shadow-sm"
                                    />
                                ) : (
                                    <div className="h-32 w-32 rounded-2xl bg-gradient-to-br from-green-500 to-emerald-600 text-white flex items-center justify-center shadow-lg">
                                        <Tag size={48} />
                                    </div>
                                )}
                            </div>

                            <div className="border-t pt-4 space-y-2">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Name</span>
                                    <p className="font-semibold text-slate-800 text-lg">{selectedCategory.name}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Slug</span>
                                    <p className="font-mono text-sm text-slate-600">{selectedCategory.slug}</p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Description</span>
                                    <p className="text-slate-600 text-sm whitespace-pre-line leading-relaxed">
                                        {selectedCategory.description || "No description provided."}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Status</span>
                                    <div>
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-medium inline-block mt-1 ${selectedCategory.status
                                                ? "bg-green-100 text-green-700"
                                                : "bg-red-100 text-red-600"
                                                }`}
                                        >
                                            {selectedCategory.status ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Edit Modal */}
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
                <DialogContent className="max-w-2xl rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Edit Category</DialogTitle>
                        <DialogDescription className="text-sm text-gray-500">
                            Modify the details of this agricultural category.
                        </DialogDescription>
                    </DialogHeader>

                    {editCategory && (
                        <div className="space-y-5 mt-2">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category Name</label>
                                <input
                                    placeholder="Category Name"
                                    value={editName}
                                    onChange={(e) => {
                                        setEditName(e.target.value);
                                        setEditSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""));
                                    }}
                                    className="w-full border rounded-xl p-3 mt-1.5 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Slug</label>
                                <input
                                    placeholder="Slug"
                                    value={editSlug}
                                    onChange={(e) => setEditSlug(e.target.value)}
                                    className="w-full border rounded-xl p-3 mt-1.5 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Description</label>
                                <textarea
                                    placeholder="Description"
                                    value={editDescription}
                                    onChange={(e) => setEditDescription(e.target.value)}
                                    className="w-full border rounded-xl p-3 h-28 mt-1.5 outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Category Image</label>
                                <input
                                    type="file"
                                    accept="image/*"
                                    className="block mt-2"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (!file) return;
                                        setEditImageFile(file);
                                        setEditPreview(URL.createObjectURL(file));
                                    }}
                                />
                                {editPreview && (
                                    <div className="relative mt-4 h-40 w-full rounded-xl overflow-hidden border">
                                        <img
                                            src={editPreview}
                                            alt="preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1.5">Status</label>
                                <select
                                    value={String(editStatus)}
                                    onChange={(e) => setEditStatus(e.target.value === "true")}
                                    className="w-full border rounded-xl p-3 outline-none focus:ring-2 focus:ring-green-500"
                                >
                                    <option value="true">Active</option>
                                    <option value="false">Inactive</option>
                                </select>
                            </div>

                            <button
                                onClick={handleUpdate}
                                disabled={isUpdating}
                                className="w-full bg-green-600 text-white rounded-xl py-3 font-semibold disabled:opacity-55 hover:bg-green-700 transition"
                            >
                                {isUpdating ? "Updating..." : "Save Changes"}
                            </button>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Delete Dialog */}
            <Dialog open={deleteOpen} onOpenChange={setOpen => {
                if (!open) {
                    setDeleteOpen(false);
                    setDeleteId(null);
                }
            }}>
                <DialogContent className="max-w-md rounded-3xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-bold">Delete Category</DialogTitle>
                        <DialogDescription className="text-sm text-slate-500 mt-2">
                            Are you sure you want to delete this category? This action is permanent and cannot be undone.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="flex gap-3 justify-end mt-4">
                        <button
                            onClick={() => {
                                setDeleteOpen(false);
                                setDeleteId(null);
                            }}
                            className="px-4 py-2 border rounded-xl hover:bg-slate-50 transition font-semibold"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="px-4 py-2 bg-red-600 text-white rounded-xl hover:bg-red-700 transition font-semibold disabled:opacity-50"
                        >
                            {isDeleting ? "Deleting..." : "Delete"}
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
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
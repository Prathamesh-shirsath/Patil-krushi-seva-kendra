"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    ImageIcon,
    Loader2,
    Pencil,
    Save,
    Tag,
    Upload,
    X,
    CheckCircle2,
    AlertCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import { useUpdateCategory } from "@/hooks/use-categories";
import { toast } from "sonner";

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
}

interface Props {
    category: Category | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export default function CategoryEditDialog({
    category,
    open,
    onOpenChange,
}: Props) {
    const updateCategory = useUpdateCategory();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState(true);

    const [image, setImage] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);

    const [error, setError] = useState<string | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Load category
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        if (!category) return;

        setName(category.name ?? "");
        setDescription(category.description ?? "");
        setStatus(category.status !== false);

        setImage(null);
        setPreview(category.image ?? null);
        setError(null);
    }, [category]);

    /*
    |--------------------------------------------------------------------------
    | Cleanup preview URL
    |--------------------------------------------------------------------------
    */

    useEffect(() => {
        return () => {
            if (
                preview &&
                preview.startsWith("blob:")
            ) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    if (!open || !category) {
        return null;
    }

    /*
    |--------------------------------------------------------------------------
    | Slug preview
    |--------------------------------------------------------------------------
    */

    const slug = slugify(name);

    /*
    |--------------------------------------------------------------------------
    | Image change
    |--------------------------------------------------------------------------
    */

    function handleImageChange(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        const file = event.target.files?.[0];

        if (!file) return;

        if (!file.type.startsWith("image/")) {
            setError(
                "Please select a valid image."
            );
            return;
        }

        if (file.size > 5 * 1024 * 1024) {
            setError(
                "Image size must be less than 5 MB."
            );
            return;
        }

        setError(null);

        if (
            preview &&
            preview.startsWith("blob:")
        ) {
            URL.revokeObjectURL(preview);
        }

        setImage(file);
        setPreview(
            URL.createObjectURL(file)
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
    ) {
        event.preventDefault();

        if (!name.trim()) {
            setError(
                "Category name is required."
            );
            return;
        }

        if (name.trim().length < 2) {
            setError(
                "Category name must contain at least 2 characters."
            );
            return;
        }

        try {
            setError(null);

            const formData = new FormData();

            formData.append(
                "name",
                name.trim()
            );

            /*
             * Backend can generate slug from name.
             * We still send it for compatibility.
             */
            formData.append(
                "slug",
                slug
            );

            formData.append(
                "description",
                description.trim()
            );

            formData.append(
                "status",
                String(status)
            );

            if (image) {
                formData.append(
                    "image",
                    image
                );
            }

            /*
             * IMPORTANT:
             *
             * category.service.ts expects:
             *
             * updateCategory({
             *   id,
             *   formData
             * })
             */

            await updateCategory.mutateAsync({
                id: category.id,
                formData,
            });

            toast.success(
                "Category updated successfully."
            );

            onOpenChange(false);

        } catch (err: any) {
            console.error(
                "Category update error:",
                err
            );

            const message =
                err?.response?.data?.message ||
                err?.message ||
                "Failed to update category.";

            setError(message);

            toast.error(message);
        }
    }

    return (
        <div
            className="
                fixed
                inset-0
                z-[110]
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
                    if (
                        !updateCategory.isPending
                    ) {
                        onOpenChange(false);
                    }
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
                        shrink-0
                        border-b
                        border-emerald-100
                        bg-gradient-to-br
                        from-emerald-50
                        via-white
                        to-green-50
                    "
                >
                    <div className="flex items-start justify-between gap-4 p-5 sm:p-7">

                        <div className="flex min-w-0 items-center gap-4">

                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    shrink-0
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-emerald-100
                                    text-emerald-600
                                "
                            >
                                <Pencil className="h-5 w-5" />
                            </div>

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
                                    Category Management
                                </p>

                                <h2
                                    className="
                                        mt-1
                                        truncate
                                        text-xl
                                        font-bold
                                        tracking-tight
                                        text-slate-900
                                        sm:text-2xl
                                    "
                                >
                                    Edit Category
                                </h2>

                                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                                    Update category details,
                                    image and status.
                                </p>

                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={
                                updateCategory.isPending
                            }
                            onClick={() =>
                                onOpenChange(false)
                            }
                            className="
                                flex
                                h-9
                                w-9
                                shrink-0
                                items-center
                                justify-center
                                rounded-xl
                                border
                                border-slate-200
                                bg-white
                                text-slate-500
                                transition
                                hover:text-slate-900
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                            aria-label="Close"
                        >
                            <X className="h-4 w-4" />
                        </button>

                    </div>
                </div>

                {/* ================================================= */}
                {/* FORM */}
                {/* ================================================= */}

                <form
                    onSubmit={handleSubmit}
                    className="
                        flex
                        min-h-0
                        flex-1
                        flex-col
                    "
                >

                    <div
                        className="
                            min-h-0
                            flex-1
                            overflow-y-auto
                        "
                    >
                        <div className="space-y-5 p-4 sm:p-7">

                            {/* BASIC INFORMATION */}

                            <section
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-sm
                                "
                            >
                                <div
                                    className="
                                        border-b
                                        border-slate-200
                                        bg-slate-50/80
                                        px-4
                                        py-4
                                        sm:px-5
                                    "
                                >
                                    <div className="flex items-center gap-3">

                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-emerald-100
                                                text-emerald-600
                                            "
                                        >
                                            <Tag className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-900">
                                                Basic Information
                                            </h3>

                                            <p className="text-xs text-slate-500">
                                                Category identity
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="space-y-5 p-4 sm:p-5">

                                    {/* NAME */}

                                    <div>
                                        <Label
                                            htmlFor="edit-category-name"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Category Name
                                        </Label>

                                        <Input
                                            id="edit-category-name"
                                            value={name}
                                            onChange={(event) =>
                                                setName(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter category name"
                                            disabled={
                                                updateCategory.isPending
                                            }
                                            className="
                                                mt-2
                                                h-11
                                                rounded-xl
                                                border-slate-200
                                                focus-visible:border-emerald-500
                                                focus-visible:ring-emerald-100
                                            "
                                        />
                                    </div>

                                    {/* SLUG */}

                                    <div>
                                        <Label className="text-sm font-semibold text-slate-700">
                                            Slug
                                        </Label>

                                        <div
                                            className="
                                                mt-2
                                                overflow-hidden
                                                rounded-xl
                                                border
                                                border-slate-200
                                                bg-slate-50
                                                px-4
                                                py-3
                                            "
                                        >
                                            <span
                                                className="
                                                    break-all
                                                    font-mono
                                                    text-sm
                                                    text-slate-500
                                                "
                                            >
                                                {slug ||
                                                    "category-slug"}
                                            </span>
                                        </div>

                                        <p className="mt-1.5 text-xs text-slate-400">
                                            Automatically generated
                                            from category name.
                                        </p>
                                    </div>

                                    {/* DESCRIPTION */}

                                    <div>
                                        <Label
                                            htmlFor="edit-category-description"
                                            className="text-sm font-semibold text-slate-700"
                                        >
                                            Description
                                        </Label>

                                        <Textarea
                                            id="edit-category-description"
                                            value={
                                                description
                                            }
                                            onChange={(event) =>
                                                setDescription(
                                                    event.target.value
                                                )
                                            }
                                            placeholder="Enter category description..."
                                            disabled={
                                                updateCategory.isPending
                                            }
                                            className="
                                                mt-2
                                                min-h-[120px]
                                                resize-none
                                                rounded-xl
                                                border-slate-200
                                                focus-visible:border-emerald-500
                                                focus-visible:ring-emerald-100
                                            "
                                        />
                                    </div>

                                </div>
                            </section>

                            {/* IMAGE */}

                            <section
                                className="
                                    overflow-hidden
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    shadow-sm
                                "
                            >
                                <div
                                    className="
                                        border-b
                                        border-slate-200
                                        bg-slate-50/80
                                        px-4
                                        py-4
                                        sm:px-5
                                    "
                                >
                                    <div className="flex items-center gap-3">

                                        <div
                                            className="
                                                flex
                                                h-9
                                                w-9
                                                shrink-0
                                                items-center
                                                justify-center
                                                rounded-xl
                                                bg-violet-100
                                                text-violet-600
                                            "
                                        >
                                            <ImageIcon className="h-4 w-4" />
                                        </div>

                                        <div>
                                            <h3 className="font-semibold text-slate-900">
                                                Category Image
                                            </h3>

                                            <p className="text-xs text-slate-500">
                                                JPG, PNG or WEBP · Max 5 MB
                                            </p>
                                        </div>

                                    </div>
                                </div>

                                <div className="p-4 sm:p-5">

                                    <label
                                        htmlFor="edit-category-image"
                                        className="
                                            group
                                            relative
                                            flex
                                            min-h-[180px]
                                            cursor-pointer
                                            items-center
                                            justify-center
                                            overflow-hidden
                                            rounded-2xl
                                            border-2
                                            border-dashed
                                            border-slate-200
                                            bg-slate-50
                                            transition
                                            hover:border-emerald-400
                                            hover:bg-emerald-50/30
                                        "
                                    >

                                        {preview ? (
                                            <>
                                                <img
                                                    src={preview}
                                                    alt={
                                                        category.name
                                                    }
                                                    className="
                                                        absolute
                                                        inset-0
                                                        h-full
                                                        w-full
                                                        object-cover
                                                    "
                                                />

                                                <div
                                                    className="
                                                        absolute
                                                        inset-0
                                                        flex
                                                        items-center
                                                        justify-center
                                                        bg-slate-950/40
                                                        opacity-0
                                                        transition
                                                        group-hover:opacity-100
                                                    "
                                                >
                                                    <div
                                                        className="
                                                            rounded-xl
                                                            bg-white
                                                            px-4
                                                            py-2
                                                            text-sm
                                                            font-semibold
                                                            text-slate-800
                                                            shadow-lg
                                                        "
                                                    >
                                                        Change Image
                                                    </div>
                                                </div>
                                            </>
                                        ) : (
                                            <div className="text-center">

                                                <div
                                                    className="
                                                        mx-auto
                                                        flex
                                                        h-12
                                                        w-12
                                                        items-center
                                                        justify-center
                                                        rounded-xl
                                                        bg-white
                                                        text-slate-400
                                                        shadow-sm
                                                    "
                                                >
                                                    <Upload className="h-5 w-5" />
                                                </div>

                                                <p className="mt-3 text-sm font-semibold text-slate-700">
                                                    Upload category image
                                                </p>

                                                <p className="mt-1 text-xs text-slate-400">
                                                    Click to browse
                                                </p>

                                            </div>
                                        )}

                                        <input
                                            id="edit-category-image"
                                            type="file"
                                            accept="image/png,image/jpeg,image/webp"
                                            className="hidden"
                                            disabled={
                                                updateCategory.isPending
                                            }
                                            onChange={
                                                handleImageChange
                                            }
                                        />

                                    </label>

                                    {image && (
                                        <p className="mt-2 truncate text-xs text-slate-500">
                                            Selected: {image.name}
                                        </p>
                                    )}

                                </div>
                            </section>

                            {/* STATUS */}

                            <section
                                className="
                                    rounded-2xl
                                    border
                                    border-slate-200
                                    bg-white
                                    p-4
                                    shadow-sm
                                    sm:p-5
                                "
                            >
                                <div className="flex items-start justify-between gap-4">

                                    <div className="min-w-0">

                                        <div className="flex items-center gap-2">
                                            <p className="font-semibold text-slate-900">
                                                Category Status
                                            </p>

                                            {status ? (
                                                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                                            ) : (
                                                <AlertCircle className="h-4 w-4 text-red-500" />
                                            )}
                                        </div>

                                        <p className="mt-1 text-xs leading-5 text-slate-500">
                                            Active categories are
                                            visible to customers.
                                        </p>

                                    </div>

                                    <Checkbox
                                        checked={status}
                                        disabled={
                                            updateCategory.isPending
                                        }
                                        onCheckedChange={(
                                            checked
                                        ) =>
                                            setStatus(
                                                checked === true
                                            )
                                        }
                                        className="
                                            h-5
                                            w-5
                                            shrink-0
                                            rounded-md
                                            data-[state=checked]:border-emerald-600
                                            data-[state=checked]:bg-emerald-600
                                        "
                                    />

                                </div>

                                <div
                                    className={`
                                        mt-4
                                        rounded-xl
                                        px-4
                                        py-3
                                        text-sm
                                        font-medium
                                        ${status
                                            ? "bg-emerald-50 text-emerald-700"
                                            : "bg-red-50 text-red-600"
                                        }
                                    `}
                                >
                                    {status
                                        ? "This category is active."
                                        : "This category is inactive."}
                                </div>
                            </section>

                            {/* ERROR */}

                            {error && (
                                <div
                                    className="
                                        rounded-xl
                                        border
                                        border-red-200
                                        bg-red-50
                                        px-4
                                        py-3
                                        text-sm
                                        text-red-600
                                    "
                                >
                                    {error}
                                </div>
                            )}

                        </div>
                    </div>

                    {/* FOOTER */}

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
                        <div
                            className="
                                flex
                                flex-col-reverse
                                gap-3
                                sm:flex-row
                                sm:justify-end
                            "
                        >

                            <Button
                                type="button"
                                variant="outline"
                                disabled={
                                    updateCategory.isPending
                                }
                                onClick={() =>
                                    onOpenChange(false)
                                }
                                className="
                                    h-11
                                    rounded-xl
                                    px-6
                                "
                            >
                                <X className="mr-2 h-4 w-4" />
                                Cancel
                            </Button>

                            <Button
                                type="submit"
                                disabled={
                                    updateCategory.isPending ||
                                    !name.trim()
                                }
                                className="
                                    h-11
                                    rounded-xl
                                    bg-emerald-600
                                    px-7
                                    font-semibold
                                    text-white
                                    hover:bg-emerald-700
                                "
                            >
                                {updateCategory.isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save className="mr-2 h-4 w-4" />
                                        Save Changes
                                    </>
                                )}
                            </Button>

                        </div>
                    </div>

                </form>
            </div>
        </div>
    );
}

/*
|--------------------------------------------------------------------------
| Slug
|--------------------------------------------------------------------------
*/

function slugify(value: string) {
    return value
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
}
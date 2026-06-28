"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Package2,
    IndianRupee,
    ImageIcon,
    FileText,
} from "lucide-react";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Card } from "@/components/ui/card";

import { useCreateProduct } from "@/hooks/use-products";
import { useCategories } from "@/hooks/use-categories";

import {
    productFormSchema,
    type ProductFormValues,
} from "@/features/products/schemas/product.schema";

import { slugify } from "@/lib/utils";

interface Props {
    onSuccess: () => void;
}

function FieldError({
    message,
}: {
    message?: string;
}) {
    if (!message) return null;

    return (
        <p className="text-xs text-red-500 mt-1">
            {message}
        </p>
    );
}

export default function ProductForm({
    onSuccess,
}: Props) {

    const mutation =
        useCreateProduct();

    const {
        data: categories = [],
        isLoading: categoriesLoading,
    } = useCategories();

    const [
        selectedImage,
        setSelectedImage,
    ] =
        useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } =
        useForm<ProductFormValues>({
            resolver:
                zodResolver(
                    productFormSchema
                ),

            defaultValues: {
                name: "",
                brand: "",
                categoryId: "",
                image: "",
                images: "",
                price: 0,
                discountedPrice: "",
                description: "",
                uses: "",
                features: "",
                cropRecommendation: "",
                stock: 0,
                isActive: true,
            },
        });

    const categoryId =
        watch("categoryId");

    const isActive =
        watch("isActive");

    async function onSubmit(
        values: ProductFormValues
    ) {

        const formData =
            new FormData();

        formData.append(
            "name",
            values.name
        );

        formData.append(
            "slug",
            slugify(values.name)
        );

        formData.append(
            "brand",
            values.brand
        );

        formData.append(
            "categoryId",
            values.categoryId
        );

        formData.append(
            "price",
            values.price.toString()
        );

        formData.append(
            "description",
            values.description
        );

        formData.append(
            "uses",
            values.uses
        );

        formData.append(
            "stock",
            values.stock.toString()
        );

        if (values.discountedPrice) {
            formData.append(
                "discountedPrice",
                values.discountedPrice.toString()
            );
        }

        if (values.features) {
            formData.append(
                "features",
                values.features
            );
        }

        if (
            values.cropRecommendation
        ) {
            formData.append(
                "cropRecommendation",
                values.cropRecommendation
            );
        }

        formData.append(
            "isActive",
            values.isActive.toString()
        );

        if (selectedImage) {
            formData.append(
                "image",
                selectedImage
            );
        }

        await mutation.mutateAsync(
            formData
        );

        onSuccess();
    }

    return (

        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >

            {/* ================= BASIC INFO ================= */}

            <Card className="rounded-3xl border border-slate-200 shadow-sm">

                <div className="p-6 space-y-6">

                    <div className="flex items-center gap-4">

                        <div className="h-12 w-12 rounded-2xl bg-green-100 flex items-center justify-center">

                            <Package2 className="h-6 w-6 text-green-700" />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">

                                Basic Information

                            </h2>

                            <p className="text-sm text-slate-500">

                                Enter product identity details

                            </p>

                        </div>

                    </div>

                    <div className="grid gap-5 md:grid-cols-2">

                        <div className="md:col-span-2">

                            <Label>

                                Product Name

                            </Label>

                            <Input

                                placeholder="NPK Fertilizer"

                                className="mt-2 h-11 rounded-2xl"

                                {...register("name")}

                            />

                            <FieldError
                                message={errors.name?.message}
                            />

                            {watch("name") && (

                                <p className="mt-2 text-xs text-slate-500">

                                    Slug :

                                    <span className="ml-2 font-medium text-green-700">

                                        {slugify(
                                            watch("name")
                                        )}

                                    </span>

                                </p>

                            )}

                        </div>

                        <div>

                            <Label>

                                Brand

                            </Label>

                            <Input

                                placeholder="IFFCO"

                                className="mt-2 h-11 rounded-2xl"

                                {...register("brand")}

                            />

                            <FieldError
                                message={errors.brand?.message}
                            />

                        </div>

                        <div>

                            <Label>

                                Category

                            </Label>

                            <Select

                                value={categoryId}

                                onValueChange={(value) =>

                                    setValue(
                                        "categoryId",
                                        value,
                                        {
                                            shouldValidate: true,
                                        }
                                    )

                                }

                                disabled={
                                    categoriesLoading
                                }

                            >

                                <SelectTrigger className="mt-2 h-11 rounded-2xl">

                                    <SelectValue
                                        placeholder="Select Category"
                                    />

                                </SelectTrigger>

                                <SelectContent>

                                    {categories.map((cat) => (

                                        <SelectItem

                                            key={cat.id}

                                            value={cat.id}

                                        >

                                            {cat.name}

                                        </SelectItem>

                                    ))}

                                </SelectContent>

                            </Select>

                            <FieldError

                                message={
                                    errors.categoryId?.message
                                }

                            />

                        </div>

                    </div>

                </div>

            </Card>
            {/* ================= PRICING ================= */}

            <Card className="rounded-3xl border border-slate-200 shadow-sm">

                <div className="p-6 space-y-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">

                            <IndianRupee className="h-6 w-6 text-emerald-700" />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Pricing & Inventory
                            </h2>

                            <p className="text-sm text-slate-500">
                                Product pricing and stock information
                            </p>

                        </div>

                    </div>

                    <div className="grid gap-5 md:grid-cols-3">

                        <div>

                            <Label>Price (₹)</Label>

                            <Input
                                type="number"
                                className="mt-2 h-11 rounded-2xl"
                                {...register("price")}
                            />

                            <FieldError
                                message={errors.price?.message}
                            />

                        </div>

                        <div>

                            <Label>Discount Price</Label>

                            <Input
                                type="number"
                                className="mt-2 h-11 rounded-2xl"
                                {...register("discountedPrice")}
                            />

                            <FieldError
                                message={
                                    errors.discountedPrice?.message
                                }
                            />

                        </div>

                        <div>

                            <Label>Stock</Label>

                            <Input
                                type="number"
                                className="mt-2 h-11 rounded-2xl"
                                {...register("stock")}
                            />

                            <FieldError
                                message={errors.stock?.message}
                            />

                        </div>

                    </div>

                    <div className="rounded-2xl border bg-slate-50 p-4">

                        <div className="flex items-center gap-3">

                            <Checkbox
                                checked={isActive}
                                onCheckedChange={(checked) =>
                                    setValue(
                                        "isActive",
                                        checked === true
                                    )
                                }
                            />

                            <div>

                                <Label className="font-semibold">
                                    Publish Product
                                </Label>

                                <p className="text-sm text-slate-500">
                                    Product will be visible on website
                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            </Card>

            {/* ================= IMAGES ================= */}

            <Card className="rounded-3xl border border-slate-200 shadow-sm">

                <div className="p-6 space-y-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">

                            <ImageIcon className="h-6 w-6 text-violet-700" />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Product Images
                            </h2>

                            <p className="text-sm text-slate-500">
                                Upload product image
                            </p>

                        </div>

                    </div>

                    <div>

                        <Label>Main Image</Label>

                        <Input
                            type="file"
                            accept="image/*"
                            className="mt-2 rounded-2xl"
                            onChange={(e) => {

                                if (
                                    e.target.files?.[0]
                                ) {

                                    setSelectedImage(
                                        e.target.files[0]
                                    );

                                }

                            }}
                        />

                    </div>

                    {selectedImage && (

                        <div className="space-y-3">

                            <Label>
                                Preview
                            </Label>

                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Preview"
                                className="
                        h-48
                        w-48
                        rounded-3xl
                        border
                        object-cover
                        shadow-md
                    "
                            />

                        </div>

                    )}

                    <div>

                        <Label>
                            Additional Images
                        </Label>

                        <Input
                            placeholder="Comma separated image URLs"
                            className="mt-2 h-11 rounded-2xl"
                            {...register("images")}
                        />

                    </div>

                </div>

            </Card>
            {/* ================= PRODUCT DETAILS ================= */}

            <Card className="rounded-3xl border border-slate-200 shadow-sm">

                <div className="p-6 space-y-6">

                    <div className="flex items-center gap-4">

                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">

                            <FileText className="h-6 w-6 text-orange-700" />

                        </div>

                        <div>

                            <h2 className="text-lg font-semibold text-slate-900">
                                Product Details
                            </h2>

                            <p className="text-sm text-slate-500">
                                Complete information about this product
                            </p>

                        </div>

                    </div>

                    <div className="space-y-5">

                        <div>

                            <Label>Description</Label>

                            <Textarea
                                className="mt-2 min-h-32 rounded-2xl"
                                placeholder="Write detailed product description..."
                                {...register("description")}
                            />

                            <FieldError
                                message={errors.description?.message}
                            />

                        </div>

                        <div>

                            <Label>Uses</Label>

                            <Textarea
                                className="mt-2 min-h-28 rounded-2xl"
                                placeholder="How farmers should use this product..."
                                {...register("uses")}
                            />

                            <FieldError
                                message={errors.uses?.message}
                            />

                        </div>

                        <div className="grid gap-5 md:grid-cols-2">

                            <div>

                                <Label>Features</Label>

                                <Textarea
                                    className="mt-2 min-h-28 rounded-2xl"
                                    placeholder="Product features..."
                                    {...register("features")}
                                />

                            </div>

                            <div>

                                <Label>Crop Recommendation</Label>

                                <Textarea
                                    className="mt-2 min-h-28 rounded-2xl"
                                    placeholder="Recommended crops..."
                                    {...register("cropRecommendation")}
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </Card>

            {/* ================= ERROR ================= */}

            {mutation.isError && (

                <div
                    className="
            rounded-2xl
            border
            border-red-200
            bg-red-50
            p-4
            text-red-600
        "
                >

                    Failed to save product.
                    Please try again.

                </div>

            )}

            {/* ================= FOOTER ================= */}

            <div
                className="
        sticky
        bottom-0
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-5
        shadow-lg
    "
            >

                <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

                    <Button
                        type="button"
                        variant="outline"
                        className="rounded-2xl px-8"
                        onClick={onSuccess}
                    >
                        Cancel
                    </Button>

                    <Button
                        type="submit"
                        disabled={mutation.isPending}
                        className="
                rounded-2xl
                bg-green-700
                px-10
                hover:bg-green-800
            "
                    >
                        {mutation.isPending
                            ? "Saving..."
                            : "Save Product"}
                    </Button>

                </div>

            </div>

        </form>
    );
}
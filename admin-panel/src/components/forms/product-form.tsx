"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

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

function FieldError({ message }: { message?: string }) {
    if (!message) return null;
    return <p className="text-xs text-red-500">{message}</p>;
}

export default function ProductForm({ onSuccess }: Props) {
    const mutation = useCreateProduct();
    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    const [selectedImage, setSelectedImage] = useState<File | null>(null);





    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
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



    
    const categoryId = watch("categoryId");
    const isActive = watch("isActive");

    async function onSubmit(values: ProductFormValues) {

        const formData = new FormData();

        formData.append("name", values.name);
        formData.append("slug", slugify(values.name));
        formData.append("brand", values.brand);
        formData.append("categoryId", values.categoryId);
        formData.append("price", values.price.toString());
        formData.append("description", values.description);
        formData.append("uses", values.uses);
        formData.append("stock", values.stock.toString());

        if (values.discountedPrice) {
            formData.append(
                "discountedPrice",
                values.discountedPrice.toString()
            );
        }

        if (values.features) {
            formData.append("features", values.features);
        }

        if (values.cropRecommendation) {
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
            formData.append("image", selectedImage);
        }

        await mutation.mutateAsync(formData);

        onSuccess();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">

            {/* Basic Info */}
            <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Basic Information
                </p>

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-1.5 sm:col-span-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                            id="name"
                            placeholder="e.g. NPK Fertilizer 50kg"
                            className="h-10 rounded-xl"
                            aria-invalid={!!errors.name}
                            {...register("name")}
                        />
                        <FieldError message={errors.name?.message} />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="brand">Brand</Label>
                        <Input
                            id="brand"
                            placeholder="e.g. Krushi Gold"
                            className="h-10 rounded-xl"
                            aria-invalid={!!errors.brand}
                            {...register("brand")}
                        />
                        <FieldError message={errors.brand?.message} />
                    </div>

                    <div className="space-y-1.5">
                        <Label>Category</Label>
                        <Select
                            value={categoryId}
                            onValueChange={(v) =>
                                setValue("categoryId", v, { shouldValidate: true })
                            }
                            disabled={categoriesLoading}
                        >
                            <SelectTrigger className="h-10 w-full rounded-xl">
                                <SelectValue
                                    placeholder={
                                        categoriesLoading
                                            ? "Loading categories..."
                                            : "Select category"
                                    }
                                />
                            </SelectTrigger>
                            <SelectContent>
                                {categories.map((cat) => (
                                    <SelectItem key={cat.id} value={cat.id}>
                                        {cat.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FieldError message={errors.categoryId?.message} />
                    </div>
                </div>
            </div>

            {/* Pricing & Stock */}
            <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Pricing & Inventory
                </p>

                <div className="grid gap-4 sm:grid-cols-3">
                    <div className="space-y-1.5">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                            id="price"
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder="0"
                            className="h-10 rounded-xl"
                            aria-invalid={!!errors.price}
                            {...register("price")}
                        />
                        <FieldError message={errors.price?.message} />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="discountedPrice">Discounted Price (₹)</Label>
                        <Input
                            id="discountedPrice"
                            type="number"
                            min={0}
                            step="0.01"
                            placeholder="Optional"
                            className="h-10 rounded-xl"
                            aria-invalid={!!errors.discountedPrice}
                            {...register("discountedPrice")}
                        />
                        <FieldError message={errors.discountedPrice?.message} />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="stock">Stock</Label>
                        <Input
                            id="stock"
                            type="number"
                            min={0}
                            placeholder="0"
                            className="h-10 rounded-xl"
                            aria-invalid={!!errors.stock}
                            {...register("stock")}
                        />
                        <FieldError message={errors.stock?.message} />
                    </div>
                </div>

                <div className="flex items-center gap-2">
                    <Checkbox
                        id="isActive"
                        checked={isActive}
                        onCheckedChange={(checked) =>
                            setValue("isActive", checked === true)
                        }
                    />
                    <Label htmlFor="isActive" className="cursor-pointer font-normal">
                        Publish product (active)
                    </Label>
                </div>
            </div>

            {/* Media */}
            <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Images
                </p>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label>Product Image</Label>

                        <Input
                            type="file"
                            accept="image/*"
                            className="h-10 rounded-xl"
                            onChange={(e) => {
                                if (e.target.files?.[0]) {
                                    setSelectedImage(e.target.files[0]);
                                }
                            }}
                        />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="images">Additional Images</Label>
                        <Input
                            id="images"
                            placeholder="Comma-separated URLs (optional)"
                            className="h-10 rounded-xl"
                            {...register("images")}
                        />
                    </div>
                </div>
            </div>

            {/* Details */}
            <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Product Details
                </p>

                <div className="space-y-4">
                    <div className="space-y-1.5">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                            id="description"
                            placeholder="Describe the product..."
                            className="min-h-20 rounded-xl"
                            aria-invalid={!!errors.description}
                            {...register("description")}
                        />
                        <FieldError message={errors.description?.message} />
                    </div>

                    <div className="space-y-1.5">
                        <Label htmlFor="uses">Uses</Label>
                        <Textarea
                            id="uses"
                            placeholder="How is this product used?"
                            className="min-h-16 rounded-xl"
                            aria-invalid={!!errors.uses}
                            {...register("uses")}
                        />
                        <FieldError message={errors.uses?.message} />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-1.5">
                            <Label htmlFor="features">Features</Label>
                            <Textarea
                                id="features"
                                placeholder="Key features (optional)"
                                className="min-h-16 rounded-xl"
                                {...register("features")}
                            />
                        </div>

                        <div className="space-y-1.5">
                            <Label htmlFor="cropRecommendation">Crop Recommendation</Label>
                            <Textarea
                                id="cropRecommendation"
                                placeholder="Recommended crops (optional)"
                                className="min-h-16 rounded-xl"
                                {...register("cropRecommendation")}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {mutation.isError && (
                <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
                    Failed to save product. Please try again.
                </p>
            )}

            <div className="flex gap-3 pt-2">
                <Button
                    type="submit"
                    className="flex-1 h-11 rounded-xl bg-green-700 hover:bg-green-800"
                    disabled={mutation.isPending}
                >
                    {mutation.isPending ? "Saving..." : "Save Product"}
                </Button>
            </div>
        </form>
    );
}

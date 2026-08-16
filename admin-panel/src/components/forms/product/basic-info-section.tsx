"use client";

import { Package2 } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ProductFormValues } from "@/features/products/schemas/product.schema";
import { FieldError } from "./field-error";

interface Option {
    id: string;
    name: string;
}

interface BasicInfoSectionProps {
    form: UseFormReturn<ProductFormValues>;
    brands: Option[];
    categories: Option[];
    disabled?: boolean;
}

export function BasicInfoSection({
    form,
    brands,
    categories,
    disabled = false,
}: BasicInfoSectionProps) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = form;

    const brandId = watch("brandId");
    const categoryId = watch("categoryId");

    return (
        <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                        <Package2 className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                            Basic Information
                        </h2>

                        <p className="text-xs text-slate-500 sm:text-sm">
                            Enter product basic details.
                        </p>
                    </div>

                </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">

                <div className="grid gap-5 md:grid-cols-2">

                    {/* Product Name */}
                    <div className="md:col-span-2">
                        <Label
                            htmlFor="product-name"
                            className="text-sm font-medium text-slate-700"
                        >
                            Product Name
                        </Label>

                        <Input
                            id="product-name"
                            placeholder="Enter product name"
                            disabled={disabled}
                            className="mt-2 h-11 rounded-xl border-slate-200 focus-visible:ring-green-500"
                            {...register("name")}
                        />

                        <FieldError message={errors.name?.message} />
                    </div>

                    {/* Brand */}
                    <div>
                        <Label className="text-sm font-medium text-slate-700">
                            Brand
                        </Label>

                        <Select
                            disabled={disabled}
                            value={brandId || ""}
                            onValueChange={(value) =>
                                setValue("brandId", value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        >
                            <SelectTrigger className="mt-2 h-11 rounded-xl border-slate-200">
                                <SelectValue placeholder="Select Brand" />
                            </SelectTrigger>

                            <SelectContent>
                                {brands.map((brand) => (
                                    <SelectItem
                                        key={brand.id}
                                        value={brand.id}
                                    >
                                        {brand.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError message={errors.brandId?.message} />
                    </div>

                    {/* Category */}
                    <div>
                        <Label className="text-sm font-medium text-slate-700">
                            Category
                        </Label>

                        <Select
                            disabled={disabled}
                            value={categoryId || ""}
                            onValueChange={(value) =>
                                setValue("categoryId", value, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        >
                            <SelectTrigger className="mt-2 h-11 rounded-xl border-slate-200">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>

                            <SelectContent>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        <FieldError message={errors.categoryId?.message} />
                    </div>

                </div>

            </div>
        </Card>
    );
}
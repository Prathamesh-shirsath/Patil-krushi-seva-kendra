"use client";

import { IndianRupee } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { ProductFormValues } from "@/features/products/schemas/product.schema";

import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { FieldError } from "./field-error";

interface PricingSectionProps {
    form: UseFormReturn<ProductFormValues>;
    disabled?: boolean;
}

export function PricingSection({
    form,
    disabled = false,
}: PricingSectionProps) {
    const {
        register,
        watch,
        setValue,
        formState: { errors },
    } = form;

    const status = watch("status");

    return (
        <Card className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">

            {/* Header */}
            <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-green-50">
                        <IndianRupee className="h-5 w-5 text-green-600" />
                    </div>

                    <div>
                        <h2 className="text-base font-semibold text-slate-900 sm:text-lg">
                            Pricing & Inventory
                        </h2>

                        <p className="text-xs text-slate-500 sm:text-sm">
                            Configure pack size, pricing, stock and visibility.
                        </p>
                    </div>

                </div>
            </div>

            {/* Content */}
            <div className="p-5 sm:p-6">

                <div className="grid gap-5 md:grid-cols-3">

                    <div>
                        <Label className="text-sm font-medium text-slate-700">
                            Pack Size
                        </Label>

                        <Input
                            placeholder="e.g. 500g"
                            disabled={disabled}
                            className="mt-2 h-11 rounded-xl border-slate-200"
                            {...register("packSize")}
                        />

                        <FieldError message={errors.packSize?.message} />
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-slate-700">
                            Price (₹)
                        </Label>

                        <Input
                            type="number"
                            min={0}
                            disabled={disabled}
                            className="mt-2 h-11 rounded-xl border-slate-200"
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                        />

                        <FieldError message={errors.price?.message} />
                    </div>

                    <div>
                        <Label className="text-sm font-medium text-slate-700">
                            Stock Quantity
                        </Label>

                        <Input
                            type="number"
                            min={0}
                            disabled={disabled}
                            className="mt-2 h-11 rounded-xl border-slate-200"
                            {...register("stock", {
                                valueAsNumber: true,
                            })}
                        />

                        <FieldError message={errors.stock?.message} />
                    </div>

                </div>

                {/* Status */}
                <div className="mt-5 rounded-xl border border-green-100 bg-green-50/50 p-4">
                    <div className="flex items-center gap-3">

                        <Checkbox
                            checked={status}
                            disabled={disabled}
                            onCheckedChange={(checked) =>
                                setValue(
                                    "status",
                                    checked === true,
                                    {
                                        shouldDirty: true,
                                        shouldValidate: true,
                                    }
                                )
                            }
                        />

                        <div>
                            <Label className="font-medium text-slate-900">
                                Active Product
                            </Label>

                            <p className="text-xs text-slate-500 sm:text-sm">
                                Active products are visible on the customer website.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </Card>
    );
}
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
        <Card className="rounded-3xl border shadow-sm">
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100">
                        <IndianRupee className="h-6 w-6 text-emerald-700" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Pricing & Inventory
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Configure pack size, pricing, stock and product visibility.
                        </p>
                    </div>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                    <div>
                        <Label htmlFor="pack-size">
                            Pack Size
                        </Label>

                        <Input
                            id="pack-size"
                            placeholder="e.g. 500 ml"
                            disabled={disabled}
                            className="mt-2"
                            {...register("packSize")}
                        />

                        <FieldError
                            message={errors.packSize?.message}
                        />
                    </div>

                    <div>
                        <Label htmlFor="price">
                            Price (₹)
                        </Label>

                        <Input
                            id="price"
                            type="number"
                            min={0}
                            placeholder="0"
                            disabled={disabled}
                            className="mt-2"
                            {...register("price", {
                                valueAsNumber: true,
                            })}
                        />

                        <FieldError
                            message={errors.price?.message}
                        />
                    </div>

                    <div>
                        <Label htmlFor="stock">
                            Stock Quantity
                        </Label>

                        <Input
                            id="stock"
                            type="number"
                            min={0}
                            placeholder="0"
                            disabled={disabled}
                            className="mt-2"
                            {...register("stock", {
                                valueAsNumber: true,
                            })}
                        />

                        <FieldError
                            message={errors.stock?.message}
                        />
                    </div>
                </div>

                <div className="rounded-2xl border p-4">
                    <div className="flex items-center gap-3">
                        <Checkbox
                            checked={status}
                            disabled={disabled}
                            onCheckedChange={(checked) =>
                                setValue("status", checked === true, {
                                    shouldDirty: true,
                                    shouldValidate: true,
                                })
                            }
                        />

                        <div>
                            <Label>
                                Active Product
                            </Label>

                            <p className="text-sm text-muted-foreground">
                                Active products are visible on the customer website.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    );
}
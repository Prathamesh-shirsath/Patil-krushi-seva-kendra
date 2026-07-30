"use client";

import { FileText } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { ProductFormValues } from "@/features/products/schemas/product.schema";
import { FieldError } from "./field-error";

interface DescriptionSectionProps {
    form: UseFormReturn<ProductFormValues>;
    disabled?: boolean;
}

export function DescriptionSection({
    form,
    disabled = false,
}: DescriptionSectionProps) {
    const {
        register,
        formState: { errors },
    } = form;

    return (
        <Card className="rounded-3xl border shadow-sm">
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                        <FileText className="h-6 w-6 text-orange-700" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Product Details
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Provide complete product details.
                        </p>
                    </div>
                </div>

                <div>
                    <Label htmlFor="description">
                        Description
                    </Label>

                    <Textarea
                        id="description"
                        rows={7}
                        className="mt-2 resize-none"
                        placeholder="Enter product description..."
                        disabled={disabled}
                        {...register("description")}
                    />

                    <FieldError
                        message={errors.description?.message}
                    />
                </div>
            </div>
        </Card>
    );
}
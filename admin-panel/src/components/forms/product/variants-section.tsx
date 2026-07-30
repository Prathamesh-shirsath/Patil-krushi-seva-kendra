"use client";

import { Boxes, Plus, Trash2 } from "lucide-react";
import {
    Control,
    UseFormRegister,
    useFieldArray,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import { ProductFormValues } from "@/features/products/schemas/product.schema";

interface VariantsSectionProps {
    control: Control<ProductFormValues>;
    register: UseFormRegister<ProductFormValues>;
    disabled?: boolean;
}

export function VariantsSection({
    control,
    register,
    disabled = false,
}: VariantsSectionProps) {
    const { fields, append, remove } = useFieldArray({
        control,
        name: "variants",
    });

    const addVariant = () => {
        append({
            packSize: "",
            price: 0,
        });
    };

    return (
        <Card className="rounded-3xl border shadow-sm">
            <div className="space-y-6 p-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange-100">
                            <Boxes className="h-6 w-6 text-orange-700" />
                        </div>

                        <div>
                            <h2 className="text-lg font-semibold">
                                Product Variants
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                Add different pack sizes with pricing.
                            </p>
                        </div>
                    </div>

                    <Button
                        type="button"
                        disabled={disabled}
                        onClick={addVariant}
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Variant
                    </Button>
                </div>

                {fields.length === 0 && (
                    <div className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
                        No variants added.
                    </div>
                )}

                <div className="space-y-4">
                    {fields.map((field, index) => (
                        <div
                            key={field.id}
                            className="rounded-2xl border p-5"
                        >
                            <div className="grid gap-4 md:grid-cols-3">
                                <Input
                                    disabled={disabled}
                                    placeholder="Pack Size (e.g. 500 ml)"
                                    {...register(
                                        `variants.${index}.packSize`
                                    )}
                                />

                                <Input
                                    type="number"
                                    min={0}
                                    disabled={disabled}
                                    placeholder="Price"
                                    {...register(
                                        `variants.${index}.price`,
                                        {
                                            valueAsNumber: true,
                                        }
                                    )}
                                />

                                <Button
                                    type="button"
                                    variant="destructive"
                                    disabled={disabled}
                                    onClick={() => remove(index)}
                                >
                                    <Trash2 className="mr-2 h-4 w-4" />
                                    Remove
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
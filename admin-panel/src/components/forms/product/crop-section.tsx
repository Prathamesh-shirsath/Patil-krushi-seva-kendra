"use client";

import { KeyboardEvent, useState } from "react";
import { Leaf, Plus, X } from "lucide-react";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { ProductFormValues } from "@/features/products/schemas/product.schema";

interface CropSectionProps {
    form: UseFormReturn<ProductFormValues>;
    disabled?: boolean;
}

export function CropSection({
    form,
    disabled = false,
}: CropSectionProps) {
    const [crop, setCrop] = useState("");

    const crops = form.watch("usedForCrops") ?? [];

    const addCrop = () => {
        const value = crop.trim();

        if (!value) return;

        const exists = crops.some(
            (item) =>
                item.toLowerCase() ===
                value.toLowerCase()
        );

        if (exists) {
            setCrop("");
            return;
        }

        form.setValue(
            "usedForCrops",
            [...crops, value],
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );

        setCrop("");
    };

    const removeCrop = (index: number) => {
        form.setValue(
            "usedForCrops",
            crops.filter((_, i) => i !== index),
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    };

    const handleKeyDown = (
        e: KeyboardEvent<HTMLInputElement>
    ) => {
        if (e.key === "Enter") {
            e.preventDefault();
            addCrop();
        }
    };

    return (
        <Card className="rounded-3xl border shadow-sm">
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100">
                        <Leaf className="h-6 w-6 text-green-700" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Suitable Crops
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Add crops suitable for this product.
                        </p>
                    </div>
                </div>

                <div>
                    <Label>
                        Crop Names
                    </Label>

                    <div className="mt-2 flex gap-2">
                        <Input
                            value={crop}
                            disabled={disabled}
                            placeholder="Example: Cotton"
                            onChange={(e) =>
                                setCrop(e.target.value)
                            }
                            onKeyDown={handleKeyDown}
                        />

                        <Button
                            type="button"
                            disabled={disabled}
                            onClick={addCrop}
                        >
                            <Plus className="mr-2 h-4 w-4" />
                            Add
                        </Button>
                    </div>

                    {crops.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-2">
                            {crops.map(
                                (item, index) => (
                                    <div
                                        key={`${item}-${index}`}
                                        className="flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800"
                                    >
                                        {item}

                                        <button
                                            type="button"
                                            disabled={disabled}
                                            onClick={() =>
                                                removeCrop(
                                                    index
                                                )
                                            }
                                            aria-label={`Remove ${item}`}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>
                                    </div>
                                )
                            )}
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
}
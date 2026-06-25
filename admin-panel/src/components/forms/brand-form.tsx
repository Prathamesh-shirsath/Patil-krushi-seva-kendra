"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

import {
    brandFormSchema,
    BrandFormValues,
} from "@/features/brands/schemas/brand.schema";

import { useCreateBrand } from "@/hooks/use-brands";
import { slugify } from "@/lib/utils";

interface Props {
    onSuccess: () => void;
}

export default function BrandForm({ onSuccess }: Props) {
    const mutation = useCreateBrand();

    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<BrandFormValues>({
        resolver: zodResolver(brandFormSchema),

        defaultValues: {
            name: "",
            description: "",
            status: true,
        },
    });

    const status = watch("status");

    async function onSubmit(
        values: BrandFormValues
    ) {
        const formData = new FormData();

        formData.append(
            "name",
            values.name
        );

        formData.append(
            "slug",
            slugify(values.name)
        );

        formData.append(
            "description",
            values.description || ""
        );

        formData.append(
            "status",
            String(values.status)
        );

        if (selectedImage) {
            formData.append(
                "logo",
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
            className="space-y-5"
        >
            <div>
                <Label>Brand Name</Label>

                <Input
                    {...register("name")}
                    placeholder="Brand Name"
                />
            </div>

            <div>
                <Label>Brand Logo</Label>

                <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                        setSelectedImage(
                            e.target.files?.[0] || null
                        )
                    }
                />
            </div>

            <div>
                <Label>Description</Label>

                <Textarea
                    {...register("description")}
                    placeholder="Description"
                />
            </div>

            <div className="flex items-center gap-3">
                <Checkbox
                    checked={status}
                    onCheckedChange={(checked) =>
                        setValue(
                            "status",
                            checked === true
                        )
                    }
                />

                <Label>Active Brand</Label>
            </div>

            <Button
                type="submit"
                className="w-full"
            >
                {mutation.isPending
                    ? "Saving..."
                    : "Save Brand"}
            </Button>
        </form>
    );
}
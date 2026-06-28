"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    brandFormSchema,
    BrandFormValues,
} from "@/features/brands/schemas/brand.schema";

import { useCreateBrand } from "@/hooks/use-brands";
import { slugify } from "@/lib/utils";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {
    onSuccess: () => void;
}

export default function BrandForm({
    onSuccess,
}: Props) {

    const mutation =
        useCreateBrand();

    const [
        selectedImage,
        setSelectedImage,
    ] = useState<File | null>(null);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
    } = useForm<BrandFormValues>({
        resolver: zodResolver(
            brandFormSchema
        ),

        defaultValues: {
            name: "",
            description: "",
            status: true,
        },
    });

    const status =
        watch("status");

    async function onSubmit(
        values: BrandFormValues
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
            className="space-y-6"
        >

            {/* Brand Name */}

            <div className="space-y-2">

                <Label className="font-semibold text-slate-700">
                    Brand Name
                    <span className="text-red-500 ml-1">*</span>
                </Label>

                <Input
                    {...register("name")}
                    placeholder="Enter brand name"
                    className="rounded-xl h-11"
                />

            </div>

            {/* Logo */}

            <div className="space-y-2">

                <Label className="font-semibold text-slate-700">
                    Brand Logo
                </Label>

                <Input
                    type="file"
                    accept="image/*"
                    className="rounded-xl cursor-pointer"
                    onChange={(e) =>
                        setSelectedImage(
                            e.target.files?.[0] ||
                            null
                        )
                    }
                />

                <p className="text-xs text-slate-400">
                    PNG, JPG, JPEG supported.
                </p>

            </div>

            {/* Description */}

            <div className="space-y-2">

                <Label className="font-semibold text-slate-700">
                    Description
                </Label>

                <Textarea
                    {...register("description")}
                    rows={4}
                    placeholder="Enter brand description..."
                    className="rounded-xl resize-none"
                />

            </div>

            {/* Status */}

            <div
                className="
                flex
                items-center
                justify-between
                rounded-2xl
                border
                border-slate-200
                bg-slate-50
                px-5
                py-4
            "
            >

                <div>

                    <h4 className="font-semibold text-slate-700">
                        Brand Status
                    </h4>

                    <p className="text-xs text-slate-500">
                        Enable this brand for customers.
                    </p>

                </div>

                <Checkbox
                    checked={status}
                    onCheckedChange={(checked) =>
                        setValue(
                            "status",
                            checked === true
                        )
                    }
                />

            </div>

            {/* Button */}

            <Button
                type="submit"
                disabled={mutation.isPending}
                className="
                h-11
                w-full
                rounded-xl
                bg-gradient-to-r
                from-green-600
                to-emerald-600
                hover:from-green-700
                hover:to-emerald-700
                font-semibold
            "
            >

                {mutation.isPending
                    ? "Creating Brand..."
                    : "Create Brand"}

            </Button>

        </form>

    );

}
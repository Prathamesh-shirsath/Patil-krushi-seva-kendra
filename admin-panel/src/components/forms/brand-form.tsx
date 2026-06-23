"use client";

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

function FieldError({ message }: { message?: string }) {
    if (!message) return null;

    return (
        <p className="text-xs text-red-500">
            {message}
        </p>
    );
}

export default function BrandForm({
    onSuccess,
}: Props) {

    const mutation = useCreateBrand();

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<BrandFormValues>({
        resolver: zodResolver(brandFormSchema),

        defaultValues: {
            name: "",
            logo: "",
            description: "",
            status: true,
        },
    });

    const status = watch("status");

    async function onSubmit(values: BrandFormValues) {

        await mutation.mutateAsync({
            name: values.name,

            slug: slugify(values.name),

            logo: values.logo,

            description: values.description,

            status: values.status,
        });

        onSuccess();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >

            {/* Brand Name */}
            <div className="space-y-2">

                <Label>
                    Brand Name
                </Label>

                <Input
                    placeholder="e.g. Syngenta"
                    className="rounded-xl"
                    {...register("name")}
                />

                <FieldError
                    message={errors.name?.message}
                />

            </div>

            {/* Logo URL */}
            <div className="space-y-2">

                <Label>
                    Logo URL
                </Label>

                <Input
                    placeholder="https://..."
                    className="rounded-xl"
                    {...register("logo")}
                />

            </div>

            {/* Description */}
            <div className="space-y-2">

                <Label>
                    Description
                </Label>

                <Textarea
                    placeholder="Optional description..."
                    className="rounded-xl"
                    {...register("description")}
                />

            </div>

            {/* Status */}
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

                <Label>
                    Active Brand
                </Label>

            </div>

            {/* Error */}
            {mutation.isError && (

                <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">

                    Failed to create brand

                </div>

            )}

            {/* Submit */}
            <Button
                type="submit"
                className="h-11 w-full rounded-xl bg-green-700 hover:bg-green-800"
                disabled={mutation.isPending}
            >

                {mutation.isPending
                    ? "Saving..."
                    : "Save Brand"}

            </Button>

        </form>
    );
}
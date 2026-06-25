"use client";

import { useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { useUpdateBrand }
    from "@/hooks/use-brands";

interface Props {
    brand: any;
    onSuccess: () => void;
}

export default function EditBrandForm({
    brand,
    onSuccess,
}: Props) {

    const [name, setName] =
        useState(brand.name);

    const [description, setDescription] =
        useState(
            brand.description || ""
        );

    const [file, setFile] =
        useState<File | null>(
            null
        );

    const mutation =
        useUpdateBrand();

    async function handleUpdate() {

        const formData =
            new FormData();

        formData.append(
            "name",
            name
        );

        formData.append(
            "description",
            description
        );

        if (file) {

            formData.append(
                "logo",
                file
            );

        }

        await mutation.mutateAsync({
            id: brand.id,
            data: formData,
        });

        onSuccess();
    }

    return (
        <div className="space-y-4">

            <Input
                value={name}
                onChange={(e) =>
                    setName(
                        e.target.value
                    )
                }
            />

            <Input
                type="file"
                accept="image/*"
                onChange={(e) =>
                    setFile(
                        e.target
                            .files?.[0] ||
                        null
                    )
                }
            />

            <Input
                value={description}
                onChange={(e) =>
                    setDescription(
                        e.target.value
                    )
                }
            />

            <Button
                className="w-full"
                onClick={handleUpdate}
            >
                {mutation.isPending
                    ? "Updating..."
                    : "Update Brand"}
            </Button>

        </div>
    );
}
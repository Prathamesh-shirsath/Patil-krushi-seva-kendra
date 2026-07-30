"use client";

import { useEffect, useState } from "react";
import {
    useFieldArray,
    useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    productFormSchema,
    ProductFormValues,
} from "@/features/products/schemas/product.schema";

import { useCreateProduct } from "@/hooks/use-products";
import { useBrands } from "@/hooks/use-brands";
import { useCategories } from "@/hooks/use-categories";

import { BasicInfoSection } from "./basic-info-section";
import { PricingSection } from "./pricing-section";
import { ImageSection } from "./image-section";
import { DescriptionSection } from "./description-section";
import { CropSection } from "./crop-section";
import { VariantsSection } from "./variants-section";
import { FormFooter } from "./form-footer";

interface Props {
    onSuccess: () => void;
}

export default function ProductForm({
    onSuccess,
}: Props) {
    const createProduct = useCreateProduct();

    const { data: brands = [] } = useBrands();

    const { data: categories = [] } = useCategories();

    const [selectedImage, setSelectedImage] =
        useState<File | null>(null);

    const form =
        useForm<ProductFormValues>({
            resolver: zodResolver(
                productFormSchema
            ),

            defaultValues: {
                name: "",
                description: "",
                categoryId: "",
                brandId: "",
                packSize: "",
                price: 0,
                stock: 0,
                image: undefined,
                usedForCrops: [],
                status: true,
                variants: [],
            },
        });

    const {
        control,
        register,
        handleSubmit,
        setValue,
    } = form;

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "variants",
    });

    useEffect(() => {
        setValue(
            "image",
            selectedImage,
            {
                shouldDirty: true,
                shouldValidate: true,
            }
        );
    }, [
        selectedImage,
        setValue,
    ]);

    async function onSubmit(
        values: ProductFormValues
    ) {
        const formData =
            new FormData();

        formData.append(
            "name",
            values.name
        );

        formData.append(
            "description",
            values.description
        );

        formData.append(
            "categoryId",
            values.categoryId
        );

        formData.append(
            "brandId",
            values.brandId
        );

        formData.append(
            "packSize",
            values.packSize
        );

        formData.append(
            "price",
            values.price.toString()
        );

        formData.append(
            "stock",
            values.stock.toString()
        );

        formData.append(
            "status",
            String(values.status)
        );

        formData.append(
            "usedForCrops",
            JSON.stringify(
                values.usedForCrops
            )
        );

        formData.append(
            "variants",
            JSON.stringify(
                values.variants
            )
        );

        if (selectedImage) {
            formData.append(
                "image",
                selectedImage
            );
        }

        await createProduct.mutateAsync(
            formData
        );

        onSuccess();
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <BasicInfoSection
                form={form}
                brands={brands}
                categories={categories}
            />

            <PricingSection
                form={form}
            />

            <ImageSection
                selectedImage={selectedImage}
                setSelectedImage={setSelectedImage}
            />

            <DescriptionSection
                form={form}
            />

            <CropSection
                form={form}
            />

            <VariantsSection
                control={control}
                register={register}
                fields={fields}
                append={append}
                remove={remove}
            />

            {createProduct.isError && (
                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
                    Failed to save product.
                </div>
            )}

            <FormFooter
                isSubmitting={createProduct.isPending}
                onCancel={onSuccess}
                onReset={() => form.reset()}
            />
        </form>
    );
}

"use client";

import {
    useEffect,
    useState,
} from "react";

import {
    useFieldArray,
    useForm,
} from "react-hook-form";

import {
    zodResolver,
} from "@hookform/resolvers/zod";

import {
    productFormSchema,
    ProductFormValues,
} from "@/features/products/schemas/product.schema";

import {
    useCreateProduct,
    useUpdateProduct,
} from "@/hooks/use-products";

import {
    useBrands,
} from "@/hooks/use-brands";

import {
    useCategories,
} from "@/hooks/use-categories";

import {
    BasicInfoSection,
} from "./basic-info-section";

import {
    PricingSection,
} from "./pricing-section";

import {
    ImageSection,
} from "./image-section";

import {
    DescriptionSection,
} from "./description-section";

import {
    CropSection,
} from "./crop-section";

import {
    VariantsSection,
} from "./variants-section";

import {
    FormFooter,
} from "./form-footer";

import type {
    Product,
} from "@/types/product";

interface Props {
    onSuccess: () => void;

    mode?: "create" | "edit";

    product?: Product;
}

/*
|--------------------------------------------------------------------------
| Convert Product API data -> Form values
|--------------------------------------------------------------------------
*/

function getProductFormValues(
    product: Product
): ProductFormValues {
    return {
        name: product.name ?? "",

        description:
            product.description ?? "",

        categoryId:
            product.categoryId ?? "",

        brandId:
            product.brandId ?? "",

        packSize:
            product.packSize ?? "",

        price:
            product.price !== undefined &&
                product.price !== null
                ? Number(product.price)
                : 0,

        stock:
            product.stock !== undefined &&
                product.stock !== null
                ? Number(product.stock)
                : 0,

        image: undefined,

        usedForCrops:
            Array.isArray(
                product.usedForCrops
            )
                ? product.usedForCrops
                : [],

        status:
            product.status !== undefined
                ? Boolean(product.status)
                : true,

        variants:
            Array.isArray(
                product.variants
            )
                ? product.variants.map(
                    (variant) => ({
                        id:
                            variant.id,

                        packSize:
                            variant.packSize ??
                            "",

                        price:
                            Number(
                                variant.price ??
                                0
                            ),

                        /*
                        Your current schema requires
                        stock and status for variants.
                        Keep defaults here if backend
                        does not return them.
                        */
                        stock:
                            Number(
                                (variant as any)
                                    .stock ??
                                0
                            ),

                        status:
                            (variant as any)
                                .status !==
                                undefined
                                ? Boolean(
                                    (variant as any)
                                        .status
                                )
                                : true,
                    })
                )
                : [],
    };
}

export default function ProductForm({
    onSuccess,
    mode = "create",
    product,
}: Props) {

    /*
    |--------------------------------------------------------------------------
    | Mutations
    |--------------------------------------------------------------------------
    */

    const createProduct =
        useCreateProduct();

    const updateProduct =
        useUpdateProduct();

    /*
    |--------------------------------------------------------------------------
    | Brands / Categories
    |--------------------------------------------------------------------------
    */

    const {
        data: brands = [],
    } = useBrands();

    const {
        data: categories = [],
    } = useCategories();

    /*
    |--------------------------------------------------------------------------
    | Local state
    |--------------------------------------------------------------------------
    */

    const [
        selectedImage,
        setSelectedImage,
    ] = useState<File | null>(null);

    const [
        submitError,
        setSubmitError,
    ] = useState<string | null>(null);

    /*
    |--------------------------------------------------------------------------
    | Form
    |--------------------------------------------------------------------------
    */

    const form =
        useForm<ProductFormValues>({
            resolver:
                zodResolver(
                    productFormSchema
                ),

            defaultValues: {
                name: "",

                description: "",

                categoryId: product.categoryId ?? "",

                brandId:
                    product.brandId ?? "",

                packSize: "",

                price: 0,

                stock: product.stock !== undefined &&
                    product.stock !== null
                    ? Number(product.stock)
                    : 0,

                image: undefined,

                usedForCrops: [],

                status: true,

                variants: [],
            },

            mode: "onChange",
        });

    const {
        control,
        register,
        handleSubmit,
        setValue,
        reset,
        getValues,
    } = form;

    /*
    |--------------------------------------------------------------------------
    | Variants
    |--------------------------------------------------------------------------
    */

    const {
        fields,
        append,
        remove,
    } = useFieldArray({
        control,
        name: "variants",
    });

    /*
    |--------------------------------------------------------------------------
    | Load existing product
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (
            mode !== "edit" ||
            !product
        ) {
            return;
        }

        const formValues =
            getProductFormValues(
                product
            );

        /*
        Debug information.
        This can be removed after
        everything works correctly.
        */

        console.log(
            "EDIT PRODUCT DATA:",
            {
                id: product.id,

                name: product.name,

                brandId:
                    product.brandId,

                brandName:
                    product.brandName,

                categoryId:
                    product.categoryId,

                categoryName:
                    product.categoryName,

                price:
                    product.price,

                stock:
                    product.stock,

                status:
                    product.status,

                variants:
                    product.variants,
            }
        );

        console.log(
            "EDIT FORM VALUES:",
            formValues
        );

        /*
        Reset entire form with existing
        product values.
        */

        reset(
            formValues,
            {
                keepDefaultValues: false,
            }
        );

        /*
        A new image is not selected
        when opening edit page.
        */

        setSelectedImage(null);

        setSubmitError(null);

    }, [
        mode,
        product,
        reset,
    ]);

    /*
    |--------------------------------------------------------------------------
    | New image selected
    |--------------------------------------------------------------------------
    */

    useEffect(() => {

        if (!selectedImage) {
            return;
        }

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

    /*
    |--------------------------------------------------------------------------
    | Submit
    |--------------------------------------------------------------------------
    */

    async function onSubmit(
        values: ProductFormValues
    ) {

        try {

            setSubmitError(null);

            /*
            Debug submitted values.
            */

            console.log(
                "PRODUCT FORM SUBMIT VALUES:",
                values
            );

            const formData =
                new FormData();

            /*
            |--------------------------------------------------------------------------
            | Basic information
            |--------------------------------------------------------------------------
            */

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

            /*
            |--------------------------------------------------------------------------
            | Pricing
            |--------------------------------------------------------------------------
            */

            formData.append(
                "packSize",
                values.packSize
            );

            formData.append(
                "price",
                String(
                    Number(
                        values.price
                    )
                )
            );

            formData.append(
                "stock",
                String(
                    Number(
                        values.stock
                    )
                )
            );

            /*
            |--------------------------------------------------------------------------
            | Status
            |--------------------------------------------------------------------------
            */

            formData.append(
                "status",
                String(
                    values.status
                )
            );

            /*
            |--------------------------------------------------------------------------
            | Crops
            |--------------------------------------------------------------------------
            */

            formData.append(
                "usedForCrops",
                JSON.stringify(
                    values.usedForCrops ??
                    []
                )
            );

            /*
            |--------------------------------------------------------------------------
            | Variants
            |--------------------------------------------------------------------------
            */

            formData.append(
                "variants",
                JSON.stringify(
                    values.variants ??
                    []
                )
            );

            /*
            |--------------------------------------------------------------------------
            | Image
            |--------------------------------------------------------------------------
            |
            | Only append image when a new
            | file was selected.
            |
            */

            if (selectedImage) {

                formData.append(
                    "image",
                    selectedImage
                );

            }

            /*
            |--------------------------------------------------------------------------
            | Edit
            |--------------------------------------------------------------------------
            */

            if (
                mode === "edit" &&
                product
            ) {

                console.log(
                    "UPDATING PRODUCT:",
                    product.id
                );

                await updateProduct.mutateAsync(
                    {
                        id: product.id,

                        data: formData,
                    }
                );

                console.log(
                    "PRODUCT UPDATED SUCCESSFULLY"
                );

            }

            /*
            |--------------------------------------------------------------------------
            | Create
            |--------------------------------------------------------------------------
            */

            else {

                console.log(
                    "CREATING PRODUCT"
                );

                await createProduct.mutateAsync(
                    formData
                );

                console.log(
                    "PRODUCT CREATED SUCCESSFULLY"
                );

            }

            /*
            |--------------------------------------------------------------------------
            | Success
            |--------------------------------------------------------------------------
            */

            onSuccess();

        } catch (error: any) {

            console.error(
                "PRODUCT SAVE ERROR:",
                error
            );

            console.error(
                "PRODUCT SAVE RESPONSE:",
                error?.response?.data
            );

            setSubmitError(
                error?.response?.data
                    ?.message ||
                error?.message ||
                "Failed to save product"
            );

        }

    }

    /*
    |--------------------------------------------------------------------------
    | Validation error
    |--------------------------------------------------------------------------
    */

    function onInvalid(
        errors: any
    ) {

        console.error(
            "PRODUCT FORM VALIDATION ERROR:",
            errors
        );

        /*
        Do NOT use JSON.stringify(errors)
        because react-hook-form errors can
        contain circular references.
        */

        Object.entries(
            errors || {}
        ).forEach(
            ([
                field,
                error,
            ]) => {

                console.error(
                    `${field}:`,
                    (error as any)?.message ||
                    error
                );

            }
        );

        setSubmitError(
            "Please fix the highlighted fields before saving."
        );
    }

    /*
    |--------------------------------------------------------------------------
    | Loading
    |--------------------------------------------------------------------------
    */

    const isLoading =
        createProduct.isPending ||
        updateProduct.isPending;

    /*
    |--------------------------------------------------------------------------
    | Render
    |--------------------------------------------------------------------------
    */

    return (

        <form
            onSubmit={handleSubmit(
                onSubmit,
                onInvalid
            )}
            className="space-y-8"
        >

            {/* =========================================================
                Basic Information
            ========================================================= */}

            <BasicInfoSection
                form={form}
                brands={brands}
                categories={categories}
                disabled={isLoading}
            />

            {/* =========================================================
                Pricing & Inventory
            ========================================================= */}

            <PricingSection
                form={form}
                disabled={isLoading}
            />

            {/* =========================================================
                Image
            ========================================================= */}

            <ImageSection
                selectedImage={
                    selectedImage
                }
                setSelectedImage={
                    setSelectedImage
                }
            />

            {/* =========================================================
                Description
            ========================================================= */}

            <DescriptionSection
                form={form}
            />

            {/* =========================================================
                Crops
            ========================================================= */}

            <CropSection
                form={form}
            />

            {/* =========================================================
                Variants
            ========================================================= */}

            <VariantsSection
                control={control}
                register={register}
                disabled={isLoading}
            />

            {/* =========================================================
                Error
            ========================================================= */}

            {submitError && (

                <div
                    className="
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    p-4
                    text-sm
                    text-red-700
                    "
                >
                    {submitError}
                </div>

            )}

            {/* =========================================================
                Footer
            ========================================================= */}

            <FormFooter
                isSubmitting={isLoading}
                isEdit={mode === "edit"}
                onCancel={onSuccess}
                onReset={() => {
                    if (mode === "edit" && product) {
                        reset({
                            name: product.name,
                            description: product.description,
                            categoryId: product.categoryId,
                            brandId: product.brandId,
                            packSize: product.packSize,
                            price: Number(product.price ?? 0),
                            stock: Number(product.stock ?? 0),
                            image: undefined,
                            usedForCrops: product.usedForCrops ?? [],
                            status: product.status ?? true,
                            variants: product.variants ?? [],
                        });
                    } else {
                        reset();
                    }

                    setSelectedImage(null);
                }}
            />

        </form>
    );
}
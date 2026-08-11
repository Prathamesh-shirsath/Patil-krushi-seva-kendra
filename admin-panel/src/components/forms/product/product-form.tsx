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





export default function ProductForm({

    onSuccess,

    mode = "create",

    product,

}: Props) {



    const createProduct =
        useCreateProduct();



    const updateProduct =
        useUpdateProduct();




    const {
        data: brands = [],
    } = useBrands();




    const {
        data: categories = [],
    } = useCategories();





    const [
        selectedImage,
        setSelectedImage,
    ] = useState<File | null>(null);





    const [
        submitError,
        setSubmitError,
    ] = useState<string | null>(null);








    const form =
        useForm<ProductFormValues>({

            resolver:
                zodResolver(
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


            mode: "onChange",

        });






    const {

        control,

        register,

        handleSubmit,

        setValue,

        reset,


    } = form;






    const {

        fields,

        append,

        remove,


    } = useFieldArray({

        control,

        name: "variants",

    });








    // Load Existing Product For Edit

    useEffect(() => {


        if (
            mode === "edit" &&
            product
        ) {

            reset({

                name:
                    product.name,


                description:
                    product.description,


                categoryId:
                    product.categoryId,


                brandId:
                    product.brandId,


                packSize:
                    product.packSize,


                price:
                    product.price,


                stock:
                    product.stock,


                usedForCrops:
                    product.usedForCrops ?? [],


                status:
                    product.status,


                image:
                    undefined,


                variants:
                    product.variants ?? [],


            });


        }


    }, [
        mode,
        product,
        reset
    ]);








    useEffect(() => {


        if (selectedImage) {

            setValue(

                "image",

                selectedImage,

                {
                    shouldDirty: true,
                    shouldValidate: true,
                }

            );

        }


    }, [
        selectedImage,
        setValue
    ]);









    async function onSubmit(
        values: ProductFormValues
    ) {



        try {


            setSubmitError(null);




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
                String(values.price)
            );




            formData.append(
                "stock",
                String(values.stock)
            );




            formData.append(
                "status",
                String(values.status)
            );




            formData.append(
                "usedForCrops",
                JSON.stringify(
                    values.usedForCrops ?? []
                )
            );




            formData.append(
                "variants",
                JSON.stringify(
                    values.variants ?? []
                )
            );






            if (selectedImage) {

                formData.append(
                    "image",
                    selectedImage
                );

            }






            if (mode === "edit" && product) {


                await updateProduct.mutateAsync({

                    id: product.id,

                    data: formData,

                });


            }
            else {


                await createProduct.mutateAsync(
                    formData
                );


            }






            onSuccess();




        }
        catch (error) {


            console.error(
                error
            );


            setSubmitError(
                "Failed to save product"
            );


        }


    }







    const isLoading =
        createProduct.isPending ||
        updateProduct.isPending;







    return (

        <form

            onSubmit={
                handleSubmit(onSubmit)
            }

            className="space-y-8"

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

                selectedImage={
                    selectedImage
                }

                setSelectedImage={
                    setSelectedImage
                }

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

                disabled={isLoading}

            />







            {
                submitError && (

                    <div
                        className="
                        rounded-xl
                        border
                        border-red-200
                        bg-red-50
                        p-4
                        text-red-600
                        "
                    >

                        {submitError}

                    </div>

                )
            }






            <FormFooter

                isSubmitting={isLoading}


                onCancel={
                    onSuccess
                }


                onReset={() => {

                    reset();

                    setSelectedImage(null);

                }}


            />



        </form>

    );

}
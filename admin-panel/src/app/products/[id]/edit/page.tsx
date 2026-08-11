"use client";

import { use } from "react";
import { useRouter } from "next/navigation";

import DashboardLayout from "@/components/layout/dashboard-layout";
import ProductForm from "@/components/forms/product/product-form";

import { useProduct } from "@/hooks/use-products";



interface Props {
    params: Promise<{
        id: string;
    }>;
}



export default function EditProductPage({
    params,
}: Props) {


    const router = useRouter();



    const {
        id,

    } = use(params);




    const {
        data: product,

        isLoading,

        isError,

    } = useProduct(id);







    if (isLoading) {

        return (

            <DashboardLayout>

                <div
                    className="
                    flex
                    min-h-[60vh]
                    items-center
                    justify-center
                    text-sm
                    text-muted-foreground
                    "
                >

                    Loading product...

                </div>

            </DashboardLayout>

        );

    }







    if (isError || !product) {

        return (

            <DashboardLayout>

                <div
                    className="
                    rounded-xl
                    border
                    border-red-200
                    bg-red-50
                    p-5
                    text-red-600
                    "
                >

                    Product not found

                </div>

            </DashboardLayout>

        );

    }








    return (

        <DashboardLayout>


            <div className="mb-8">


                <h1
                    className="
                    text-2xl
                    font-bold
                    text-slate-900
                    "
                >

                    Edit Product

                </h1>



                <p
                    className="
                    mt-1
                    text-sm
                    text-muted-foreground
                    "
                >

                    Update product details,
                    pricing and inventory.

                </p>


            </div>







            <ProductForm

                mode="edit"

                product={product}

                onSuccess={() => {

                    router.push("/products");

                }}

            />





        </DashboardLayout>

    );

}
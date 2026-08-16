"use client";

import {
    Controller,
    UseFormReturn,
} from "react-hook-form";

import {
    ProductFormValues,
} from "@/features/products/schemas/product.schema";

import RichTextEditor from "@/components/editor/rich-text-editor";


interface Props {

    form: UseFormReturn<ProductFormValues>;

}



export function DescriptionSection({
    form,
}: Props) {


    return (

        <div className="space-y-3 rounded-2xl border bg-white p-6">


            <div>

                <h2 className="text-lg font-semibold">
                    Product Description
                </h2>


                <p className="text-sm text-muted-foreground">
                    Add product details, benefits,
                    usage and precautions.
                </p>

            </div>



            <Controller

                control={form.control}

                name="description"

                render={({ field }) => (

                    <RichTextEditor

                        value={field.value}

                        onChange={
                            field.onChange
                        }

                    />

                )}

            />


            {
                form.formState.errors.description && (

                    <p className="text-sm text-red-500">

                        {
                            form.formState
                                .errors
                                .description
                                ?.message
                        }

                    </p>

                )
            }


        </div>

    );

}
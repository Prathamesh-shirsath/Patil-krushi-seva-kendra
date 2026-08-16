"use client";

import { Boxes, Plus, Trash2 } from "lucide-react";

import {
    Control,
    UseFormRegister,
    useFieldArray,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
    ProductFormValues,
} from "@/features/products/schemas/product.schema";


interface VariantsSectionProps {

    control: Control<ProductFormValues>;

    register: UseFormRegister<ProductFormValues>;

    disabled?: boolean;

}



export function VariantsSection({

    control,

    register,

    disabled = false,

}: VariantsSectionProps) {



    const {
        fields,
        append,
        remove,

    } = useFieldArray({

        control,

        name: "variants",

    });





    function addVariant() {

        append({

            packSize: "",

            price: 0,

            stock: 0,

            status: true,

        });

    }





    return (

        <Card className="rounded-3xl border shadow-sm">


            <div className="space-y-6 p-6">


                {/* Header */}

                <div className="flex items-center justify-between">


                    <div className="flex items-center gap-4">


                        <div
                            className="
                            flex
                            h-12
                            w-12
                            items-center
                            justify-center
                            rounded-2xl
                            bg-orange-100
                            "
                        >

                            <Boxes
                                className="
                                h-6
                                w-6
                                text-orange-700
                                "
                            />

                        </div>



                        <div>

                            <h2 className="text-lg font-semibold">
                                Product Variants
                            </h2>


                            <p className="text-sm text-muted-foreground">

                                Add different pack sizes,
                                prices and stock.

                            </p>


                        </div>


                    </div>




                    <Button

                        type="button"

                        disabled={disabled}

                        onClick={addVariant}

                    >

                        <Plus className="mr-2 h-4 w-4" />

                        Add Variant

                    </Button>



                </div>





                {
                    fields.length === 0 && (

                        <div
                            className="
                            rounded-xl
                            border
                            border-dashed
                            p-10
                            text-center
                            text-sm
                            text-muted-foreground
                            "
                        >

                            No variants added.

                            <br />

                            Example:
                            100ml, 250ml, 500ml

                        </div>

                    )
                }







                <div className="space-y-4">


                    {
                        fields.map(
                            (field, index) => (


                                <div

                                    key={field.id}

                                    className="
                                rounded-2xl
                                border
                                bg-slate-50
                                p-5
                                "

                                >


                                    <div
                                        className="
                                    grid
                                    gap-4
                                    md:grid-cols-4
                                    "
                                    >



                                        {/* Pack Size */}

                                        <div>

                                            <label className="mb-2 block text-sm font-medium">

                                                Pack Size

                                            </label>


                                            <Input

                                                disabled={disabled}

                                                placeholder="500 ml"

                                                {...register(
                                                    `variants.${index}.packSize`
                                                )}

                                            />


                                        </div>






                                        {/* Price */}

                                        <div>

                                            <label className="mb-2 block text-sm font-medium">

                                                Price

                                            </label>


                                            <Input

                                                type="number"

                                                min={0}

                                                disabled={disabled}

                                                placeholder="₹"

                                                {...register(

                                                    `variants.${index}.price`,

                                                    {
                                                        valueAsNumber: true,
                                                    }

                                                )}

                                            />

                                        </div>







                                        {/* Stock */}

                                        <div>

                                            <label className="mb-2 block text-sm font-medium">

                                                Stock

                                            </label>


                                            <Input

                                                type="number"

                                                min={0}

                                                disabled={disabled}

                                                placeholder="Quantity"

                                                {...register(

                                                    `variants.${index}.stock`,

                                                    {
                                                        valueAsNumber: true,
                                                    }

                                                )}

                                            />


                                        </div>







                                        {/* Status */}

                                        <div>


                                            <label className="mb-2 block text-sm font-medium">

                                                Status

                                            </label>



                                            <select

                                                disabled={disabled}

                                                className="
                                            h-10
                                            w-full
                                            rounded-md
                                            border
                                            bg-white
                                            px-3
                                            text-sm
                                            "

                                                {...register(

                                                    `variants.${index}.status`,

                                                    {
                                                        setValueAs:
                                                            (value) =>
                                                                value === "true"
                                                    }

                                                )}

                                            >

                                                <option value="true">
                                                    Active
                                                </option>


                                                <option value="false">
                                                    Inactive
                                                </option>


                                            </select>


                                        </div>



                                    </div>







                                    <div className="mt-4 flex justify-end">


                                        <Button

                                            type="button"

                                            variant="destructive"

                                            disabled={disabled}

                                            onClick={() => remove(index)}

                                        >

                                            <Trash2 className="mr-2 h-4 w-4" />

                                            Remove

                                        </Button>


                                    </div>




                                </div>


                            ))
                    }


                </div>



            </div>


        </Card>

    );

}
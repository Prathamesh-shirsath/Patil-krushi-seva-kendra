"use client";

import { Package2 } from "lucide-react";

import {
    UseFormReturn,
} from "react-hook-form";


import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


import {
    Card,
} from "@/components/ui/card";


import {
    Input,
} from "@/components/ui/input";


import {
    Label,
} from "@/components/ui/label";


import {
    ProductFormValues,
} from "@/features/products/schemas/product.schema";


import {
    FieldError,
} from "./field-error";



interface Option {

    id: string;

    name: string;

}



interface BasicInfoSectionProps {

    form:
    UseFormReturn<ProductFormValues>;


    brands:
    Option[];


    categories:
    Option[];


    disabled?: boolean;

}





export function BasicInfoSection({

    form,

    brands,

    categories,

    disabled = false,


}: BasicInfoSectionProps) {



    const {

        register,

        watch,

        setValue,

        formState: {
            errors
        },

    } = form;






    const brandId =
        watch("brandId");



    const categoryId =
        watch("categoryId");







    return (

        <Card className="rounded-3xl border shadow-sm">


            <div className="space-y-6 p-6">



                <div className="flex items-center gap-4">


                    <div
                        className="
                        flex
                        h-12
                        w-12
                        items-center
                        justify-center
                        rounded-2xl
                        bg-green-100
                        "
                    >

                        <Package2
                            className="
                            h-6
                            w-6
                            text-green-700
                            "
                        />


                    </div>



                    <div>

                        <h2 className="text-lg font-semibold">

                            Basic Information

                        </h2>


                        <p className="text-sm text-muted-foreground">

                            Enter product basic details.

                        </p>


                    </div>


                </div>







                <div className="grid gap-5 md:grid-cols-2">






                    <div className="md:col-span-2">


                        <Label htmlFor="product-name">

                            Product Name

                        </Label>



                        <Input

                            id="product-name"

                            placeholder="Enter product name"

                            disabled={disabled}

                            className="mt-2"

                            {...register("name")}

                        />



                        <FieldError

                            message={
                                errors.name?.message
                            }

                        />



                    </div>










                    <div>


                        <Label>

                            Brand

                        </Label>




                        <Select


                            disabled={disabled}


                            value={
                                brandId || undefined
                            }



                            onValueChange={(value) => {


                                setValue(

                                    "brandId",

                                    value,

                                    {

                                        shouldDirty: true,

                                        shouldValidate: true,

                                    }

                                );


                            }}

                        >



                            <SelectTrigger className="mt-2">


                                <SelectValue

                                    placeholder="Select Brand"

                                />


                            </SelectTrigger>





                            <SelectContent>


                                {
                                    brands.length === 0 ? (


                                        <SelectItem

                                            value="empty"

                                            disabled

                                        >

                                            No brands available

                                        </SelectItem>


                                    ) : (


                                        brands.map(
                                            (brand) => (


                                                <SelectItem

                                                    key={
                                                        brand.id
                                                    }

                                                    value={
                                                        brand.id
                                                    }

                                                >

                                                    {
                                                        brand.name
                                                    }

                                                </SelectItem>


                                            )
                                        )

                                    )
                                }


                            </SelectContent>



                        </Select>




                        <FieldError

                            message={
                                errors.brandId?.message
                            }

                        />



                    </div>









                    <div>


                        <Label>

                            Category

                        </Label>





                        <Select


                            disabled={disabled}


                            value={
                                categoryId || undefined
                            }




                            onValueChange={(value) => {


                                setValue(

                                    "categoryId",

                                    value,

                                    {

                                        shouldDirty: true,

                                        shouldValidate: true,

                                    }

                                );


                            }}



                        >



                            <SelectTrigger className="mt-2">


                                <SelectValue

                                    placeholder="Select Category"

                                />


                            </SelectTrigger>





                            <SelectContent>



                                {
                                    categories.length === 0 ? (


                                        <SelectItem

                                            value="empty"

                                            disabled

                                        >

                                            No categories available

                                        </SelectItem>


                                    ) : (


                                        categories.map(
                                            (category) => (


                                                <SelectItem

                                                    key={
                                                        category.id
                                                    }

                                                    value={
                                                        category.id
                                                    }

                                                >

                                                    {
                                                        category.name
                                                    }

                                                </SelectItem>


                                            )
                                        )

                                    )
                                }



                            </SelectContent>



                        </Select>






                        <FieldError

                            message={
                                errors.categoryId?.message
                            }

                        />



                    </div>







                </div>



            </div>



        </Card>

    );

}
"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import ProductForm from "@/components/forms/product-form";

export default function AddProductDialog() {

    const [open, setOpen] =
        useState(false);

    return (

        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger asChild>

                <Button
                    className="
                        rounded-2xl
                        bg-green-700
                        hover:bg-green-800
                    "
                >

                    <Plus className="mr-2 h-4 w-4" />

                    Add Product

                </Button>

            </DialogTrigger>

            <DialogContent
                className="
                    w-[95vw]
                    max-w-7xl
                    overflow-hidden
                    rounded-3xl
                    border
                    border-green-100
                    bg-white
                    p-0
                    shadow-2xl
                "
            >

                {/* Header */}

                <div
                    className="
                        bg-gradient-to-r
                        from-green-600
                        to-emerald-600
                        px-8
                        py-6
                        text-white
                    "
                >

                    <DialogHeader>

                        <DialogTitle
                            className="
                                text-2xl
                                font-bold
                                text-white
                            "
                        >
                            Add New Product
                        </DialogTitle>

                        <DialogDescription
                            className="text-green-100"
                        >
                            Create a new agricultural product with
                            pricing, stock, images and specifications.
                        </DialogDescription>

                    </DialogHeader>

                </div>

                {/* Form */}

                <div
                    className="
                        max-h-[78vh]
                        overflow-y-auto
                        p-8
                    "
                >

                    <ProductForm
                        onSuccess={() =>
                            setOpen(false)
                        }
                    />

                </div>

            </DialogContent>

        </Dialog>

    );

}
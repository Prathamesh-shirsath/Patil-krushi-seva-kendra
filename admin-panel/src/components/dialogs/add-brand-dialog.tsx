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

import BrandForm from "@/components/forms/brand-form";

export default function AddBrandDialog() {

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
                    bg-gradient-to-r
                    from-green-600
                    via-emerald-600
                    to-green-700
                    px-6
                    py-3
                    shadow-lg
                    hover:shadow-xl
                    transition-all
                    duration-300
                "
                >

                    <Plus className="mr-2 h-4 w-4" />

                    Add Brand

                </Button>

            </DialogTrigger>

            <DialogContent
                className="
                max-w-xl
                rounded-3xl
                border
                border-green-100
                bg-white
                shadow-xl
            "
            >

                <DialogHeader>

                    <DialogTitle
                        className="
                        text-2xl
                        font-bold
                        text-slate-800
                    "
                    >
                        Add New Brand
                    </DialogTitle>

                    <DialogDescription
                        className="text-slate-500"
                    >
                        Create a new agricultural brand.
                    </DialogDescription>

                </DialogHeader>

                <BrandForm
                    onSuccess={() =>
                        setOpen(false)
                    }
                />

            </DialogContent>

        </Dialog>

    );

}
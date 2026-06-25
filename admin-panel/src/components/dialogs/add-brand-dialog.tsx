"use client";

import { useState } from "react";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";

import BrandForm from "@/components/forms/brand-form";

export default function AddBrandDialog() {

    const [open, setOpen] = useState(false);

    return (
        <Dialog
            open={open}
            onOpenChange={setOpen}
        >

            <DialogTrigger asChild>

                <Button className="rounded-xl bg-green-700 hover:bg-green-800">

                    <Plus className="mr-2 h-4 w-4" />

                    Add Brand

                </Button>

            </DialogTrigger>

            <DialogContent className="max-w-lg rounded-3xl">

                <DialogHeader>

                    <DialogTitle>

                        Add New Brand

                    </DialogTitle>

                    <DialogDescription>

                        Create a new brand for products.

                    </DialogDescription>

                </DialogHeader>

                <BrandForm
                    onSuccess={() => setOpen(false)}
                />

            </DialogContent>

        </Dialog>
    );
}
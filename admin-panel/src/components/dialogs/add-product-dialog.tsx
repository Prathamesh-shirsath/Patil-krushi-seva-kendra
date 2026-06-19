"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import ProductForm from "@/components/forms/product-form";

export default function AddProductDialog() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="h-12 rounded-2xl bg-green-700 hover:bg-green-800">
                    <Plus className="mr-2 h-5 w-5" />
                    Add New Product
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-6xl rounded-3xl overflow-y-auto max-h-[90vh]">
                <DialogHeader>
                    <DialogTitle className="text-2xl font-bold">
                        Add New Product
                    </DialogTitle>
                </DialogHeader>

                <ProductForm />
            </DialogContent>
        </Dialog>
    );
}
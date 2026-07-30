"use client";

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";

import { Loader2 } from "lucide-react";

import { useDeleteProduct } from "@/hooks/use-products";

interface DeleteProductDialogProps {
    open: boolean;
    productId: string | null;
    onOpenChange: (open: boolean) => void;
}

export default function DeleteProductDialog({
    open,
    productId,
    onOpenChange,
}: DeleteProductDialogProps) {

    const deleteProduct = useDeleteProduct();

    async function handleDelete() {

        if (!productId) return;

        try {

            await deleteProduct.mutateAsync(productId);

            onOpenChange(false);

        } catch (error) {

            console.error(error);

        }

    }

    return (

        <AlertDialog
            open={open}
            onOpenChange={onOpenChange}
        >

            <AlertDialogContent>

                <AlertDialogHeader>

                    <AlertDialogTitle>

                        Delete Product

                    </AlertDialogTitle>

                    <AlertDialogDescription>

                        This action cannot be undone.

                        <br />

                        Are you sure you want to permanently delete this product?

                    </AlertDialogDescription>

                </AlertDialogHeader>

                <AlertDialogFooter>

                    <AlertDialogCancel>

                        Cancel

                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={(e) => {

                            e.preventDefault();

                            handleDelete();

                        }}
                        disabled={deleteProduct.isPending}
                        className="bg-red-600 hover:bg-red-700"
                    >

                        {deleteProduct.isPending ? (

                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Deleting...
                            </>

                        ) : (

                            "Delete Product"

                        )}

                    </AlertDialogAction>

                </AlertDialogFooter>

            </AlertDialogContent>

        </AlertDialog>

    );
}
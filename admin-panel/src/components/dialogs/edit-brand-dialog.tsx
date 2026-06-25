"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import EditBrandForm from "@/components/forms/edit-brand-form";

interface Props {
    open: boolean;
    onOpenChange: (
        open: boolean
    ) => void;

    brand: any;
}

export default function EditBrandDialog({
    open,
    onOpenChange,
    brand,
}: Props) {
    if (!brand) return null;

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent>

                <DialogHeader>

                    <DialogTitle>
                        Edit Brand
                    </DialogTitle>

                </DialogHeader>

                <EditBrandForm
                    brand={brand}
                    onSuccess={() =>
                        onOpenChange(false)
                    }
                />

            </DialogContent>
        </Dialog>
    );
}
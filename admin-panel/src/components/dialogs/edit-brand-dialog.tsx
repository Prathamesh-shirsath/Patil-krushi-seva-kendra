"use client";

import {
    Dialog,
    DialogContent,
    DialogDescription,
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

            <DialogContent
                className="
                    max-w-2xl
                    rounded-3xl
                    border
                    border-green-100
                    bg-white
                    p-0
                    overflow-hidden
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
                            Edit Brand
                        </DialogTitle>

                        <DialogDescription
                            className="text-green-100"
                        >
                            Update your brand information and save the changes.
                        </DialogDescription>

                    </DialogHeader>

                </div>

                {/* Form */}

                <div className="p-8">

                    <EditBrandForm
                        brand={brand}
                        onSuccess={() =>
                            onOpenChange(false)
                        }
                    />

                </div>

            </DialogContent>

        </Dialog>

    );

}
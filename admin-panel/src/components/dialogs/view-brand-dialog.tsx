"use client";



import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Badge } from "@/components/ui/badge";

interface Props {
    open: boolean;
    onOpenChange: (
        open: boolean
    ) => void;

    brand: any;
}

export default function ViewBrandDialog({
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
            <DialogContent className="max-w-lg">

                <DialogHeader>

                    <DialogTitle>
                        Brand Details
                    </DialogTitle>

                </DialogHeader>

                <div className="space-y-5">

                    <div className="flex justify-center">

                        {brand.logo ? (

                            <img
                                src={brand.logo}
                                alt={brand.name}
                                className="h-32 w-32 rounded-2xl border object-cover"
                            />

                        ) : (

                            <div className="h-28 w-28 rounded-2xl bg-green-100 flex items-center justify-center text-3xl font-bold">
                                {brand.name
                                    .slice(0, 2)
                                    .toUpperCase()}
                            </div>

                        )}

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Brand Name
                        </p>

                        <h3 className="font-semibold text-lg">
                            {brand.name}
                        </h3>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Slug
                        </p>

                        <p>
                            {brand.slug}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Description
                        </p>

                        <p>
                            {brand.description ||
                                "No description"}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500 mb-2">
                            Status
                        </p>

                        {brand.status ? (

                            <Badge className="bg-green-100 text-green-700">
                                Active
                            </Badge>

                        ) : (

                            <Badge className="bg-red-100 text-red-700">
                                Inactive
                            </Badge>

                        )}

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Products
                        </p>

                        <p>
                            {brand._count?.products || 0}
                        </p>

                    </div>

                    <div>

                        <p className="text-sm text-slate-500">
                            Created
                        </p>

                        <p>
                            {new Date(
                                brand.createdAt
                            ).toLocaleDateString()}
                        </p>

                    </div>

                </div>

            </DialogContent>
        </Dialog>
    );
}
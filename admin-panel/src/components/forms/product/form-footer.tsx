"use client";

import {
    Loader2,
    RotateCcw,
    Save,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface FormFooterProps {
    isSubmitting: boolean;
    isEdit?: boolean;
    onCancel: () => void;
    onReset: () => void;
}

export function FormFooter({
    isSubmitting,
    isEdit = false,
    onCancel,
    onReset,
}: FormFooterProps) {
    return (
        <Card className="rounded-3xl border shadow-sm">
            <div className="flex flex-col-reverse gap-3 p-6 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={onReset}
                >
                    <RotateCcw className="mr-2 h-4 w-4" />
                    Reset
                </Button>

                <Button
                    type="button"
                    variant="secondary"
                    disabled={isSubmitting}
                    onClick={onCancel}
                >
                    <X className="mr-2 h-4 w-4" />
                    Cancel
                </Button>

                <Button
                    type="submit"
                    disabled={isSubmitting}
                >
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            {isEdit ? "Updating..." : "Creating..."}
                        </>
                    ) : (
                        <>
                            <Save className="mr-2 h-4 w-4" />
                            {isEdit
                                ? "Update Product"
                                : "Create Product"}
                        </>
                    )}
                </Button>
            </div>
        </Card>
    );
}
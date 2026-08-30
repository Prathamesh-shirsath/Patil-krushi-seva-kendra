"use client";

import {
    Loader2,
    RotateCcw,
    Save,
    X,
} from "lucide-react";

import { Button } from "@/components/ui/button";

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
        <div
            className="
                sticky
                bottom-0
                z-20
                -mx-3
                mt-8
                border-t
                border-slate-200
                bg-white/95
                p-3
                backdrop-blur
                sm:-mx-4
                sm:p-4
                md:-mx-6
                md:p-5
            "
        >

            <div
                className="
                    flex
                    flex-col-reverse
                    gap-2
                    sm:flex-row
                    sm:justify-end
                    sm:gap-3
                "
            >

                {/* RESET */}

                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={onReset}
                    className="
                        h-11
                        w-full
                        rounded-2xl
                        border-slate-200
                        bg-white
                        px-5
                        sm:w-auto
                    "
                >
                    <RotateCcw className="mr-2 h-4 w-4" />

                    Reset
                </Button>


                {/* CANCEL */}

                <Button
                    type="button"
                    variant="outline"
                    disabled={isSubmitting}
                    onClick={onCancel}
                    className="
                        h-11
                        w-full
                        rounded-2xl
                        border-slate-200
                        bg-white
                        px-5
                        text-slate-700
                        hover:bg-slate-50
                        sm:w-auto
                    "
                >
                    <X className="mr-2 h-4 w-4" />

                    Cancel
                </Button>


                {/* SAVE / UPDATE */}

                <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="
                        h-11
                        w-full
                        rounded-2xl
                        bg-emerald-600
                        px-6
                        font-semibold
                        text-white
                        shadow-sm
                        hover:bg-emerald-700
                        sm:w-auto
                    "
                >

                    {isSubmitting ? (
                        <>
                            <Loader2
                                className="
                                    mr-2
                                    h-4
                                    w-4
                                    animate-spin
                                "
                            />

                            {isEdit
                                ? "Updating..."
                                : "Creating..."}
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

        </div>
    );
}
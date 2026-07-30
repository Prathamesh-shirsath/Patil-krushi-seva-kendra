"use client";

import {
    ChangeEvent,
    DragEvent,
    useEffect,
    useMemo,
    useRef,
} from "react";
import {
    ImageIcon,
    Trash2,
    UploadCloud,
} from "lucide-react";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ImageSectionProps {
    selectedImage: File | null;
    setSelectedImage: (file: File | null) => void;
    disabled?: boolean;
}

const MAX_FILE_SIZE = 5 * 1024 * 1024;

export function ImageSection({
    selectedImage,
    setSelectedImage,
    disabled = false,
}: ImageSectionProps) {
    const inputRef =
        useRef<HTMLInputElement>(null);

    const preview = useMemo(() => {
        if (!selectedImage) return null;

        return URL.createObjectURL(selectedImage);
    }, [selectedImage]);

    useEffect(() => {
        return () => {
            if (preview) {
                URL.revokeObjectURL(preview);
            }
        };
    }, [preview]);

    const validate = (file: File) => {
        if (!file.type.startsWith("image/")) {
            return false;
        }

        if (file.size > MAX_FILE_SIZE) {
            return false;
        }

        return true;
    };

    const selectFile = (file: File) => {
        if (!validate(file)) return;

        setSelectedImage(file);
    };

    const handleFileChange = (
        e: ChangeEvent<HTMLInputElement>
    ) => {
        const file = e.target.files?.[0];

        if (!file) return;

        selectFile(file);
    };

    const handleDrop = (
        e: DragEvent<HTMLButtonElement>
    ) => {
        e.preventDefault();

        if (disabled) return;

        const file =
            e.dataTransfer.files?.[0];

        if (!file) return;

        selectFile(file);
    };

    const handleRemove = () => {
        setSelectedImage(null);

        if (inputRef.current) {
            inputRef.current.value = "";
        }
    };

    return (
        <Card className="rounded-3xl border shadow-sm">
            <div className="space-y-6 p-6">
                <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-100">
                        <ImageIcon className="h-6 w-6 text-violet-700" />
                    </div>

                    <div>
                        <h2 className="text-lg font-semibold">
                            Product Image
                        </h2>

                        <p className="text-sm text-muted-foreground">
                            Upload JPG, PNG or WEBP (Max 5 MB)
                        </p>
                    </div>
                </div>

                <input
                    ref={inputRef}
                    type="file"
                    hidden
                    disabled={disabled}
                    accept="image/png,image/jpeg,image/webp"
                    onChange={handleFileChange}
                />

                {!selectedImage ? (
                    <button
                        type="button"
                        disabled={disabled}
                        onClick={() =>
                            inputRef.current?.click()
                        }
                        onDrop={handleDrop}
                        onDragOver={(e) =>
                            e.preventDefault()
                        }
                        className="flex min-h-[260px] w-full flex-col items-center justify-center rounded-2xl border-2 border-dashed transition hover:border-primary hover:bg-muted/30"
                    >
                        <UploadCloud className="mb-4 h-12 w-12 text-muted-foreground" />

                        <p className="font-medium">
                            Drag & Drop or Click to Upload
                        </p>

                        <p className="mt-2 text-sm text-muted-foreground">
                            PNG • JPG • WEBP
                        </p>
                    </button>
                ) : (
                    <div className="rounded-2xl border p-5">
                        <div className="flex flex-col gap-5 md:flex-row">
                            <img
                                src={preview ?? ""}
                                alt="Product Preview"
                                className="h-48 w-48 rounded-2xl border object-cover"
                            />

                            <div className="flex flex-1 flex-col justify-between">
                                <div>
                                    <h3 className="font-semibold">
                                        {selectedImage.name}
                                    </h3>

                                    <p className="mt-2 text-sm text-muted-foreground">
                                        {(
                                            selectedImage.size /
                                            1024
                                        ).toFixed(2)}{" "}
                                        KB
                                    </p>
                                </div>

                                <div className="flex gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={disabled}
                                        onClick={() =>
                                            inputRef.current?.click()
                                        }
                                    >
                                        Change
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="destructive"
                                        disabled={disabled}
                                        onClick={handleRemove}
                                    >
                                        <Trash2 className="mr-2 h-4 w-4" />
                                        Remove
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </Card>
    );
}
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { Address } from "@/types/address";

import {
    useCreateAddress,
    useUpdateAddress,
} from "@/hooks/use-addresses";

interface AddressDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    address: Address | null;
}

type FormValues = {
    fullName: string;
    phone: string;
    state: string;
    district: string;
    taluka: string;
    village: string;
    city: string;
    pincode: string;
    addressLine: string;
    landmark: string;
};

export default function AddressDialog({
    open,
    onOpenChange,
    address,
}: AddressDialogProps) {
    const createMutation = useCreateAddress();
    const updateMutation = useUpdateAddress();

    const isSubmitting =
        createMutation.isPending || updateMutation.isPending;

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        defaultValues: {
            fullName: "",
            phone: "",
            state: "",
            district: "",
            taluka: "",
            village: "",
            city: "",
            pincode: "",
            addressLine: "",
            landmark: "",
        },
    });

    useEffect(() => {
        if (address) {
            reset({
                fullName: address.fullName ?? "",
                phone: address.phone ?? "",
                state: address.state ?? "",
                district: address.district ?? "",
                taluka: address.taluka ?? "",
                village: address.village ?? "",
                city: address.city ?? "",
                pincode: address.pincode ?? "",
                addressLine: address.addressLine ?? "",
                landmark: address.landmark ?? "",
            });
        } else {
            reset({
                fullName: "",
                phone: "",
                state: "",
                district: "",
                taluka: "",
                village: "",
                city: "",
                pincode: "",
                addressLine: "",
                landmark: "",
            });
        }
    }, [address, reset]);

    const onSubmit = async (values: FormValues) => {
        try {
            const cleanedValues: FormValues = {
                fullName: values.fullName.trim(),
                phone: values.phone.trim().replace(/\s/g, ""),
                state: values.state.trim(),
                district: values.district.trim(),
                taluka: values.taluka.trim(),
                village: values.village.trim(),
                city: values.city.trim(),
                pincode: values.pincode.trim(),
                addressLine: values.addressLine.trim(),
                landmark: values.landmark.trim(),
            };

            if (address) {
                await updateMutation.mutateAsync({
                    id: address.id,
                    data: cleanedValues,
                });

                toast.success("Address updated successfully");
            } else {
                await createMutation.mutateAsync(cleanedValues);

                toast.success("Address added successfully");
            }

            reset();
            onOpenChange(false);
        } catch (error: any) {
            console.error("Address save error:", error);

            toast.error(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                "Something went wrong."
            );
        }
    };

    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent className="max-w-2xl">
                <DialogHeader>
                    <DialogTitle>
                        {address ? "Edit Address" : "Add Address"}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="grid gap-4 md:grid-cols-2">

                        {/* Full Name */}
                        <div>
                            <Label>Full Name</Label>

                            <Input
                                {...register("fullName", {
                                    required: "Full name is required",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "Name must be at least 2 characters",
                                    },
                                })}
                                placeholder="Enter full name"
                            />

                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <Label>Phone</Label>

                            <Input
                                {...register("phone", {
                                    required: "Phone number is required",
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message:
                                            "Enter a valid 10-digit mobile number",
                                    },
                                })}
                                placeholder="9876543210"
                                inputMode="numeric"
                                maxLength={10}
                            />

                            {errors.phone && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.phone.message}
                                </p>
                            )}
                        </div>

                        {/* State */}
                        <div>
                            <Label>State</Label>

                            <Input
                                {...register("state", {
                                    required: "State is required",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "State must be at least 2 characters",
                                    },
                                })}
                                placeholder="Maharashtra"
                            />

                            {errors.state && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.state.message}
                                </p>
                            )}
                        </div>

                        {/* District */}
                        <div>
                            <Label>District</Label>

                            <Input
                                {...register("district", {
                                    required: "District is required",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "District must be at least 2 characters",
                                    },
                                })}
                                placeholder="Chhatrapati Sambhajinagar"
                            />

                            {errors.district && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.district.message}
                                </p>
                            )}
                        </div>

                        {/* Taluka */}
                        <div>
                            <Label>Taluka</Label>

                            <Input
                                {...register("taluka")}
                                placeholder="Enter taluka"
                            />
                        </div>

                        {/* Village */}
                        <div>
                            <Label>Village</Label>

                            <Input
                                {...register("village", {
                                    required: "Village is required",
                                    minLength: {
                                        value: 2,
                                        message:
                                            "Village must be at least 2 characters",
                                    },
                                })}
                                placeholder="Enter village"
                            />

                            {errors.village && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.village.message}
                                </p>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <Label>City</Label>

                            <Input
                                {...register("city")}
                                placeholder="Enter city"
                            />
                        </div>

                        {/* Pincode */}
                        <div>
                            <Label>Pincode</Label>

                            <Input
                                {...register("pincode", {
                                    required: "Pincode is required",
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message:
                                            "Pincode must be exactly 6 digits",
                                    },
                                })}
                                placeholder="431001"
                                inputMode="numeric"
                                maxLength={6}
                            />

                            {errors.pincode && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.pincode.message}
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <Label>Address</Label>

                        <Input
                            {...register("addressLine", {
                                required: "Address is required",
                                minLength: {
                                    value: 5,
                                    message:
                                        "Address must be at least 5 characters",
                                },
                            })}
                            placeholder="Enter complete address"
                        />

                        {errors.addressLine && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.addressLine.message}
                            </p>
                        )}
                    </div>

                    {/* Landmark */}
                    <div>
                        <Label>Landmark</Label>

                        <Input
                            {...register("landmark")}
                            placeholder="Near temple, school, etc."
                        />
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            disabled={isSubmitting}
                            onClick={() => onOpenChange(false)}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? "Saving..."
                                : address
                                    ? "Update Address"
                                    : "Add Address"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
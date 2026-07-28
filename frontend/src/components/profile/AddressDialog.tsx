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
                fullName: address.fullName,
                phone: address.phone,

                state: address.state,
                district: address.district,
                taluka: address.taluka ?? "",
                village: address.village,
                city: address.city ?? "",

                pincode: address.pincode,

                addressLine: address.addressLine,
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
            if (address) {
                await updateMutation.mutateAsync({
                    id: address.id,
                    data: values,
                });

                toast.success("Address updated successfully");
            } else {
                await createMutation.mutateAsync(values);

                toast.success("Address added successfully");
            }

            reset();

            onOpenChange(false);
        } catch (error: any) {
            toast.error(
                error?.response?.data?.message ??
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
                        <div>
                            <Label>Full Name</Label>
                            <Input {...register("fullName")} />
                        </div>

                        <div>
                            <Label>Phone</Label>
                            <Input {...register("phone")} />
                        </div>

                        <div>
                            <Label>State</Label>
                            <Input {...register("state")} />
                        </div>

                        <div>
                            <Label>District</Label>
                            <Input {...register("district")} />
                        </div>

                        <div>
                            <Label>Taluka</Label>
                            <Input {...register("taluka")} />
                        </div>

                        <div>
                            <Label>Village</Label>
                            <Input {...register("village")} />
                        </div>

                        <div>
                            <Label>City</Label>
                            <Input {...register("city")} />
                        </div>

                        <div>
                            <Label>Pincode</Label>
                            <Input {...register("pincode")} />
                        </div>
                    </div>

                    <div>
                        <Label>Address</Label>
                        <Input {...register("addressLine")} />
                    </div>

                    <div>
                        <Label>Landmark</Label>
                        <Input {...register("landmark")} />
                    </div>

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
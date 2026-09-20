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
import { useLanguage } from "@/i18n/useLanguage";

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
    const { t } = useLanguage();
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

                toast.success(t.profile.addressDialog.toast.updateSuccess);
            } else {
                await createMutation.mutateAsync(cleanedValues);

                toast.success(t.profile.addressDialog.toast.addSuccess);
            }

            reset();
            onOpenChange(false);
        } catch (error: any) {
            console.error("Address save error:", error);

            toast.error(
                error?.response?.data?.message ||
                error?.response?.data?.error ||
                error?.message ||
                t.profile.addressDialog.toast.error
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
                        {address ? t.profile.addressDialog.editTitle : t.profile.addressDialog.addTitle}
                    </DialogTitle>
                </DialogHeader>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-5"
                >
                    <div className="grid gap-4 md:grid-cols-2">

                        {/* Full Name */}
                        <div>
                            <Label>{t.profile.addressDialog.labels.fullName}</Label>

                            <Input
                                {...register("fullName", {
                                    required: t.profile.addressDialog.validation.nameRequired,
                                    minLength: {
                                        value: 2,
                                        message:
                                            t.profile.addressDialog.validation.nameMin,
                                    },
                                })}
                                placeholder={t.profile.addressDialog.placeholders.fullName}
                            />

                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.fullName.message}
                                </p>
                            )}
                        </div>

                        {/* Phone */}
                        <div>
                            <Label>{t.profile.addressDialog.labels.phone}</Label>

                            <Input
                                {...register("phone", {
                                    required: t.profile.addressDialog.validation.phoneRequired,
                                    pattern: {
                                        value: /^[6-9]\d{9}$/,
                                        message:
                                            t.profile.addressDialog.validation.phonePattern,
                                    },
                                })}
                                placeholder={t.profile.addressDialog.placeholders.phone}
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
                            <Label>{t.profile.addressDialog.labels.state}</Label>

                            <Input
                                {...register("state", {
                                    required: t.profile.addressDialog.validation.stateRequired,
                                    minLength: {
                                        value: 2,
                                        message:
                                            t.profile.addressDialog.validation.stateMin,
                                    },
                                })}
                                placeholder={t.profile.addressDialog.placeholders.state}
                            />

                            {errors.state && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.state.message}
                                </p>
                            )}
                        </div>

                        {/* District */}
                        <div>
                            <Label>{t.profile.addressDialog.labels.district}</Label>

                            <Input
                                {...register("district", {
                                    required: t.profile.addressDialog.validation.districtRequired,
                                    minLength: {
                                        value: 2,
                                        message:
                                            t.profile.addressDialog.validation.districtMin,
                                    },
                                })}
                                placeholder={t.profile.addressDialog.placeholders.district}
                            />

                            {errors.district && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.district.message}
                                </p>
                            )}
                        </div>

                        {/* Taluka */}
                        <div>
                            <Label>{t.profile.addressDialog.labels.taluka}</Label>

                            <Input
                                {...register("taluka")}
                                placeholder={t.profile.addressDialog.placeholders.taluka}
                            />
                        </div>

                        {/* Village */}
                        <div>
                            <Label>{t.profile.addressDialog.labels.village}</Label>

                            <Input
                                {...register("village", {
                                    required: t.profile.addressDialog.validation.villageRequired,
                                    minLength: {
                                        value: 2,
                                        message:
                                            t.profile.addressDialog.validation.villageMin,
                                    },
                                })}
                                placeholder={t.profile.addressDialog.placeholders.village}
                            />

                            {errors.village && (
                                <p className="mt-1 text-sm text-red-500">
                                    {errors.village.message}
                                </p>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <Label>{t.profile.addressDialog.labels.city}</Label>

                            <Input
                                {...register("city")}
                                placeholder={t.profile.addressDialog.placeholders.city}
                            />
                        </div>

                        {/* Pincode */}
                        <div>
                            <Label>{t.profile.addressDialog.labels.pincode}</Label>

                            <Input
                                {...register("pincode", {
                                    required: t.profile.addressDialog.validation.pincodeRequired,
                                    pattern: {
                                        value: /^\d{6}$/,
                                        message:
                                            t.profile.addressDialog.validation.pincodePattern,
                                    },
                                })}
                                placeholder={t.profile.addressDialog.placeholders.pincode}
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
                        <Label>{t.profile.addressDialog.labels.address}</Label>

                        <Input
                            {...register("addressLine", {
                                required: t.profile.addressDialog.validation.addressRequired,
                                minLength: {
                                    value: 5,
                                    message:
                                        t.profile.addressDialog.validation.addressMin,
                                },
                            })}
                            placeholder={t.profile.addressDialog.placeholders.address}
                        />

                        {errors.addressLine && (
                            <p className="mt-1 text-sm text-red-500">
                                {errors.addressLine.message}
                            </p>
                        )}
                    </div>

                    {/* Landmark */}
                    <div>
                        <Label>{t.profile.addressDialog.labels.landmark}</Label>

                        <Input
                            {...register("landmark")}
                            placeholder={t.profile.addressDialog.placeholders.landmark}
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
                            {t.profile.addressDialog.buttons.cancel}
                        </Button>

                        <Button
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? t.profile.addressDialog.buttons.saving
                                : address
                                    ? t.profile.addressDialog.buttons.update
                                    : t.profile.addressDialog.buttons.add}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}

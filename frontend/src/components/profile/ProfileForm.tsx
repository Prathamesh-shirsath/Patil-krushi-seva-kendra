"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
    useProfile,
    useUpdateProfile,
} from "@/hooks/use-user";
import { useLanguage } from "@/i18n/useLanguage";

type ProfileFormValues = {
    name: string;
    email: string;
};

export default function ProfileForm() {
    const { t } = useLanguage();
    const { data, isLoading } = useProfile();

    const updateProfile = useUpdateProfile();

    const {
        register,
        handleSubmit,
        reset,
    } = useForm<ProfileFormValues>({
        defaultValues: {
            name: "",
            email: "",
        },
    });

    useEffect(() => {
        if (data) {
            reset({
                name: data.name ?? "",
                email: data.email ?? "",
            });
        }
    }, [data, reset]);

    const onSubmit = (values: ProfileFormValues) => {
        updateProfile.mutate(values);
    };

    if (isLoading) {
        return (
            <p className="text-muted-foreground">
                {t.profile.form.loading}
            </p>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div>
                <Label>{t.profile.form.nameLabel}</Label>

                <Input
                    placeholder={t.profile.form.namePlaceholder}
                    {...register("name")}
                />
            </div>

            <div>
                <Label>{t.profile.form.phoneLabel}</Label>

                <Input
                    value={data?.phone ?? ""}
                    disabled
                />
            </div>

            <div>
                <Label>{t.profile.form.emailLabel}</Label>

                <Input
                    placeholder={t.profile.form.emailPlaceholder}
                    {...register("email")}
                />
            </div>

            <Button
                type="submit"
                disabled={updateProfile.isPending}
            >
                {updateProfile.isPending
                    ? t.profile.form.saving
                    : t.profile.form.saveChanges}
            </Button>
        </form>
    );
}

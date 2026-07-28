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

type ProfileFormValues = {
    name: string;
    email: string;
};

export default function ProfileForm() {
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
                Loading profile...
            </p>
        );
    }

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6"
        >
            <div>
                <Label>Name</Label>

                <Input
                    placeholder="Enter your name"
                    {...register("name")}
                />
            </div>

            <div>
                <Label>Mobile Number</Label>

                <Input
                    value={data?.phone ?? ""}
                    disabled
                />
            </div>

            <div>
                <Label>Email</Label>

                <Input
                    placeholder="Enter email"
                    {...register("email")}
                />
            </div>

            <Button
                type="submit"
                disabled={updateProfile.isPending}
            >
                {updateProfile.isPending
                    ? "Saving..."
                    : "Save Changes"}
            </Button>
        </form>
    );
}
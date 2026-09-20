"use client";

import { useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

import AddressCard from "./AddressCard";
import AddressDialog from "./AddressDialog";

import { Address } from "@/types/address";

import {
    useAddresses,
    useDeleteAddress,
    useDefaultAddress,
} from "@/hooks/use-addresses";
import { useLanguage } from "@/i18n/useLanguage";

export default function AddressList() {
    const { t } = useLanguage();
    const { data: addresses = [], isLoading } = useAddresses();

    const deleteMutation = useDeleteAddress();
    const defaultMutation = useDefaultAddress();

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState<Address | null>(null);

    const handleAdd = () => {
        setSelected(null);
        setOpen(true);
    };

    const handleEdit = (address: Address) => {
        setSelected(address);
        setOpen(true);
    };

    const handleDelete = (id: string) => {
        const ok = window.confirm(
            t.profile.addresses.confirmDelete
        );

        if (!ok) return;

        deleteMutation.mutate(id);
    };

    const handleDefault = (id: string) => {
        defaultMutation.mutate(id);
    };

    if (isLoading) {
        return (
            <div className="py-12 text-center text-muted-foreground">
                {t.profile.addresses.loading}
            </div>
        );
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        {t.profile.addresses.title}
                    </h2>

                    <p className="text-muted-foreground">
                        {t.profile.addresses.description}
                    </p>
                </div>

                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    {t.profile.addresses.addAddress}
                </Button>
            </div>

            {addresses.length === 0 ? (
                <div className="rounded-xl border border-dashed p-12 text-center">
                    <h3 className="text-lg font-semibold">
                        {t.profile.addresses.emptyTitle}
                    </h3>

                    <p className="mt-2 text-muted-foreground">
                        {t.profile.addresses.emptyDesc}
                    </p>

                    <Button
                        className="mt-6"
                        onClick={handleAdd}
                    >
                        {t.profile.addresses.addAddress}
                    </Button>
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2">
                    {addresses.map((address) => (
                        <AddressCard
                            key={address.id}
                            address={address}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onSetDefault={handleDefault}
                        />
                    ))}
                </div>
            )}

            <AddressDialog
                open={open}
                onOpenChange={setOpen}
                address={selected}
            />
        </>
    );
}

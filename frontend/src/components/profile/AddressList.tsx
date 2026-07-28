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

export default function AddressList() {
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
            "Are you sure you want to delete this address?"
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
                Loading addresses...
            </div>
        );
    }

    return (
        <>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold">
                        My Addresses
                    </h2>

                    <p className="text-muted-foreground">
                        Manage your saved delivery addresses.
                    </p>
                </div>

                <Button onClick={handleAdd}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Address
                </Button>
            </div>

            {addresses.length === 0 ? (
                <div className="rounded-xl border border-dashed p-12 text-center">
                    <h3 className="text-lg font-semibold">
                        No addresses found
                    </h3>

                    <p className="mt-2 text-muted-foreground">
                        Add your first delivery address.
                    </p>

                    <Button
                        className="mt-6"
                        onClick={handleAdd}
                    >
                        Add Address
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
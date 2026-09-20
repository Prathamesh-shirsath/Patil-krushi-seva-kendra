"use client";

import { MapPin, Pencil, Trash2, CheckCircle2 } from "lucide-react";

import { Address } from "@/types/address";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/i18n/useLanguage";

interface AddressCardProps {
    address: Address;
    onEdit: (address: Address) => void;
    onDelete: (id: string) => void;
    onSetDefault: (id: string) => void;
}

export default function AddressCard({
    address,
    onEdit,
    onDelete,
    onSetDefault,
}: AddressCardProps) {
    const { t } = useLanguage();
    return (
        <Card className="rounded-xl p-5 transition-shadow hover:shadow-md">
            <div className="flex items-start justify-between">
                <div>
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-lg">
                            {address.fullName}
                        </h3>

                        {address.isDefault && (
                            <Badge>{t.profile.addresses.isDefault}</Badge>
                        )}
                    </div>

                    <p className="mt-1 text-sm text-muted-foreground">
                        {address.phone}
                    </p>
                </div>

                <MapPin className="h-5 w-5 text-primary" />
            </div>

            <div className="mt-4 space-y-1 text-sm">
                <p>{address.addressLine}</p>

                {address.landmark && (
                    <p>{address.landmark}</p>
                )}

                <p>
                    {[
                        address.village,
                        address.taluka,
                        address.city,
                        address.district,
                        address.state,
                        address.pincode,
                    ]
                        .filter(Boolean)
                        .join(", ")}
                </p>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {!address.isDefault && (
                    <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onSetDefault(address.id)}
                    >
                        <CheckCircle2 className="mr-2 h-4 w-4" />
                        {t.profile.addresses.setDefault}
                    </Button>
                )}

                <Button
                    size="sm"
                    variant="secondary"
                    onClick={() => onEdit(address)}
                >
                    <Pencil className="mr-2 h-4 w-4" />
                    {t.profile.addresses.edit}
                </Button>

                <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => onDelete(address.id)}
                >
                    <Trash2 className="mr-2 h-4 w-4" />
                    {t.profile.addresses.delete}
                </Button>
            </div>
        </Card>
    );
}

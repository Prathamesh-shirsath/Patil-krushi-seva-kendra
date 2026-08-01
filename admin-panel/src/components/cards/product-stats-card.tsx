"use client";

import { TrendingUp } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

interface ProductStatsCardProps {
    title: string;
    value: number;
    subtitle: string;
    icon: React.ReactNode;
    iconBg: string;
}

export default function ProductStatsCard({
    title,
    value,
    subtitle,
    icon,
    iconBg,
}: ProductStatsCardProps) {
    return (
        <Card
            className="
                overflow-hidden
                border
                border-slate-200
                bg-white
                transition-all
                duration-300
                hover:-translate-y-1
                hover:border-green-200
                hover:shadow-lg
            "
        >
            <CardContent className="p-6">

                <div className="flex items-start justify-between gap-4">

                    <div className="flex-1">

                        <p className="text-sm font-medium text-slate-500">
                            {title}
                        </p>

                        <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                            {value.toLocaleString("en-IN")}
                        </h2>

                        <div className="mt-4 flex items-center gap-2 text-sm text-slate-500">

                            <TrendingUp className="h-4 w-4 text-green-600" />

                            <span>{subtitle}</span>

                        </div>

                    </div>

                    <div
                        className={`
                            flex
                            h-14
                            w-14
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            ${iconBg}
                        `}
                    >
                        {icon}
                    </div>

                </div>

            </CardContent>
        </Card>
    );
}
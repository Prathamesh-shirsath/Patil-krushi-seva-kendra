"use client";

import { TrendingUp } from "lucide-react";

import {
    Card,
    CardContent,
} from "@/components/ui/card";

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
                rounded-3xl
                border
                border-slate-200
                bg-white
                shadow-sm
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:border-green-200
                hover:shadow-md
            "
        >
            <CardContent className="p-6">

                <div className="flex items-center justify-between gap-4">

                    <div className="min-w-0">

                        <p className="text-sm font-medium text-slate-500">
                            {title}
                        </p>

                        <h2
                            className="
                                mt-3
                                text-3xl
                                font-bold
                                tracking-tight
                                text-slate-900
                            "
                        >
                            {value.toLocaleString("en-IN")}
                        </h2>

                        <div
                            className="
                                mt-4
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-500
                            "
                        >
                            <TrendingUp
                                className="h-4 w-4 text-emerald-600"
                            />

                            <span>
                                {subtitle}
                            </span>
                        </div>

                    </div>

                    <div
                        className={`
                            flex
                            h-16
                            w-16
                            shrink-0
                            items-center
                            justify-center
                            rounded-2xl
                            shadow-sm
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
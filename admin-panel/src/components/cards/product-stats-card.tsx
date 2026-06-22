"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";

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
      border-slate-200
      shadow-sm
      "
        >
            <CardContent className="p-7">

                <div className="flex items-start justify-between">

                    <div>

                        <p className="text-base text-slate-500">
                            {title}
                        </p>

                        <h2 className="mt-3 text-5xl font-bold text-slate-900">
                            {value}
                        </h2>

                        <div className="mt-5 flex items-center gap-2">

                            <TrendingUp
                                size={16}
                                className="text-green-600"
                            />

                            <span className="text-sm text-slate-500">
                                {subtitle}
                            </span>

                        </div>

                    </div>

                    <div
                        className={`
            flex
            h-16
            w-16
            items-center
            justify-center
            rounded-3xl
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
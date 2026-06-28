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
                border
                border-slate-100
                bg-white
                shadow-sm
                transition-all
                duration-300
                hover:-translate-y-1
                hover:shadow-xl
            "
        >

            <CardContent className="p-6">

                <div className="flex items-start justify-between">

                    <div className="flex-1">

                        <p className="text-sm font-medium text-slate-500">
                            {title}
                        </p>

                        <h2
                            className="
                                mt-3
                                text-3xl
                                sm:text-4xl
                                font-bold
                                text-slate-900
                            "
                        >
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
                            h-14
                            w-14
                            items-center
                            justify-center
                            rounded-2xl
                            ${iconBg}
                            shadow-sm
                            shrink-0
                        `}
                    >
                        {icon}
                    </div>

                </div>

            </CardContent>

        </Card>

    );

}
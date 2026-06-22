"use client";

import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import CountUp from "react-countup";

interface StatsCardProps {
    title: string;
    value: number;
    prefix?: string;
    suffix?: string;
    percentage: number;
    icon: React.ReactNode;
    iconBg: string;
}

export default function StatsCard({
    title,
    value,
    prefix = "",
    suffix = "",
    percentage,
    icon,
    iconBg,
}: StatsCardProps) {
    return (
        <Card className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
            <CardContent className="p-5">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                            {title}
                        </p>

                        <h2 className="mt-3 text-3xl font-bold text-gray-950">
                            {prefix}
                            <CountUp
                                end={value}
                                separator=","
                                duration={2}
                            />
                            {suffix}
                        </h2>

                        <div className="mt-4 flex items-center gap-2">
                            <div className="flex items-center gap-1 rounded-full bg-green-50 px-2 py-1">
                                <TrendingUp className="h-4 w-4 text-green-700" />

                                <span className="text-xs font-semibold text-green-700">
                                    {percentage}%
                                </span>
                            </div>

                            <span className="text-xs text-gray-500">
                                vs last week
                            </span>
                        </div>
                    </div>

                    <div
                        className={`flex h-14 w-14 items-center justify-center rounded-2xl border border-gray-100 ${iconBg} transition-all duration-300 group-hover:scale-105`}
                    >
                        {icon}
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
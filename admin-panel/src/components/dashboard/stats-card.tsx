"use client";

type StatsCardProps = {
  title: string;
  value: string;
  growth: string;
  icon: React.ReactNode;
  iconBg: string;
  growthColor: string;
};

export default function StatsCard({
  title,
  value,
  growth,
  icon,
  iconBg,
  growthColor,
}: StatsCardProps) {
  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            {value}
          </h2>

          <div className="mt-4 flex items-center gap-2">

            <span className={`font-medium ${growthColor}`}>
              ↑ {growth}
            </span>

            <span className="text-sm text-slate-400">
              vs last week
            </span>

          </div>

        </div>

        <div
          className={`flex h-14 w-14 items-center justify-center rounded-full ${iconBg}`}
        >
          {icon}
        </div>

      </div>

    </div>
  );
}
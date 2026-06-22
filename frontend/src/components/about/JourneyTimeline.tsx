
"use client";

import {
  Store,
  Users,
  Package,
  Monitor,
  Sprout,
} from "lucide-react";

const milestones = [
  {
    year: "2018",
    title: "Started as a Local Agriculture Store",
    icon: Store,
  },
  {
    year: "2020",
    title: "Served 2000+ Happy Farmers",
    icon: Users,
  },
  {
    year: "2022",
    title: "Expanded Our Product Range",
    icon: Package,
  },
  {
    year: "2024",
    title: "Digital Transformation & Online Store",
    icon: Monitor,
  },
  {
    year: "2025",
    title: "10,000+ Farmers & Growing",
    icon: Sprout,
  },
];

export default function JourneyTimeline() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
            🌱 OUR JOURNEY
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Growing Together With Farmers
          </h2>

          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">
            Our journey reflects our commitment to helping farmers
            achieve better productivity through trusted agricultural solutions.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">

          {/* Desktop Line */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-1 bg-green-200" />

          <div className="grid gap-8 lg:grid-cols-5">
            {milestones.map((item) => (
              <div
                key={item.year}
                className="relative text-center"
              >
                <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-xl border-4 border-green-100">
                  <item.icon className="h-10 w-10 text-green-600" />
                </div>

                <h3 className="mt-5 text-3xl font-extrabold text-green-700">
                  {item.year}
                </h3>

                <p className="mt-3 text-gray-700 font-medium">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}


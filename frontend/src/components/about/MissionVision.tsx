
"use client";

import {
  Target,
  Eye,
  HeartHandshake,
} from "lucide-react";

const items = [
  {
    icon: Target,
    title: "Our Mission",
    description:
      "To provide farmers with premium quality agricultural products, expert guidance and modern solutions that improve productivity and profitability.",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description:
      "To become the most trusted agricultural partner by promoting innovation, sustainability and growth in farming communities.",
  },
  {
    icon: HeartHandshake,
    title: "Our Values",
    description:
      "Trust, Quality, Service and Farmer Success drive everything we do and help us build long-term relationships.",
  },
];

export default function MissionVision() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 md:px-8">

        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 rounded-full bg-green-100 px-4 py-2 text-green-700 font-semibold">
            🌱 OUR PURPOSE
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-extrabold text-gray-900">
            Mission • Vision • Values
          </h2>

          <p className="mt-4 text-gray-600 max-w-3xl mx-auto">
            Our commitment to farmers is built on strong values,
            innovation and dedication towards sustainable agriculture.
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.title}
              className="
                group
                rounded-3xl
                bg-gradient-to-br
                from-green-50
                to-white
                p-8
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-green-600 text-white">
                <item.icon className="h-8 w-8" />
              </div>

              <h3 className="mt-6 text-2xl font-bold text-gray-900">
                {item.title}
              </h3>

              <p className="mt-4 text-gray-600 leading-7">
                {item.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}


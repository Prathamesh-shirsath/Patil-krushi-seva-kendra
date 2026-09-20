"use client";

import Image from "next/image";
import { ShieldCheck, UserCheck, Truck, IndianRupee } from "lucide-react";
import { useLanguage } from "@/i18n/useLanguage";

const features = [
  {
    icon: ShieldCheck,
    title: "100% Genuine Products",
  },
  {
    icon: UserCheck,
    title: "Expert Guidance",
  },
  {
    icon: Truck,
    title: "Fast & Safe Delivery",
  },
  {
    icon: IndianRupee,
    title: "Affordable Prices",
  },
];

export default function WhoWeAre() {
  const { t } = useLanguage();

  const features = [
    {
      icon: ShieldCheck,
      title: t.about.whoWeAre.features.genuine,
    },
    {
      icon: UserCheck,
      title: t.about.whoWeAre.features.expert,
    },
    {
      icon: Truck,
      title: t.about.whoWeAre.features.fast,
    },
    {
      icon: IndianRupee,
      title: t.about.whoWeAre.features.affordable,
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Image */}
          <div className="relative">
            <Image
              src="/about/shop.jpg"
              alt={t.about.accessibility.whoWeAreAlt}
              width={700}
              height={500}
              className="rounded-3xl shadow-xl object-cover"
            />
          </div>

          {/* Content */}
          <div>
            <span className="text-green-600 font-semibold uppercase tracking-wide">
              🌱 {t.about.whoWeAre.badge}
            </span>

            <h2 className="mt-3 text-4xl font-extrabold text-gray-900 leading-tight">
              {t.about.whoWeAre.title1}
              <span className="block text-green-600">
                {t.about.whoWeAre.title2}
              </span>
            </h2>

            <p className="mt-6 text-gray-600 leading-8">
              {t.about.whoWeAre.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mt-8">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center p-4 rounded-2xl bg-green-50 hover:bg-green-100 transition"
                >
                  <item.icon className="h-10 w-10 text-green-600 mb-3" />
                  <p className="font-medium text-gray-800">
                    {item.title}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

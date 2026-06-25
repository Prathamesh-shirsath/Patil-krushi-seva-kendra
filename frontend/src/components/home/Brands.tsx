"use client";

import Image from "next/image";
import { useBrands } from "@/hooks/use-brands";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

export default function Brands() {
  const {
    data: brands = [],
    isLoading,
  } = useBrands();

  if (isLoading) {
    return null;
  }

  return (
    <section className="py-12">
      <div className="w-full px-4 md:px-8 lg:px-12">

        <div className="flex items-center justify-between mb-8">
          <div>
            <span className="text-green-600 font-semibold">
              🌱 Trusted Partners
            </span>

            <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
              Top Agricultural Brands
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">

          {brands.slice(0, 6).map(
            (brand: any) => (
              <Card
                key={brand.id}
                className="
                group
                overflow-hidden
                rounded-3xl
                border-0
                bg-white
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
              "
              >
                <CardContent className="flex flex-col items-center justify-center p-8">

                  <div className="mb-4">

                    {brand.logo ? (
                      <img
                        src={brand.logo}
                        alt={brand.name}
                        className="
                        h-16
                        w-16
                        object-contain
                        transition-all
                        duration-500
                        group-hover:scale-110
                      "
                      />
                    ) : (
                      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center font-bold text-lg">
                        {brand.name
                          .slice(0, 2)
                          .toUpperCase()}
                      </div>
                    )}

                  </div>

                  <h3 className="font-bold text-lg text-gray-800 text-center">
                    {brand.name}
                  </h3>

                  <p className="text-xs text-gray-500 mt-1">
                    Trusted Brand
                  </p>

                </CardContent>
              </Card>
            )
          )}

        </div>

      </div>
    </section>
  );
}
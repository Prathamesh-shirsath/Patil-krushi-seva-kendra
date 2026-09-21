"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/i18n/useLanguage";

export default function Newsletter() {
  const { t } = useLanguage();

  return (
    <section className="py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-green-700 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Side */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                {t.home.newsletter.title}
              </h2>

              <p className="text-green-100 mt-3">
                {t.home.newsletter.description}
              </p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder={t.home.newsletter.emailPlaceholder}
                className="
                  bg-white
                  text-black
                  min-w-[280px]
                  h-12
                "
              />

              <Button
                size="lg"
                className="
                  bg-white
                  text-green-700
                  hover:bg-green-100
                "
              >
                {t.home.newsletter.subscribe}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

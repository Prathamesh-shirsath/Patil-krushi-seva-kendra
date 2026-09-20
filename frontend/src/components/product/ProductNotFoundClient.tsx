"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/i18n/useLanguage";

export default function ProductNotFoundClient() {
  const { t } = useLanguage();

  return (
    <main className="bg-white">
      <section className="mx-auto max-w-[1500px] px-4 py-16 text-center sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-950">
          {t.product.notFound.title}
        </h1>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-600">
          {t.product.notFound.message}
        </p>

        <Button
          asChild
          className="mt-6 h-11 rounded bg-green-700 px-6 text-white hover:bg-green-800"
        >
          <Link href="/shop">{t.product.notFound.backToShop}</Link>
        </Button>
      </section>
    </main>
  );
}

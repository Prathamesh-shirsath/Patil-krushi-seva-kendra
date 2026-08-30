import HeroSlider from "@/components/home/HeroSlider";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import Brands from "@/components/home/Brands";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import PromoBanner from "@/components/home/PromoBanner";
import ProductsByCategory from "@/components/home/ProductsByCategory";
import StatisticsStrip from "@/components/home/StatisticsStrip";
import BestSelling from "@/components/home/BestSelling";
import SectionReveal from "@/components/animations/SectionReveal";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-white">

      {/* ================= HERO ================= */}
      <section className="w-full overflow-hidden">
        <HeroSlider />
      </section>

      {/* ================= FEATURES ================= */}
      <SectionReveal>
        <section className="w-full overflow-hidden py-2 sm:py-4">
          <Features />
        </section>
      </SectionReveal>

      {/* ================= CATEGORIES ================= */}
      <SectionReveal delay={60}>
        <section className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
          <Categories />
        </section>
      </SectionReveal>

      {/* ================= BRANDS ================= */}
      <SectionReveal delay={80}>
        <section className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
          <Brands />
        </section>
      </SectionReveal>

      {/* ================= FEATURED PRODUCTS ================= */}
      <SectionReveal delay={80}>
        <section className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
          <FeaturedProducts />
        </section>
      </SectionReveal>

      {/* ================= PROMO BANNER ================= */}
      <SectionReveal delay={80}>
        <section className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
          <PromoBanner />
        </section>
      </SectionReveal>

      {/* ================= PRODUCTS BY CATEGORY ================= */}
      <SectionReveal delay={80}>
        <section className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
          <ProductsByCategory />
        </section>
      </SectionReveal>

      {/* ================= STATISTICS ================= */}
      <section className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
        <StatisticsStrip />
      </section>

      {/* ================= BEST SELLING ================= */}
      <SectionReveal delay={80}>
        <section className="w-full overflow-hidden py-2 sm:py-4 md:py-6">
          <BestSelling />
        </section>
      </SectionReveal>

    </main>
  );
}
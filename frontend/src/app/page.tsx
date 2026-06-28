
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
//import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
   <main className="w-full overflow-x-hidden bg-white">
  <HeroSlider />

  <SectionReveal>
    <Features />
  </SectionReveal>
  <SectionReveal delay={60}>
    <Categories />
  </SectionReveal>
  <SectionReveal delay={80}>
    <Brands />
  </SectionReveal>
  <SectionReveal delay={80}>
    <FeaturedProducts />
  </SectionReveal>
  <SectionReveal delay={80}>
    <PromoBanner />
  </SectionReveal>
  <SectionReveal delay={80}>
    <ProductsByCategory />
  </SectionReveal>
  <StatisticsStrip />
  <SectionReveal delay={80}>
    <BestSelling />
  </SectionReveal>
</main>
  );
}


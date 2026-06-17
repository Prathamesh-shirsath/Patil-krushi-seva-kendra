
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import Brands from "@/components/home/Brands";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSelling from "@/components/home/BestSelling";
import Newsletter from "@/components/home/Newsletter";
import HeroSlider from "@/components/home/HeroSlider";

export default function HomePage() {
  return (
    <main className="bg-white">
      <HeroSlider />

      <div className="container mx-auto px-4 py-8">
        <Features />
        <Categories />
        <Brands />
        <FeaturedProducts />
        <BestSelling />
      </div>

      <Newsletter />
    </main>
  );
}
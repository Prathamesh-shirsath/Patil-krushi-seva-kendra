
import HeroSlider from "@/components/home/HeroSlider";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import Brands from "@/components/home/Brands";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSelling from "@/components/home/BestSelling";
//import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
   <main className="w-full overflow-x-hidden bg-white">
  <HeroSlider />

  <Features />
  <Categories />
  <Brands />
  <FeaturedProducts />
  <BestSelling />
</main>
  );
}


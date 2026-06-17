
import HeroSlider from "@/components/home/HeroSlider";
import Features from "@/components/home/Features";
import Categories from "@/components/home/Categories";
import Brands from "@/components/home/Brands";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import BestSelling from "@/components/home/BestSelling";
//import Newsletter from "@/components/home/Newsletter";

export default function HomePage() {
  return (
    <main className="w-full bg-white overflow-x-hidden">
      {/* Hero Section */}
      <HeroSlider />

      {/* Main Content */}
      <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <section className="mb-8 md:mb-12">
          <Features />
        </section>

        <section className="mb-8 md:mb-12">
          <Categories />
        </section>

        <section className="mb-8 md:mb-12">
          <Brands />
        </section>

        <section className="mb-8 md:mb-12">
          <FeaturedProducts />
        </section>

        <section className="mb-8 md:mb-12">
          <BestSelling />
        </section>
      </div>

      {/*  Newsletter 
      <section className="mt-8 md:mt-12">
        <Newsletter />
      </section> */}
    </main>
  );
}


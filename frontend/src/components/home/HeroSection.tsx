import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl bg-green-50">
          <div className="grid lg:grid-cols-2 gap-8 items-center p-10">
            <div>
              <span className="inline-block px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm">
                Trusted by 10,000+ Farmers
              </span>

              <h1 className="mt-5 text-4xl lg:text-6xl font-bold leading-tight">
                All Your Farming Needs in One Place
              </h1>

              <p className="mt-4 text-gray-600">
                High quality products, expert advice and reliable service.
              </p>

              <div className="flex gap-4 mt-6">
                <button className="bg-green-600 text-white px-6 py-3 rounded-lg">
                  Shop Now
                </button>

                <button className="border px-6 py-3 rounded-lg">
                  Explore Categories
                </button>
              </div>
            </div>

            <div>
              <Image
                src="/hero-banner.jpg"
                alt="hero"
                width={700}
                height={600}
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
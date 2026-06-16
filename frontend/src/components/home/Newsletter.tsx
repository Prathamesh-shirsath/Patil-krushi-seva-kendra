import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function Newsletter() {
  return (
    <section className="py-16 mt-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="rounded-3xl bg-green-700 p-8 md:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            
            {/* Left Side */}
            <div className="max-w-xl">
              <h2 className="text-3xl md:text-4xl font-bold text-white">
                Subscribe to Our Newsletter
              </h2>

              <p className="text-green-100 mt-3">
                Get updates on new products, farming tips,
                special offers, and seasonal discounts.
              </p>
            </div>

            {/* Right Side */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <Input
                type="email"
                placeholder="Enter your email"
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
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
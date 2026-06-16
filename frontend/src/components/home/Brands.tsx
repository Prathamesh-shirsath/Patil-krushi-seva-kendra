import { Card, CardContent } from "@/components/ui/card";

const brands = [
  {
    name: "Bayer",
    logo: "🌿",
  },
  {
    name: "UPL",
    logo: "🌱",
  },
  {
    name: "Syngenta",
    logo: "🚜",
  },
  {
    name: "IFFCO",
    logo: "🌾",
  },
  {
    name: "Coromandel",
    logo: "🍃",
  },
  {
    name: "Dhanuka",
    logo: "🌻",
  },
];

export default function Brands() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Top Brands
          </h2>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {brands.map((brand) => (
            <Card
              key={brand.name}
              className="
                group
                cursor-pointer
                transition-all
                duration-300
                hover:shadow-xl
                hover:-translate-y-1
                hover:border-green-500
              "
            >
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">
                  {brand.logo}
                </div>

                <h3 className="font-semibold text-center">
                  {brand.name}
                </h3>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
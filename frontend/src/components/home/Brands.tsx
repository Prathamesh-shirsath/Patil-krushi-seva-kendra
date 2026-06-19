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
    <div className="w-full px-4 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
  <span className="text-green-600 font-semibold">
    🌱 Trusted Partners
  </span>

  <h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 mt-2">
    Top Agricultural Brands
  </h2>
</div>
        </div>

        {/* Brand Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
  {brands.map((brand) => (
    <Card
      key={brand.name}
      className="
        group
        overflow-hidden
        rounded-3xl
        border-0
        bg-white
        shadow-md
        hover:shadow-2xl
        hover:-translate-y-2
        transition-all
        duration-500
      "
    >
      <CardContent className="flex flex-col items-center justify-center p-8">
        <div
          className="
            text-5xl
            mb-4
            transition-all
            duration-500
            group-hover:scale-125
            group-hover:rotate-6
          "
        >
          {brand.logo}
        </div>

        <h3 className="font-bold text-lg text-gray-800">
          {brand.name}
        </h3>

        <p className="text-xs text-gray-500 mt-1">
          Trusted Brand
        </p>
      </CardContent>
    </Card>
  ))}
</div>
      </div>
    </section>
  );
}
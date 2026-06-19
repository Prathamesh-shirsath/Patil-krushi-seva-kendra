import { Card } from "@/components/ui/card";

const categories = [
  { name: "Seeds", icon: "🌱" },
  { name: "Fertilizers", icon: "🌾" },
  { name: "Pesticides", icon: "🛡️" },
  { name: "Organic", icon: "🍃" },
  { name: "Plant Protection", icon: "🌿" },
  { name: "Irrigation", icon: "💧" },
];

export default function Categories() {
  return (
    <section className="w-full py-16 bg-white">
      <div className="px-4 md:px-8 lg:px-12">

        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
            🌱 Shop By Category
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
            Explore Categories
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Find the best agricultural products for your farming needs.
          </p>
        </div>

        <div
          className="
            grid
            gap-6
            [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]
          "
        >
          {categories.map((category) => (
            <Card
              key={category.name}
              className="
                group
                rounded-3xl
                border-0
                shadow-md
                hover:shadow-2xl
                hover:-translate-y-2
                transition-all
                duration-500
                cursor-pointer
                p-8
              "
            >
              <div className="flex flex-col items-center text-center">
                <div className="text-6xl mb-4 group-hover:scale-125 transition-all duration-500">
                  {category.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-800">
                  {category.name}
                </h3>

                <p className="text-sm text-gray-500 mt-2">
                  Premium Agricultural Products
                </p>
              </div>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
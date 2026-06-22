import Link from "next/link";
import { Card } from "@/components/ui/card";

const categories = [
  "Seeds",
  "Fertilizers",
  "Pesticides",
  "Organic",
  "Plant Protection",
  "Irrigation",
];

export default function Categories() {
  return (
    <section className="py-10">
      <h2 className="text-3xl font-bold mb-6">
        Featured Categories
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category) => {
          const slug = category.toLowerCase() === "organic" ? "organic" : category.toLowerCase().replace(/\s+/g, "-");
          return (
            <Link key={category} href={`/categories?name=${slug}`} className="block">
              <Card
                className="p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300 hover:border-green-300 hover:bg-green-50/10 text-gray-800 font-bold"
              >
                {category}
              </Card>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
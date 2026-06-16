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
        {categories.map((category) => (
          <Card
            key={category}
            className="p-6 text-center cursor-pointer hover:shadow-lg transition-all duration-300"
          >
            {category}
          </Card>
        ))}
      </div>
    </section>
  );
}
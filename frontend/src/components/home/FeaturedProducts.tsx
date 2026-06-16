import ProductCard from "../common/ProductCard";

const products = [
  {
    id: 1,
    name: "Organic Fertilizer",
    price: 450,
    image: "/products/p1.png",
  },
  {
    id: 2,
    name: "Neem Oil",
    price: 290,
    image: "/products/p2.png",
  },
  {
    id: 3,
    name: "Bio Pesticide",
    price: 199,
    image: "/products/p3.png",
  },
  {
    id: 4,
    name: "Vermi Compost",
    price: 399,
    image: "/products/p4.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold">
              Featured Products
            </h2>

            <p className="text-muted-foreground mt-2">
              Best quality agricultural products for farmers
            </p>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
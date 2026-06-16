import ProductCard from "../common/ProductCard";

const products = [
  {
    name: "Best Fertilizer",
    price: 499,
    image: "/products/p1.png",
  },
  {
    name: "Organic Seeds",
    price: 299,
    image: "/products/p2.png",
  },
  {
    name: "Bio Pesticide",
    price: 399,
    image: "/products/p3.png",
  },
  {
    name: "Neem Oil",
    price: 199,
    image: "/products/p4.png",
  },
];

export default function BestSelling() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">
            Best Selling Products
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.name}
              {...product}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
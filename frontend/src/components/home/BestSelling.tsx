import ProductCard from "../common/ProductCard";

const products = [
  {
    slug: "best-fertilizer",
    name: "Best Fertilizer",
    price: 499,
    image: "/products/p1.png",
  },
  {
    slug: "organic-seeds",
    name: "Organic Seeds",
    price: 299,
    image: "/products/p2.png",
  },
  {
    slug: "bio-pesticide",
    name: "Bio Pesticide",
    price: 399,
    image: "/products/p3.png",
  },
  {
    slug: "neem-oil",
    name: "Neem Oil",
    price: 199,
    image: "/products/p4.png",
  },
];

export default function BestSelling() {
  return (
    <section className="w-full py-16 bg-gradient-to-b from-green-50 via-white to-green-50">
      <div className="w-full px-4 md:px-8 lg:px-12">

        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-600 font-semibold">
            🔥 Most Popular Products
          </span>

          <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
            Best Selling Products
          </h2>

          <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
            Trusted and most purchased agricultural products by farmers across Maharashtra.
          </p>
        </div>

        {/* Product Grid */}
        <div
          className="
            grid
            gap-6
            [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]
          "
        >
          {products.map((product) => (
            <div
              key={product.name}
              className="
                transition-all
                duration-500
                hover:-translate-y-2
              "
            >
              <ProductCard {...product} />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

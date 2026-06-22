import ProductCard from "../common/ProductCard";

const products = [
  {
    id: 1,
    slug: "organic-fertilizer",
    name: "Organic Fertilizer",
    price: 450,
    image: "/products/p1.png",
  },
  {
    id: 2,
    slug: "neem-oil",
    name: "Neem Oil",
    price: 290,
    image: "/products/p2.png",
  },
  {
    id: 3,
    slug: "bio-pesticide",
    name: "Bio Pesticide",
    price: 199,
    image: "/products/p3.png",
  },
  {
    id: 4,
    slug: "vermi-compost",
    name: "Vermi Compost",
    price: 399,
    image: "/products/p4.png",
  },
];

export default function FeaturedProducts() {
  return (
   <section className="w-full py-16 bg-gradient-to-b from-white to-green-50">
  <div className="w-full px-4 md:px-8 lg:px-12">

    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
      <div>
        <span className="inline-block px-4 py-2 rounded-full bg-green-100 text-green-700 font-medium">
          🌱 Featured Collection
        </span>

        <h2 className="mt-4 text-3xl md:text-5xl font-extrabold text-gray-900">
          Featured Products
        </h2>

        <p className="mt-3 text-gray-600">
          Best quality agricultural products trusted by farmers.
        </p>
      </div>
    </div>

    <div
      className="
        grid
        gap-6
        [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]
      "
    >
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

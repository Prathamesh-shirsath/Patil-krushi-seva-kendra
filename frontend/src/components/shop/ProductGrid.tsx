import ProductCard from "@/components/common/ProductCard";

export type ShopProduct = {
  id: string;

  name: string;

  price: number;

  image: string;

  brand: string;

  category: string;

  availability:
  | "In Stock"
  | "Out of Stock";

  rating: number;

  reviewCount: number;

  originalPrice?: number;

  badge?: string;

  unit?: string;

  slug?: string;
};

interface ProductGridProps {
  products: ShopProduct[];
}

export default function ProductGrid({
  products,
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="w-full rounded-2xl border border-dashed border-gray-300 bg-white p-8 text-center sm:p-12">
        <h2 className="text-lg font-semibold text-gray-900">
          No products found
        </h2>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your filters.
        </p>
      </div>
    );
  }

  return (
    <div
      className="
        grid
        w-full
        min-w-0
        grid-cols-2
        gap-3
        sm:grid-cols-2
        sm:gap-4
        md:grid-cols-3
        xl:grid-cols-4
      "
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="min-w-0"
        >
          <ProductCard
            id={product.id}
            name={product.name}
            price={product.price}
            image={product.image}
            brand={product.brand}
            category={product.category}
            rating={product.rating}
            reviewCount={
              product.reviewCount
            }
            originalPrice={
              product.originalPrice
            }
            availability={
              product.availability
            }
            badge={product.badge}
            unit={product.unit}
            slug={product.slug}
          />
        </div>
      ))}
    </div>
  );
}
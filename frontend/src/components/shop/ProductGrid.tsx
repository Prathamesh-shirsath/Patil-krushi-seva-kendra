import ProductCard from "@/components/common/ProductCard";

export type ShopProduct = {
  id: number;
  name: string;
  price: number;
  image: string;
  brand: string;
  category: string;
  productType: string;
  availability: "In Stock" | "Out of Stock";
  rating: number;
  reviewCount: number;
  originalPrice?: number;
  badge?: string;
  unit?: string;
};

type ProductGridProps = {
  products: ShopProduct[];
};

export default function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">
        <h2 className="text-xl font-semibold text-gray-900">
          No products found
        </h2>
        <p className="mt-2 text-sm text-gray-500">
          Try changing the filters or sorting options.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          name={product.name}
          price={product.price}
          image={product.image}
          brand={product.brand}
          category={product.category}
          rating={product.rating}
          reviewCount={product.reviewCount}
          originalPrice={product.originalPrice}
          availability={product.availability}
          badge={product.badge}
          unit={product.unit}
        />
      ))}
    </div>
  );
}

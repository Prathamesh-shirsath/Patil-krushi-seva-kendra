"use client";

import { useMemo, useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  Sprout,
  Wheat,
  Bug,
  Leaf,
  ShieldCheck,
  Wrench,
  Droplet,
  Heart,
  Star,
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  Check,
  ChevronRight,
  Shield,
  Award,
  CheckCircle,
  Truck,
  CreditCard,
  RefreshCw,
  Headphones,
  ShoppingBag,
  ShoppingCart,
  Tag,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

// Categories metadata
interface CategoryMeta {
  id: string;
  name: string;
  slug: string;
  description: string;
  productsCount: string;
  brandsCount: string;
  icon: React.ComponentType<any>;
  image?: string;
}

const CATEGORIES: CategoryMeta[] = [
  {
    id: "seeds",
    name: "Seeds",
    slug: "seeds",
    description: "Grow healthy crops with our certified hybrid and organic seeds.",
    productsCount: "120+",
    brandsCount: "8+",
    icon: Sprout,
  },
  {
    id: "fertilizers",
    name: "Fertilizers",
    slug: "fertilizers",
    description: "Nourish your crops with top quality fertilizers for maximum yield and better growth.",
    productsCount: "150+",
    brandsCount: "10+",
    icon: Wheat,
  },
  {
    id: "pesticides",
    name: "Pesticides",
    slug: "pesticides",
    description: "Protect your fields from pests, insects, and weeds with reliable chemical & organic solutions.",
    productsCount: "90+",
    brandsCount: "7+",
    icon: Bug,
  },
  {
    id: "organic",
    name: "Organic Products",
    slug: "organic",
    description: "Eco-friendly, chemical-free solutions for healthy farming and soil preservation.",
    productsCount: "75+",
    brandsCount: "6+",
    icon: Leaf,
  },
  {
    id: "protection",
    name: "Plant Protection",
    slug: "plant-protection",
    description: "Defend crops from diseases and promote growth with premium protective care.",
    productsCount: "85+",
    brandsCount: "9+",
    icon: ShieldCheck,
  },
  {
    id: "tools",
    name: "Farming Tools",
    slug: "farming-tools",
    description: "Equip your farm with high-durability and efficient tools for everyday tasks.",
    productsCount: "60+",
    brandsCount: "5+",
    icon: Wrench,
  },
  {
    id: "irrigation",
    name: "Irrigation",
    slug: "irrigation",
    description: "Maintain proper water flow and conserve resources with smart irrigation solutions.",
    productsCount: "40+",
    brandsCount: "4+",
    icon: Droplet,
  },
  {
    id: "animal",
    name: "Animal Care",
    slug: "animal-care",
    description: "Feed, supplements, and health products for your livestock and poultry.",
    productsCount: "30+",
    brandsCount: "6+",
    icon: Heart,
  },
];

// Subcategories mapping
const SUBCATEGORIES_MAP: Record<string, { label: string; count: number }[]> = {
  fertilizers: [
    { label: "All Fertilizers", count: 150 },
    { label: "Organic Fertilizers", count: 65 },
    { label: "Bio Fertilizers", count: 35 },
    { label: "Chemical Fertilizers", count: 50 },
  ],
  seeds: [
    { label: "All Seeds", count: 120 },
    { label: "Vegetable Seeds", count: 45 },
    { label: "Grain Seeds", count: 50 },
    { label: "Flower Seeds", count: 25 },
  ],
  pesticides: [
    { label: "All Pesticides", count: 90 },
    { label: "Insecticides", count: 40 },
    { label: "Fungicides", count: 30 },
    { label: "Herbicides", count: 20 },
  ],
  organic: [
    { label: "All Organic Products", count: 75 },
    { label: "Organic Compost", count: 45 },
    { label: "Bio Stimulants", count: 30 },
  ],
  "plant-protection": [
    { label: "All Protection", count: 85 },
    { label: "Growth Promoters", count: 45 },
    { label: "Crop Protectants", count: 40 },
  ],
  "farming-tools": [
    { label: "All Tools", count: 60 },
    { label: "Hand Tools", count: 35 },
    { label: "Machinery", count: 25 },
  ],
  irrigation: [
    { label: "All Irrigation", count: 40 },
    { label: "Drip Irrigation", count: 25 },
    { label: "Pipes & Fittings", count: 15 },
  ],
  "animal-care": [
    { label: "All Animal Care", count: 30 },
    { label: "Poultry Feed", count: 15 },
    { label: "Cattle Feed", count: 15 },
  ],
};

// Brands metadata
const BRANDS = ["IFFCO", "KRIBHCO", "Coromandel", "Yara", "Dhanuka"];

// Mock products matching the screenshot (Fertilizers)
const FERTILIZER_PRODUCTS = [
  {
    id: 1,
    name: "Yara Liva Nitrabor 15.5% 10kg",
    description: "Calcium Nitrate Fertilizer",
    price: 460,
    originalPrice: 540,
    discount: "15% OFF",
    rating: 4.6,
    reviewCount: 120,
    image: "/products/fertilizer_bag.png",
    badge: "New",
    badgeColor: "bg-emerald-700",
    brand: "Yara",
    subcategory: "Chemical Fertilizers",
    form: "Granules",
  },
  {
    id: 2,
    name: "IFFCO DAP 18:46:0 50kg",
    description: "DAP Fertilizer",
    price: 1350,
    originalPrice: 1600,
    discount: "16% OFF",
    rating: 4.7,
    reviewCount: 110,
    image: "/products/fertilizer_bag.png",
    badge: "",
    badgeColor: "",
    brand: "IFFCO",
    subcategory: "Chemical Fertilizers",
    form: "Granules",
  },
  {
    id: 3,
    name: "IFFCO Urea 46% 45kg",
    description: "Urea Fertilizer",
    price: 265,
    originalPrice: 290,
    discount: "9% OFF",
    rating: 4.7,
    reviewCount: 210,
    image: "/products/fertilizer_bag.png",
    badge: "",
    badgeColor: "",
    brand: "IFFCO",
    subcategory: "Chemical Fertilizers",
    form: "Granules",
  },
  {
    id: 4,
    name: "Kribhco Zyme Magic 1L",
    description: "Organic Liquid Fertilizer",
    price: 320,
    originalPrice: 390,
    discount: "18% OFF",
    rating: 4.5,
    reviewCount: 80,
    image: "/products/fertilizer_bottle.png",
    badge: "Sale",
    badgeColor: "bg-red-600",
    brand: "KRIBHCO",
    subcategory: "Organic Fertilizers",
    form: "Liquid",
  },
  {
    id: 5,
    name: "Coromandel NPK 19:19:19 1kg",
    description: "NPK Fertilizer",
    price: 240,
    originalPrice: 280,
    discount: "14% OFF",
    rating: 4.6,
    reviewCount: 140,
    image: "/products/fertilizer_bag.png",
    badge: "",
    badgeColor: "",
    brand: "Coromandel",
    subcategory: "Chemical Fertilizers",
    form: "Powder",
  },
  {
    id: 6,
    name: "IFFCO MOP 60% 25kg",
    description: "Muriate of Potash",
    price: 1120,
    originalPrice: 1300,
    discount: "14% OFF",
    rating: 4.8,
    reviewCount: 220,
    image: "/products/fertilizer_bag.png",
    badge: "Bestseller",
    badgeColor: "bg-amber-500",
    brand: "IFFCO",
    subcategory: "Chemical Fertilizers",
    form: "Granules",
  },
  {
    id: 7,
    name: "Dhanuka Biozyme 1kg",
    description: "Bio Fertilizer",
    price: 210,
    originalPrice: 250,
    discount: "16% OFF",
    rating: 4.5,
    reviewCount: 95,
    image: "/products/fertilizer_bag.png",
    badge: "",
    badgeColor: "",
    brand: "Dhanuka",
    subcategory: "Bio Fertilizers",
    form: "Granules",
  },
  {
    id: 8,
    name: "YaraVita Brassitrel Pro 500ml",
    description: "Micronutrient Fertilizer",
    price: 580,
    originalPrice: 680,
    discount: "15% OFF",
    rating: 4.6,
    reviewCount: 60,
    image: "/products/fertilizer_bottle.png",
    badge: "New",
    badgeColor: "bg-emerald-700",
    brand: "Yara",
    subcategory: "Bio Fertilizers",
    form: "Liquid",
  },
  {
    id: 9,
    name: "IFFCO SSP 16% 50kg",
    description: "Single Super Phosphate",
    price: 950,
    originalPrice: 1100,
    discount: "14% OFF",
    rating: 4.4,
    reviewCount: 50,
    image: "/products/fertilizer_bag.png",
    badge: "",
    badgeColor: "",
    brand: "IFFCO",
    subcategory: "Chemical Fertilizers",
    form: "Powder",
  },
  {
    id: 10,
    name: "Coromandel Nitro King 1L",
    description: "Plant Growth Promoter",
    price: 275,
    originalPrice: 320,
    discount: "14% OFF",
    rating: 4.7,
    reviewCount: 115,
    image: "/products/fertilizer_bottle.png",
    badge: "",
    badgeColor: "",
    brand: "Coromandel",
    subcategory: "Bio Fertilizers",
    form: "Liquid",
  },
  {
    id: 11,
    name: "Kribhco Compost 10kg",
    description: "Organic Manure",
    price: 180,
    originalPrice: 210,
    discount: "14% OFF",
    rating: 4.5,
    reviewCount: 70,
    image: "/products/fertilizer_bag.png",
    badge: "",
    badgeColor: "",
    brand: "KRIBHCO",
    subcategory: "Organic Fertilizers",
    form: "Granules",
  },
  {
    id: 12,
    name: "Dhanuka Multi Micronutrient 1kg",
    description: "Micronutrient Mixture",
    price: 190,
    originalPrice: 220,
    discount: "14% OFF",
    rating: 4.6,
    reviewCount: 111,
    image: "/products/fertilizer_bag.png",
    badge: "",
    badgeColor: "",
    brand: "Dhanuka",
    subcategory: "Bio Fertilizers",
    form: "Powder",
  },
];

// Generates dynamic mock products for other categories based on query
function getMockProductsForCategory(categorySlug: string) {
  if (categorySlug === "fertilizers") {
    return FERTILIZER_PRODUCTS;
  }

  // Create mock products based on other categories
  const categoryName = CATEGORIES.find((c) => c.slug === categorySlug)?.name ?? "Products";
  const brands = BRANDS;
  const forms = ["Powder", "Granules", "Liquid"];

  return Array.from({ length: 12 }).map((_, index) => {
    const id = index + 1;
    const price = 100 + (id * 45);
    const originalPrice = Math.round(price * 1.2);
    const discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
    const isLiquid = id % 3 === 0;

    return {
      id: id + 100,
      name: `${categoryName} Item Model ${String.fromCharCode(65 + id)} ${isLiquid ? "1L" : "5kg"}`,
      description: `Premium quality ${categoryName.toLowerCase()} product`,
      price: price,
      originalPrice: originalPrice,
      discount: `${discountPercent}% OFF`,
      rating: 4.0 + (id % 10) * 0.1,
      reviewCount: 15 + id * 8,
      image: isLiquid ? "/products/fertilizer_bottle.png" : "/products/fertilizer_bag.png",
      badge: id % 4 === 0 ? "New" : id % 6 === 0 ? "Sale" : "",
      badgeColor: id % 4 === 0 ? "bg-emerald-700" : "bg-red-600",
      brand: brands[id % brands.length],
      subcategory: SUBCATEGORIES_MAP[categorySlug]?.[(id % (SUBCATEGORIES_MAP[categorySlug]?.length || 1)) + 1]?.label ?? `Bio ${categoryName}`,
      form: forms[id % forms.length],
    };
  });
}

const ICON_MAP: Record<string, React.ComponentType<any>> = {
  seeds: Sprout,
  fertilizers: Wheat,
  pesticides: Bug,
  organic: Leaf,
  "plant-protection": ShieldCheck,
  protection: ShieldCheck,
  "farming-tools": Wrench,
  tools: Wrench,
  irrigation: Droplet,
  "animal-care": Heart,
  animal: Heart,
};

function CategoriesContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [categoriesList, setCategoriesList] = useState<CategoryMeta[]>(CATEGORIES);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch("http://localhost:5000/api/categories");
        if (res.ok) {
          const data = await res.json();
          if (data && data.success && Array.isArray(data.data)) {
            const mapped = data.data
              .filter((c: any) => c.status !== false)
              .map((c: any) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
                description: c.description || "",
                productsCount: c.productsCount || "0+",
                brandsCount: c.brandsCount || "0+",
                icon: ICON_MAP[c.slug] || ICON_MAP[c.id] || Tag,
                image: c.image || ""
              }));

            if (mapped.length > 0) {
              setCategoriesList(mapped);
            }
          }
        }
      } catch (err) {
        console.error("Failed to load categories from backend:", err);
      }
    }
    fetchCategories();
  }, []);

  // Get active category from search params, default to "fertilizers"
  const activeSlug = searchParams.get("name")?.toLowerCase() || "fertilizers";
  const activeCategory = categoriesList.find((c) => c.slug === activeSlug) || categoriesList[0];

  // Filters State
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [brandSearch, setBrandSearch] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [selectedForms, setSelectedForms] = useState<string[]>([]);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);
  const [sortBy, setSortBy] = useState("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);

  // Clear filters when category changes
  useEffect(() => {
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setMaxPrice(5000);
    setSelectedForms([]);
    setSelectedRatings([]);
    setCurrentPage(1);
  }, [activeSlug]);

  // Update category URL parameter helper
  const handleCategorySelect = (slug: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("name", slug);
    router.push(`${pathname}?${params.toString()}`);
  };

  // Get products of active category
  const activeProducts = useMemo(() => {
    return getMockProductsForCategory(activeCategory.slug);
  }, [activeCategory]);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return activeProducts
      .filter((product) => {
        // Subcategory filter
        if (selectedSubcategories.length > 0) {
          // If "All ..." is checked, we allow all in that subcategory list
          const hasAllCheckbox = selectedSubcategories.some((s) => s.startsWith("All"));
          if (!hasAllCheckbox) {
            const matchesSub = selectedSubcategories.includes(product.subcategory);
            if (!matchesSub) return false;
          }
        }

        // Brand filter
        if (selectedBrands.length > 0) {
          if (!selectedBrands.includes(product.brand)) return false;
        }

        // Price filter
        if (product.price > maxPrice) return false;

        // Form filter
        if (selectedForms.length > 0) {
          if (!selectedForms.includes(product.form)) return false;
        }

        // Rating filter
        if (selectedRatings.length > 0) {
          const matchesRating = selectedRatings.some((minRating) => product.rating >= minRating);
          if (!matchesRating) return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price-low") return a.price - b.price;
        if (sortBy === "price-high") return b.price - a.price;
        if (sortBy === "rating") return b.rating - a.rating;
        // Default (newest / id)
        return a.id - b.id;
      });
  }, [activeProducts, selectedSubcategories, selectedBrands, maxPrice, selectedForms, selectedRatings, sortBy]);

  const displayedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * 12;
    return filteredProducts.slice(startIndex, startIndex + 12);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / 12));

  // Toggle filter selections
  const toggleSubcategory = (sub: string) => {
    setSelectedSubcategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
    setCurrentPage(1);
  };

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
    setCurrentPage(1);
  };

  const toggleForm = (form: string) => {
    setSelectedForms((prev) =>
      prev.includes(form) ? prev.filter((f) => f !== form) : [...prev, form]
    );
    setCurrentPage(1);
  };

  const toggleRating = (rating: number) => {
    setSelectedRatings((prev) =>
      prev.includes(rating) ? prev.filter((r) => r !== rating) : [...prev, rating]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedSubcategories([]);
    setSelectedBrands([]);
    setMaxPrice(5000);
    setSelectedForms([]);
    setSelectedRatings([]);
    setCurrentPage(1);
  };

  // Filter brand list based on search query
  const filteredBrandsList = BRANDS.filter((brand) =>
    brand.toLowerCase().includes(brandSearch.toLowerCase())
  );

  const subcategoryOptions = SUBCATEGORIES_MAP[activeCategory.slug] || [];

  // Sidebar elements
  const renderSidebarContent = () => (
    <div className="flex flex-col gap-6">
      {/* Header inside sidebar */}
      <div className="flex items-center justify-between border-b pb-4">
        <h2 className="text-lg font-bold text-gray-950">Filter By</h2>
        <button
          onClick={clearAllFilters}
          className="text-xs font-semibold text-green-700 hover:text-green-800 transition"
        >
          Clear All
        </button>
      </div>

      {/* Sub-categories */}
      <div>
        <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider mb-3">
          Category
        </h3>
        <div className="space-y-2.5">
          {subcategoryOptions.map((sub) => (
            <label
              key={sub.label}
              className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedSubcategories.includes(sub.label)}
                onChange={() => toggleSubcategory(sub.label)}
                className="h-4 w-4 rounded border-gray-300 accent-green-700"
              />
              <span className="flex-1 font-medium">{sub.label}</span>
              <span className="text-gray-400">({sub.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Brand Search & Select */}
      <div>
        <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider mb-3">
          Brand
        </h3>
        <div className="relative mb-3">
          <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
          <Input
            placeholder="Search brand..."
            value={brandSearch}
            onChange={(e) => setBrandSearch(e.target.value)}
            className="h-8 pl-8 text-xs rounded border-gray-200 focus-visible:ring-green-600 focus-visible:ring-1"
          />
        </div>
        <div className="space-y-2.5 max-h-40 overflow-y-auto pr-1">
          {filteredBrandsList.map((brand) => (
            <label
              key={brand}
              className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedBrands.includes(brand)}
                onChange={() => toggleBrand(brand)}
                className="h-4 w-4 rounded border-gray-300 accent-green-700"
              />
              <span className="flex-1 font-medium">{brand}</span>
              <span className="text-gray-400">
                ({activeProducts.filter((p) => p.brand === brand).length})
              </span>
            </label>
          ))}
          {filteredBrandsList.length === 0 && (
            <p className="text-xs text-gray-400">No brands found</p>
          )}
        </div>
        <button className="text-[11px] font-bold text-gray-500 hover:text-green-700 mt-2.5 block">
          + View More
        </button>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider mb-3">
          Price Range
        </h3>
        <input
          type="range"
          min={0}
          max={5000}
          step={100}
          value={maxPrice}
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          className="w-full accent-green-700 mb-2 cursor-pointer h-1.5 bg-gray-200 rounded-lg appearance-none"
        />
        <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
          <span>₹0</span>
          <span>₹5,000+</span>
        </div>
        <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-2">
          <div className="flex h-8 items-center rounded border border-gray-200 px-2.5 text-xs text-gray-800 bg-gray-50 font-medium">
            ₹ 0
          </div>
          <span className="text-xs text-gray-400">To</span>
          <div className="flex h-8 items-center justify-between rounded border border-gray-200 px-2.5 text-xs text-gray-800 bg-white font-medium">
            <span>₹</span>
            <input
              type="number"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Math.min(5000, Math.max(0, Number(e.target.value))))}
              className="w-10 text-right outline-none bg-transparent"
            />
          </div>
        </div>
      </div>

      {/* Form */}
      <div>
        <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider mb-3">
          Form
        </h3>
        <div className="space-y-2.5">
          {[
            { label: "Powder", count: 75 },
            { label: "Granules", count: 45 },
            { label: "Liquid", count: 30 },
          ].map((form) => (
            <label
              key={form.label}
              className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedForms.includes(form.label)}
                onChange={() => toggleForm(form.label)}
                className="h-4 w-4 rounded border-gray-300 accent-green-700"
              />
              <span className="flex-1 font-medium">{form.label}</span>
              <span className="text-gray-400">({form.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-xs font-bold text-gray-950 uppercase tracking-wider mb-3">
          Rating
        </h3>
        <div className="space-y-2.5">
          {[
            { stars: 5, count: 45, label: "5 Stars" },
            { stars: 4, count: 68, label: "4 Stars & above" },
            { stars: 3, count: 90, label: "3 Stars & above" },
            { stars: 2, count: 110, label: "2 Stars & above" },
          ].map((rating) => (
            <label
              key={rating.stars}
              className="flex items-center gap-2.5 text-xs text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              <input
                type="checkbox"
                checked={selectedRatings.includes(rating.stars)}
                onChange={() => toggleRating(rating.stars)}
                className="h-4 w-4 rounded border-gray-300 accent-green-700"
              />
              <div className="flex-1 flex items-center gap-1.5">
                <div className="flex items-center text-amber-400">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-3 w-3 ${
                        i < rating.stars ? "fill-current" : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
                {rating.stars < 5 && (
                  <span className="text-[11px] font-medium text-gray-500">
                    & above
                  </span>
                )}
              </div>
              <span className="text-gray-400">({rating.count})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Apply button */}
      <Button className="h-10 w-full rounded bg-emerald-800 hover:bg-emerald-950 text-white text-xs font-bold transition shadow-md">
        Apply Filters
      </Button>
    </div>
  );

  return (
    <main className="bg-[#f9fbf9] min-h-screen text-gray-800">
      {/* Breadcrumbs */}
      <div className="border-b bg-white">
        <div className="mx-auto max-w-[1500px] px-4 py-3 sm:px-6 lg:px-8 text-xs text-gray-500 flex items-center gap-1">
          <Link href="/" className="hover:text-green-700 font-medium">Home</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <Link href="/categories" className="hover:text-green-700 font-medium">Categories</Link>
          <ChevronRight className="h-3 w-3 text-gray-400" />
          <span className="text-gray-800 font-semibold">{activeCategory.name}</span>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Banner Section */}
        <div className="relative w-full rounded-2xl overflow-hidden bg-emerald-950 mb-8 h-48 sm:h-60 md:h-72 shadow-lg">
          {/* Banner background image (fallback to gradient if it doesn't render) */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/banners/fertilizer_banner.png"
              alt={activeCategory.name}
              fill
              className="object-cover opacity-80"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-950 via-emerald-950/70 to-transparent" />
          </div>

          {/* Banner content */}
          <div className="absolute inset-0 z-10 flex flex-col justify-center px-6 sm:px-10 lg:px-16 text-white max-w-2xl py-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-2 sm:mb-3">
              {activeCategory.name}
            </h1>
            <p className="text-xs sm:text-sm lg:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed max-w-xl font-medium">
              {activeCategory.description}
            </p>

            {/* Unified Metrics Panel */}
            <div className="inline-flex items-center gap-6 sm:gap-10 md:gap-12 bg-white/10 backdrop-blur-sm rounded-xl px-5 py-3 sm:px-6 sm:py-3.5 border border-white/10 shadow-md max-w-fit mt-auto sm:mt-0">
              {/* Metric 1 */}
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-300 stroke-[1.5]" />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm md:text-base font-extrabold text-white leading-none">
                    {activeCategory.productsCount}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-200/90 font-bold mt-0.5 uppercase tracking-wider">
                    Products
                  </span>
                </div>
              </div>

              {/* Metric 2 */}
              <div className="flex items-center gap-3">
                <Award className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-300 stroke-[1.5]" />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm md:text-base font-extrabold text-white leading-none">
                    {activeCategory.brandsCount}
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-200/90 font-bold mt-0.5 uppercase tracking-wider">
                    Brands
                  </span>
                </div>
              </div>

              {/* Metric 3 */}
              <div className="flex items-center gap-3">
                <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 text-emerald-300 stroke-[1.5]" />
                <div className="flex flex-col text-left">
                  <span className="text-xs sm:text-sm md:text-base font-extrabold text-white leading-none">
                    100%
                  </span>
                  <span className="text-[9px] sm:text-[10px] text-gray-200/90 font-bold mt-0.5 uppercase tracking-wider">
                    Quality Assured
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Categories Row */}
        <section className="mb-10 bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4 border-b border-gray-50 pb-3">
            <h2 className="text-base font-bold text-gray-900">Top Categories</h2>
            <Link
              href="/categories"
              className="text-xs font-bold text-green-700 hover:text-green-800 transition flex items-center gap-1"
            >
              View All Categories <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
            {categoriesList.map((cat) => {
              const Icon = cat.icon || Tag;
              const isActive = cat.slug === activeSlug;

              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySelect(cat.slug)}
                  className={`flex flex-col items-center justify-center py-4 px-3 rounded-lg border text-center transition-all duration-300 hover:scale-102 group ${
                    isActive
                      ? "bg-green-50 border-green-200 text-green-700 shadow-sm"
                      : "bg-white border-gray-200 text-gray-700 hover:border-green-200 hover:bg-green-50/20"
                  }`}
                >
                  <div
                    className={`p-2 rounded-full mb-2.5 transition-all ${
                      isActive
                        ? "bg-green-600 text-white"
                        : "bg-gray-50 text-gray-500 group-hover:bg-green-100 group-hover:text-green-700"
                    }`}
                  >
                    {cat.image ? (
                      <img src={cat.image} alt={cat.name} className="h-5 w-5 object-cover rounded-full" />
                    ) : (
                      <Icon className="h-5 w-5" />
                    )}
                  </div>
                  <span className="text-xs font-bold tracking-tight">
                    {cat.name}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* Main Content Layout */}
        <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block bg-white rounded-xl border border-gray-100 p-5 shadow-sm h-fit">
            {renderSidebarContent()}
          </aside>

          {/* Product Section */}
          <div>
            {/* Toolbar */}
            <div className="mb-5 bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-gray-500 font-medium">
                Showing <span className="font-semibold text-gray-800">1 - {displayedProducts.length}</span> of{" "}
                <span className="font-semibold text-gray-800">{filteredProducts.length}</span> products
              </p>

              <div className="flex items-center gap-3 justify-between sm:justify-end">
                {/* Mobile Filter Drawer Button */}
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="outline"
                      className="h-9 px-4 rounded border-gray-200 text-xs font-bold lg:hidden hover:bg-gray-50 flex items-center gap-2"
                    >
                      <SlidersHorizontal className="h-4 w-4" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent
                    side="left"
                    className="w-[320px] overflow-y-auto p-5 bg-white"
                  >
                    {renderSidebarContent()}
                  </SheetContent>
                </Sheet>

                {/* Sort Option */}
                <div className="flex items-center gap-2">
                  <label
                    className="text-xs font-bold text-gray-400 uppercase tracking-wider"
                    htmlFor="cat-sort"
                  >
                    Sort By:
                  </label>
                  <select
                    id="cat-sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="h-9 rounded-lg border border-gray-200 bg-white px-3 text-xs font-semibold text-gray-800 outline-none transition hover:border-green-600 focus:border-green-600 focus:ring-1 focus:ring-green-100"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Top Rated</option>
                  </select>
                </div>

                {/* Grid/List Toggle */}
                <div className="hidden items-center gap-1 sm:flex border border-gray-100 rounded-lg p-0.5 bg-gray-50">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                      viewMode === "grid"
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                    aria-label="Grid view"
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`flex h-8 w-8 items-center justify-center rounded-md transition-all ${
                      viewMode === "list"
                        ? "bg-white text-green-700 shadow-sm"
                        : "text-gray-400 hover:text-gray-700"
                    }`}
                    aria-label="List view"
                  >
                    <List className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Product Grid / List */}
            {filteredProducts.length === 0 ? (
              <div className="rounded-xl border border-dashed border-gray-200 bg-white p-12 text-center shadow-sm">
                <div className="mx-auto w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-700 mb-3">
                  <ShoppingBag className="h-6 w-6" />
                </div>
                <h3 className="text-base font-bold text-gray-900">
                  No products found
                </h3>
                <p className="mt-1 text-xs text-gray-500 max-w-sm mx-auto">
                  Try adjusting your filters, selecting a different subcategory, or broadening your price range.
                </p>
                <Button
                  onClick={clearAllFilters}
                  className="mt-4 h-9 bg-green-700 hover:bg-green-800 text-white rounded text-xs font-bold"
                >
                  Clear All Filters
                </Button>
              </div>
            ) : viewMode === "grid" ? (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {displayedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden rounded-xl border border-gray-150 bg-white text-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col justify-between relative shadow-sm"
                  >
                    {/* Top image area */}
                    <div className="relative flex h-48 items-center justify-center overflow-hidden bg-white p-6 border-b border-gray-50">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={200}
                        height={200}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Left Badge */}
                      {product.badge ? (
                        <span className={`absolute left-3 top-3 rounded-md px-2 py-0.5 text-[9px] font-bold text-white tracking-wider uppercase ${product.badgeColor}`}>
                          {product.badge}
                        </span>
                      ) : null}
                    </div>

                    {/* Content area */}
                    <div className="flex flex-1 flex-col px-3.5 pb-3.5 pt-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                        {product.description}
                      </span>

                      <h3 className="mt-1 min-h-9 text-xs font-bold leading-4 text-gray-900 group-hover:text-green-700 transition-colors line-clamp-2">
                        {product.name}
                      </h3>

                      {/* Stars */}
                      <div className="mt-2 flex items-center gap-1">
                        <div className="flex items-center text-amber-400">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-3 w-3 ${
                                i < Math.floor(product.rating)
                                  ? "fill-current"
                                  : "text-gray-200"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-[10px] font-semibold text-gray-600">
                          {product.rating.toFixed(1)}
                        </span>
                        <span className="text-[9px] text-gray-400 font-medium">
                          ({product.reviewCount})
                        </span>
                      </div>

                      {/* Pricing */}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="text-sm font-extrabold text-gray-950">
                          ₹{product.price.toLocaleString()}
                        </span>
                        {product.originalPrice ? (
                          <>
                            <span className="text-[10px] text-gray-400 line-through font-medium">
                              ₹{product.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-bold text-green-700">
                              {product.discount}
                            </span>
                          </>
                        ) : null}
                      </div>

                      {/* CTA Buttons */}
                      <div className="mt-3.5 flex items-center gap-2">
                        <Button className="h-8.5 flex-1 rounded bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition">
                          <ShoppingCart className="h-3.5 w-3.5" />
                          Add to Cart
                        </Button>

                        <button
                          className="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition"
                          aria-label="Add to wishlist"
                        >
                          <Heart className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              // List View
              <div className="space-y-4">
                {displayedProducts.map((product) => (
                  <Card
                    key={product.id}
                    className="group overflow-hidden rounded-xl border border-gray-150 bg-white text-sm transition-all duration-300 hover:shadow-md flex p-4 shadow-sm"
                  >
                    <div className="relative flex h-36 w-36 shrink-0 items-center justify-center overflow-hidden bg-white p-4 border border-gray-100 rounded-lg mr-5">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={120}
                        height={120}
                        className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      {product.badge ? (
                        <span className={`absolute left-2 top-2 rounded-md px-1.5 py-0.5 text-[8px] font-bold text-white tracking-wider uppercase ${product.badgeColor}`}>
                          {product.badge}
                        </span>
                      ) : null}
                    </div>

                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-green-700">
                          {product.description}
                        </span>
                        <h3 className="mt-1 text-sm font-bold leading-5 text-gray-900 group-hover:text-green-700 transition-colors">
                          {product.name}
                        </h3>

                        {/* Stars */}
                        <div className="mt-1.5 flex items-center gap-1">
                          <div className="flex items-center text-amber-400">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < Math.floor(product.rating)
                                    ? "fill-current"
                                    : "text-gray-200"
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-semibold text-gray-600">
                            {product.rating.toFixed(1)}
                          </span>
                          <span className="text-[9px] text-gray-400 font-medium">
                            ({product.reviewCount} reviews)
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-baseline gap-2">
                          <span className="text-base font-extrabold text-gray-950">
                            ₹{product.price.toLocaleString()}
                          </span>
                          {product.originalPrice ? (
                            <>
                              <span className="text-xs text-gray-400 line-through font-medium">
                                ₹{product.originalPrice.toLocaleString()}
                              </span>
                              <span className="text-[10px] font-bold text-green-700 bg-green-50 rounded px-1.5 py-0.5">
                                {product.discount}
                              </span>
                            </>
                          ) : null}
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-400 hover:text-red-500 hover:border-red-100 hover:bg-red-50 transition"
                            aria-label="Add to wishlist"
                          >
                            <Heart className="h-4 w-4" />
                          </button>
                          <Button className="h-9 px-4 rounded bg-green-700 hover:bg-green-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition">
                            <ShoppingCart className="h-3.5 w-3.5" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex items-center justify-center gap-1.5">
                {/* Pages List */}
                {Array.from({ length: totalPages }).map((_, index) => {
                  const page = index + 1;
                  const isCurrent = currentPage === page;

                  return (
                    <Button
                      key={page}
                      variant={isCurrent ? "default" : "outline"}
                      onClick={() => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      className={
                        isCurrent
                          ? "h-8 w-8 rounded bg-green-700 p-0 text-xs text-white hover:bg-green-800 font-bold"
                          : "h-8 w-8 rounded p-0 text-xs border-gray-200 hover:border-green-600 hover:bg-green-50/20 font-semibold"
                      }
                    >
                      {page}
                    </Button>
                  );
                })}

                {totalPages > 5 && currentPage < totalPages - 2 && (
                  <>
                    <span className="px-1 text-xs text-gray-400 font-bold">...</span>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setCurrentPage(totalPages);
                        window.scrollTo({ top: 400, behavior: "smooth" });
                      }}
                      className="h-8 w-8 rounded p-0 text-xs border-gray-200 hover:border-green-600 font-semibold"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}

                <Button
                  variant="outline"
                  disabled={currentPage === totalPages}
                  onClick={() => {
                    setCurrentPage((p) => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 400, behavior: "smooth" });
                  }}
                  className="h-8 w-8 rounded p-0 text-xs border-gray-200 hover:border-green-600 font-semibold disabled:opacity-50 disabled:pointer-events-none"
                  aria-label="Next page"
                >
                  &gt;
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Benefits Footer Banner */}
      <section className="bg-white border-t border-gray-100 mt-16 shadow-inner">
        <div className="mx-auto max-w-[1500px] px-4 py-8 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-8 items-start">
            {[
              {
                title: "100% Original Products",
                description: "Best quality guaranteed",
                icon: ShieldCheck,
              },
              {
                title: "Secure Payments",
                description: "100% secure payments",
                icon: CreditCard,
              },
              {
                title: "Fast Delivery",
                description: "At Your Doorstep",
                icon: Truck,
              },
              {
                title: "Expert Farmer Support",
                description: "24/7 expert guidance",
                icon: Headphones,
              },
              {
                title: "Easy Returns",
                description: "Hassle free returns within 7 days",
                icon: RefreshCw,
              },
            ].map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div key={benefit.title} className="flex gap-3.5 items-start">
                  <div className="rounded-full bg-green-50 p-2.5 text-green-700 shrink-0 shadow-sm border border-green-100/50">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold text-gray-950 leading-tight">
                      {benefit.title}
                    </h3>
                    <p className="mt-1 text-[11px] text-gray-400 font-medium leading-normal">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}

export default function CategoriesPage() {
  return (
    <Suspense
      fallback={
        <div className="py-24 text-center text-sm font-semibold text-gray-500 bg-[#f9fbf9] min-h-screen">
          <div className="inline-block animate-spin h-6 w-6 border-2 border-green-700 border-t-transparent rounded-full mb-3" />
          <div>Loading Category Page...</div>
        </div>
      }
    >
      <CategoriesContent />
    </Suspense>
  );
}
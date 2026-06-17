type FilterSidebarProps = {
  categories: FilterOption[];
  brands: FilterOption[];
  productTypes: FilterOption[];
  selectedCategory: string;
  selectedBrand: string;
  selectedProductType: string;
  selectedAvailability: string;
  maxPrice: number;
  price: number;
  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onProductTypeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;
  onPriceChange: (value: number) => void;
  onClear: () => void;
};

export type FilterOption = {
  label: string;
  count: number;
};

function FilterGroup({
  title,
  options,
  selectedValue,
  onChange,
}: {
  title: string;
  options: FilterOption[];
  selectedValue: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="border-b border-gray-100 pb-4">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-xs font-semibold text-gray-950">{title}</h3>
        <span className="text-xs text-gray-400">^</span>
      </div>

      <div className="space-y-2.5">
        {options.map((option) => (
          <label
            key={option.label}
            className="flex cursor-pointer items-center gap-2.5 text-xs text-gray-600"
          >
            <input
              type="checkbox"
              name={title}
              checked={selectedValue === option.label}
              onChange={() => onChange(option.label)}
              className="h-3.5 w-3.5 rounded border-gray-300 accent-green-700"
            />
            <span className="flex-1">{option.label}</span>
            <span className="text-gray-400">({option.count})</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function FilterSidebar({
  categories,
  brands,
  productTypes,
  selectedCategory,
  selectedBrand,
  selectedProductType,
  selectedAvailability,
  maxPrice,
  price,
  onCategoryChange,
  onBrandChange,
  onProductTypeChange,
  onAvailabilityChange,
  onPriceChange,
  onClear,
}: FilterSidebarProps) {
  return (
    <aside className="rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-green-50 text-green-700">
            F
          </span>
          <h2 className="text-sm font-semibold text-gray-900">Filters</h2>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="text-sm text-gray-400 hover:text-gray-700"
          aria-label="Clear filters"
        >
          x
        </button>
      </div>

      <div className="space-y-4 p-4">
        <FilterGroup
          title="Categories"
          options={categories}
          selectedValue={selectedCategory}
          onChange={onCategoryChange}
        />

        <FilterGroup
          title="Brands"
          options={brands}
          selectedValue={selectedBrand}
          onChange={onBrandChange}
        />

        <div className="border-b border-gray-100 pb-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-xs font-semibold text-gray-950">
              Price Range
            </h3>
            <span className="text-xs text-gray-400">^</span>
          </div>

          <input
            type="range"
            min={0}
            max={maxPrice}
            step={50}
            value={price}
            onChange={(event) => onPriceChange(Number(event.target.value))}
            className="w-full accent-green-700"
          />

          <div className="mt-1 flex justify-between text-[11px] font-semibold text-gray-900">
            <span>Rs. 0</span>
            <span>Rs. {maxPrice}</span>
          </div>

          <div className="mt-3 grid grid-cols-[1fr_auto_1fr] items-center gap-2">
            <input
              value="Rs. Min"
              readOnly
              className="h-8 rounded border border-gray-200 px-2 text-xs text-gray-500"
            />
            <span className="text-xs text-gray-400">to</span>
            <input
              value="Rs. Max"
              readOnly
              className="h-8 rounded border border-gray-200 px-2 text-xs text-gray-500"
            />
          </div>
        </div>

        <FilterGroup
          title="Product Type"
          options={productTypes}
          selectedValue={selectedProductType}
          onChange={onProductTypeChange}
        />

        <FilterGroup
          title="Availability"
          options={[
            { label: "In Stock", count: 100 },
            { label: "Out of Stock", count: 20 },
          ]}
          selectedValue={selectedAvailability}
          onChange={onAvailabilityChange}
        />

        <button
          type="button"
          onClick={onClear}
          className="h-9 w-full rounded border border-green-700 text-xs font-semibold text-green-700 transition-colors hover:bg-green-50"
        >
          Clear All Filters
        </button>
      </div>
    </aside>
  );
}

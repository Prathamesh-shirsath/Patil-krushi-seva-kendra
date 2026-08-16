"use client";

import {
  ChevronDown,
  ChevronUp,
  SlidersHorizontal,
  X,
} from "lucide-react";

import { useState } from "react";

export interface FilterOption {
  label: string;
  count: number;
}

interface FilterSidebarProps {
  categories: FilterOption[];
  brands: FilterOption[];
  productTypes: FilterOption[];

  availabilityOptions?: FilterOption[];

  selectedCategory: string;
  selectedBrand: string;
  selectedProductType: string;
  selectedAvailability: string;

  maxPrice: number;
  minPriceValue: number;
  maxPriceValue: number;

  onCategoryChange: (value: string) => void;
  onBrandChange: (value: string) => void;
  onProductTypeChange: (value: string) => void;
  onAvailabilityChange: (value: string) => void;

  onMinPriceChange: (value: number) => void;
  onMaxPriceChange: (value: number) => void;

  onClear: () => void;

  onClose?: () => void;
}

function SectionHeader({
  title,
  open,
  onClick,
}: {
  title: string;
  open: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between py-1 text-left"
    >
      <span className="text-sm font-semibold text-gray-900">
        {title}
      </span>

      {open ? (
        <ChevronUp className="h-4 w-4 text-gray-400" />
      ) : (
        <ChevronDown className="h-4 w-4 text-gray-400" />
      )}
    </button>
  );
}

function OptionRow({
  option,
  selected,
  onClick,
}: {
  option: FilterOption;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        min-h-8
        w-full
        min-w-0
        items-center
        gap-2
        rounded-md
        px-0
        py-1
        text-left
        transition-colors
        hover:bg-green-50
      "
    >
      <span
        className={`
          flex
          h-4
          w-4
          shrink-0
          items-center
          justify-center
          rounded-[3px]
          border
          text-[10px]
          font-bold
          ${selected
            ? "border-green-700 bg-green-700 text-white"
            : "border-gray-400 bg-white"
          }
        `}
      >
        {selected ? "✓" : ""}
      </span>

      <span
        className={`
          min-w-0
          flex-1
          truncate
          text-xs
          ${selected
            ? "font-medium text-green-700"
            : "text-gray-700"
          }
        `}
      >
        {option.label}
      </span>

      <span className="shrink-0 text-[11px] text-gray-400">
        ({option.count})
      </span>
    </button>
  );
}

export default function FilterSidebar({
  categories,
  brands,
  productTypes,
  availabilityOptions = [],

  selectedCategory,
  selectedBrand,
  selectedProductType,
  selectedAvailability,

  maxPrice,
  minPriceValue,
  maxPriceValue,

  onCategoryChange,
  onBrandChange,
  onProductTypeChange,
  onAvailabilityChange,

  onMinPriceChange,
  onMaxPriceChange,

  onClear,
  onClose,
}: FilterSidebarProps) {
  const [openSections, setOpenSections] = useState({
    categories: true,
    brands: true,
    price: true,
    productType: true,
    availability: true,
  });

  const toggleSection = (
    section: keyof typeof openSections
  ) => {
    setOpenSections((previous) => ({
      ...previous,
      [section]: !previous[section],
    }));
  };

  const safeMaxPrice = Math.max(
    Number(maxPrice) || 0,
    1
  );

  const safeMinPrice = Math.max(
    0,
    Math.min(
      Number(minPriceValue) || 0,
      safeMaxPrice
    )
  );

  const safeMaxPriceValue = Math.max(
    safeMinPrice,
    Math.min(
      Number(maxPriceValue) || safeMaxPrice,
      safeMaxPrice
    )
  );

  const handleMinInput = (
    value: string
  ) => {
    const numericValue = Number(
      value.replace(/[^0-9]/g, "")
    );

    if (!value) {
      onMinPriceChange(0);
      return;
    }

    onMinPriceChange(
      Math.min(
        numericValue,
        safeMaxPriceValue
      )
    );
  };

  const handleMaxInput = (
    value: string
  ) => {
    const numericValue = Number(
      value.replace(/[^0-9]/g, "")
    );

    if (!value) {
      onMaxPriceChange(
        safeMaxPrice
      );
      return;
    }

    onMaxPriceChange(
      Math.max(
        safeMinPrice,
        Math.min(
          numericValue,
          safeMaxPrice
        )
      )
    );
  };

  return (
    <aside
      className="
        w-full
        min-w-0
        overflow-hidden
        rounded-2xl
        border
        border-gray-200
        bg-white
        shadow-sm
      "
    >
      {/* Header */}

      <div
        className="
          flex
          items-center
          justify-between
          border-b
          border-gray-100
          px-4
          py-3.5
        "
      >
        <div className="flex min-w-0 items-center gap-2">
          <div
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-green-50
              text-green-700
            "
          >
            <SlidersHorizontal className="h-4 w-4" />
          </div>

          <h2 className="truncate text-sm font-bold text-gray-950">
            Filters
          </h2>
        </div>

        {onClose && (
          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              shrink-0
              items-center
              justify-center
              rounded-full
              text-gray-400
              transition
              hover:bg-gray-100
              hover:text-gray-700
            "
            aria-label="Close filters"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      <div className="divide-y divide-gray-100 px-4">
        {/* Categories */}

        <section className="py-4">
          <SectionHeader
            title="Categories"
            open={openSections.categories}
            onClick={() =>
              toggleSection("categories")
            }
          />

          {openSections.categories && (
            <div className="mt-3 space-y-1">
              {categories.map((option) => (
                <OptionRow
                  key={option.label}
                  option={option}
                  selected={
                    selectedCategory ===
                    option.label
                  }
                  onClick={() =>
                    onCategoryChange(
                      option.label
                    )
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* Brands */}

        <section className="py-4">
          <SectionHeader
            title="Brands"
            open={openSections.brands}
            onClick={() =>
              toggleSection("brands")
            }
          />

          {openSections.brands && (
            <div className="mt-3 max-h-44 space-y-1 overflow-y-auto pr-1">
              {brands.map((option) => (
                <OptionRow
                  key={option.label}
                  option={option}
                  selected={
                    selectedBrand ===
                    option.label
                  }
                  onClick={() =>
                    onBrandChange(
                      option.label
                    )
                  }
                />
              ))}
            </div>
          )}
        </section>

        {/* Price */}

        <section className="py-4">
          <SectionHeader
            title="Price Range"
            open={openSections.price}
            onClick={() =>
              toggleSection("price")
            }
          />

          {openSections.price && (
            <div className="mt-4 space-y-4">
              {/* Range */}

              <div className="relative px-1">
                <input
                  type="range"
                  min={0}
                  max={safeMaxPrice}
                  value={safeMinPrice}
                  onChange={(event) =>
                    onMinPriceChange(
                      Math.min(
                        Number(
                          event.target.value
                        ),
                        safeMaxPriceValue
                      )
                    )
                  }
                  className="
                    pointer-events-auto
                    block
                    h-1.5
                    w-full
                    cursor-pointer
                    accent-green-700
                  "
                  aria-label="Minimum price"
                />

                <input
                  type="range"
                  min={0}
                  max={safeMaxPrice}
                  value={safeMaxPriceValue}
                  onChange={(event) =>
                    onMaxPriceChange(
                      Math.max(
                        Number(
                          event.target.value
                        ),
                        safeMinPrice
                      )
                    )
                  }
                  className="
                    pointer-events-auto
                    -mt-1.5
                    block
                    h-1.5
                    w-full
                    cursor-pointer
                    accent-green-700
                  "
                  aria-label="Maximum price"
                />
              </div>

              <div className="flex items-center justify-between gap-3 text-[11px] font-medium text-gray-600">
                <span>
                  Rs.{" "}
                  {safeMinPrice.toLocaleString(
                    "en-IN"
                  )}
                </span>

                <span>
                  Rs.{" "}
                  {safeMaxPriceValue.toLocaleString(
                    "en-IN"
                  )}
                </span>
              </div>

              {/* Inputs */}

              <div className="grid min-w-0 grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-2">
                <input
                  type="text"
                  inputMode="numeric"
                  value={
                    safeMinPrice === 0
                      ? ""
                      : safeMinPrice
                  }
                  onChange={(event) =>
                    handleMinInput(
                      event.target.value
                    )
                  }
                  placeholder="Rs. Min"
                  className="
                    h-9
                    min-w-0
                    w-full
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-2.5
                    text-xs
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />

                <span className="shrink-0 text-xs text-gray-400">
                  to
                </span>

                <input
                  type="text"
                  inputMode="numeric"
                  value={
                    safeMaxPriceValue ===
                      safeMaxPrice
                      ? ""
                      : safeMaxPriceValue
                  }
                  onChange={(event) =>
                    handleMaxInput(
                      event.target.value
                    )
                  }
                  placeholder="Rs. Max"
                  className="
                    h-9
                    min-w-0
                    w-full
                    rounded-md
                    border
                    border-gray-200
                    bg-white
                    px-2.5
                    text-xs
                    outline-none
                    focus:border-green-600
                    focus:ring-2
                    focus:ring-green-100
                  "
                />
              </div>
            </div>
          )}
        </section>

        {/* Product Type */}

        <section className="py-4">
          <SectionHeader
            title="Product Type"
            open={
              openSections.productType
            }
            onClick={() =>
              toggleSection(
                "productType"
              )
            }
          />

          {openSections.productType && (
            <div className="mt-3 space-y-1">
              {productTypes.map(
                (option) => (
                  <OptionRow
                    key={option.label}
                    option={option}
                    selected={
                      selectedProductType ===
                      option.label
                    }
                    onClick={() =>
                      onProductTypeChange(
                        option.label
                      )
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* Availability */}

        <section className="py-4">
          <SectionHeader
            title="Availability"
            open={
              openSections.availability
            }
            onClick={() =>
              toggleSection(
                "availability"
              )
            }
          />

          {openSections.availability && (
            <div className="mt-3 space-y-1">
              {availabilityOptions.map(
                (option) => (
                  <OptionRow
                    key={option.label}
                    option={option}
                    selected={
                      selectedAvailability ===
                      option.label
                    }
                    onClick={() =>
                      onAvailabilityChange(
                        option.label
                      )
                    }
                  />
                )
              )}
            </div>
          )}
        </section>

        {/* Clear */}

        <div className="py-4">
          <button
            type="button"
            onClick={onClear}
            className="
              flex
              h-9
              w-full
              items-center
              justify-center
              rounded-md
              border
              border-green-600
              bg-white
              px-4
              text-xs
              font-semibold
              text-green-700
              transition
              hover:bg-green-50
            "
          >
            Clear All Filters
          </button>
        </div>
      </div>
    </aside>
  );
}
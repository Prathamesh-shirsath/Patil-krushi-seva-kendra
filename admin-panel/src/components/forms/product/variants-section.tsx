
"use client";

import { Boxes, Plus, Trash2, Package, IndianRupee, Layers3 } from "lucide-react";
import {
  Control,
  UseFormRegister,
  useFieldArray,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  ProductFormValues,
} from "@/features/products/schemas/product.schema";

interface VariantsSectionProps {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  disabled?: boolean;
}

export function VariantsSection({
  control,
  register,
  disabled = false,
}: VariantsSectionProps) {
  const {
    fields,
    append,
    remove,
  } = useFieldArray({
    control,
    name: "variants",
  });

  function addVariant() {
    append({
      packSize: "",
      price: 0,
      stock: 0,
      status: true,
    });
  }

  return (
    <Card className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="border-b border-gray-100 bg-gradient-to-r from-green-50 via-white to-emerald-50 px-4 py-5 sm:px-6 sm:py-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3 sm:items-center sm:gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700 sm:h-12 sm:w-12">
              <Boxes className="h-5 w-5 sm:h-6 sm:w-6" />
            </div>

            <div>
              <h2 className="text-base font-bold text-gray-950 sm:text-lg">
                Product Variants
              </h2>

              <p className="mt-1 max-w-xl text-xs leading-5 text-gray-500 sm:text-sm">
                Manage different pack sizes, prices, stock and availability.
              </p>
            </div>
          </div>

          <Button
            type="button"
            disabled={disabled}
            onClick={addVariant}
            className="h-10 w-full rounded-xl bg-green-700 px-4 font-semibold text-white shadow-sm transition-all hover:bg-green-800 sm:w-auto"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Variant
          </Button>
        </div>

        {/* Variant counter */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-green-100 bg-white px-3 py-1.5 text-xs font-semibold text-green-700 shadow-sm">
          <Layers3 className="h-3.5 w-3.5" />
          {fields.length} {fields.length === 1 ? "Variant" : "Variants"}
        </div>
      </div>

      {/* =====================================================
          EMPTY STATE
      ===================================================== */}

      {fields.length === 0 ? (
        <div className="px-4 py-12 sm:px-6 sm:py-14">
          <div className="mx-auto flex max-w-md flex-col items-center text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-green-50 text-green-700">
              <Package className="h-8 w-8" />
            </div>

            <h3 className="mt-5 text-base font-bold text-gray-950 sm:text-lg">
              No variants added yet
            </h3>

            <p className="mt-2 text-sm leading-6 text-gray-500">
              Add different pack sizes such as 100 g, 500 g, 1 Kg, 5 Kg with
              their individual price and stock.
            </p>

            <Button
              type="button"
              disabled={disabled}
              onClick={addVariant}
              className="mt-5 rounded-xl bg-green-700 px-5 hover:bg-green-800"
            >
              <Plus className="mr-2 h-4 w-4" />
              Add First Variant
            </Button>
          </div>
        </div>
      ) : (
        /* =====================================================
           VARIANT LIST
        ====================================================== */

        <div className="space-y-4 p-4 sm:space-y-5 sm:p-6">
          {fields.map((field, index) => (
            <div
              key={field.id}
              className="group rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition-all duration-200 hover:border-green-200 hover:shadow-md sm:p-5"
            >
              {/* Variant top bar */}
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-green-50 text-sm font-bold text-green-700">
                    {index + 1}
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-gray-950">
                      Variant {index + 1}
                    </p>

                    <p className="truncate text-xs text-gray-500">
                      Pack size, pricing & stock
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={disabled}
                  onClick={() => remove(index)}
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-red-100 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40"
                  aria-label={`Remove variant ${index + 1}`}
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>

              {/* =================================================
                  FORM GRID
              ================================================= */}

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {/* Pack Size */}
                <div className="space-y-2">
                  <label
                    htmlFor={`variant-pack-size-${field.id}`}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-600"
                  >
                    <Package className="h-3.5 w-3.5 text-green-700" />
                    Pack Size
                  </label>

                  <Input
                    id={`variant-pack-size-${field.id}`}
                    disabled={disabled}
                    placeholder="e.g. 500 g"
                    className="h-11 rounded-xl border-gray-200 bg-gray-50 px-3 text-sm font-medium focus-visible:ring-green-600"
                    {...register(`variants.${index}.packSize`)}
                  />

                  <p className="text-[11px] text-gray-400">
                    Example: 100 g, 500 ml, 1 Kg
                  </p>
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label
                    htmlFor={`variant-price-${field.id}`}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-600"
                  >
                    <IndianRupee className="h-3.5 w-3.5 text-green-700" />
                    Price
                  </label>

                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm font-semibold text-gray-500">
                      ₹
                    </span>

                    <Input
                      id={`variant-price-${field.id}`}
                      type="number"
                      min={0}
                      step="0.01"
                      disabled={disabled}
                      placeholder="0.00"
                      className="h-11 rounded-xl border-gray-200 bg-gray-50 pl-8 text-sm font-semibold focus-visible:ring-green-600"
                      {...register(`variants.${index}.price`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>

                  <p className="text-[11px] text-gray-400">
                    Selling price for this pack
                  </p>
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <label
                    htmlFor={`variant-stock-${field.id}`}
                    className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-600"
                  >
                    <Layers3 className="h-3.5 w-3.5 text-green-700" />
                    Stock
                  </label>

                  <Input
                    id={`variant-stock-${field.id}`}
                    type="number"
                    min={0}
                    step="1"
                    disabled={disabled}
                    placeholder="0"
                    className="h-11 rounded-xl border-gray-200 bg-gray-50 text-sm font-semibold focus-visible:ring-green-600"
                    {...register(`variants.${index}.stock`, {
                      valueAsNumber: true,
                    })}
                  />

                  <p className="text-[11px] text-gray-400">
                    Available quantity
                  </p>
                </div>

                {/* Status */}
                <div className="space-y-2">
                  <label
                    htmlFor={`variant-status-${field.id}`}
                    className="block text-xs font-bold uppercase tracking-wide text-gray-600"
                  >
                    Status
                  </label>

                  <select
                    id={`variant-status-${field.id}`}
                    disabled={disabled}
                    className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm font-semibold text-gray-900 outline-none transition focus:border-green-600 focus:ring-2 focus:ring-green-100 disabled:cursor-not-allowed disabled:opacity-60"
                    {...register(`variants.${index}.status`, {
                      setValueAs: (value) => value === "true",
                    })}
                  >
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                  </select>

                  <p className="text-[11px] text-gray-400">
                    Visible to customers
                  </p>
                </div>
              </div>

              {/* =================================================
                  MOBILE-FRIENDLY SUMMARY
              ================================================= */}

              <div className="mt-5 grid grid-cols-3 gap-2 rounded-xl bg-gray-50 p-3 sm:hidden">
                <div>
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    Pack
                  </p>
                  <p className="mt-1 truncate text-xs font-bold text-gray-800">
                    --
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    Price
                  </p>
                  <p className="mt-1 text-xs font-bold text-green-700">
                    ₹ --
                  </p>
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase text-gray-400">
                    Stock
                  </p>
                  <p className="mt-1 text-xs font-bold text-gray-800">
                    --
                  </p>
                </div>
              </div>
            </div>
          ))}

          {/* =====================================================
              ADD ANOTHER VARIANT
          ===================================================== */}

          <button
            type="button"
            disabled={disabled}
            onClick={addVariant}
            className="flex w-full items-center justify-center rounded-2xl border border-dashed border-green-300 bg-green-50/50 px-4 py-4 text-sm font-semibold text-green-700 transition-colors hover:bg-green-50 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Another Variant
          </button>
        </div>
      )}
    </Card>
  );
}



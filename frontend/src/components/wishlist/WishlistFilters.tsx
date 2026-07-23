"use client";

import { useState } from "react";
import {
  Search,
  SlidersHorizontal,
  Grid2X2,
  List,
  Trash2,
  ArrowUpDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WishlistFilters() {
  const [gridView, setGridView] = useState(true);

  return (
    <section className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">

      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

        {/* Search */}

        <div className="relative w-full lg:max-w-md">

          <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />

          <Input
            placeholder="Search wishlist products..."
            className="h-12 rounded-xl border-green-200 pl-11 focus-visible:ring-green-600"
          />

        </div>

        {/* Right */}

        <div className="flex flex-wrap items-center gap-3">

          {/* Category */}

          <select className="h-12 rounded-xl border border-green-200 bg-white px-4 text-sm outline-none transition focus:border-green-600">

            <option>All Categories</option>
            <option>Seeds</option>
            <option>Fertilizers</option>
            <option>Pesticides</option>
            <option>Bio Products</option>

          </select>

          {/* Sort */}

          <select className="h-12 rounded-xl border border-green-200 bg-white px-4 text-sm outline-none transition focus:border-green-600">

            <option>Newest</option>
            <option>Price Low → High</option>
            <option>Price High → Low</option>
            <option>Highest Rated</option>

          </select>

          {/* Filter */}

          <Button
            variant="outline"
            className="h-12 rounded-xl border-green-300"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>

          {/* Remove All */}

          <Button
            variant="destructive"
            className="h-12 rounded-xl"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Clear
          </Button>

        </div>

      </div>

      {/* Bottom */}

      <div className="mt-6 flex flex-col gap-4 border-t pt-5 md:flex-row md:items-center md:justify-between">

        <div className="text-sm text-gray-500">
          Showing
          <span className="mx-2 font-semibold text-green-700">
            12
          </span>
          products in your wishlist
        </div>

        <div className="flex items-center gap-3">

          <Button
            variant="outline"
            className="rounded-xl border-green-300"
          >
            <ArrowUpDown className="mr-2 h-4 w-4" />
            Sort
          </Button>

          <div className="flex overflow-hidden rounded-xl border">

            <button
              onClick={() => setGridView(true)}
              className={`p-3 transition ${
                gridView
                  ? "bg-green-700 text-white"
                  : "bg-white"
              }`}
            >
              <Grid2X2 size={18} />
            </button>

            <button
              onClick={() => setGridView(false)}
              className={`p-3 transition ${
                !gridView
                  ? "bg-green-700 text-white"
                  : "bg-white"
              }`}
            >
              <List size={18} />
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}
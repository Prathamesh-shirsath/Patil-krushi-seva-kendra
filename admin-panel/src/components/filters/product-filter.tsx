"use client";

import {
    Search,
    RotateCcw,
} from "lucide-react";

import { useBrands } from "@/hooks/use-brands";
import { useCategories } from "@/hooks/use-categories";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";


export interface ProductFilterProps {
    search: string;

    onSearchChange: (
        value: string
    ) => void;

    brandId: string;

    onBrandChange: (
        value: string
    ) => void;

    categoryId: string;

    onCategoryChange: (
        value: string
    ) => void;

    onReset: () => void;
}


interface Option {
    id: string;
    name: string;
}


export default function ProductFilter({
    search,
    onSearchChange,
    brandId,
    onBrandChange,
    categoryId,
    onCategoryChange,
    onReset,
}: ProductFilterProps) {

    const {
        data: brands = [],
    } = useBrands();

    const {
        data: categories = [],
    } = useCategories();


    return (
        <div
            className="
                w-full
                rounded-3xl
                border
                border-slate-100
                bg-white
                p-3
                shadow-sm
                sm:p-4
                md:p-5
            "
        >

            <div
                className="
                    grid
                    grid-cols-1
                    gap-3
                    sm:grid-cols-2
                    lg:grid-cols-[1.5fr_1fr_1fr_1fr]
                "
            >

                {/* =================================================
                    SEARCH
                ================================================= */}

                <div className="relative min-w-0">

                    <Search
                        className="
                            pointer-events-none
                            absolute
                            left-4
                            top-1/2
                            h-4
                            w-4
                            -translate-y-1/2
                            text-slate-400
                        "
                    />

                    <Input
                        value={search}
                        onChange={(event) =>
                            onSearchChange(
                                event.target.value
                            )
                        }
                        placeholder="Search products..."
                        className="
                            h-11
                            w-full
                            rounded-2xl
                            border-slate-200
                            bg-slate-50
                            pl-11
                            pr-4
                            text-sm
                            shadow-none
                            transition
                            focus:bg-white
                            focus:ring-2
                            focus:ring-emerald-500/20
                            focus-visible:border-emerald-500
                        "
                    />

                </div>


                {/* =================================================
                    BRAND
                ================================================= */}

                <Select
                    value={brandId}
                    onValueChange={onBrandChange}
                >

                    <SelectTrigger
                        className="
                            h-11
                            w-full
                            rounded-2xl
                            border-slate-200
                            bg-white
                            px-4
                            shadow-none
                        "
                    >
                        <SelectValue
                            placeholder="All Brands"
                        />
                    </SelectTrigger>


                    <SelectContent
                        className="rounded-2xl"
                    >

                        <SelectItem value="all">
                            All Brands
                        </SelectItem>


                        {(brands as Option[]).map(
                            (brand) => (
                                <SelectItem
                                    key={brand.id}
                                    value={brand.id}
                                >
                                    {brand.name}
                                </SelectItem>
                            )
                        )}

                    </SelectContent>

                </Select>


                {/* =================================================
                    CATEGORY
                ================================================= */}

                <Select
                    value={categoryId}
                    onValueChange={onCategoryChange}
                >

                    <SelectTrigger
                        className="
                            h-11
                            w-full
                            rounded-2xl
                            border-slate-200
                            bg-white
                            px-4
                            shadow-none
                        "
                    >
                        <SelectValue
                            placeholder="All Categories"
                        />
                    </SelectTrigger>


                    <SelectContent
                        className="rounded-2xl"
                    >

                        <SelectItem value="all">
                            All Categories
                        </SelectItem>


                        {categories.map(
                            (category) => (
                                <SelectItem
                                    key={category.id}
                                    value={category.id}
                                >
                                    {category.name}
                                </SelectItem>
                            )
                        )}

                    </SelectContent>

                </Select>


                {/* =================================================
                    RESET
                ================================================= */}

                <Button
                    type="button"
                    variant="outline"
                    onClick={onReset}
                    className="
                        h-11
                        w-full
                        rounded-2xl
                        border-slate-200
                        bg-white
                        font-medium
                        text-slate-700
                        shadow-none
                        hover:bg-slate-50
                    "
                >

                    <RotateCcw
                        className="
                            mr-2
                            h-4
                            w-4
                        "
                    />

                    Reset Filters

                </Button>

            </div>

        </div>
    );
}
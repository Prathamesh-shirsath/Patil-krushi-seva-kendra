"use client";

import { Search, RotateCcw } from "lucide-react";

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
    onSearchChange: (value: string) => void;

    brandId: string;
    onBrandChange: (value: string) => void;

    categoryId: string;
    onCategoryChange: (value: string) => void;

    onReset: () => void;
}

interface Brand {
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

    const { data: brands = [] } = useBrands();

    const { data: categories = [] } = useCategories();

    return (

        <div
            className="
                rounded-2xl
                border
                bg-white
                p-5
                shadow-sm
            "
        >

            <div
                className="
                    grid
                    gap-4
                    lg:grid-cols-4
                "
            >

                {/* Search */}

                <div className="relative">

                    <Search
                        className="
                            absolute
                            left-3
                            top-3
                            h-4
                            w-4
                            text-muted-foreground
                        "
                    />

                    <Input
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) =>
                            onSearchChange(e.target.value)
                        }
                        className="pl-10"
                    />

                </div>

                {/* Brand */}

                <Select
                    value={brandId}
                    onValueChange={onBrandChange}
                >

                    <SelectTrigger>

                        <SelectValue
                            placeholder="All Brands"
                        />

                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All Brands
                        </SelectItem>

                        {(brands as Brand[]).map((brand) => (

                            <SelectItem
                                key={brand.id}
                                value={brand.id}
                            >
                                {brand.name}
                            </SelectItem>

                        ))}

                    </SelectContent>

                </Select>

                {/* Category */}

                <Select
                    value={categoryId}
                    onValueChange={onCategoryChange}
                >

                    <SelectTrigger>

                        <SelectValue
                            placeholder="All Categories"
                        />

                    </SelectTrigger>

                    <SelectContent>

                        <SelectItem value="all">
                            All Categories
                        </SelectItem>

                        {categories.map((category) => (

                            <SelectItem
                                key={category.id}
                                value={category.id}
                            >
                                {category.name}
                            </SelectItem>

                        ))}

                    </SelectContent>

                </Select>

                {/* Reset */}

                <Button
                    variant="outline"
                    onClick={onReset}
                >

                    <RotateCcw
                        className="mr-2 h-4 w-4"
                    />

                    Reset Filters

                </Button>

            </div>

        </div>

    );
}
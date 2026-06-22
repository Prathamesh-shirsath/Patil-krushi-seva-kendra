export const CATEGORIES: string[] = [
    "All Categories",
];

export const BRANDS: string[] = [
    "All Brands",
];

export const TYPES: string[] = [
    "All Types",
];

export const STOCK_STATUSES: string[] = [
    "All Status",
    "In Stock",
    "Low Stock",
    "Out of Stock",
];

export function getStockStatus(stock: number) {
    if (stock <= 0) {
        return "Out of Stock";
    }

    if (stock <= 5) {
        return "Low Stock";
    }

    return "In Stock";
}
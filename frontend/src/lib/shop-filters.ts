/** Stable internal filter values — never localized. */

export const FILTER_ALL = "all";

export const FILTER_CURRENT_CATEGORY = "current";

export const STOCK_IN = "in_stock";

export const STOCK_OUT = "out_of_stock";

export type StockStatus = typeof STOCK_IN | typeof STOCK_OUT;

export type AvailabilityFilter =
  | typeof FILTER_ALL
  | StockStatus;

export function isProductInStock(
  availability: StockStatus
): boolean {
  return availability === STOCK_IN;
}

export function matchesAvailabilityFilter(
  productAvailability: StockStatus,
  selectedAvailability: AvailabilityFilter
): boolean {
  if (selectedAvailability === FILTER_ALL) {
    return true;
  }

  return productAvailability === selectedAvailability;
}

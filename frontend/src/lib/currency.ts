const inrFormatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
  currencyDisplay: "symbol",
});

export function formatINR(amount: number | string): string {
  return inrFormatter.format(Number(amount));
}

export function formatValue(value: number): string {
  return value.toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function formatPrice(value: number): string {
  return `₹${formatValue(value)}`;
}

export function formatBalance(value: number): string {
  return `₹${value.toLocaleString("en-IN")}`;
}

export function formatPercent(value: number): string {
  return `${Math.abs(value).toFixed(2)}%`;
}

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

export function formatSignedPrice(value: number): string {
  const sign = value < 0 ? "−" : "+";
  return `${sign}₹${formatValue(Math.abs(value))}`;
}

export function formatSignedPercent(value: number): string {
  const sign = value < 0 ? "−" : "+";
  return `${sign}${Math.abs(value).toFixed(2)}%`;
}

export function formatClock(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleTimeString("en-IN", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export function formatDate(iso: string): string {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return "—";
  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function minutesSince(iso: string): number | null {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return Math.floor((Date.now() - date.getTime()) / 60000);
}

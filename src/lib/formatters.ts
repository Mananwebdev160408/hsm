import { WarrantyStatus } from "@/types/asset";

export function formatINR(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(amount);
}

export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return new Intl.DateTimeFormat("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric"
    }).format(date);
  } catch {
    return dateString;
  }
}

export function getDaysUntilExpiry(expiryDateString: string): number {
  const today = new Date("2026-10-26T00:00:00");
  const expiry = new Date(expiryDateString);
  const diffTime = expiry.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

export function getWarrantyStatus(expiryDateString: string): WarrantyStatus {
  const daysLeft = getDaysUntilExpiry(expiryDateString);
  if (daysLeft < 0) {
    return "expired";
  }
  if (daysLeft <= 30) {
    return "expiring_soon";
  }
  return "active";
}

export function getWarrantyBadgeConfig(status: WarrantyStatus): {
  label: string;
  className: string;
  dotClassName: string;
} {
  switch (status) {
    case "active":
      return {
        label: "Active Warranty",
        className: "bg-emerald-50 text-emerald-800 border-emerald-200",
        dotClassName: "bg-emerald-500"
      };
    case "expiring_soon":
      return {
        label: "Expiring Soon",
        className: "bg-amber-50 text-amber-800 border-amber-200",
        dotClassName: "bg-amber-500 animate-pulse"
      };
    case "expired":
      return {
        label: "Warranty Expired",
        className: "bg-slate-100 text-slate-700 border-slate-300",
        dotClassName: "bg-slate-400"
      };
  }
}

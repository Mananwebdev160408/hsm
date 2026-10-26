export type AssetCategory = "smartphones" | "laptops" | "appliances" | "vehicles" | "gadgets";

export type WarrantyStatus = "active" | "expiring_soon" | "expired";

export interface AssetDocument {
  id: string;
  title: string;
  type: "invoice" | "warranty_card" | "insurance_policy" | "service_receipt";
  fileName: string;
  fileSize: string;
  uploadDate: string;
  extractedData?: {
    invoiceNumber?: string;
    retailer?: string;
    taxAmount?: string;
    warrantyTermMonths?: number;
    extractedVia?: string;
  };
}

export interface ServiceReminder {
  id: string;
  title: string;
  dueDate: string;
  status: "pending" | "completed";
  priority: "low" | "medium" | "high";
  category: string;
}

export interface Asset {
  id: string;
  name: string;
  category: AssetCategory;
  brand: string;
  model: string;
  serialNumberOrImei: string;
  purchaseDate: string;
  purchasePrice: number;
  retailer: string;
  warrantyProvider: string;
  warrantyExpiryDate: string;
  linkedInsurancePlanId?: string;
  linkedInsurancePlanName?: string;
  documents: AssetDocument[];
  reminders: ServiceReminder[];
}

export interface AssetFilterState {
  searchQuery: string;
  category: AssetCategory | "all";
  warrantyStatus: WarrantyStatus | "all";
  sortBy: "date_newest" | "date_oldest" | "price_desc" | "expiry_soon";
}

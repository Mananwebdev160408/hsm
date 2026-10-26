export type InsuranceCategory = "health" | "life" | "motor" | "travel";

export interface InsurancePlan {
  id: string;
  provider: string;
  providerCode: string;
  planName: string;
  category: InsuranceCategory;
  annualPremium: number;
  monthlyPremium: number;
  sumInsured: number;
  sumInsuredDisplay: string;
  claimsSettlementRatio: number;
  networkCount: number;
  networkLabel: string;
  rating: number;
  reviewsCount: number;
  tags: string[];
  keyBenefits: string[];
  roomRentLimit: string;
  coPayment: string;
  prePostHospitalization: string;
  waitingPeriodPreExisting: string;
  noClaimBonus: string;
  restorationBenefit: string;
  inclusions: string[];
  exclusions: string[];
  basePremium: number;
  gstAmount: number;
  hasMaternity?: boolean;
  hasZeroDep?: boolean;
  hasCriticalIllness?: boolean;
  hasBaggageLoss?: boolean;
  hasRoadsideAssistance?: boolean;
  hasCashlessOPD?: boolean;
}

export interface PlanFilterState {
  category: InsuranceCategory;
  searchQuery: string;
  city: string;
  maxAnnualPremium: number;
  minSumInsured: number;
  provider: string;
  onlyZeroCopay: boolean;
  onlyInstantCashless: boolean;
  sortBy: "premium_asc" | "premium_desc" | "sum_desc" | "csr_desc" | "rating_desc";
}

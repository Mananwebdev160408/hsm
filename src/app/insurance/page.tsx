"use client";

import React, { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { InsuranceCategory, InsurancePlan, PlanFilterState } from "@/types/insurance";
import { InsuranceFilterBar } from "@/components/insurance/InsuranceFilterBar";
import { PlanCard } from "@/components/insurance/PlanCard";
import { DemoSelectionModal } from "@/components/insurance/DemoSelectionModal";
import { ShieldCheck, AlertCircle, RotateCcw } from "lucide-react";

function InsuranceDiscoveryContent() {
  const searchParams = useSearchParams();
  const initialCat = (searchParams.get("cat") as InsuranceCategory) || "health";

  const { plans } = useApp();
  const [selectedDemoPlan, setSelectedDemoPlan] = useState<InsurancePlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [filters, setFilters] = useState<PlanFilterState>({
    category: ["health", "motor", "life", "travel"].includes(initialCat)
      ? initialCat
      : "health",
    searchQuery: "",
    city: "all",
    maxAnnualPremium: 50000,
    minSumInsured: 0,
    provider: "all",
    onlyZeroCopay: false,
    onlyInstantCashless: false,
    sortBy: "csr_desc"
  });

  const handleFilterChange = (updates: Partial<PlanFilterState>) => {
    setFilters((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilters({
      category: filters.category,
      searchQuery: "",
      city: "all",
      maxAnnualPremium: 50000,
      minSumInsured: 0,
      provider: "all",
      onlyZeroCopay: false,
      onlyInstantCashless: false,
      sortBy: "csr_desc"
    });
  };

  // Filter & Sort Logic
  const filteredPlans = useMemo(() => {
    return plans
      .filter((plan) => {
        // Category check
        if (plan.category !== filters.category) return false;

        // Search Query check
        if (filters.searchQuery.trim()) {
          const query = filters.searchQuery.toLowerCase();
          const matchesPlan = plan.planName.toLowerCase().includes(query);
          const matchesProvider = plan.provider.toLowerCase().includes(query);
          const matchesTags = plan.tags.some((t) => t.toLowerCase().includes(query));
          const matchesBenefits = plan.keyBenefits.some((b) => b.toLowerCase().includes(query));
          if (!matchesPlan && !matchesProvider && !matchesTags && !matchesBenefits) {
            return false;
          }
        }

        // Max Premium check
        if (plan.annualPremium > filters.maxAnnualPremium) return false;

        // Zero Copay filter
        if (filters.onlyZeroCopay && !plan.coPayment.includes("0%")) {
          return false;
        }

        // Instant Cashless filter
        if (filters.onlyInstantCashless && !plan.tags.some((t) => t.toLowerCase().includes("cashless"))) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        switch (filters.sortBy) {
          case "premium_asc":
            return a.annualPremium - b.annualPremium;
          case "premium_desc":
            return b.annualPremium - a.annualPremium;
          case "sum_desc":
            return b.sumInsured - a.sumInsured;
          case "rating_desc":
            return b.rating - a.rating;
          case "csr_desc":
          default:
            return b.claimsSettlementRatio - a.claimsSettlementRatio;
        }
      });
  }, [plans, filters]);

  const handleSelectForDemo = (plan: InsurancePlan) => {
    setSelectedDemoPlan(plan);
    setIsModalOpen(true);
  };

  const categoryTitles: Record<InsuranceCategory, { title: string; subtitle: string }> = {
    health: {
      title: "Health Insurance Plans",
      subtitle:
        "Medical hospitalisation coverage with verified room rent rules, zero copay options, and cashless network hospitals."
    },
    motor: {
      title: "Comprehensive Motor Insurance",
      subtitle:
        "Bumper-to-bumper car and two-wheeler protection with zero depreciation, engine protect, and 24x7 roadside assistance."
    },
    life: {
      title: "Pure Term Life Assurance",
      subtitle:
        "Affordable pure term policies providing high sum assured protection, terminal illness covers, and tax savings."
    },
    travel: {
      title: "International & Domestic Travel Shield",
      subtitle:
        "Schengen visa-approved medical expense coverage, checked-in baggage loss compensation, and emergency trip protection."
    }
  };

  const activeCategoryInfo = categoryTitles[filters.category];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C82026] mb-1">
            <ShieldCheck className="w-4 h-4" />
            <span>Insurance Discovery & Policy Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeCategoryInfo.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            {activeCategoryInfo.subtitle}
          </p>
        </div>

        {/* Prototype regulatory note */}
        <div className="inline-flex items-center gap-2 p-2.5 rounded-md bg-amber-50 border border-amber-200 text-[11px] text-amber-900 shrink-0">
          <AlertCircle className="w-4 h-4 text-[#F47721] shrink-0" />
          <span>Fictional Indian Insurers • Demonstration Data</span>
        </div>
      </div>

      {/* Filter Bar */}
      <InsuranceFilterBar
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleResetFilters}
        totalResults={filteredPlans.length}
      />

      {/* Plans List */}
      {filteredPlans.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map((plan) => (
            <PlanCard
              key={plan.id}
              plan={plan}
              onSelectForDemo={handleSelectForDemo}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-lg mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <RotateCcw className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">
            No Matching Insurance Plans Found
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No plans match your current combination of filters. Try raising the maximum premium, clearing feature checkboxes, or resetting the search query.
          </p>
          <button
            type="button"
            onClick={handleResetFilters}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-xs transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters</span>
          </button>
        </div>
      )}

      {/* Demo Selection Modal */}
      <DemoSelectionModal
        plan={selectedDemoPlan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default function InsurancePage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-slate-500">
          Loading insurance catalog...
        </div>
      }
    >
      <InsuranceDiscoveryContent />
    </Suspense>
  );
}

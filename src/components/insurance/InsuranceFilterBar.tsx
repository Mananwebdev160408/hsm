"use client";

import React from "react";
import { InsuranceCategory, PlanFilterState } from "@/types/insurance";
import { Search, RotateCcw, Filter, MapPin } from "lucide-react";

interface InsuranceFilterBarProps {
  filters: PlanFilterState;
  onFilterChange: (updates: Partial<PlanFilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export function InsuranceFilterBar({
  filters,
  onFilterChange,
  onReset,
  totalResults
}: InsuranceFilterBarProps) {
  const categories: { id: InsuranceCategory; label: string }[] = [
    { id: "health", label: "Health Insurance" },
    { id: "motor", label: "Motor Insurance" },
    { id: "life", label: "Life & Term Insurance" },
    { id: "travel", label: "Travel Insurance" }
  ];

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
        {categories.map((cat) => {
          const isSelected = filters.category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onFilterChange({ category: cat.id })}
              className={`px-4 py-2 rounded-md text-xs font-semibold transition-colors ${
                isSelected
                  ? "bg-[#C82026] text-white shadow-xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Search & Main Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            placeholder="Search plan, provider, or tag..."
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#C82026]"
          />
        </div>

        {/* City Filter */}
        <div className="relative">
          <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <select
            value={filters.city}
            onChange={(e) => onFilterChange({ city: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden text-slate-700"
          >
            <option value="all">All Service Cities</option>
            <option value="bengaluru">Bengaluru</option>
            <option value="mumbai">Mumbai</option>
            <option value="delhi">Delhi NCR</option>
            <option value="hyderabad">Hyderabad</option>
            <option value="chennai">Chennai</option>
          </select>
        </div>

        {/* Max Annual Premium */}
        <div>
          <select
            value={filters.maxAnnualPremium}
            onChange={(e) => onFilterChange({ maxAnnualPremium: Number(e.target.value) })}
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden text-slate-700"
          >
            <option value={50000}>Max Premium: Any (Up to ₹50k)</option>
            <option value={10000}>Up to ₹10,000 / year</option>
            <option value={15000}>Up to ₹15,000 / year</option>
            <option value={20000}>Up to ₹20,000 / year</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <select
            value={filters.sortBy}
            onChange={(e) =>
              onFilterChange({
                sortBy: e.target.value as PlanFilterState["sortBy"]
              })
            }
            className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden text-slate-700 font-medium"
          >
            <option value="csr_desc">Highest Claim Settlement (CSR)</option>
            <option value="premium_asc">Lowest Premium First</option>
            <option value="premium_desc">Highest Premium First</option>
            <option value="sum_desc">Highest Coverage (Sum Insured)</option>
            <option value="rating_desc">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Feature Toggles & Results Summary */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyZeroCopay}
              onChange={(e) => onFilterChange({ onlyZeroCopay: e.target.checked })}
              className="rounded border-slate-300 text-[#C82026] focus:ring-[#C82026]"
            />
            <span>Zero Copay only</span>
          </label>

          <label className="flex items-center gap-2 text-xs text-slate-700 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.onlyInstantCashless}
              onChange={(e) => onFilterChange({ onlyInstantCashless: e.target.checked })}
              className="rounded border-slate-300 text-[#C82026] focus:ring-[#C82026]"
            />
            <span>Instant Cashless Network</span>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-xs font-semibold text-slate-500">
            {totalResults} {totalResults === 1 ? "plan" : "plans"} found
          </span>
          <button
            type="button"
            onClick={onReset}
            className="inline-flex items-center gap-1 text-xs text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </button>
        </div>
      </div>
    </div>
  );
}

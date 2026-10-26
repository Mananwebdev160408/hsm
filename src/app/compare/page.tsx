import React from "react";
import { ComparisonMatrix } from "@/components/compare/ComparisonMatrix";
import { Scale, Info } from "lucide-react";

export const metadata = {
  title: "Side-by-Side Policy Comparison Matrix — BillBazaar",
  description:
    "Evaluate insurance policies side-by-side with transparent breakdowns of room rent limits, copays, waiting periods, and exclusions."
};

export default function ComparePage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C82026] mb-1">
            <Scale className="w-4 h-4" />
            <span>Side-by-Side Policy Evaluation</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Comparison Matrix
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Objective policy analysis without sponsored insurer bias. Review fine-print exclusions, waiting periods, room rents, and claim settlement track records side-by-side.
          </p>
        </div>

        <div className="p-3 bg-white border border-slate-200 rounded-lg text-xs text-slate-600 max-w-xs shrink-0 flex items-start gap-2">
          <Info className="w-4 h-4 text-[#F47721] shrink-0 mt-0.5" />
          <p className="leading-snug">
            BillBazaar does not mark any plan as universally best. Trade-offs are framed around your selected priorities.
          </p>
        </div>
      </div>

      {/* Main Matrix Component */}
      <ComparisonMatrix />
    </div>
  );
}

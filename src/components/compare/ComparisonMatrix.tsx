"use client";

import React, { useState } from "react";
import Link from "next/link";
import { InsurancePlan } from "@/types/insurance";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/formatters";
import { DemoSelectionModal } from "@/components/insurance/DemoSelectionModal";
import {
  Scale,
  X,
  Plus,
  Check,
  AlertTriangle,
  ShieldAlert,
  ShieldCheck,
  Star,
  Hospital,
  ArrowLeft,
  ArrowRight
} from "lucide-react";

export function ComparisonMatrix() {
  const { plans, comparePlanIds, removeFromCompare, addToCompare } = useApp();
  const [selectedDemoPlan, setSelectedDemoPlan] = useState<InsurancePlan | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const selectedPlans = plans.filter((p) => comparePlanIds.includes(p.id));
  const unselectedPlans = plans.filter((p) => !comparePlanIds.includes(p.id));

  const handleSelect = (plan: InsurancePlan) => {
    setSelectedDemoPlan(plan);
    setIsModalOpen(true);
  };

  if (selectedPlans.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg p-10 text-center max-w-2xl mx-auto my-8 space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center mx-auto">
          <Scale className="w-6 h-6" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">
          No Plans Added to Comparison Matrix
        </h3>
        <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
          Select 2 to 3 plans from the Insurance Catalog to compare premiums, room rent caps, pre-existing disease waiting periods, and exclusions side-by-side.
        </p>

        <div className="pt-2 flex flex-wrap justify-center gap-2">
          {plans.slice(0, 3).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => addToCompare(p.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-xs font-semibold text-slate-800 transition-colors"
            >
              <Plus className="w-3.5 h-3.5 text-[#C82026]" />
              <span>Add {p.planName}</span>
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-slate-100">
          <Link
            href="/insurance"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Browse Full Insurance Catalog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Top Controls & Plan Add Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">
              Side-by-Side Policy Matrix ({selectedPlans.length}/3)
            </h2>
            <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
              Interactive Comparison
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Compare coverage, waiting periods, room rent restrictions, and track records side-by-side.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {selectedPlans.length < 3 && unselectedPlans.length > 0 && (
            <div className="relative">
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    addToCompare(e.target.value);
                    e.target.value = "";
                  }
                }}
                defaultValue=""
                className="text-xs font-semibold bg-white border border-slate-300 rounded-md px-3 py-1.5 text-slate-700 hover:border-slate-400 focus:outline-hidden"
              >
                <option value="" disabled>
                  + Add another plan ({3 - selectedPlans.length} slot remaining)
                </option>
                {unselectedPlans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.planName} ({p.providerCode})
                  </option>
                ))}
              </select>
            </div>
          )}

          <Link
            href="/insurance"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Plans</span>
          </Link>
        </div>
      </div>

      {/* Structured Comparison Table */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            {/* Header: Plan Cards */}
            <thead>
              <tr className="bg-slate-50/90 border-b border-slate-200">
                <th className="py-4 px-4 font-bold text-slate-700 w-56 align-top">
                  Feature / Parameter
                </th>
                {selectedPlans.map((plan) => (
                  <th
                    key={plan.id}
                    className="py-4 px-4 font-bold text-slate-900 border-l border-slate-200 align-top min-w-[240px]"
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2">
                        <span className="w-6 h-6 rounded bg-red-50 text-[#C82026] text-[10px] font-extrabold flex items-center justify-center border border-red-100">
                          {plan.providerCode}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                          {plan.provider}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeFromCompare(plan.id)}
                        className="text-slate-400 hover:text-red-600 p-1 rounded hover:bg-slate-100 transition-colors"
                        title="Remove plan from comparison"
                        aria-label={`Remove ${plan.planName} from comparison`}
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 leading-snug mb-2">
                      {plan.planName}
                    </h3>

                    <div className="bg-white rounded-md border border-slate-200 p-2.5 mb-3">
                      <span className="text-[10px] font-medium text-slate-500 block">
                        Annual Cost (Incl. GST)
                      </span>
                      <span className="text-base font-extrabold text-[#C82026]">
                        {formatINR(plan.annualPremium)}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        ({formatINR(plan.monthlyPremium)}/mo)
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => handleSelect(plan)}
                        className="w-full py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-xs transition-colors"
                      >
                        Select Plan (Demo)
                      </button>
                      <Link
                        href={`/plan/${plan.id}`}
                        className="w-full inline-flex items-center justify-center gap-1 py-1 text-[11px] font-semibold text-slate-600 hover:text-slate-900 hover:underline"
                      >
                        <span>Inspect Full Specs</span>
                        <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {/* Category 1: Financial & Coverage */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedPlans.length + 1}
                  className="py-2 px-4 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                >
                  1. Financial & Coverage Specifications
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Sum Insured / IDV
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 font-bold text-slate-900 border-l border-slate-200"
                  >
                    {p.sumInsuredDisplay}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Co-payment Obligation
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className={`py-3 px-4 font-medium border-l border-slate-200 ${
                      p.coPayment.includes("0%")
                        ? "text-emerald-700"
                        : "text-amber-800"
                    }`}
                  >
                    {p.coPayment}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Network Coverage Scale
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-slate-700 border-l border-slate-200"
                  >
                    {p.networkLabel}
                  </td>
                ))}
              </tr>

              {/* Category 2: Medical & Feature Rules */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedPlans.length + 1}
                  className="py-2 px-4 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                >
                  2. Hospitalisation & Benefit Limits
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Room Rent Limit
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className={`py-3 px-4 font-medium border-l border-slate-200 ${
                      p.roomRentLimit.toLowerCase().includes("no capping") ||
                      p.roomRentLimit.toLowerCase().includes("any room")
                        ? "text-emerald-700"
                        : "text-slate-800"
                    }`}
                  >
                    {p.roomRentLimit}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Pre / Post Hospitalisation
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-slate-700 border-l border-slate-200"
                  >
                    {p.prePostHospitalization}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Waiting Period (Pre-Existing)
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-slate-800 font-medium border-l border-slate-200"
                  >
                    {p.waitingPeriodPreExisting}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  No Claim Bonus (NCB)
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-slate-700 border-l border-slate-200"
                  >
                    {p.noClaimBonus}
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Restoration Benefit
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-slate-700 border-l border-slate-200"
                  >
                    {p.restorationBenefit}
                  </td>
                ))}
              </tr>

              {/* Category 3: Key Inclusions & Exclusions */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedPlans.length + 1}
                  className="py-2 px-4 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                >
                  3. Inclusions & Exclusions Comparison
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700 align-top">
                  Key Inclusions
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 border-l border-slate-200 align-top"
                  >
                    <ul className="space-y-1.5">
                      {p.inclusions.slice(0, 3).map((inc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-700">
                          <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700 align-top">
                  Important Exclusions
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 border-l border-slate-200 align-top"
                  >
                    <ul className="space-y-1.5">
                      {p.exclusions.slice(0, 3).map((exc, i) => (
                        <li key={i} className="flex items-start gap-1.5 text-slate-600">
                          <ShieldAlert className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                          <span>{exc}</span>
                        </li>
                      ))}
                    </ul>
                  </td>
                ))}
              </tr>

              {/* Category 4: Track Record & CSR */}
              <tr className="bg-slate-100/70">
                <td
                  colSpan={selectedPlans.length + 1}
                  className="py-2 px-4 font-bold text-slate-800 uppercase tracking-wider text-[11px]"
                >
                  4. Track Record & Settlement Speed
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  Claims Settlement Ratio (CSR)
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 font-bold text-slate-900 border-l border-slate-200"
                  >
                    <span className="inline-block px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {p.claimsSettlementRatio}% Verified Track Record
                    </span>
                  </td>
                ))}
              </tr>
              <tr>
                <td className="py-3 px-4 font-semibold text-slate-700">
                  User Rating & Reviews
                </td>
                {selectedPlans.map((p) => (
                  <td
                    key={p.id}
                    className="py-3 px-4 text-slate-700 border-l border-slate-200"
                  >
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-900">{p.rating}</span>
                      <span className="text-slate-500">
                        ({p.reviewsCount} verified reviews)
                      </span>
                    </div>
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Demo Selection Modal */}
      <DemoSelectionModal
        plan={selectedDemoPlan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

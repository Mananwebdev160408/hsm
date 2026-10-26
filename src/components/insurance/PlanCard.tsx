"use client";

import React from "react";
import Link from "next/link";
import { InsurancePlan } from "@/types/insurance";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/formatters";
import {
  ShieldCheck,
  Check,
  Plus,
  Star,
  Hospital,
  ArrowRight,
  Sparkles,
  Info
} from "lucide-react";

interface PlanCardProps {
  plan: InsurancePlan;
  onSelectForDemo?: (plan: InsurancePlan) => void;
}

export function PlanCard({ plan, onSelectForDemo }: PlanCardProps) {
  const { isPlanInCompare, addToCompare, removeFromCompare, setSelectedDemoPlan } = useApp();

  const inCompare = isPlanInCompare(plan.id);

  const handleCompareToggle = () => {
    if (inCompare) {
      removeFromCompare(plan.id);
    } else {
      addToCompare(plan.id);
    }
  };

  const handleSelectPlan = () => {
    setSelectedDemoPlan(plan);
    if (onSelectForDemo) {
      onSelectForDemo(plan);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 hover:shadow-md transition-all flex flex-col justify-between">
      <div>
        {/* Header: Provider & CSR */}
        <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded bg-red-50 text-[#C82026] flex items-center justify-center font-bold text-xs border border-red-100 shrink-0">
              {plan.providerCode}
            </div>
            <div>
              <span className="text-[11px] font-semibold text-slate-500 block uppercase tracking-wider">
                {plan.provider}
              </span>
              <h3 className="text-base font-bold text-slate-900 leading-tight">
                {plan.planName}
              </h3>
            </div>
          </div>

          <div className="text-right shrink-0">
            <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 text-xs font-bold border border-emerald-200">
              <span>{plan.claimsSettlementRatio}% CSR</span>
            </div>
            <div className="flex items-center justify-end gap-1 text-[11px] text-slate-500 mt-0.5">
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
              <span className="font-semibold text-slate-700">{plan.rating}</span>
              <span>({plan.reviewsCount})</span>
            </div>
          </div>
        </div>

        {/* Pricing & Sum Insured Grid */}
        <div className="grid grid-cols-2 gap-3 py-3.5 bg-slate-50/70 rounded-md px-3.5 my-3 border border-slate-100">
          <div>
            <span className="text-[11px] text-slate-500 font-medium block">
              Sum Insured / IDV
            </span>
            <span className="text-base font-extrabold text-slate-900">
              {plan.sumInsuredDisplay}
            </span>
          </div>

          <div className="text-right">
            <span className="text-[11px] text-slate-500 font-medium block">
              Annual Premium (Incl. GST)
            </span>
            <span className="text-base font-extrabold text-[#C82026]">
              {formatINR(plan.annualPremium)}
            </span>
            <span className="text-[10px] text-slate-500 block">
              or {formatINR(plan.monthlyPremium)}/mo
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3.5">
          {plan.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Key Benefits */}
        <div className="space-y-1.5 mb-4">
          {plan.keyBenefits.slice(0, 3).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs text-slate-600">
              <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
              <span>{benefit}</span>
            </div>
          ))}
        </div>

        {/* Network Hospitals / Garages */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 pb-3 border-b border-slate-100">
          <Hospital className="w-3.5 h-3.5 text-slate-400" />
          <span>{plan.networkLabel}</span>
        </div>
      </div>

      {/* Actions */}
      <div className="pt-4 flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={handleCompareToggle}
          className={`flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold border transition-colors ${
            inCompare
              ? "bg-slate-900 text-white border-slate-900"
              : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
          }`}
        >
          {inCompare ? (
            <>
              <Check className="w-3.5 h-3.5" />
              <span>In Compare</span>
            </>
          ) : (
            <>
              <Plus className="w-3.5 h-3.5" />
              <span>Add to Compare</span>
            </>
          )}
        </button>

        <Link
          href={`/plan/${plan.id}`}
          className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-md text-xs font-semibold bg-red-50 text-[#C82026] hover:bg-red-100 border border-red-200 transition-colors"
        >
          <span>View Details</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>

        <button
          type="button"
          onClick={handleSelectPlan}
          className="px-3 py-2 rounded-md text-xs font-semibold bg-[#C82026] hover:bg-[#a8181e] text-white transition-colors"
          title="Select this policy"
        >
          Select
        </button>
      </div>
    </div>
  );
}

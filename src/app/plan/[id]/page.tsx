"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { formatINR } from "@/lib/formatters";
import { DemoSelectionModal } from "@/components/insurance/DemoSelectionModal";
import {
  ShieldCheck,
  Check,
  Plus,
  Star,
  Hospital,
  ArrowLeft,
  Scale,
  ShieldAlert,
  Clock,
  Sparkles,
  DollarSign
} from "lucide-react";

function PlanDetailsContent() {
  const params = useParams();
  const planId = params?.id as string;

  const { plans, isPlanInCompare, addToCompare, removeFromCompare, setSelectedDemoPlan } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const plan = plans.find((p) => p.id === planId);

  if (!plan) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Plan Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested insurance policy could not be found in our active catalog.
        </p>
        <Link
          href="/insurance"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C82026] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

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
    setIsModalOpen(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
        <span>/</span>
        <Link href={`/insurance?cat=${plan.category}`} className="hover:text-slate-900 capitalize">
          {plan.category} Insurance
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-900">{plan.planName}</span>
      </div>

      {/* Main Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded bg-red-50 text-[#C82026] text-xs font-bold flex items-center justify-center border border-red-100">
                {plan.providerCode}
              </span>
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-500 block">
                  {plan.provider}
                </span>
                <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
                  {plan.planName}
                </h1>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded bg-emerald-50 text-emerald-800 text-xs font-bold border border-emerald-200">
                <span>{plan.claimsSettlementRatio}% Claim Settlement Ratio (IRDAI)</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span className="font-bold text-slate-800">{plan.rating}</span>
                <span>({plan.reviewsCount} verified reviews)</span>
              </div>
              <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                {plan.networkLabel}
              </span>
            </div>
          </div>

          {/* Pricing Box & Primary Actions */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 min-w-[280px] space-y-3">
            <div>
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                Total Annual Premium
              </span>
              <div className="flex items-baseline gap-1.5 mt-0.5">
                <span className="text-2xl font-black text-[#C82026]">
                  {formatINR(plan.annualPremium)}
                </span>
                <span className="text-xs text-slate-500">/ year (incl. GST)</span>
              </div>
              <span className="text-xs text-slate-500 block mt-0.5">
                or {formatINR(plan.monthlyPremium)} / month
              </span>
            </div>

            <div className="pt-2 border-t border-slate-200 space-y-2">
              <button
                type="button"
                onClick={handleSelectPlan}
                className="w-full py-2.5 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Select This Policy
              </button>

              <button
                type="button"
                onClick={handleCompareToggle}
                className={`w-full inline-flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-semibold border transition-colors ${
                  inCompare
                    ? "bg-slate-900 text-white border-slate-900"
                    : "bg-white text-slate-700 border-slate-300 hover:bg-slate-50"
                }`}
              >
                {inCompare ? (
                  <>
                    <Check className="w-3.5 h-3.5" />
                    <span>In Comparison Matrix</span>
                  </>
                ) : (
                  <>
                    <Scale className="w-3.5 h-3.5" />
                    <span>Add to Side-by-Side Compare</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Feature Tags */}
        <div className="pt-4 flex flex-wrap gap-2">
          {plan.tags.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs font-medium px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Main Grid: Policy Specifications & Premium Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Policy Specifications & Inclusions/Exclusions */}
        <div className="lg:col-span-2 space-y-6">
          {/* Key Parameters Matrix */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
            <h3 className="text-base font-bold text-slate-900 pb-2 border-b border-slate-100">
              Core Coverage Specifications
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium block">Sum Insured / IDV</span>
                <span className="text-base font-extrabold text-slate-900 mt-0.5 block">
                  {plan.sumInsuredDisplay}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Applicable across all policy claim categories
                </span>
              </div>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium block">Room Rent Capping</span>
                <span className="text-base font-bold text-slate-900 mt-0.5 block">
                  {plan.roomRentLimit}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Determines deductions on hospital bed admission
                </span>
              </div>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium block">Co-Payment Obligation</span>
                <span className="text-base font-bold text-slate-900 mt-0.5 block">
                  {plan.coPayment}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Percentage borne by policyholder at claim time
                </span>
              </div>

              <div className="p-3 rounded-md bg-slate-50 border border-slate-100">
                <span className="text-slate-500 font-medium block">Waiting Period (Pre-existing)</span>
                <span className="text-base font-bold text-slate-900 mt-0.5 block">
                  {plan.waitingPeriodPreExisting}
                </span>
                <span className="text-[11px] text-slate-500 mt-1 block">
                  Cooling-off duration for conditions disclosed at underwriting
                </span>
              </div>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Pre & Post Hospitalisation</span>
                <span className="text-slate-900 font-medium">{plan.prePostHospitalization}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Cumulative No Claim Bonus (NCB)</span>
                <span className="text-slate-900 font-medium">{plan.noClaimBonus}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-slate-100">
                <span className="font-semibold text-slate-700">Sum Insured Restoration</span>
                <span className="text-slate-900 font-medium">{plan.restorationBenefit}</span>
              </div>
            </div>
          </div>

          {/* Inclusions & Exclusions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Inclusions */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <div className="w-6 h-6 rounded bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Check className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  What is Covered (Inclusions)
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {plan.inclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Exclusions */}
            <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
              <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
                <div className="w-6 h-6 rounded bg-amber-50 text-amber-600 flex items-center justify-center">
                  <ShieldAlert className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-slate-900">
                  What is Not Covered (Exclusions)
                </h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                {plan.exclusions.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Right Column: Premium Breakdown & Claims Process */}
        <div className="space-y-6">
          {/* Detailed Premium Breakdown */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-[#C82026]" />
              <span>Premium Cost Breakdown</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between text-slate-600">
                <span>Base Underwritten Premium:</span>
                <span className="font-semibold text-slate-900">
                  {formatINR(plan.basePremium)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Goods & Services Tax (GST 18%):</span>
                <span className="font-semibold text-slate-900">
                  {formatINR(plan.gstAmount)}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Digital Surcharge / Agency Fees:</span>
                <span className="font-semibold text-emerald-600">₹0 (Waived)</span>
              </div>
              <div className="pt-2 border-t border-slate-200 flex justify-between font-bold text-sm text-slate-900">
                <span>Total Payable:</span>
                <span className="text-[#C82026] font-black">
                  {formatINR(plan.annualPremium)}
                </span>
              </div>
            </div>

            <div className="p-2.5 rounded bg-slate-50 border border-slate-200 text-[11px] text-slate-500 leading-relaxed">
              Tax deduction under Section 80D (Health) or Section 80C (Term) of the Indian Income Tax Act may be claimed on this amount.
            </div>
          </div>

          {/* Claim Settlement Flow */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
            <h3 className="text-sm font-bold text-slate-900 pb-2 border-b border-slate-100 flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#F47721]" />
              <span>Cashless Claim Workflow</span>
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <p className="font-bold text-slate-900">Show Health / Policy Card</p>
                  <p className="text-slate-500 text-[11px]">Present e-card at hospital or network garage TPA desk.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <p className="font-bold text-slate-900">Instant Pre-Authorisation</p>
                  <p className="text-slate-500 text-[11px]">Insurer verifies medical diagnosis within 30 minutes.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-700 font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <p className="font-bold text-slate-900">Cashless Discharge</p>
                  <p className="text-slate-500 text-[11px]">Insurer settles hospital or garage bills directly.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Selection Modal */}
      <DemoSelectionModal
        plan={plan}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default function PlanDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-slate-500">
          Loading plan details...
        </div>
      }
    >
      <PlanDetailsContent />
    </Suspense>
  );
}

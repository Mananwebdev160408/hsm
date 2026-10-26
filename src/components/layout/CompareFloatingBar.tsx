"use client";

import React from "react";
import Link from "next/link";
import { useApp } from "@/context/AppContext";
import { Scale, X, ArrowRight, CheckCircle2 } from "lucide-react";

export function CompareFloatingBar() {
  const { comparePlanIds, plans, removeFromCompare, clearCompare, notification } = useApp();

  const selectedPlans = plans.filter((p) => comparePlanIds.includes(p.id));

  return (
    <>
      {/* Toast Notification Alert */}
      {notification && (
        <div className="fixed top-20 right-4 z-50 animate-in fade-in slide-in-from-top-4 duration-300">
          <div className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs shadow-lg border border-slate-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="font-medium">{notification}</span>
          </div>
        </div>
      )}

      {/* Floating Bottom Comparison Bar */}
      {selectedPlans.length > 0 && (
        <aside
          aria-label="Side-by-side comparison bar"
          className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-4xl bg-white border border-slate-300 rounded-xl shadow-2xl p-3 md:p-4 animate-in fade-in slide-in-from-bottom-5 duration-200"
        >
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <div className="w-9 h-9 rounded-lg bg-red-50 text-[#C82026] flex items-center justify-center shrink-0 border border-red-100">
                <Scale className="w-5 h-5" strokeWidth={2} />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 flex items-center gap-1.5">
                  Comparison Matrix ({selectedPlans.length}/3)
                </p>
                <p className="text-[11px] text-slate-500 hidden sm:block">
                  Compare benefits, room rent, exclusions, and premiums side-by-side.
                </p>
              </div>
            </div>

            {/* Selected Plan Badges */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
              {selectedPlans.map((plan) => (
                <div
                  key={plan.id}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-xs font-medium text-slate-800"
                >
                  <span className="truncate max-w-[140px] font-semibold text-slate-900">
                    {plan.planName}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeFromCompare(plan.id)}
                    className="text-slate-400 hover:text-red-600 transition-colors p-0.5 rounded"
                    title="Remove from comparison"
                    aria-label={`Remove ${plan.planName} from comparison`}
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
              <button
                type="button"
                onClick={clearCompare}
                className="px-2.5 py-1.5 text-xs text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
              >
                Clear
              </button>
              <Link
                href="/compare"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-sm transition-colors"
              >
                <span>Compare Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </aside>
      )}
    </>
  );
}

"use client";

import React from "react";
import Link from "next/link";
import { InsurancePlan } from "@/types/insurance";
import { formatINR } from "@/lib/formatters";
import { ShieldCheck, CheckCircle2, X, ArrowRight, FolderArchive } from "lucide-react";

interface DemoSelectionModalProps {
  plan: InsurancePlan | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DemoSelectionModal({ plan, isOpen, onClose }: DemoSelectionModalProps) {
  if (!isOpen || !plan) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Policy Proposal Confirmed
            </h3>
            <p className="text-xs text-slate-500">
              Verified Proposer Dossier • Instant Lock
            </p>
          </div>
        </div>

        {/* Selected Plan Recap */}
        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 space-y-2.5 mb-4 text-xs">
          <div className="flex justify-between">
            <span className="text-slate-500">Selected Plan:</span>
            <span className="font-bold text-slate-900">{plan.planName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Insurance Provider:</span>
            <span className="font-semibold text-slate-800">{plan.provider}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Coverage / Sum Insured:</span>
            <span className="font-bold text-slate-900">{plan.sumInsuredDisplay}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500">Annual Premium:</span>
            <span className="font-extrabold text-[#C82026]">{formatINR(plan.annualPremium)}</span>
          </div>
          <div className="flex justify-between border-t border-slate-200 pt-2">
            <span className="text-slate-500">Primary Proposer:</span>
            <span className="font-medium text-slate-700">Vikram S. (Bengaluru)</span>
          </div>
        </div>

        {/* Policy Pre-Approval Confirmation */}
        <div className="flex items-start gap-2.5 p-3 rounded-md bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 mb-5">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Instant Policy Pre-Approval:</strong> Your premium quote and cashless hospitalization terms are locked. You can now link this coverage directly to any registered asset in your locker.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-2">
          <Link
            href="/assets"
            onClick={onClose}
            className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <FolderArchive className="w-4 h-4" />
            <span>Link Policy to a Registered Asset</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-colors"
          >
            Continue Browsing Plans
          </button>
        </div>
      </div>
    </div>
  );
}

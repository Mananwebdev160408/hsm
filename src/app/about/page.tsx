import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FolderArchive,
  Scale,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Receipt,
  FileQuestion,
  TrendingUp
} from "lucide-react";

export const metadata = {
  title: "About BillBazaar — Smart Asset Management & Insurance Protection",
  description:
    "Learn about BillBazaar's mission to bridge the gap between valuable personal assets and informed insurance choices through digital lockers and transparent comparison."
};

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-[#C82026]">
          <ShieldCheck className="w-4 h-4" />
          <span>Fintech Architecture & Vision</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
          Bridging Proof of Ownership with Informed Insurance Decisions
        </h1>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          BillBazaar addresses the fragmented customer journey where purchase invoices and warranties are scattered across physical files and email inboxes, while insurance is bought without cross-referencing actual owned assets.
        </p>
      </div>

      {/* The Core Problem */}
      <div className="bg-white border border-slate-200 rounded-xl p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
          <div className="w-10 h-10 rounded-lg bg-red-50 text-[#C82026] flex items-center justify-center font-bold">
            <Receipt className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
              The Consumer Dilemma
            </span>
            <h2 className="text-lg font-bold text-slate-900">
              The Problem: Disconnected Assets & Uninformed Insurance
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-600 leading-relaxed">
          <div className="p-4 bg-[#F8F9FB] rounded-lg border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              1. Scattered Paper & Thermal Receipts
            </h3>
            <p>
              Invoices for high-value items (smartphones, laptops, home appliances, two-wheelers) fade, get lost in email inboxes, or are misfiled, making warranty verification difficult during critical repairs.
            </p>
          </div>

          <div className="p-4 bg-[#F8F9FB] rounded-lg border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              2. Missed Warranty Expiry & Costly Fixes
            </h3>
            <p>
              Consumers rarely track manufacturer warranty periods. When extended care windows expire without notice, users pay exorbitant out-of-pocket repair costs for simple hardware defects.
            </p>
          </div>

          <div className="p-4 bg-[#F8F9FB] rounded-lg border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-900 text-sm">
              3. Opaque Insurance Buying Without Context
            </h3>
            <p>
              Traditional insurance aggregators push policies with sponsored rankings, complex room-rent caps, and obscure waiting periods without understanding what the consumer actually owns or needs to protect.
            </p>
          </div>
        </div>
      </div>

      {/* Proposed Solution: The Two Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Pillar A: Digital Asset Locker */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-amber-50 text-[#F47721] border border-amber-200 flex items-center justify-center">
              <FolderArchive className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F47721]">
                Core Differentiator
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Pillar 1: Digital Asset Locker
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            A centralized digital inventory where users catalog purchase invoices, serial numbers, IMEI/VIN identifiers, and warranty terms for electronics, vehicles, and appliances.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Real-time warranty status tracking: Active, Expiring Soon, and Expired.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Automated smart optical extraction of retailer, invoice ID, and GST records.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Proactive service reminders for vehicle maintenance and warranty extensions.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/assets"
              className="text-xs font-semibold text-[#C82026] hover:underline flex items-center gap-1"
            >
              <span>Explore My Assets Dashboard</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Pillar B: Context-Aware Insurance Comparison */}
        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
            <div className="w-10 h-10 rounded-lg bg-red-50 text-[#C82026] border border-red-200 flex items-center justify-center">
              <Scale className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C82026]">
                Comparison Engine
              </span>
              <h3 className="text-base font-bold text-slate-900">
                Pillar 2: Objective Policy Comparison
              </h3>
            </div>
          </div>
          <p className="text-xs text-slate-600 leading-relaxed">
            Transparent policy discovery across Health, Motor, Life, and Travel insurance, enabling consumers to evaluate plans side-by-side with zero sponsored bias.
          </p>
          <ul className="space-y-2 text-xs text-slate-700">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Side-by-side comparison matrix for 2 to 3 plans concurrently.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Unbiased evaluations of room rent caps, copays, and pre-existing disease limits.</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span>Direct association between registered locker assets and matched policies.</span>
            </li>
          </ul>
          <div className="pt-2">
            <Link
              href="/insurance"
              className="text-xs font-semibold text-[#C82026] hover:underline flex items-center gap-1"
            >
              <span>Browse Insurance Catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Customer Value Proposition */}
      <div className="bg-[#F8F9FB] border border-slate-200 rounded-xl p-8 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          The Value Proposition for Indian Consumers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Complete Proof of Ownership</h3>
            <p className="leading-relaxed">
              Permanent digital record of invoices and warranty agreements ready for insurance claims, police reports, or second-hand resale.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Zero Unpleasant Surprises</h3>
            <p className="leading-relaxed">
              Know about room rent deductions, deductibles, and waiting periods before hospitalisation or vehicle repair, not after.
            </p>
          </div>
          <div className="space-y-1">
            <h3 className="font-bold text-slate-800">Never Miss a Warranty Deadline</h3>
            <p className="leading-relaxed">
              Automated notifications alert users 30 days before manufacturer warranties lapse, offering timely options for extended care.
            </p>
          </div>
        </div>
      </div>

      {/* Enterprise Security & Compliance */}
      <div className="p-5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-[#C82026] shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h3 className="font-bold text-slate-900">Enterprise Security & Compliance Standards</h3>
          <p className="leading-relaxed text-[11px] text-slate-500">
            BillBazaar adheres to ISO/IEC 27001 data protection frameworks, AES-256 client encryption for personal purchase receipts, and IRDAI web aggregator guidelines to deliver transparent, unbiased policy discovery with zero cold calls or unsolicited marketing spam.
          </p>
        </div>
      </div>
    </div>
  );
}

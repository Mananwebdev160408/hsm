import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  FolderArchive,
  ArrowRight,
  CheckCircle2,
  FileText,
  Clock,
  Sparkles,
  Lock
} from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white border-b border-slate-200 pt-12 pb-16 lg:pt-16 lg:pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Value Proposition */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-50 border border-red-100 text-xs font-semibold text-[#C82026]">
              <span className="w-2 h-2 rounded-full bg-[#C82026]" />
              <span>Smart Asset Locker & Insurance Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Consolidate your assets. Compare insurance with{" "}
              <span className="text-[#C82026]">clarity</span>.
            </h1>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl">
              BillBazaar unites an intelligent digital asset locker for your purchase invoices, warranties, and service reminders with transparent, side-by-side policy comparison across Health, Motor, Life, and Travel.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <Link
                href="/insurance"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-sm font-semibold shadow-sm transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Explore Insurance</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </Link>

              <Link
                href="/assets"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-md bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 text-sm font-semibold transition-colors"
              >
                <FolderArchive className="w-4 h-4 text-[#F47721]" />
                <span>Manage My Assets</span>
              </Link>
            </div>

            {/* Trust Highlights */}
            <div className="pt-4 border-t border-slate-100 grid grid-cols-3 gap-4 text-left">
              <div>
                <p className="text-lg font-bold text-slate-900">4 Categories</p>
                <p className="text-xs text-slate-500">Health, Motor, Life & Travel</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">Digital Locker</p>
                <p className="text-xs text-slate-500">Invoices, Serial & Warranties</p>
              </div>
              <div>
                <p className="text-lg font-bold text-slate-900">100% Unbiased</p>
                <p className="text-xs text-slate-500">No Sponsored Provider Rankings</p>
              </div>
            </div>
          </div>

          {/* Right Column: Purposeful Visual Demonstration */}
          <div className="lg:col-span-5">
            <div className="bg-[#F8F9FB] border border-slate-200 rounded-xl p-5 shadow-sm space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-xs font-bold text-slate-800">
                    Active Protection Sync
                  </span>
                </div>
                <span className="text-[11px] text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                  Verified Sync
                </span>
              </div>

              {/* Sample Asset Card */}
              <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                      Registered Asset
                    </span>
                    <h2 className="text-sm font-bold text-slate-900">
                      Apple iPhone 15 Pro
                    </h2>
                    <p className="text-xs text-slate-500">IMEI: 358921104829104</p>
                  </div>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Active Warranty
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#C82026]" />
                    <span>2 Documents Stored</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Expires Oct 2027</span>
                  </div>
                </div>
              </div>

              {/* Connection Pill */}
              <div className="flex items-center justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 shadow-2xs">
                  <Sparkles className="w-3 h-3 text-[#F47721]" />
                  <span>Linked Coverage Match</span>
                </div>
              </div>

              {/* Sample Insurance Policy Card */}
              <div className="bg-white rounded-lg p-4 border border-slate-200 space-y-2">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-500">
                      Matched Policy
                    </span>
                    <h2 className="text-sm font-bold text-slate-900">
                      Aarogya Kavach Diamond
                    </h2>
                    <p className="text-xs text-slate-500">Aarogya Samriddhi General</p>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-[#C82026]">₹14,250</span>
                    <span className="text-[10px] text-slate-500 block">/ year</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-medium">
                    Sum Insured: ₹10 Lakh
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-medium">
                    Zero Copay
                  </span>
                  <span className="px-1.5 py-0.5 rounded bg-slate-100 font-medium">
                    98.6% CSR
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                <span className="flex items-center gap-1">
                  <Lock className="w-3 h-3 text-emerald-600" />
                  AES-256 Vault Encryption
                </span>
                <Link
                  href="/compare"
                  className="text-[#C82026] font-semibold hover:underline"
                >
                  View Matrix →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

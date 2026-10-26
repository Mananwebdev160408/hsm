import React from "react";
import Link from "next/link";
import { Scale, Check, ArrowRight, ShieldCheck } from "lucide-react";

export function CompareTeaser() {
  return (
    <section className="py-16 bg-[#F8F9FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-50 text-[11px] font-semibold text-[#C82026] uppercase tracking-wider mb-2">
              Feature Highlight
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Transparent Policy Comparison
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Eliminate guesswork. Compare fine-print terms side-by-side with complete objectivity.
            </p>
          </div>
          <Link
            href="/compare"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <span>Open Side-by-Side Matrix</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Comparison Preview Table */}
        <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="py-3.5 px-4 font-bold text-slate-700 w-1/3">
                    Policy Parameter
                  </th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 w-1/3 border-l border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#C82026]" />
                      <span>Aarogya Kavach Diamond</span>
                    </div>
                    <span className="text-[11px] font-normal text-slate-500">
                      Aarogya Samriddhi General
                    </span>
                  </th>
                  <th className="py-3.5 px-4 font-bold text-slate-900 w-1/3 border-l border-slate-200">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-[#F47721]" />
                      <span>Suraksha Comprehensive 360</span>
                    </div>
                    <span className="text-[11px] font-normal text-slate-500">
                      Niva Suraksha Assurance
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Annual Premium (Incl. GST)
                  </td>
                  <td className="py-3 px-4 font-bold text-[#C82026] border-l border-slate-200">
                    ₹14,250 <span className="font-normal text-slate-500 text-[11px]">/ yr</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-[#C82026] border-l border-slate-200">
                    ₹18,900 <span className="font-normal text-slate-500 text-[11px]">/ yr</span>
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Sum Insured
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 border-l border-slate-200">
                    ₹10 Lakh
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 border-l border-slate-200">
                    ₹25 Lakh
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Room Rent Capping
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-medium border-l border-slate-200">
                    Single Private AC (No Capping)
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-medium border-l border-slate-200">
                    Any Room (Including Suites)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Co-Payment Required
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-medium border-l border-slate-200">
                    0% Across All Hospitals
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-medium border-l border-slate-200">
                    0% Across All Hospitals
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Waiting Period (Pre-existing)
                  </td>
                  <td className="py-3 px-4 text-slate-700 border-l border-slate-200">
                    2 Years
                  </td>
                  <td className="py-3 px-4 text-emerald-700 font-medium border-l border-slate-200">
                    1 Year (Express Rider)
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-semibold text-slate-700">
                    Claim Settlement Ratio
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 border-l border-slate-200">
                    98.6% (Fast 30-min cashless)
                  </td>
                  <td className="py-3 px-4 font-bold text-slate-900 border-l border-slate-200">
                    99.1% (High settlement track)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-slate-50 p-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <span className="text-slate-500">
              Showing 2 of 10 available plans. Select any 2–3 plans across any category for full comparison.
            </span>
            <Link
              href="/compare"
              className="text-[#C82026] font-semibold hover:underline flex items-center gap-1"
            >
              <span>Explore Comparison Table</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

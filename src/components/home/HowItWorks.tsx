import React from "react";
import { FolderPlus, SearchCheck, Scale, CheckCircle2 } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      step: "01",
      title: "Store Invoices & Warranties",
      subtitle: "Unified Digital Asset Locker",
      description:
        "Upload invoices and certificates for your gadgets, laptops, vehicles, and home appliances. Extract warranty validity, serial numbers, and retailer data automatically.",
      icon: FolderPlus,
      perks: ["Automated warranty expiry alerts", "Automated optical invoice parsing", "Proof of purchase always accessible"]
    },
    {
      step: "02",
      title: "Detect Coverage Gaps",
      subtitle: "Context-Aware Protection",
      description:
        "Understand exactly when manufacturer warranties expire and when complementary insurance (such as bumper-to-bumper motor, gadget insurance, or medical cover) is needed.",
      icon: SearchCheck,
      perks: ["Zero unneeded duplicate policies", "Timely renewal notifications", "Direct asset-to-policy linking"]
    },
    {
      step: "03",
      title: "Compare Transparently",
      subtitle: "Objective Side-by-Side Matrix",
      description:
        "Select up to 3 plans and evaluate true policy trade-offs: room rent limits, pre-existing disease waiting periods, copays, and claims settlement ratios without sales pressure.",
      icon: Scale,
      perks: ["Standardized comparison rows", "No hidden marketing rankings", "Side-by-side exclusion breakdown"]
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-red-50 text-[11px] font-semibold text-[#C82026] uppercase tracking-wider mb-2">
            The BillBazaar Engine
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            How BillBazaar Solves the Disconnected Journey
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Most users buy expensive electronics and vehicles but lose warranty receipts. BillBazaar connects invoice tracking with intelligent insurance comparison.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#F8F9FB] border border-slate-200 rounded-lg p-6 relative flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-black text-slate-300">
                      {item.step}
                    </span>
                    <div className="w-10 h-10 rounded-md bg-white border border-slate-200 text-[#C82026] flex items-center justify-center">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1">
                    {item.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#F47721] mb-3">
                    {item.subtitle}
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed mb-4">
                    {item.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-slate-200/80">
                  {item.perks.map((perk, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 text-[11px] text-slate-700 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                      <span>{perk}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

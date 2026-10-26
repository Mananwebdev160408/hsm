import React from "react";
import Link from "next/link";
import { Activity, Shield, Car, Plane, ArrowRight } from "lucide-react";

export function CategoryCards() {
  const categories = [
    {
      id: "health",
      title: "Health Insurance",
      description:
        "Comprehensive medical protection covering hospitalisation, day-care surgeries, pre-existing diseases, and cashless hospital networks.",
      icon: Activity,
      features: ["Zero Room Rent Limits", "10,000+ Cashless Hospitals", "Annual Health Checkups"],
      href: "/insurance?cat=health",
      planCount: "3 Plans Seeded"
    },
    {
      id: "motor",
      title: "Motor Insurance",
      description:
        "Bumper-to-bumper car and two-wheeler policies featuring zero depreciation, engine protection, roadside assistance, and instant invoice valuation.",
      icon: Car,
      features: ["Zero Depreciation", "24x7 Roadside Assistance", "Return to Invoice"],
      href: "/insurance?cat=motor",
      planCount: "3 Plans Seeded"
    },
    {
      id: "life",
      title: "Life & Term Insurance",
      description:
        "Pure term life assurance securing family income, terminal illness early payouts, and accidental disability riders with high claim ratios.",
      icon: Shield,
      features: ["Up to ₹2 Crore Sum Assured", "99%+ Settlement Ratios", "Tax Exemption Benefits"],
      href: "/insurance?cat=life",
      planCount: "2 Plans Seeded"
    },
    {
      id: "travel",
      title: "Travel Insurance",
      description:
        "International and domestic coverage for emergency medical treatment abroad, baggage delays, Schengen visa requirements, and trip interruptions.",
      icon: Plane,
      features: ["Schengen Visa Approved", "Medical Evacuation", "Baggage Loss Coverage"],
      href: "/insurance?cat=travel",
      planCount: "2 Plans Seeded"
    }
  ];

  return (
    <section className="py-16 bg-[#F8F9FB] border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-slate-200/80 text-[11px] font-semibold text-slate-800 uppercase tracking-wider mb-2">
              Catalog Discovery
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Insurance Categories
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Browse transparent policy terms with standardized comparison rows across India&apos;s leading fictional insurance providers.
            </p>
          </div>
          <Link
            href="/insurance"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C82026] hover:text-[#a8181e] group"
          >
            <span>View All 10 Seeded Plans</span>
            <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-lg border border-slate-200 p-6 flex flex-col justify-between hover:border-slate-300 hover:shadow-md transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-md bg-red-50 text-[#C82026] flex items-center justify-center border border-red-100">
                      <Icon className="w-5 h-5" strokeWidth={1.75} />
                    </div>
                    <span className="text-[11px] font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                      {cat.planCount}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed mb-4">
                    {cat.description}
                  </p>

                  <div className="space-y-1.5 pt-3 border-t border-slate-100">
                    {cat.features.map((feat, i) => (
                      <div
                        key={i}
                        className="text-[11px] text-slate-700 flex items-center gap-1.5"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C82026]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-slate-100">
                  <Link
                    href={cat.href}
                    className="inline-flex items-center justify-between w-full text-xs font-semibold text-[#C82026] group-hover:text-[#a8181e]"
                  >
                    <span>Browse {cat.title}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

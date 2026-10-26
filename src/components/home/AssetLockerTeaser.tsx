import React from "react";
import Link from "next/link";
import { FolderArchive, ArrowRight, FileText, Smartphone, Laptop, Tv, AlertCircle } from "lucide-react";
import { formatINR } from "@/lib/formatters";

export function AssetLockerTeaser() {
  const sampleItems = [
    {
      name: "Apple iPhone 15 Pro (128GB)",
      category: "Smartphone",
      price: 134900,
      icon: Smartphone,
      status: "Active Warranty",
      statusClass: "bg-emerald-50 text-emerald-700 border-emerald-200",
      expiry: "Expires 14 Oct 2027",
      docs: 2
    },
    {
      name: "Apple MacBook Pro 14\" (M3 Pro)",
      category: "Laptop",
      price: 199900,
      icon: Laptop,
      status: "Expiring Soon",
      statusClass: "bg-amber-50 text-amber-700 border-amber-200",
      expiry: "Expires 18 Nov 2026 (23 days left)",
      docs: 1
    },
    {
      name: "Sony Bravia 55\" 4K OLED TV",
      category: "Appliances",
      price: 62990,
      icon: Tv,
      status: "Expiring Soon",
      statusClass: "bg-amber-50 text-amber-700 border-amber-200",
      expiry: "Expires 12 Nov 2026 (17 days left)",
      docs: 1
    }
  ];

  return (
    <section className="py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-amber-50 text-[11px] font-semibold text-[#F47721] uppercase tracking-wider mb-2 border border-amber-200">
              Key Differentiator
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Your Digital Asset Locker
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Keep purchase invoices, warranties, serial identifiers, and service reminders organized in one unified hub.
            </p>
          </div>
          <Link
            href="/assets"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <FolderArchive className="w-3.5 h-3.5" />
            <span>Open Asset Locker</span>
            <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-[#F8F9FB] border border-slate-200 rounded-lg p-4">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Assets
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">6</p>
            <span className="text-[11px] text-slate-500">₹6.4 Lakh combined value</span>
          </div>

          <div className="bg-[#F8F9FB] border border-slate-200 rounded-lg p-4">
            <span className="text-[11px] font-semibold text-emerald-700 uppercase tracking-wider">
              Active Warranties
            </span>
            <p className="text-2xl font-black text-emerald-700 mt-1">3</p>
            <span className="text-[11px] text-slate-500">Full manufacturer & care</span>
          </div>

          <div className="bg-[#F8F9FB] border border-slate-200 rounded-lg p-4">
            <span className="text-[11px] font-semibold text-amber-700 uppercase tracking-wider">
              Expiring Soon
            </span>
            <p className="text-2xl font-black text-amber-700 mt-1">2</p>
            <span className="text-[11px] text-amber-700">Less than 30 days left</span>
          </div>

          <div className="bg-[#F8F9FB] border border-slate-200 rounded-lg p-4">
            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Documents Stored
            </span>
            <p className="text-2xl font-black text-slate-900 mt-1">8</p>
            <span className="text-[11px] text-slate-500">Invoices & policy schedules</span>
          </div>
        </div>

        {/* Asset Cards Preview */}
        <div className="bg-[#F8F9FB] border border-slate-200 rounded-lg divide-y divide-slate-200">
          {sampleItems.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-white transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-md bg-white border border-slate-200 text-slate-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900">{item.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{item.category}</span>
                      <span>•</span>
                      <span className="font-semibold text-slate-700">{formatINR(item.price)}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <FileText className="w-3 h-3 text-slate-400" />
                        {item.docs} doc
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 justify-between sm:justify-end">
                  <div className="text-right">
                    <span
                      className={`inline-block text-xs font-semibold px-2 py-0.5 rounded border ${item.statusClass}`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[11px] text-slate-500 block mt-0.5">
                      {item.expiry}
                    </span>
                  </div>
                  <Link
                    href="/assets"
                    className="p-2 rounded-md hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-colors"
                    aria-label="View asset details"
                  >
                    <ArrowRight className="w-4 h-4" />
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

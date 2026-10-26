import React from "react";
import Link from "next/link";
import { ShieldCheck, Lock, ExternalLink, HeartHandshake, AlertCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto text-slate-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded bg-[#C82026] flex items-center justify-center text-white">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-slate-900 tracking-tight">
                Bill<span className="text-[#C82026]">Bazaar</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
              India&apos;s smart digital asset locker and contextual insurance discovery platform. Bridging proof of ownership with transparent policy comparison.
            </p>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-100 text-[11px] font-medium text-slate-700">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              256-Bit SSL Encrypted Vault
            </div>
          </div>

          {/* Quick Links: Insurance */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Insurance Discovery
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/insurance?cat=health" className="hover:text-[#C82026] transition-colors">
                  Health Insurance Plans
                </Link>
              </li>
              <li>
                <Link href="/insurance?cat=motor" className="hover:text-[#C82026] transition-colors">
                  Comprehensive Motor Insurance
                </Link>
              </li>
              <li>
                <Link href="/insurance?cat=life" className="hover:text-[#C82026] transition-colors">
                  Pure Term Life Assurance
                </Link>
              </li>
              <li>
                <Link href="/insurance?cat=travel" className="hover:text-[#C82026] transition-colors">
                  International Travel Shield
                </Link>
              </li>
              <li>
                <Link href="/compare" className="hover:text-[#C82026] transition-colors">
                  Side-by-Side Comparison Matrix
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Digital Asset Locker */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Digital Asset Locker
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/assets" className="hover:text-[#C82026] transition-colors">
                  All Registered Assets
                </Link>
              </li>
              <li>
                <Link href="/assets?status=expiring_soon" className="hover:text-[#C82026] transition-colors">
                  Expiring Warranties Tracker
                </Link>
              </li>
              <li>
                <Link href="/assets" className="hover:text-[#C82026] transition-colors">
                  Invoices & Warranty Cards
                </Link>
              </li>
              <li>
                <Link href="/assets" className="hover:text-[#C82026] transition-colors">
                  Scheduled Service Reminders
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-[#C82026] transition-colors">
                  The Problem & Solution
                </Link>
              </li>
            </ul>
          </div>

          {/* Regulatory Standards */}
          <div>
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#C82026]" />
              IRDAI Compliance & Standards
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              BillBazaar adheres to IRDAI web aggregator guidelines. Policy terms, cashless hospital networks, and premium quotes are standardized across partner insurers to provide objective comparisons.
            </p>
          </div>
        </div>

        <div className="border-t border-slate-200 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-3">
          <p>© 2026 BillBazaar Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/about" className="hover:underline">
              About Project
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/insurance" className="hover:underline">
              Plan Catalog
            </Link>
            <span className="text-slate-300">•</span>
            <Link href="/assets" className="hover:underline">
              Asset Locker
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

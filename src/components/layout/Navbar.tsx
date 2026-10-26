"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useApp } from "@/context/AppContext";
import {
  ShieldCheck,
  Scale,
  FolderArchive,
  Info,
  Menu,
  X,
  User,
  ChevronRight,
  FileCheck2
} from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const { comparePlanIds, assets } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Home", href: "/", icon: null },
    { label: "Explore Insurance", href: "/insurance", icon: ShieldCheck },
    {
      label: "Compare",
      href: "/compare",
      icon: Scale,
      badge: comparePlanIds.length > 0 ? comparePlanIds.length : null
    },
    {
      label: "My Assets",
      href: "/assets",
      icon: FolderArchive,
      badge: assets.length > 0 ? assets.length : null
    },
    { label: "About", href: "/about", icon: Info }
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Wordmark */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-md bg-[#C82026] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
              <ShieldCheck className="w-5 h-5 text-white" strokeWidth={2} />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <span className="font-bold text-lg tracking-tight text-slate-900">
                  Bill<span className="text-[#C82026]">Bazaar</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider font-semibold px-1.5 py-0.5 rounded bg-amber-50 text-[#F47721] border border-amber-200">
                  Prototype
                </span>
              </div>
              <span className="text-[11px] text-slate-500 font-medium -mt-0.5">
                Asset Locker & Policy Compare
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-md text-sm font-medium transition-colors ${
                    active
                      ? "text-[#C82026] bg-red-50/70 font-semibold"
                      : "text-slate-700 hover:text-slate-900 hover:bg-slate-100"
                  }`}
                >
                  {Icon && <Icon className="w-4 h-4" strokeWidth={1.75} />}
                  <span>{item.label}</span>
                  {item.badge !== null && (
                    <span
                      className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${
                        active
                          ? "bg-[#C82026] text-white"
                          : "bg-slate-200 text-slate-800"
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Action / Profile Demo */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/assets"
              className="flex items-center gap-2 px-3 py-1.5 rounded-md border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-colors text-xs text-slate-700"
            >
              <div className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                <User className="w-3.5 h-3.5" strokeWidth={2} />
              </div>
              <div className="flex flex-col text-left">
                <span className="font-semibold text-slate-900 leading-tight">Vikram S.</span>
                <span className="text-[10px] text-slate-500">Demo Account</span>
              </div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-slate-700 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1">
          {navLinks.map((item) => {
            const active = isActive(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium ${
                  active
                    ? "text-[#C82026] bg-red-50 font-semibold"
                    : "text-slate-700 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-3">
                  {Icon && <Icon className="w-4 h-4" strokeWidth={1.75} />}
                  <span>{item.label}</span>
                </div>
                {item.badge !== null ? (
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#C82026] text-white">
                    {item.badge}
                  </span>
                ) : (
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                )}
              </Link>
            );
          })}
          <div className="pt-2 border-t border-slate-100 mt-2">
            <div className="flex items-center gap-3 px-3 py-2 bg-slate-50 rounded-md">
              <div className="w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-700">
                <User className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-900">Vikram S. (Demo Mode)</p>
                <p className="text-[11px] text-slate-500">6 Assets Registered • 2 Expiring Soon</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

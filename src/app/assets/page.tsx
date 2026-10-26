"use client";

import React, { useState, useMemo } from "react";
import { useApp } from "@/context/AppContext";
import { Asset, AssetCategory, WarrantyStatus } from "@/types/asset";
import { getWarrantyStatus } from "@/lib/formatters";
import { AssetStatsBar } from "@/components/assets/AssetStatsBar";
import { AssetCard } from "@/components/assets/AssetCard";
import { AddAssetModal } from "@/components/assets/AddAssetModal";
import { EditAssetModal } from "@/components/assets/EditAssetModal";
import {
  FolderArchive,
  Plus,
  Search,
  Filter,
  Sparkles,
  RotateCcw,
  ShieldCheck
} from "lucide-react";

export default function AssetsDashboardPage() {
  const { assets, deleteAsset } = useApp();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<AssetCategory | "all">("all");
  const [selectedStatus, setSelectedStatus] = useState<WarrantyStatus | "all">("all");
  const [sortBy, setSortBy] = useState<"date_newest" | "price_desc" | "expiry_soon">("expiry_soon");

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingAsset, setEditingAsset] = useState<Asset | null>(null);

  const categories: { id: AssetCategory | "all"; label: string }[] = [
    { id: "all", label: "All Categories" },
    { id: "smartphones", label: "Smartphones" },
    { id: "laptops", label: "Laptops" },
    { id: "appliances", label: "Appliances & TVs" },
    { id: "vehicles", label: "Vehicles" },
    { id: "gadgets", label: "Gadgets" }
  ];

  const statuses: { id: WarrantyStatus | "all"; label: string }[] = [
    { id: "all", label: "All Statuses" },
    { id: "active", label: "Active Only" },
    { id: "expiring_soon", label: "Expiring Soon (<30d)" },
    { id: "expired", label: "Expired" }
  ];

  // Filtering and sorting
  const filteredAssets = useMemo(() => {
    return assets
      .filter((asset) => {
        // Category
        if (selectedCategory !== "all" && asset.category !== selectedCategory) {
          return false;
        }

        // Status
        const status = getWarrantyStatus(asset.warrantyExpiryDate);
        if (selectedStatus !== "all" && status !== selectedStatus) {
          return false;
        }

        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = asset.name.toLowerCase().includes(q);
          const matchBrand = asset.brand.toLowerCase().includes(q);
          const matchModel = asset.model.toLowerCase().includes(q);
          const matchSerial = asset.serialNumberOrImei.toLowerCase().includes(q);
          if (!matchName && !matchBrand && !matchModel && !matchSerial) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "price_desc") {
          return b.purchasePrice - a.purchasePrice;
        }
        if (sortBy === "date_newest") {
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime();
        }
        // expiry_soon
        return new Date(a.warrantyExpiryDate).getTime() - new Date(b.warrantyExpiryDate).getTime();
      });
  }, [assets, selectedCategory, selectedStatus, searchQuery, sortBy]);

  const handleReset = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedStatus("all");
    setSortBy("expiry_soon");
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#C82026] mb-1">
            <FolderArchive className="w-4 h-4" />
            <span>Digital Asset Locker & Warranty Registry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            My Registered Assets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl">
            Keep invoices, serial identifiers (IMEI/VIN), warranties, and scheduled maintenance reminders safe in one unified hub.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-xs transition-colors shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Asset</span>
        </button>
      </div>

      {/* Summary Statistics Strip */}
      <AssetStatsBar assets={assets} />

      {/* Filter and Search Bar */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs space-y-3">
        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-1.5 pb-2 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-2xs"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search, Status and Sort Controls */}
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-1 lg:col-span-2 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by asset name, brand, or IMEI/VIN..."
              className="w-full pl-9 pr-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden focus:border-[#C82026]"
            />
          </div>

          {/* Status Filter */}
          <div>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as WarrantyStatus | "all")}
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden text-slate-700 font-medium"
            >
              {statuses.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Control */}
          <div>
            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(e.target.value as "date_newest" | "price_desc" | "expiry_soon")
              }
              className="w-full px-3 py-2 text-xs border border-slate-200 rounded-md bg-slate-50 focus:bg-white focus:outline-hidden text-slate-700 font-medium"
            >
              <option value="expiry_soon">Sort: Expiry Soonest</option>
              <option value="price_desc">Sort: Highest Valuation (₹)</option>
              <option value="date_newest">Sort: Newest Purchase Date</option>
            </select>
          </div>
        </div>

        {/* Feedback & Count */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
          <span>
            Showing {filteredAssets.length} of {assets.length} registered assets
          </span>
          {(searchQuery || selectedCategory !== "all" || selectedStatus !== "all") && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1 text-[#C82026] hover:underline font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* Asset Cards Grid */}
      {filteredAssets.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <AssetCard
              key={asset.id}
              asset={asset}
              onEdit={(a) => setEditingAsset(a)}
              onDelete={(id) => deleteAsset(id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white border border-slate-200 rounded-lg p-12 text-center max-w-md mx-auto space-y-4">
          <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
            <FolderArchive className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-slate-900">No Assets Found</h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            No assets match your search parameters. Try adjusting the category or status filter, or register a new asset.
          </p>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Register an Asset</span>
          </button>
        </div>
      )}

      {/* Modals */}
      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <EditAssetModal
        asset={editingAsset}
        isOpen={editingAsset !== null}
        onClose={() => setEditingAsset(null)}
      />
    </div>
  );
}

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Asset } from "@/types/asset";
import {
  formatINR,
  formatDate,
  getWarrantyStatus,
  getWarrantyBadgeConfig,
  getDaysUntilExpiry
} from "@/lib/formatters";
import {
  Smartphone,
  Laptop,
  Tv,
  Car,
  Headphones,
  FileText,
  Clock,
  ArrowRight,
  Pencil,
  Trash2,
  AlertTriangle
} from "lucide-react";

interface AssetCardProps {
  asset: Asset;
  onEdit: (asset: Asset) => void;
  onDelete: (assetId: string) => void;
}

export function AssetCard({ asset, onEdit, onDelete }: AssetCardProps) {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const status = getWarrantyStatus(asset.warrantyExpiryDate);
  const badgeConfig = getWarrantyBadgeConfig(status);
  const daysLeft = getDaysUntilExpiry(asset.warrantyExpiryDate);

  const getCategoryIcon = () => {
    switch (asset.category) {
      case "smartphones":
        return Smartphone;
      case "laptops":
        return Laptop;
      case "appliances":
        return Tv;
      case "vehicles":
        return Car;
      default:
        return Headphones;
    }
  };

  const Icon = getCategoryIcon();

  return (
    <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-300 hover:shadow-xs transition-all flex flex-col justify-between">
      <div>
        {/* Top: Icon, Category & Status Badge */}
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-slate-100 text-slate-800 flex items-center justify-center shrink-0 border border-slate-200">
              <Icon className="w-5 h-5" strokeWidth={1.75} />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">
                {asset.brand} • {asset.category}
              </span>
              <h3 className="text-sm font-bold text-slate-900 leading-snug">
                {asset.name}
              </h3>
            </div>
          </div>

          <div className="shrink-0 text-right">
            <span
              className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded border ${badgeConfig.className}`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${badgeConfig.dotClassName}`} />
              <span>{badgeConfig.label}</span>
            </span>
            <span className="text-[10px] text-slate-500 block mt-0.5">
              {daysLeft > 0
                ? `${daysLeft} days remaining`
                : `Expired ${Math.abs(daysLeft)} days ago`}
            </span>
          </div>
        </div>

        {/* Specifications & Financials */}
        <div className="grid grid-cols-2 gap-2 py-2.5 px-3 bg-slate-50 rounded-md border border-slate-100 text-xs mb-3">
          <div>
            <span className="text-[10px] text-slate-500 block">Purchase Value</span>
            <span className="font-extrabold text-slate-900">
              {formatINR(asset.purchasePrice)}
            </span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block">Purchase Date</span>
            <span className="font-medium text-slate-800">
              {formatDate(asset.purchaseDate)}
            </span>
          </div>
          <div className="col-span-2 pt-1 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
            <span className="text-slate-500 truncate max-w-[150px]">
              ID: {asset.serialNumberOrImei}
            </span>
            <span className="text-slate-500 truncate max-w-[150px]">
              Exp: {formatDate(asset.warrantyExpiryDate)}
            </span>
          </div>
        </div>

        {/* Document & Reminder Counters */}
        <div className="flex items-center gap-4 text-xs text-slate-600 pb-3 border-b border-slate-100">
          <div className="flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-[#C82026]" />
            <span>{asset.documents.length} Stored Documents</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>{asset.reminders.length} Reminders</span>
          </div>
        </div>
      </div>

      {/* Action Footer */}
      <div className="pt-3 flex items-center justify-between gap-2">
        {showConfirmDelete ? (
          <div className="flex items-center justify-between w-full bg-red-50 p-2 rounded-md border border-red-200 text-xs">
            <span className="font-semibold text-red-900">Delete asset?</span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => onDelete(asset.id)}
                className="px-2 py-1 rounded bg-red-600 hover:bg-red-700 text-white font-bold"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmDelete(false)}
                className="px-2 py-1 rounded bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onEdit(asset)}
                className="p-1.5 rounded text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
                title="Edit asset parameters"
                aria-label="Edit asset"
              >
                <Pencil className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setShowConfirmDelete(true)}
                className="p-1.5 rounded text-slate-400 hover:text-red-600 hover:bg-slate-100 transition-colors"
                title="Remove asset"
                aria-label="Remove asset"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <Link
              href={`/assets/${asset.id}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-2xs transition-colors"
            >
              <span>View Locker</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

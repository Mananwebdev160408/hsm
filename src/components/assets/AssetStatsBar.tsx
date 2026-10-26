import React from "react";
import { Asset } from "@/types/asset";
import { getWarrantyStatus, formatINR } from "@/lib/formatters";
import { FolderArchive, ShieldCheck, AlertCircle, FileText } from "lucide-react";

interface AssetStatsBarProps {
  assets: Asset[];
}

export function AssetStatsBar({ assets }: AssetStatsBarProps) {
  const totalValue = assets.reduce((sum, item) => sum + item.purchasePrice, 0);

  let activeCount = 0;
  let expiringSoonCount = 0;
  let expiredCount = 0;
  let totalDocs = 0;

  assets.forEach((item) => {
    const status = getWarrantyStatus(item.warrantyExpiryDate);
    if (status === "active") activeCount++;
    else if (status === "expiring_soon") expiringSoonCount++;
    else if (status === "expired") expiredCount++;
    totalDocs += item.documents.length;
  });

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Assets */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Total Assets
          </span>
          <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
            <FolderArchive className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-black text-slate-900 mt-2">{assets.length}</p>
        <span className="text-[11px] text-slate-500 block mt-0.5">
          {formatINR(totalValue)} cataloged value
        </span>
      </div>

      {/* Active Warranties */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
            Active Warranties
          </span>
          <div className="w-8 h-8 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-black text-emerald-700 mt-2">{activeCount}</p>
        <span className="text-[11px] text-slate-500 block mt-0.5">
          Full OEM or extended protection
        </span>
      </div>

      {/* Expiring Soon */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-amber-700 uppercase tracking-wider">
            Expiring Soon
          </span>
          <div className="w-8 h-8 rounded-md bg-amber-50 text-amber-700 border border-amber-200 flex items-center justify-center">
            <AlertCircle className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-black text-amber-700 mt-2">{expiringSoonCount}</p>
        <span className="text-[11px] text-amber-700 font-medium block mt-0.5">
          Action needed within 30 days
        </span>
      </div>

      {/* Stored Documents */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Stored Documents
          </span>
          <div className="w-8 h-8 rounded-md bg-slate-100 text-slate-700 flex items-center justify-center">
            <FileText className="w-4 h-4" />
          </div>
        </div>
        <p className="text-2xl font-black text-slate-900 mt-2">{totalDocs}</p>
        <span className="text-[11px] text-slate-500 block mt-0.5">
          Invoices & warranty agreements
        </span>
      </div>
    </div>
  );
}

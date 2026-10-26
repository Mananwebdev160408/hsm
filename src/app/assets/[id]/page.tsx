"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useApp } from "@/context/AppContext";
import { AssetDocument } from "@/types/asset";
import {
  formatINR,
  formatDate,
  getWarrantyStatus,
  getWarrantyBadgeConfig,
  getDaysUntilExpiry
} from "@/lib/formatters";
import { UploadDocumentModal } from "@/components/assets/UploadDocumentModal";
import { AddReminderModal } from "@/components/assets/AddReminderModal";
import { EditAssetModal } from "@/components/assets/EditAssetModal";
import {
  FolderArchive,
  ArrowLeft,
  FileText,
  Clock,
  ShieldCheck,
  Plus,
  Trash2,
  Pencil,
  CheckCircle2,
  ExternalLink,
  Sparkles
} from "lucide-react";

function AssetDetailsContent() {
  const params = useParams();
  const router = useRouter();
  const assetId = params?.id as string;

  const {
    assets,
    updateAsset,
    deleteAsset,
    deleteDocumentFromAsset,
    toggleReminderStatus,
    deleteReminder,
    plans
  } = useApp();

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<AssetDocument | null>(null);

  const asset = assets.find((a) => a.id === assetId);

  if (!asset) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-4">
        <div className="w-12 h-12 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto">
          <FolderArchive className="w-6 h-6" />
        </div>
        <h2 className="text-xl font-bold text-slate-900">Asset Not Found</h2>
        <p className="text-xs text-slate-500">
          This asset may have been removed or does not exist in your registered asset locker.
        </p>
        <Link
          href="/assets"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C82026] text-white text-xs font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Asset Locker</span>
        </Link>
      </div>
    );
  }

  const status = getWarrantyStatus(asset.warrantyExpiryDate);
  const badgeConfig = getWarrantyBadgeConfig(status);
  const daysLeft = getDaysUntilExpiry(asset.warrantyExpiryDate);

  const handleDeleteAsset = () => {
    if (confirm(`Are you sure you want to remove "${asset.name}" from your locker?`)) {
      deleteAsset(asset.id);
      router.push("/assets");
    }
  };

  const handleLinkPlan = (planId: string) => {
    const selectedPlan = plans.find((p) => p.id === planId);
    if (selectedPlan) {
      updateAsset(asset.id, {
        linkedInsurancePlanId: selectedPlan.id,
        linkedInsurancePlanName: `${selectedPlan.planName} (${selectedPlan.providerCode})`
      });
    } else {
      updateAsset(asset.id, {
        linkedInsurancePlanId: undefined,
        linkedInsurancePlanName: undefined
      });
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs text-slate-500">
        <Link href="/" className="hover:text-slate-900">
          Home
        </Link>
        <span>/</span>
        <Link href="/assets" className="hover:text-slate-900">
          My Assets
        </Link>
        <span>/</span>
        <span className="font-semibold text-slate-900">{asset.name}</span>
      </div>

      {/* Main Asset Header Card */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-slate-100">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                {asset.brand} • {asset.category}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-2 py-0.5 rounded border ${badgeConfig.className}`}
              >
                <span className={`w-1.5 h-1.5 rounded-full ${badgeConfig.dotClassName}`} />
                <span>{badgeConfig.label}</span>
              </span>
            </div>

            <h1 className="text-2xl font-extrabold text-slate-900 leading-tight">
              {asset.name}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600 pt-1">
              <span>
                <strong>Model:</strong> {asset.model}
              </span>
              <span>•</span>
              <span>
                <strong>Serial / IMEI / VIN:</strong> {asset.serialNumberOrImei}
              </span>
              <span>•</span>
              <span>
                <strong>Retailer:</strong> {asset.retailer}
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => setIsEditModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Asset</span>
            </button>
            <button
              type="button"
              onClick={handleDeleteAsset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-md bg-white border border-red-200 hover:bg-red-50 text-red-600 text-xs font-semibold transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Remove</span>
            </button>
          </div>
        </div>

        {/* Financial & Warranty Summary Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
            <span className="text-slate-500 block">Purchase Value</span>
            <span className="text-lg font-black text-slate-900 mt-0.5 block">
              {formatINR(asset.purchasePrice)}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Purchased on {formatDate(asset.purchaseDate)}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
            <span className="text-slate-500 block">Warranty Provider</span>
            <span className="text-sm font-bold text-slate-900 mt-0.5 block truncate">
              {asset.warrantyProvider}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              Valid until {formatDate(asset.warrantyExpiryDate)}
            </span>
          </div>

          <div className="p-3 bg-slate-50 rounded-md border border-slate-100">
            <span className="text-slate-500 block">Countdown Status</span>
            <span
              className={`text-sm font-bold mt-0.5 block ${
                daysLeft > 30
                  ? "text-emerald-700"
                  : daysLeft > 0
                  ? "text-amber-700"
                  : "text-slate-600"
              }`}
            >
              {daysLeft > 0
                ? `${daysLeft} days until expiration`
                : `Expired ${Math.abs(daysLeft)} days ago`}
            </span>
            <span className="text-[11px] text-slate-500 mt-0.5 block">
              {daysLeft > 0 && daysLeft <= 30
                ? "Eligible for extended care renewal"
                : "Standard coverage period"}
            </span>
          </div>
        </div>
      </div>

      {/* Grid: Document Locker & Reminders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Columns: Attached Documents */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-slate-200 rounded-lg p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C82026]" />
                <h2 className="text-base font-bold text-slate-900">
                  Document Locker ({asset.documents.length})
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setIsUploadModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-2xs transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Attach Invoice / Warranty</span>
              </button>
            </div>

            {asset.documents.length > 0 ? (
              <div className="space-y-3">
                {asset.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-4 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-white transition-colors space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <div className="w-9 h-9 rounded-md bg-white border border-slate-200 text-[#C82026] flex items-center justify-center shrink-0">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900">
                            {doc.title}
                          </h4>
                          <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-0.5">
                            <span className="capitalize font-medium text-slate-700">
                              {doc.type.replace("_", " ")}
                            </span>
                            <span>•</span>
                            <span>{doc.fileName}</span>
                            <span>•</span>
                            <span>{doc.fileSize}</span>
                            <span>•</span>
                            <span>Uploaded {formatDate(doc.uploadDate)}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          onClick={() => setPreviewDoc(doc)}
                          className="px-2.5 py-1 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-100 rounded transition-colors"
                        >
                          Inspect
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteDocumentFromAsset(asset.id, doc.id)}
                          className="p-1 text-slate-400 hover:text-red-600 rounded transition-colors"
                          title="Detach document"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Extracted Metadata Card */}
                    {doc.extractedData && (
                      <div className="bg-white rounded-md p-2.5 border border-slate-200/80 text-[11px] grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-600">
                        <div>
                          <span className="text-slate-400 block text-[10px]">Invoice Ref</span>
                          <span className="font-semibold text-slate-800">
                            {doc.extractedData.invoiceNumber || "N/A"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Retailer</span>
                          <span className="font-semibold text-slate-800 truncate block">
                            {doc.extractedData.retailer || "Verified Store"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Tax Paid</span>
                          <span className="font-semibold text-slate-800">
                            {doc.extractedData.taxAmount || "18% GST"}
                          </span>
                        </div>
                        <div>
                          <span className="text-slate-400 block text-[10px]">Validation</span>
                          <span className="text-emerald-700 font-semibold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-[#F47721]" />
                            Smart OCR Verified
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-slate-50 rounded-lg border border-dashed border-slate-200 space-y-2">
                <FileText className="w-8 h-8 text-slate-400 mx-auto" />
                <p className="text-xs font-bold text-slate-700">No Documents Attached</p>
                <p className="text-[11px] text-slate-500">
                  Attach your original purchase receipt, tax invoice, or warranty card to complete this asset profile.
                </p>
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#C82026] text-white text-xs font-semibold"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Attach Document Now</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Service Reminders & Linked Insurance */}
        <div className="space-y-6">
          {/* Linked Insurance Plan Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#C82026]" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Associated Insurance Cover
                </h3>
              </div>
            </div>

            {asset.linkedInsurancePlanName ? (
              <div className="bg-slate-50 border border-slate-200 rounded-md p-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">
                    {asset.linkedInsurancePlanName}
                  </span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                    Linked
                  </span>
                </div>
                <p className="text-[11px] text-slate-500">
                  Asset invoice and serial identifiers are linked for rapid cashless claims.
                </p>
                <div className="pt-2 flex items-center justify-between">
                  <Link
                    href={`/plan/${asset.linkedInsurancePlanId || "health-01"}`}
                    className="text-xs font-semibold text-[#C82026] hover:underline flex items-center gap-1"
                  >
                    <span>View Policy Details</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleLinkPlan("")}
                    className="text-[11px] text-slate-400 hover:text-red-600"
                  >
                    Unlink
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2 text-xs">
                <p className="text-slate-500 text-[11px] leading-relaxed">
                  Link an active insurance policy to associate this asset with verified coverage.
                </p>
                <select
                  defaultValue=""
                  onChange={(e) => {
                    if (e.target.value) handleLinkPlan(e.target.value);
                  }}
                  className="w-full px-2.5 py-1.5 text-xs border border-slate-300 rounded-md bg-white focus:outline-hidden"
                >
                  <option value="" disabled>
                    Select an Insurance Policy to Link...
                  </option>
                  {plans.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.planName} ({p.providerCode})
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>

          {/* Service & Maintenance Reminders */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-xs space-y-3">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#F47721]" />
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Service Reminders ({asset.reminders.length})
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setIsReminderModalOpen(true)}
                className="text-[11px] font-semibold text-[#C82026] hover:underline flex items-center gap-1"
              >
                <Plus className="w-3 h-3" />
                <span>Add Reminder</span>
              </button>
            </div>

            {asset.reminders.length > 0 ? (
              <div className="space-y-2.5">
                {asset.reminders.map((rem) => {
                  const isCompleted = rem.status === "completed";
                  return (
                    <div
                      key={rem.id}
                      className={`p-2.5 rounded-md border text-xs flex items-start justify-between gap-2 transition-colors ${
                        isCompleted
                          ? "bg-slate-50 border-slate-200 text-slate-400 line-through"
                          : "bg-amber-50/50 border-amber-200 text-slate-800"
                      }`}
                    >
                      <div className="flex items-start gap-2">
                        <input
                          type="checkbox"
                          checked={isCompleted}
                          onChange={() => toggleReminderStatus(asset.id, rem.id)}
                          className="mt-0.5 rounded border-slate-300 text-[#C82026]"
                        />
                        <div>
                          <p className={`font-bold ${isCompleted ? "text-slate-400" : "text-slate-900"}`}>
                            {rem.title}
                          </p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 mt-0.5">
                            <span>Due: {formatDate(rem.dueDate)}</span>
                            <span>•</span>
                            <span>{rem.category}</span>
                          </div>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => deleteReminder(asset.id, rem.id)}
                        className="text-slate-400 hover:text-red-600 p-1"
                        title="Dismiss reminder"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-4 text-xs text-slate-500">
                <p>No active service or warranty reminders.</p>
                <button
                  type="button"
                  onClick={() => setIsReminderModalOpen(true)}
                  className="text-[#C82026] font-semibold text-xs mt-1 hover:underline inline-block"
                >
                  + Add First Reminder
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modals */}
      <UploadDocumentModal
        assetId={asset.id}
        assetName={asset.name}
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
      />

      <AddReminderModal
        assetId={asset.id}
        assetName={asset.name}
        isOpen={isReminderModalOpen}
        onClose={() => setIsReminderModalOpen(false)}
      />

      <EditAssetModal
        asset={asset}
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

      {/* Document Inspector Modal */}
      {previewDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-[#C82026]" />
                <h3 className="text-sm font-bold text-slate-900">{previewDoc.title}</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewDoc(null)}
                className="text-slate-400 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs space-y-2">
              <p><strong>File Name:</strong> {previewDoc.fileName}</p>
              <p><strong>Size:</strong> {previewDoc.fileSize}</p>
              <p><strong>Type:</strong> {previewDoc.type.replace("_", " ")}</p>
              <p><strong>Upload Date:</strong> {formatDate(previewDoc.uploadDate)}</p>
              {previewDoc.extractedData && (
                <div className="pt-2 border-t border-slate-200 space-y-1">
                  <p><strong>Invoice Number:</strong> {previewDoc.extractedData.invoiceNumber}</p>
                  <p><strong>Retailer:</strong> {previewDoc.extractedData.retailer}</p>
                  <p><strong>Tax Breakdown:</strong> {previewDoc.extractedData.taxAmount}</p>
                  <p><strong>Warranty Validity:</strong> {previewDoc.extractedData.warrantyTermMonths} Months</p>
                </div>
              )}
            </div>

            <div className="p-2.5 bg-emerald-50 rounded border border-emerald-200 text-[11px] text-emerald-800 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Encrypted Document Preview • Stored securely in your BillBazaar Asset Vault.</span>
            </div>

            <button
              type="button"
              onClick={() => setPreviewDoc(null)}
              className="w-full py-2 rounded-md bg-slate-900 text-white text-xs font-semibold"
            >
              Close Inspector
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AssetDetailsPage() {
  return (
    <Suspense
      fallback={
        <div className="max-w-7xl mx-auto px-4 py-12 text-center text-xs text-slate-500">
          Loading asset profile...
        </div>
      }
    >
      <AssetDetailsContent />
    </Suspense>
  );
}

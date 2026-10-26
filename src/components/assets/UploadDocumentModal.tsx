"use client";

import React, { useState } from "react";
import { AssetDocument } from "@/types/asset";
import { useApp } from "@/context/AppContext";
import {
  Upload,
  X,
  FileText,
  CheckCircle2,
  AlertCircle,
  FileCode,
  Sparkles
} from "lucide-react";

interface UploadDocumentModalProps {
  assetId: string;
  assetName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function UploadDocumentModal({
  assetId,
  assetName,
  isOpen,
  onClose
}: UploadDocumentModalProps) {
  const { addDocumentToAsset } = useApp();

  const [docTitle, setDocTitle] = useState("");
  const [docType, setDocType] = useState<AssetDocument["type"]>("invoice");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileSizeStr, setFileSizeStr] = useState("320 KB");
  const [retailer, setRetailer] = useState("Authorized Retail Store");
  const [invoiceNumber, setInvoiceNumber] = useState(`INV-${Math.floor(100000 + Math.random() * 900000)}`);
  const [isSimulatingExtract, setIsSimulatingExtract] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const kb = Math.round(file.size / 1024);
      setFileSizeStr(`${kb > 1024 ? (kb / 1024).toFixed(1) + " MB" : kb + " KB"}`);
      if (!docTitle) {
        setDocTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
      // Trigger short simulated extraction UI effect
      setIsSimulatingExtract(true);
      setTimeout(() => {
        setIsSimulatingExtract(false);
      }, 700);
    }
  };

  const handleUseSample = (sampleType: "invoice" | "warranty") => {
    if (sampleType === "invoice") {
      setDocTitle("Retail GST Tax Invoice");
      setDocType("invoice");
      setSelectedFileName("Sample_Retail_GST_Invoice.pdf");
      setFileSizeStr("420 KB");
      setRetailer("Croma Electronics - Official Invoice");
      setInvoiceNumber("CR-IND-94819");
    } else {
      setDocTitle("Extended Care Certificate");
      setDocType("warranty_card");
      setSelectedFileName("Warranty_Agreement_Care_2026.pdf");
      setFileSizeStr("210 KB");
      setRetailer("OEM Authorized Warranty Service");
      setInvoiceNumber("WARR-EXT-2026-88");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!docTitle.trim()) {
      setError("Please specify a document title.");
      return;
    }
    const finalFileName = selectedFileName.trim() || `${docTitle.trim().replace(/\s+/g, "_")}.pdf`;

    addDocumentToAsset(assetId, {
      title: docTitle.trim(),
      type: docType,
      fileName: finalFileName,
      fileSize: fileSizeStr,
      retailer: retailer.trim(),
      invoiceNumber: invoiceNumber.trim()
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-md w-full p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-md bg-red-50 text-[#C82026] border border-red-100 flex items-center justify-center">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Attach Asset Document
            </h3>
            <p className="text-xs text-slate-500 truncate max-w-[260px]">
              For: {assetName}
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-3 p-2.5 rounded bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          {/* File input */}
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Select Document File (PDF, PNG, JPG)
            </label>
            <div className="border-2 border-dashed border-slate-200 hover:border-slate-300 rounded-lg p-3 text-center bg-slate-50/70 cursor-pointer">
              <input
                type="file"
                id="file-upload"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center justify-center"
              >
                <FileText className="w-6 h-6 text-slate-400 mb-1" />
                <span className="font-semibold text-slate-700">
                  {selectedFileName ? selectedFileName : "Click to select local file"}
                </span>
                <span className="text-[11px] text-slate-500">
                  {selectedFileName ? fileSizeStr : "Simulated client-side storage"}
                </span>
              </label>
            </div>
          </div>

          {/* Quick preset buttons */}
          <div className="flex items-center justify-between text-[11px] text-slate-500">
            <span>Or load preset sample document:</span>
            <div className="flex gap-1.5">
              <button
                type="button"
                onClick={() => handleUseSample("invoice")}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700"
              >
                Sample Invoice
              </button>
              <button
                type="button"
                onClick={() => handleUseSample("warranty")}
                className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 font-semibold text-slate-700"
              >
                Warranty Card
              </button>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Document Display Title *
            </label>
            <input
              type="text"
              required
              value={docTitle}
              onChange={(e) => setDocTitle(e.target.value)}
              placeholder="e.g. Croma Official GST Invoice"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#C82026]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Document Classification
              </label>
              <select
                value={docType}
                onChange={(e) => setDocType(e.target.value as AssetDocument["type"])}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              >
                <option value="invoice">Purchase Tax Invoice</option>
                <option value="warranty_card">Warranty Card / Care Plan</option>
                <option value="insurance_policy">Insurance Policy Schedule</option>
                <option value="service_receipt">Authorized Service Slip</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Invoice / Reference ID
              </label>
              <input
                type="text"
                value={invoiceNumber}
                onChange={(e) => setInvoiceNumber(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          {/* Simulated Extraction Feedback */}
          <div className="bg-amber-50/80 border border-amber-200 rounded-md p-3 space-y-1.5">
            <div className="flex items-center gap-1.5 text-amber-900 font-bold text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-[#F47721]" />
              <span>
                {isSimulatingExtract
                  ? "Simulating OCR field extraction..."
                  : "Simulated Extraction Preview"}
              </span>
            </div>
            <p className="text-[10px] text-amber-800 leading-relaxed">
              No cloud AI or remote servers contacted. The document metadata will be stored in your browser session to demonstrate BillBazaar&apos;s asset locker flow.
            </p>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Attach to Asset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState } from "react";
import { Asset, AssetCategory } from "@/types/asset";
import { useApp } from "@/context/AppContext";
import { X, Plus, FolderPlus, AlertCircle } from "lucide-react";

interface AddAssetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAssetAdded?: (asset: Asset) => void;
}

export function AddAssetModal({ isOpen, onClose, onAssetAdded }: AddAssetModalProps) {
  const { addAsset } = useApp();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<AssetCategory>("smartphones");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumberOrImei, setSerialNumberOrImei] = useState("");
  const [purchaseDate, setPurchaseDate] = useState("2026-01-15");
  const [purchasePrice, setPurchasePrice] = useState("49999");
  const [retailer, setRetailer] = useState("Amazon India / Official Store");
  const [warrantyProvider, setWarrantyProvider] = useState("1-Year Standard OEM Warranty");
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState("2027-01-14");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Please specify the asset name.");
      return;
    }
    if (!brand.trim()) {
      setError("Please enter the brand name.");
      return;
    }
    if (!purchasePrice || isNaN(Number(purchasePrice))) {
      setError("Please enter a valid numeric purchase price.");
      return;
    }
    if (!warrantyExpiryDate) {
      setError("Please choose a warranty expiration date.");
      return;
    }

    const created = addAsset({
      name: name.trim(),
      category,
      brand: brand.trim(),
      model: model.trim() || name.trim(),
      serialNumberOrImei: serialNumberOrImei.trim() || `SN-${Math.floor(10000000 + Math.random() * 90000000)}`,
      purchaseDate,
      purchasePrice: Number(purchasePrice),
      retailer: retailer.trim() || "Retail Store",
      warrantyProvider: warrantyProvider.trim() || "Manufacturer Standard Warranty",
      warrantyExpiryDate
    });

    if (onAssetAdded) {
      onAssetAdded(created);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-lg w-full p-6 relative max-h-[90vh] overflow-y-auto">
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
            <FolderPlus className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Register Asset into Locker
            </h3>
            <p className="text-xs text-slate-500">
              Track purchase details, warranties, and proof of ownership
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Asset Display Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. OnePlus 12 5G (256GB, Emerald Green)"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#C82026]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as AssetCategory)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              >
                <option value="smartphones">Smartphone</option>
                <option value="laptops">Laptop / PC</option>
                <option value="appliances">Home Appliance / TV</option>
                <option value="vehicles">Vehicle / Two-Wheeler</option>
                <option value="gadgets">Audio / Wearable Gadget</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Brand / Manufacturer *
              </label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                placeholder="e.g. OnePlus, Sony, Apple"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Model Number / Variant
              </label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. CPH2573"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Serial Number / IMEI / VIN
              </label>
              <input
                type="text"
                value={serialNumberOrImei}
                onChange={(e) => setSerialNumberOrImei(e.target.value)}
                placeholder="e.g. 864291048102914"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Purchase Price (₹) *
              </label>
              <input
                type="number"
                required
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                placeholder="49999"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Purchase Date *
              </label>
              <input
                type="date"
                required
                value={purchaseDate}
                onChange={(e) => setPurchaseDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Store / Retailer Name
            </label>
            <input
              type="text"
              value={retailer}
              onChange={(e) => setRetailer(e.target.value)}
              placeholder="e.g. Croma Electronics, Amazon India, Apple BKC"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Warranty Provider
              </label>
              <input
                type="text"
                value={warrantyProvider}
                onChange={(e) => setWarrantyProvider(e.target.value)}
                placeholder="e.g. Manufacturer 1-Year"
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Warranty Expiry Date *
              </label>
              <input
                type="date"
                required
                value={warrantyExpiryDate}
                onChange={(e) => setWarrantyExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
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
              <Plus className="w-3.5 h-3.5" />
              <span>Register Asset</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

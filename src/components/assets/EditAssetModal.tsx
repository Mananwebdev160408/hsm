"use client";

import React, { useState, useEffect } from "react";
import { Asset, AssetCategory } from "@/types/asset";
import { useApp } from "@/context/AppContext";
import { X, Save, AlertCircle } from "lucide-react";

interface EditAssetModalProps {
  asset: Asset | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EditAssetModal({ asset, isOpen, onClose }: EditAssetModalProps) {
  const { updateAsset } = useApp();

  const [name, setName] = useState("");
  const [category, setCategory] = useState<AssetCategory>("smartphones");
  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [serialNumberOrImei, setSerialNumberOrImei] = useState("");
  const [purchasePrice, setPurchasePrice] = useState("");
  const [warrantyProvider, setWarrantyProvider] = useState("");
  const [warrantyExpiryDate, setWarrantyExpiryDate] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (asset) {
      setName(asset.name);
      setCategory(asset.category);
      setBrand(asset.brand);
      setModel(asset.model);
      setSerialNumberOrImei(asset.serialNumberOrImei);
      setPurchasePrice(String(asset.purchasePrice));
      setWarrantyProvider(asset.warrantyProvider);
      setWarrantyExpiryDate(asset.warrantyExpiryDate);
      setError(null);
    }
  }, [asset]);

  if (!isOpen || !asset) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("Asset name is required.");
      return;
    }
    if (!purchasePrice || isNaN(Number(purchasePrice))) {
      setError("Please provide a valid numeric price.");
      return;
    }

    updateAsset(asset.id, {
      name: name.trim(),
      category,
      brand: brand.trim(),
      model: model.trim(),
      serialNumberOrImei: serialNumberOrImei.trim(),
      purchasePrice: Number(purchasePrice),
      warrantyProvider: warrantyProvider.trim(),
      warrantyExpiryDate
    });

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

        <h3 className="text-base font-bold text-slate-900 mb-1">
          Edit Asset Specifications
        </h3>
        <p className="text-xs text-slate-500 mb-4 pb-3 border-b border-slate-100">
          Update identifiers, warranty details, and valuation
        </p>

        {error && (
          <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Asset Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#C82026]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Category</label>
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
              <label className="block font-bold text-slate-700 mb-1">Brand</label>
              <input
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Model</label>
              <input
                type="text"
                value={model}
                onChange={(e) => setModel(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Serial / IMEI / VIN</label>
              <input
                type="text"
                value={serialNumberOrImei}
                onChange={(e) => setSerialNumberOrImei(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Purchase Price (₹)</label>
              <input
                type="number"
                required
                value={purchasePrice}
                onChange={(e) => setPurchasePrice(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Warranty Expiry Date</label>
              <input
                type="date"
                required
                value={warrantyExpiryDate}
                onChange={(e) => setWarrantyExpiryDate(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">Warranty Provider</label>
            <input
              type="text"
              value={warrantyProvider}
              onChange={(e) => setWarrantyProvider(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
            />
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
              <Save className="w-3.5 h-3.5" />
              <span>Save Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

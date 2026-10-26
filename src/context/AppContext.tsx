"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { InsurancePlan } from "@/types/insurance";
import { Asset, AssetDocument, ServiceReminder } from "@/types/asset";
import { MOCK_INSURANCE_PLANS } from "@/data/mockPlans";
import { MOCK_ASSETS } from "@/data/mockAssets";

interface AppContextType {
  plans: InsurancePlan[];
  comparePlanIds: string[];
  addToCompare: (planId: string) => { success: boolean; message: string };
  removeFromCompare: (planId: string) => void;
  clearCompare: () => void;
  isPlanInCompare: (planId: string) => boolean;
  selectedDemoPlan: InsurancePlan | null;
  setSelectedDemoPlan: (plan: InsurancePlan | null) => void;
  
  assets: Asset[];
  addAsset: (assetData: Omit<Asset, "id" | "documents" | "reminders">) => Asset;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  deleteAsset: (id: string) => void;
  addDocumentToAsset: (assetId: string, documentData: {
    title: string;
    type: AssetDocument["type"];
    fileName: string;
    fileSize: string;
    retailer?: string;
    invoiceNumber?: string;
  }) => void;
  deleteDocumentFromAsset: (assetId: string, documentId: string) => void;
  addReminderToAsset: (assetId: string, reminderData: {
    title: string;
    dueDate: string;
    priority: ServiceReminder["priority"];
    category: string;
  }) => void;
  toggleReminderStatus: (assetId: string, reminderId: string) => void;
  deleteReminder: (assetId: string, reminderId: string) => void;
  
  notification: string | null;
  setNotification: (msg: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEY_COMPARE = "billbazaar_compare_ids";
const STORAGE_KEY_ASSETS = "billbazaar_assets";

export function AppProvider({ children }: { children: ReactNode }) {
  const [plans] = useState<InsurancePlan[]>(MOCK_INSURANCE_PLANS);
  const [comparePlanIds, setComparePlanIds] = useState<string[]>([]);
  const [selectedDemoPlan, setSelectedDemoPlan] = useState<InsurancePlan | null>(null);
  const [assets, setAssets] = useState<Asset[]>(MOCK_ASSETS);
  const [notification, setNotification] = useState<string | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Sync from localStorage after hydration
  useEffect(() => {
    try {
      const savedCompare = localStorage.getItem(STORAGE_KEY_COMPARE);
      if (savedCompare) {
        const parsed = JSON.parse(savedCompare);
        if (Array.isArray(parsed)) {
          setComparePlanIds(parsed);
        }
      }

      const savedAssets = localStorage.getItem(STORAGE_KEY_ASSETS);
      if (savedAssets) {
        const parsed = JSON.parse(savedAssets);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAssets(parsed);
        }
      }
    } catch {
      // Graceful fallback to default mock data
    } finally {
      setIsHydrated(true);
    }
  }, []);

  // Persist compare plan IDs
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_COMPARE, JSON.stringify(comparePlanIds));
    } catch {
      // Storage unavailable or full
    }
  }, [comparePlanIds, isHydrated]);

  // Persist assets
  useEffect(() => {
    if (!isHydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY_ASSETS, JSON.stringify(assets));
    } catch {
      // Storage unavailable or full
    }
  }, [assets, isHydrated]);

  // Toast auto-clear
  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => {
      setNotification(null);
    }, 3500);
    return () => clearTimeout(timer);
  }, [notification]);

  const addToCompare = (planId: string) => {
    if (comparePlanIds.includes(planId)) {
      return { success: false, message: "Plan is already in comparison table." };
    }
    if (comparePlanIds.length >= 3) {
      return { success: false, message: "Maximum 3 plans can be compared simultaneously." };
    }
    const updated = [...comparePlanIds, planId];
    setComparePlanIds(updated);
    setNotification("Plan added to side-by-side comparison matrix.");
    return { success: true, message: "Plan added to comparison." };
  };

  const removeFromCompare = (planId: string) => {
    setComparePlanIds((prev) => prev.filter((id) => id !== planId));
    setNotification("Plan removed from comparison matrix.");
  };

  const clearCompare = () => {
    setComparePlanIds([]);
    setNotification("Comparison matrix cleared.");
  };

  const isPlanInCompare = (planId: string) => {
    return comparePlanIds.includes(planId);
  };

  const addAsset = (assetData: Omit<Asset, "id" | "documents" | "reminders">): Asset => {
    const newId = `asset-${Date.now()}`;
    const newAsset: Asset = {
      ...assetData,
      id: newId,
      documents: [],
      reminders: []
    };
    setAssets((prev) => [newAsset, ...prev]);
    setNotification(`"${newAsset.name}" registered into your Asset Locker.`);
    return newAsset;
  };

  const updateAsset = (id: string, updates: Partial<Asset>) => {
    setAssets((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updates } : item))
    );
    setNotification("Asset specifications updated successfully.");
  };

  const deleteAsset = (id: string) => {
    setAssets((prev) => prev.filter((item) => item.id !== id));
    setNotification("Asset removed from locker.");
  };

  const addDocumentToAsset = (
    assetId: string,
    documentData: {
      title: string;
      type: AssetDocument["type"];
      fileName: string;
      fileSize: string;
      retailer?: string;
      invoiceNumber?: string;
    }
  ) => {
    const newDoc: AssetDocument = {
      id: `doc-${Date.now()}`,
      title: documentData.title,
      type: documentData.type,
      fileName: documentData.fileName,
      fileSize: documentData.fileSize,
      uploadDate: new Date().toISOString().split("T")[0],
      extractedData: {
        invoiceNumber: documentData.invoiceNumber || `INV-${Math.floor(100000 + Math.random() * 900000)}`,
        retailer: documentData.retailer || "Retailer Verified",
        taxAmount: "₹2,450 (18% GST)",
        warrantyTermMonths: 12,
        extractedVia: "BillBazaar Smart Optical Engine (Simulated)"
      }
    };

    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== assetId) return asset;
        return {
          ...asset,
          documents: [newDoc, ...asset.documents]
        };
      })
    );
    setNotification(`Document "${documentData.title}" attached to asset.`);
  };

  const deleteDocumentFromAsset = (assetId: string, documentId: string) => {
    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== assetId) return asset;
        return {
          ...asset,
          documents: asset.documents.filter((d) => d.id !== documentId)
        };
      })
    );
    setNotification("Document detached from asset.");
  };

  const addReminderToAsset = (
    assetId: string,
    reminderData: {
      title: string;
      dueDate: string;
      priority: ServiceReminder["priority"];
      category: string;
    }
  ) => {
    const newReminder: ServiceReminder = {
      id: `rem-${Date.now()}`,
      title: reminderData.title,
      dueDate: reminderData.dueDate,
      priority: reminderData.priority,
      category: reminderData.category,
      status: "pending"
    };

    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== assetId) return asset;
        return {
          ...asset,
          reminders: [...asset.reminders, newReminder]
        };
      })
    );
    setNotification(`Service reminder scheduled for ${reminderData.dueDate}.`);
  };

  const toggleReminderStatus = (assetId: string, reminderId: string) => {
    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== assetId) return asset;
        return {
          ...asset,
          reminders: asset.reminders.map((rem) =>
            rem.id === reminderId
              ? { ...rem, status: rem.status === "completed" ? "pending" : "completed" }
              : rem
          )
        };
      })
    );
  };

  const deleteReminder = (assetId: string, reminderId: string) => {
    setAssets((prev) =>
      prev.map((asset) => {
        if (asset.id !== assetId) return asset;
        return {
          ...asset,
          reminders: asset.reminders.filter((rem) => rem.id !== reminderId)
        };
      })
    );
    setNotification("Reminder dismissed.");
  };

  return (
    <AppContext.Provider
      value={{
        plans,
        comparePlanIds,
        addToCompare,
        removeFromCompare,
        clearCompare,
        isPlanInCompare,
        selectedDemoPlan,
        setSelectedDemoPlan,
        assets,
        addAsset,
        updateAsset,
        deleteAsset,
        addDocumentToAsset,
        deleteDocumentFromAsset,
        addReminderToAsset,
        toggleReminderStatus,
        deleteReminder,
        notification,
        setNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}

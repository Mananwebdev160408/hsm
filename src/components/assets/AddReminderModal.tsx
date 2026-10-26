"use client";

import React, { useState } from "react";
import { ServiceReminder } from "@/types/asset";
import { useApp } from "@/context/AppContext";
import { Bell, X, Calendar, AlertCircle } from "lucide-react";

interface AddReminderModalProps {
  assetId: string;
  assetName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function AddReminderModal({
  assetId,
  assetName,
  isOpen,
  onClose
}: AddReminderModalProps) {
  const { addReminderToAsset } = useApp();

  const [title, setTitle] = useState("");
  const [dueDate, setDueDate] = useState("2026-11-25");
  const [priority, setPriority] = useState<ServiceReminder["priority"]>("medium");
  const [category, setCategory] = useState("Periodic Maintenance");
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setError("Please describe the reminder.");
      return;
    }
    if (!dueDate) {
      setError("Please pick a due date.");
      return;
    }

    addReminderToAsset(assetId, {
      title: title.trim(),
      dueDate,
      priority,
      category
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl border border-slate-200 shadow-2xl max-w-sm w-full p-6 relative">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
          <div className="w-10 h-10 rounded-md bg-amber-50 text-[#F47721] border border-amber-200 flex items-center justify-center">
            <Bell className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Schedule Service Reminder
            </h3>
            <p className="text-xs text-slate-500 truncate max-w-[200px]">
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

        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Reminder Description *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 15,000 km Authorized Service"
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden focus:border-[#C82026]"
            />
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Due Date *
            </label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) =>
                  setPriority(e.target.value as ServiceReminder["priority"])
                }
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-hidden"
              >
                <option value="Periodic Maintenance">Maintenance</option>
                <option value="Warranty Renewal">Warranty Renewal</option>
                <option value="Safety Inspection">Inspection</option>
                <option value="Battery Diagnostics">Battery Check</option>
              </select>
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
              className="px-4 py-2 rounded-md bg-[#C82026] hover:bg-[#a8181e] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              Set Reminder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react"; // Added state for button feedback
import { College } from "@/types";

interface Props {
  colleges: College[];
  onRemove: (id: string) => void;
  onClear: () => void;
}

export default function CompareBar({ colleges, onRemove, onClear }: Props) {
  const [saving, setSaving] = useState(false);

  if (colleges.length === 0) return null;

  const handleSaveComparison = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/user/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeIds: colleges.map(c => c.id) }),
      });
      
      if (response.ok) {
        alert("Comparison saved successfully!");
      } else {
        alert("Failed to save. Please ensure you are logged in.");
      }
    } catch (error) {
      console.error("Error saving comparison:", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl p-4 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1 overflow-x-auto">
          {colleges.map((college) => (
            <div key={college.id} className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg shrink-0">
              <span className="font-medium text-sm truncate max-w-[150px]">{college.name}</span>
              <button onClick={() => onRemove(college.id)} className="text-gray-400 hover:text-red-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
            </div>
          ))}
        </div>

        <div className="flex items-center gap-3">
          {colleges.length >= 1 && (
            <button
              onClick={handleSaveComparison}
              disabled={saving}
              className="text-sm font-medium text-blue-600 hover:text-blue-800 underline"
            >
              {saving ? "Saving..." : "Save Comparison"}
            </button>
          )}
          <button onClick={onClear} className="text-gray-500 hover:text-gray-700 text-sm">Clear</button>
          <Link
            href={`/compare?colleges=${colleges.map((c) => c.slug).join(",")}`}
            className={`px-6 py-2 rounded-lg font-medium ${
              colleges.length >= 2 ? "bg-blue-600 text-white hover:bg-blue-700" : "bg-gray-200 text-gray-400 cursor-not-allowed"
            }`}
          >
            Compare ({colleges.length})
          </Link>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { College } from "@/types";

export default function ComparePage() {
  const searchParams = useSearchParams();
  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const slugs = searchParams.get("colleges");
    if (slugs) {
      fetch(`/api/colleges/compare?slugs=${slugs}`)
        .then((res) => res.json())
        .then((data) => {
          setColleges(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [searchParams]);

  const handleSaveComparison = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/user/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeIds: colleges.map((c) => c.id) }),
      });
      if (response.ok) {
        alert("Comparison saved successfully!");
      } else {
        alert("Failed to save. Please ensure you are logged in.");
      }
    } catch (error) {
      console.error("Error saving:", error);
    } finally {
      setSaving(false);
    }
  };

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-48 mb-8" />
          <div className="h-96 bg-gray-200 rounded" />
        </div>
      </div>
    );
  }

  if (colleges.length < 2) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Compare Colleges</h1>
        <p className="text-gray-500 mb-6">Select 2-3 colleges to compare them side by side.</p>
        <a href="/colleges" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
          Browse Colleges
        </a>
      </div>
    );
  }

  const rows = [
    { label: "Location", getValue: (c: College) => `${c.city}, ${c.state}` },
    { label: "Type", getValue: (c: College) => c.type },
    { label: "Rating", getValue: (c: College) => `${c.rating.toFixed(1)} / 5` },
    { label: "Annual Fees", getValue: (c: College) => formatCurrency(c.fees) },
    {
      label: "Avg. Package",
      getValue: (c: any) => c.placements?.[0] ? formatCurrency(c.placements[0].averagePackage) : "—",
    },
    {
      label: "Highest Package",
      getValue: (c: any) => c.placements?.[0] ? formatCurrency(c.placements[0].highestPackage) : "—",
    },
    {
      label: "Placement Rate",
      getValue: (c: any) => c.placements?.[0] ? `${c.placements[0].placementRate}%` : "—",
    },
    {
      label: "Established",
      getValue: (c: College) => (c.established ? c.established.toString() : "—"),
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Compare Colleges</h1>
        <button
          onClick={handleSaveComparison}
          disabled={saving}
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg font-medium transition-colors disabled:bg-gray-400"
        >
          {saving ? "Saving..." : "Save this Comparison"}
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="p-4 text-left text-sm font-medium text-gray-500 w-40">Criteria</th>
                {colleges.map((college) => (
                  <th key={college.id} className="p-4 text-left">
                    <a href={`/colleges/${college.slug}`} className="text-lg font-bold text-blue-600 hover:underline">
                      {college.name}
                    </a>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {rows.map((row) => (
                <tr key={row.label} className="hover:bg-gray-50 transition-colors">
                  <td className="p-4 text-sm font-medium text-gray-500">{row.label}</td>
                  {colleges.map((college) => (
                    <td key={college.id} className="p-4 font-medium text-gray-900">
                      {row.getValue(college)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import CollegeCard from "@/components/CollegeCard";
import CollegeFilters from "@/components/CollegeFilters";
import CompareBar from "@/components/CompareBar";
import { College } from "@/types";

export default function CollegesPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [colleges, setColleges] = useState<College[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({ page: 1, totalPages: 1 });
  const [states, setStates] = useState<string[]>([]);
  const [compareList, setCompareList] = useState<College[]>([]);
  const [search, setSearch] = useState(searchParams.get("search") || "");

  const [filters, setFilters] = useState({
    state: searchParams.get("state") || "",
    type: searchParams.get("type") || "",
    minRating: searchParams.get("minRating") || "",
    sortBy: searchParams.get("sortBy") || "rating",
  });

  const fetchColleges = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (filters.state) params.set("state", filters.state);
    if (filters.type) params.set("type", filters.type);
    if (filters.minRating) params.set("minRating", filters.minRating);
    params.set("sortBy", filters.sortBy);
    params.set("page", pagination.page.toString());

    const res = await fetch(`/api/colleges?${params}`);
    const data = await res.json();

    setColleges(data.colleges);
    setPagination((p) => ({ ...p, totalPages: data.pagination.totalPages }));
    setStates(data.filters.states);
    setLoading(false);
  }, [search, filters, pagination.page]);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((f) => ({ ...f, [key]: value }));
    setPagination((p) => ({ ...p, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPagination((p) => ({ ...p, page: 1 }));
  };

  const toggleCompare = (college: College) => {
    setCompareList((list) => {
      const exists = list.find((c) => c.id === college.id);
      if (exists) return list.filter((c) => c.id !== college.id);
      if (list.length >= 3) return list;
      return [...list, college];
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Search */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative max-w-auto mx-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search colleges by name, city, or state..."
            className="w-full px-5 py-4 pr-14 border-2 text-gray-400 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 text-lg"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </form>

      <div className="flex gap-8">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 shrink-0">
          <CollegeFilters
            states={states}
            filters={filters}
            onFilterChange={handleFilterChange}
            onClear={() => {
              setFilters({ state: "", type: "", minRating: "", sortBy: "rating" });
              setSearch("");
            }}
          />
        </div>

        {/* Results */}
        <div className="flex-1">
          {loading ? (
            <div className="grid md:grid-cols-2 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl border border-gray-200 p-5 animate-pulse">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-4 bg-gray-200 rounded w-full mb-2" />
                  <div className="h-10 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : colleges.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">No colleges found matching your criteria.</p>
            </div>
          ) : (
            <>
              <p className="text-gray-600 mb-4">
                Showing {colleges.length} college{colleges.length !== 1 && "s"}
              </p>
              <div className="grid md:grid-cols-2 gap-6">
                {colleges.map((college) => (
                  <CollegeCard
                    key={college.id}
                    college={college}
                    onCompareToggle={toggleCompare}
                    isSelected={compareList.some((c) => c.id === college.id)}
                  />
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  {[...Array(pagination.totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setPagination((p) => ({ ...p, page: i + 1 }))}
                      className={`px-4 py-2 rounded-lg ${
                        pagination.page === i + 1
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <CompareBar
        colleges={compareList}
        onRemove={(id) => setCompareList((list) => list.filter((c) => c.id !== id))}
        onClear={() => setCompareList([])}
      />
    </div>
  );
}

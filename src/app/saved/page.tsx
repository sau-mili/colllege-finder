"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CollegeCard from "@/components/CollegeCard";
import { College } from "@/types";

export default function SavedPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"colleges" | "comparisons">("colleges");
  const [colleges, setColleges] = useState<College[]>([]);
  const [comparisons, setComparisons] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (status === "authenticated") {
      // Fetch both simultaneously
      Promise.all([
        fetch("/api/user/saved").then((res) => res.json()),
        fetch("/api/user/comparisons").then((res) => res.json()),
      ]).then(([savedColleges, savedComparisons]) => {
        setColleges(savedColleges);
        setComparisons(savedComparisons);
        setLoading(false);
      });
    }
  }, [status, router]);

  if (status === "loading" || loading) {
    return <div className="max-w-7xl mx-auto px-4 py-8 animate-pulse text-center">Loading...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">My Saved Items</h1>

      {/* Tabs */}
      <div className="flex gap-8 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("colleges")}
          className={`pb-4 text-lg font-medium ${activeTab === "colleges" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
        >
          Saved Colleges ({colleges.length})
        </button>
        <button
          onClick={() => setActiveTab("comparisons")}
          className={`pb-4 text-lg font-medium ${activeTab === "comparisons" ? "border-b-2 border-blue-600 text-blue-600" : "text-gray-500"}`}
        >
          Saved Comparisons ({comparisons.length})
        </button>
      </div>

      {/* Content Area */}
      {activeTab === "colleges" ? (
        colleges.length === 0 ? (
          <EmptyState message="No saved colleges yet." href="/colleges" />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {colleges.map((college) => (
              <CollegeCard key={college.id} college={college} showCompare={false} />
            ))}
          </div>
        )
      ) : (
        comparisons.length === 0 ? (
          <EmptyState message="No saved comparisons yet." href="/colleges" />
        ) : (
          <div className="space-y-4">
            {comparisons.map((comp: any) => (
              <div key={comp.id} className="border p-6 rounded-xl bg-white shadow-sm flex justify-between items-center">
                <div>
                  <h2 className="font-semibold text-lg">{comp.colleges.map((c: any) => c.name).join(" vs ")}</h2>
                  <p className="text-sm text-gray-500">Saved on {new Date(comp.createdAt).toLocaleDateString()}</p>
                </div>
                <Link href={`/compare?colleges=${comp.colleges.map((c: any) => c.slug).join(",")}`} className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700">
                  View
                </Link>
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

function EmptyState({ message, href }: { message: string; href: string }) {
  return (
    <div className="text-center py-16">
      <p className="text-gray-500 mb-4">{message}</p>
      <a href={href} className="text-blue-600 hover:underline font-medium">Browse colleges →</a>
    </div>
  );
}
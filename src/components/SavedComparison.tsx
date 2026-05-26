"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function SavedComparisonsPage() {
  const [comparisons, setComparisons] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user/comparisons")
      .then((res) => res.json())
      .then((data) => {
        setComparisons(data);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">Your Saved Comparisons</h1>
      
      {comparisons.map((comp: any) => (
        <div key={comp.id} className="border p-6 rounded-xl mb-4 bg-white shadow-sm flex justify-between items-center">
          <div>
            <h2 className="font-semibold text-lg">Comparison from {new Date(comp.createdAt).toLocaleDateString()}</h2>
            <p className="text-sm text-gray-600">
              {comp.colleges.map((c: any) => c.name).join(" vs ")}
            </p>
          </div>
          
          <Link 
            href={`/compare?colleges=${comp.colleges.map((c: any) => c.slug).join(",")}`}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            View Comparison
          </Link>
        </div>
      ))}
    </div>
  );
}
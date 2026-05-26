"use client";

import { useState, useEffect } from "react";

export default function PredictorPage() {
  const [exams, setExams] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [formData, setFormData] = useState({ examId: "", rank: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/exams").then(res => res.json()).then(setExams);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch("/api/predictor", {
      method: "POST",
      body: JSON.stringify({ ...formData, rank: parseInt(formData.rank) }),
    });
    const data = await res.json();
    setResults(data);
    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">College Predictor</h1>
      <p className="text-gray-600 mb-8">Enter your rank to see which colleges match your performance.</p>
      
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm mb-12 flex gap-4">
        <select 
          required
          onChange={(e) => setFormData({...formData, examId: e.target.value})}
          className="border-gray-200 border rounded-lg px-4 py-2 flex-1 outline-none focus:border-blue-500"
        >
          <option value="">Select Exam</option>
          {exams.map(ex => <option key={ex.id} value={ex.id}>{ex.name}</option>)}
        </select>
        
        <input 
          required
          type="number" 
          placeholder="Enter Rank"
          className="border-gray-200 border rounded-lg px-4 py-2 flex-1 outline-none focus:border-blue-500"
          onChange={(e) => setFormData({...formData, rank: e.target.value})}
        />
        
        <button type="submit" className="bg-blue-600 text-white px-8 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      <div className="space-y-4">
        {results.map((item) => (
          <div key={item.id} className="border border-gray-100 p-6 rounded-xl bg-white shadow-sm flex justify-between items-center hover:shadow-md transition-shadow">
            <div>
              <h3 className="font-bold text-lg text-gray-900">{item.college.name}</h3>
              <p className="text-sm text-gray-500">Cutoff Rank: {item.rank}</p>
            </div>
            <a href={`/colleges/${item.college.slug}`} className="text-blue-600 font-medium hover:underline">View Details →</a>
          </div>
        ))}
      </div>
    </div>
  );
}
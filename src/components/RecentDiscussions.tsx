"use client";
import { useEffect, useState } from "react";

export default function RecentDiscussions() {
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    fetch("/api/general-questions")
      .then((res) => res.json())
      .then((data) => setQuestions(Array.isArray(data) ? data : []));
  }, []);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-3xl mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">General Community Q&A</h2>
        
        {questions.length === 0 ? (
          <p className="text-gray-500 italic">No community questions yet.</p>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <div key={q.id} className="p-4 border border-gray-200 rounded-lg shadow-sm">
                <p className="text-gray-900">{q.content}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
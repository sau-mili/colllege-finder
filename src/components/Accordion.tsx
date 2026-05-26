"use client";
import { useState } from "react";

export default function Accordion({ 
  questionId, 
  question, 
  answers, 
  onAnswerAdded 
}: { 
  questionId: string; 
  question: string; 
  answers: any[]; 
  onAnswerAdded: () => void 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");

  const handlePostAnswer = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/questions/${questionId}/answers`, {
      method: "POST",
      body: JSON.stringify({ content: newAnswer }),
      headers: { "Content-Type": "application/json" },
    });
    setNewAnswer("");
    onAnswerAdded(); // Refreshes the question list
  };

  return (
    <div className="border-b border-gray-100 py-4">
      <button 
        className="w-full flex justify-between items-center text-left font-semibold text-gray-900 hover:text-blue-600 transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <span className="text-xl">{isOpen ? "−" : "+"}</span>
      </button>

      {isOpen && (
        <div className="mt-4 pl-4 border-l-2 border-blue-100 animate-in fade-in">
          <div className="space-y-3 mb-4">
            {answers.map((a) => (
              <p key={a.id} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                {a.content}
              </p>
            ))}
          </div>
          
          <form onSubmit={handlePostAnswer} className="flex gap-2">
            <input 
              value={newAnswer}
              onChange={(e) => setNewAnswer(e.target.value)}
              className="flex-1 border rounded-lg px-3 py-1 text-sm outline-none focus:border-blue-500"
              placeholder="Add an answer..."
              required
            />
            <button type="submit" className="text-xs font-bold text-blue-600 hover:underline">Post</button>
          </form>
        </div>
      )}
    </div>
  );
}
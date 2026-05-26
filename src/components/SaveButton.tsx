"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SaveButton({ collegeId }: { collegeId: string }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session) {
      fetch("/api/user/saved")
        .then((res) => res.json())
        .then((colleges) => {
          setSaved(colleges.some((c: any) => c.id === collegeId));
        });
    }
  }, [session, collegeId]);

  const handleSave = async () => {
    if (!session) {
      router.push("/login");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/user/saved", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ collegeId }),
      });
      const data = await res.json();
      setSaved(data.saved);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleSave}
      disabled={loading}
      className={`p-2 rounded-full transition-colors ${
        saved
          ? "bg-red-100 text-red-600"
          : "bg-gray-100 text-gray-500 hover:bg-gray-200"
      }`}
    >
      <svg
        className="w-5 h-5"
        fill={saved ? "currentColor" : "none"}
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
    </button>
  );
}

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { useState } from "react";

export default function Header() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-blue-600">CollegeFinder</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/colleges"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Colleges
            </Link>
            <Link
              href="/compare"
              className="text-gray-600 hover:text-blue-600 font-medium"
            >
              Compare
            </Link>
            {session ? (
              <>
                <Link
                  href="/saved"
                  className="text-gray-600 hover:text-blue-600 font-medium"
                >
                  Saved
                </Link>
                <div className="flex items-center gap-4">
                  <span className="text-gray-700">{session.user?.name}</span>
                  <button
                    onClick={() => signOut()}
                    className="text-gray-600 hover:text-red-600 font-medium"
                  >
                    Sign out
                  </button>
                </div>
              </>
            ) : (
              <Link
                href="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
              >
                Sign in
              </Link>
            )}
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden py-4 space-y-3">
            <Link href="/colleges" className="block text-gray-600 hover:text-blue-600">
              Colleges
            </Link>
            <Link href="/compare" className="block text-gray-600 hover:text-blue-600">
              Compare
            </Link>
            {session ? (
              <>
                <Link href="/saved" className="block text-gray-600 hover:text-blue-600">
                  Saved
                </Link>
                <button
                  onClick={() => signOut()}
                  className="block text-red-600"
                >
                  Sign out
                </button>
              </>
            ) : (
              <Link href="/login" className="block text-blue-600">
                Sign in
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

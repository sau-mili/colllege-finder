import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CollegeFinder - Discover Your Perfect College",
  description: "Search, compare, and find the best colleges in India",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <AuthProvider session={session}>
          <Header />
          <main>{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}

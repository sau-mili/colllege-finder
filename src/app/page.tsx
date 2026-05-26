import Link from "next/link";
import { prisma } from "@/lib/prisma";
import RecentDiscussions from "@/components/RecentDiscussions";

export default async function Home() {
  const topColleges = await prisma.college.findMany({
    orderBy: { rating: "desc" },
    take: 6,
    include: {
      placements: {
        orderBy: { year: "desc" },
        take: 1,
      },
    },
  });

  const stats = {
    colleges: await prisma.college.count(),
    reviews: await prisma.review.count(),
    students: "50K+",
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Find Your Perfect College
          </h1>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Discover, compare, and choose from thousands of colleges across India. 
            Make informed decisions about your future.
          </p>
          <Link
            href="/colleges"
            className="inline-block bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-100 transition-colors"
          >
            Explore Colleges
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-blue-600">{stats.colleges}+</p>
            <p className="text-gray-600">Colleges</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">{stats.reviews}+</p>
            <p className="text-gray-600">Reviews</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-blue-600">{stats.students}</p>
            <p className="text-gray-600">Students Helped</p>
          </div>
        </div>
      </section>

      {/* Predictor CTA */}
      <div className="bg-gradient-to-b from-blue-100 to-indigo-50 p-12 text-blue-950 text-center">
        <h2 className="text-4xl font-bold mb-4">Find your dream college</h2>
        <p className="text-blue-600 mb-8 max-w-lg mx-auto">
          Input your rank and let our AI engine predict the best colleges based on historical cutoffs.
        </p>
        <Link href="/predictor" className="bg-white text-blue-700 px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition">
          Try Predictor Tool
        </Link>
      </div>

      {/* Top Colleges Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Top Rated Colleges</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topColleges.map((college) => (
              <Link
                key={college.id}
                href={`/colleges/${college.slug}`}
                className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{college.name}</h3>
                <p className="text-gray-500 text-sm mb-3">{college.city}, {college.state}</p>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-yellow-600">★ {college.rating}</span>
                  <span className="text-sm text-gray-500">{college.type}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Discussions - Client Component */}
      <RecentDiscussions />
    </main>
  );
}
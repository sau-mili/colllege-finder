import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SaveButton from "@/components/SaveButton";

export default async function CollegeDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const params = await props.params; // Await the params here

  const college = await prisma.college.findUnique({
    where: { slug: params.slug },
    include: {
      courses: true,
      placements: { orderBy: { year: "desc" } },
      reviews: {
        include: { user: { select: { name: true } } },
        orderBy: { createdAt: "desc" },
        take: 10,
      },
    },
  });

  if (!college) notFound();

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`;
    return `₹${amount.toLocaleString()}`;
  };

  const latestPlacement = college.placements[0];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
     
      {/* Header */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
         <img 
        src={college.image || "/bg1.jpg"} 
        alt={college.name} 
        className="w-full h-50 object-cover rounded-xl mb-2"
      />
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{college.name}</h1>
            <p className="text-gray-500 text-lg">{college.location}</p>
            <div className="flex items-center gap-4 mt-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                college.type === "Government"
                  ? "bg-green-100 text-green-700"
                  : "bg-purple-100 text-purple-700"
              }`}>
                {college.type}
              </span>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-xl font-bold text-gray-600">{college.rating}</span>
                <span className="text-gray-600">({college.reviewCount} reviews)</span>
              </div>
              {college.established && (
                <span className="text-gray-500">Est. {college.established}</span>
              )}
            </div>
          </div>
          <SaveButton collegeId={college.id} />
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Overview */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Overview</h2>
            <p className="text-gray-600 leading-relaxed">{college.overview}</p>
          </section>

          {/* Courses */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Courses Offered</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Course</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Duration</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Fees</th>
                    <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">Seats</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {college.courses.map((course) => (
                    <tr key={course.id}>
                      <td className="px-4 py-3 text-gray-600 font-medium">{course.name}</td>
                      <td className="px-4 py-3 text-gray-600">{course.duration}</td>
                      <td className="px-4 py-3 text-gray-600">{formatCurrency(course.fees)}</td>
                      <td className="px-4 py-3 text-gray-600">{course.seats || "—"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Reviews */}
          <section className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Reviews ({college.reviews.length})
            </h2>
            {college.reviews.length === 0 ? (
              <p className="text-gray-500">No reviews yet.</p>
            ) : (
              <div className="space-y-4">
                {college.reviews.map((review) => (
                  <div key={review.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <span className="font-medium">{review.user.name || "Anonymous"}</span>
                    </div>
                    <h4 className="font-medium mb-1">{review.title}</h4>
                    <p className="text-gray-600 text-sm">{review.content}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Key Stats */}
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="font-bold text-gray-900 mb-4">Key Information</h3>
            <dl className="space-y-3">
              <div className="flex justify-between">
                <dt className="text-gray-500">Annual Fees</dt>
                <dd className="font-semibold text-gray-500">{formatCurrency(college.fees)}</dd>
              </div>
              {latestPlacement && (
                <>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Avg. Package</dt>
                    <dd className="font-semibold text-green-600">
                      {formatCurrency(latestPlacement.averagePackage)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Highest Package</dt>
                    <dd className="font-semibold text-green-600">
                      {formatCurrency(latestPlacement.highestPackage)}
                    </dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Placement Rate</dt>
                    <dd className="font-semibold text-gray-500">{latestPlacement.placementRate}%</dd>
                  </div>
                </>
              )}
            </dl>
          </div>

          {/* Top Recruiters */}
          {latestPlacement && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="font-bold text-gray-900 mb-4">Top Recruiters</h3>
              <div className="flex flex-wrap gap-2">
                {latestPlacement.topRecruiters.split(",").map((company) => (
                  <span
                    key={company}
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-500"
                  >
                    {company.trim()}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

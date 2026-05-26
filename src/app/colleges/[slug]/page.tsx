import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import SaveButton from "@/components/SaveButton";

export default async function CollegeDetailPage(props: {
  params: Promise<{ slug: string }>;
}) {
  // Await the params to get the slug
  const { slug } = await props.params;

  const college = await prisma.college.findUnique({
    where: { slug: slug },
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
            {/* ... rest of your UI remains the same ... */}
          </div>
          <SaveButton collegeId={college.id} />
        </div>
      </div>
      {/* ... rest of your grid/sections ... */}
    </div>
  );
}
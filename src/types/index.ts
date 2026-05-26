export interface College {
  id: string;
  name: string;
  slug: string;
  location: string;
  city: string;
  state: string;
  type: string;
  rating: number;
  reviewCount: number;
  fees: number;
  established: number | null;
  image: string | null;
  overview: string | null;
  courses?: Course[];
  placements?: Placement[];
  reviews?: Review[];
}

export interface Course {
  id: string;
  name: string;
  duration: string;
  fees: number;
  seats: number | null;
}

export interface Placement {
  id: string;
  year: number;
  averagePackage: number;
  highestPackage: number;
  placementRate: number;
  topRecruiters: string;
}

export interface Review {
  id: string;
  rating: number;
  title: string;
  content: string;
  pros: string | null;
  cons: string | null;
  createdAt: string;
  user: {
    name: string | null;
  };
}

export interface CollegeFilters {
  search?: string;
  state?: string;
  type?: string;
  minFees?: number;
  maxFees?: number;
  minRating?: number;
  sortBy?: "rating" | "fees" | "name";
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
}

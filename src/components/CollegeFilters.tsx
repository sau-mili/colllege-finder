"use client";

interface Props {
  states: string[];
  filters: {
    state: string;
    type: string;
    minRating: string;
    sortBy: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onClear: () => void;
}

export default function CollegeFilters({
  states,
  filters,
  onFilterChange,
  onClear,
}: Props) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        <button
          onClick={onClear}
          className="text-sm text-blue-600 hover:underline"
        >
          Clear all
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          State
        </label>
        <select
          value={filters.state}
          onChange={(e) => onFilterChange("state", e.target.value)}
          className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All States</option>
          {states.map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Type
        </label>
        <select
          value={filters.type}
          onChange={(e) => onFilterChange("type", e.target.value)}
          className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">All Types</option>
          <option value="Government">Government</option>
          <option value="Private">Private</option>
          <option value="Deemed">Deemed</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Min Rating
        </label>
        <select
          value={filters.minRating}
          onChange={(e) => onFilterChange("minRating", e.target.value)}
          className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">Any Rating</option>
          <option value="4.5">4.5+</option>
          <option value="4">4+</option>
          <option value="3.5">3.5+</option>
          <option value="3">3+</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Sort By
        </label>
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange("sortBy", e.target.value)}
          className="text-gray-500 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="rating">Rating (High to Low)</option>
          <option value="fees">Fees (Low to High)</option>
          <option value="name">Name (A-Z)</option>
        </select>
      </div>
    </div>
  );
}

import { Filter } from "lucide-react";

interface FilterBarProps {
  filters: {
    category: string;
    status: string;
    industry: string;
  };
  onFiltersChange: (filters: any) => void;
}

export default function FilterBar({
  filters,
  onFiltersChange,
}: FilterBarProps) {
  const handleFilterChange = (filterType: string, value: string) => {
    onFiltersChange((prev: any) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  return (
    <div className="flex flex-wrap items-center gap-2 lg:gap-4">
      <div className="flex items-center text-gray-600 mb-2 lg:mb-0">
        <Filter className="h-5 w-5 mr-2" />
        <span className="font-medium text-sm lg:text-base">Filters:</span>
      </div>

      <div className="flex flex-wrap gap-2 lg:gap-4 w-full lg:w-auto">
        <select
          value={filters.category}
          onChange={(e) => handleFilterChange("category", e.target.value)}
          className="px-2 lg:px-3 py-2 border border-gray-300 rounded-lg text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 lg:flex-none"
        >
          <option value="all">All Categories</option>
          <option value="local">Local IPOs</option>
          <option value="foreign">Foreign IPOs</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => handleFilterChange("status", e.target.value)}
          className="px-2 lg:px-3 py-2 border border-gray-300 rounded-lg text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 lg:flex-none"
        >
          <option value="all">All Status</option>
          <option value="upcoming">Upcoming</option>
          <option value="active">Active</option>
          <option value="closed">Closed</option>
        </select>

        <select
          value={filters.industry}
          onChange={(e) => handleFilterChange("industry", e.target.value)}
          className="px-2 lg:px-3 py-2 border border-gray-300 rounded-lg text-xs lg:text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent flex-1 lg:flex-none"
        >
          <option value="all">All Industries</option>
          <option value="Technology">Technology</option>
          <option value="Healthcare">Healthcare</option>
          <option value="Financial Services">Financial Services</option>
          <option value="Energy">Energy</option>
        </select>
      </div>

      <button
        onClick={() =>
          onFiltersChange({ category: "all", status: "all", industry: "all" })
        }
        className="px-3 lg:px-4 py-2 text-xs lg:text-sm text-blue-600 hover:text-blue-700 font-medium mt-2 lg:mt-0"
      >
        Clear All
      </button>
    </div>
  );
}

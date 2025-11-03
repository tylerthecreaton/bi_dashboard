import {
  ChartFilters,
  type FilterState,
} from "@/components/publicc/ChartFilters";

interface FiltersSectionProps {
  onFiltersChange: (filters: FilterState) => void;
}

export function FiltersSection({ onFiltersChange }: FiltersSectionProps) {
  return (
    <div 
      id="filters"
      className="relative bg-black/20 backdrop-blur-md rounded-2xl p-8 mb-8 border border-white/10 shadow-2xl"
    >
      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px] rounded-2xl" />

      <div className="relative z-10">
        <h3 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
          Filter Data
        </h3>
        <ChartFilters onFiltersChange={onFiltersChange} />
      </div>
    </div>
  );
}
